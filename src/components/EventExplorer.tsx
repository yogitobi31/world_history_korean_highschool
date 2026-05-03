"use client";

import { useMemo, useState } from "react";
import EventCard from "@/components/EventCard";
import EventDetailPanel from "@/components/EventDetailPanel";
import FilterBar from "@/components/FilterBar";
import { FILTER_ALL, FilterValue, filterEvents, getEras, getRegions } from "@/lib/filters";
import { Region, WorldHistoryEvent } from "@/types/worldHistory";

type Props = {
  events: WorldHistoryEvent[];
};

const ERA_ORDER: WorldHistoryEvent["era"][] = ["고대", "중세", "근세", "근대", "현대"];

const mapRegions: Record<Region | "세계 교류", { x: number; y: number; w: number; h: number; label: string; cx: number; cy: number }> = {
  동아시아: { x: 77, y: 30, w: 15, h: 17, label: "동아시아", cx: 84.5, cy: 38.5 },
  인도: { x: 68, y: 42, w: 12, h: 12, label: "인도", cx: 74, cy: 48 },
  서아시아: { x: 58, y: 30, w: 16, h: 14, label: "서아시아", cx: 66, cy: 37 },
  유럽: { x: 49, y: 20, w: 13, h: 12, label: "유럽", cx: 55.5, cy: 26 },
  아프리카: { x: 47, y: 35, w: 18, h: 28, label: "아프리카", cx: 56, cy: 49 },
  아메리카: { x: 14, y: 18, w: 26, h: 40, label: "아메리카", cx: 27, cy: 38 },
  "세계 교류": { x: 42, y: 66, w: 20, h: 10, label: "세계 교류", cx: 52, cy: 71 }
};

const flowEdges: Array<{ from: Region | "세계 교류"; to: Region | "세계 교류"; label: string }> = [
  { from: "동아시아", to: "서아시아", label: "실크로드" },
  { from: "인도", to: "아프리카", label: "인도양" },
  { from: "유럽", to: "아메리카", label: "대서양" },
  { from: "서아시아", to: "유럽", label: "교류" },
  { from: "세계 교류", to: "유럽", label: "연결" }
];

export default function EventExplorer({ events }: Props) {
  const [eraFilter, setEraFilter] = useState<FilterValue>(FILTER_ALL);
  const [regionFilter, setRegionFilter] = useState<FilterValue>(FILTER_ALL);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(events[0]?.id ?? "");

  const eras = useMemo(() => getEras(events), [events]);
  const regions = useMemo(() => getRegions(events), [events]);

  const filteredEvents = useMemo(
    () => filterEvents(events, eraFilter, regionFilter, query),
    [events, eraFilter, regionFilter, query]
  );

  const selectedEvent = filteredEvents.find((e) => e.id === selectedId) ?? filteredEvents[0] ?? null;

  return (
    <div className="layout-grid">
      <section className="timeline-panel">
        <div className="panel-head">
          <h2>세계사 마스터맵</h2>
          <p>카드 · 지도 · 타임라인을 한 화면에서 연결해 역사 구조를 파악하세요.</p>
        </div>

        <div className="history-canvas" aria-label="세계사 구조 캔버스">
          <MiniWorldMap activeRegion={selectedEvent?.region ?? null} />
          <TimelineRibbon events={filteredEvents} selectedEvent={selectedEvent} />
        </div>

        <FilterBar
          eras={eras}
          regions={regions}
          eraFilter={eraFilter}
          regionFilter={regionFilter}
          query={query}
          onEraChange={setEraFilter}
          onRegionChange={setRegionFilter}
          onQueryChange={setQuery}
        />

        <div className="result-meta">
          <strong>검색 결과</strong>
          <span>{filteredEvents.length}건 / 전체 {events.length}건</span>
        </div>

        <ul className="card-list" aria-live="polite">
          {filteredEvents.map((event) => (
            <li key={event.id}>
              <EventCard event={event} active={selectedEvent?.id === event.id} onSelect={setSelectedId} />
            </li>
          ))}
        </ul>
      </section>

      <aside className="detail-panel">
        <EventDetailPanel event={selectedEvent} />
      </aside>
    </div>
  );
}

function MiniWorldMap({ activeRegion }: { activeRegion: Region | null }) {
  return (
    <section className="map-shell" aria-label="미니 세계 지도">
      <div className="map-header">
        <strong>역사 지리 레이어</strong>
        <span>점·선·면 기반 미니멀 맵</span>
      </div>
      <svg viewBox="0 0 100 80" role="img" aria-label="지역별 역사 지도">
        <rect x="2" y="2" width="96" height="76" rx="8" className="map-frame" />
        {flowEdges.map((edge) => {
          const source = mapRegions[edge.from];
          const target = mapRegions[edge.to];
          const active = activeRegion === edge.from || activeRegion === edge.to;
          return (
            <g key={`${edge.from}-${edge.to}`}>
              <line x1={source.cx} y1={source.cy} x2={target.cx} y2={target.cy} className={`map-flow ${active ? "active" : ""}`} />
              <text x={(source.cx + target.cx) / 2} y={(source.cy + target.cy) / 2 - 1.5} className="map-flow-label">
                {edge.label}
              </text>
            </g>
          );
        })}
        {Object.entries(mapRegions).map(([region, shape]) => {
          const isActive = activeRegion === region;
          return (
            <g key={region}>
              <rect
                x={shape.x}
                y={shape.y}
                width={shape.w}
                height={shape.h}
                rx="2"
                className={`map-region ${isActive ? "active" : ""}`}
              />
              <circle cx={shape.cx} cy={shape.cy} r={isActive ? 1.8 : 1.2} className={`map-node ${isActive ? "active" : ""}`} />
              <text x={shape.x + shape.w / 2} y={shape.y + shape.h / 2} className="map-label">
                {shape.label}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="map-note">선택 사건의 지역 노드와 연결 축이 강조됩니다.</p>
    </section>
  );
}

function TimelineRibbon({ events, selectedEvent }: { events: WorldHistoryEvent[]; selectedEvent: WorldHistoryEvent | null }) {
  const eraCounts = ERA_ORDER.map((era) => ({ era, count: events.filter((event) => event.era === era).length }));

  return (
    <section className="timeline-ribbon" aria-label="시대 타임라인">
      <div className="timeline-track" aria-hidden="true" />
      {eraCounts.map(({ era, count }, index) => {
        const isActive = selectedEvent?.era === era;
        const selectedInEra = events.filter((event) => event.era === era);
        return (
          <div key={era} className={`timeline-node ${isActive ? "active" : ""}`}>
            <span>{era}</span>
            <small>{count}</small>
            <div className="timeline-dots" aria-hidden="true">
              {selectedInEra.slice(0, 5).map((event) => (
                <i key={event.id} className={`timeline-dot ${event.id === selectedEvent?.id ? "active" : ""}`} />
              ))}
              {selectedInEra.length > 5 && <i className="timeline-more">+{selectedInEra.length - 5}</i>}
            </div>
            <em className="timeline-step" aria-hidden="true">{index + 1}</em>
          </div>
        );
      })}
    </section>
  );
}
