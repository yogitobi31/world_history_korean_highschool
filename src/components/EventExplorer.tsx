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

const mapRegions: Record<Region | "세계 교류", { x: number; y: number; w: number; h: number; label: string }> = {
  동아시아: { x: 77, y: 30, w: 15, h: 17, label: "동아시아" },
  인도: { x: 68, y: 42, w: 12, h: 12, label: "인도" },
  서아시아: { x: 58, y: 30, w: 16, h: 14, label: "서아시아" },
  유럽: { x: 49, y: 20, w: 13, h: 12, label: "유럽" },
  아프리카: { x: 47, y: 35, w: 18, h: 28, label: "아프리카" },
  아메리카: { x: 14, y: 18, w: 26, h: 40, label: "아메리카" },
  "세계 교류": { x: 42, y: 66, w: 20, h: 10, label: "세계 교류" }
};

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
        <span>향후 선/면 오버레이 확장 가능</span>
      </div>
      <svg viewBox="0 0 100 80" role="img" aria-label="지역별 역사 지도">
        <rect x="2" y="2" width="96" height="76" rx="8" className="map-frame" />
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
              <text x={shape.x + shape.w / 2} y={shape.y + shape.h / 2} className="map-label">
                {shape.label}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="map-note">선택 사건의 핵심 지역이 강조됩니다.</p>
    </section>
  );
}

function TimelineRibbon({ events, selectedEvent }: { events: WorldHistoryEvent[]; selectedEvent: WorldHistoryEvent | null }) {
  const eraCounts = ERA_ORDER.map((era) => ({ era, count: events.filter((event) => event.era === era).length }));

  return (
    <section className="timeline-ribbon" aria-label="시대 타임라인">
      {eraCounts.map(({ era, count }) => {
        const isActive = selectedEvent?.era === era;
        return (
          <div key={era} className={`timeline-node ${isActive ? "active" : ""}`}>
            <span>{era}</span>
            <small>{count}</small>
          </div>
        );
      })}
    </section>
  );
}
