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

const regionOverlays: Record<Region | "세계 교류", { label: string; d: string }> = {
  동아시아: { label: "동아시아", d: "M690 130 L820 130 L860 210 L810 300 L710 320 L650 250 L670 180 Z" },
  인도: { label: "인도", d: "M620 260 L700 250 L730 320 L680 380 L610 360 L590 300 Z" },
  서아시아: { label: "서아시아", d: "M520 170 L640 170 L660 260 L580 300 L500 260 L480 200 Z" },
  유럽: { label: "유럽", d: "M430 90 L560 90 L590 170 L540 230 L440 220 L400 150 Z" },
  아프리카: { label: "아프리카", d: "M450 220 L600 240 L610 470 L520 600 L430 520 L410 340 Z" },
  아메리카: { label: "아메리카", d: "M90 70 L310 60 L350 220 L300 430 L260 600 L150 590 L100 380 L70 180 Z" },
  "세계 교류": { label: "세계 교류", d: "M330 300 L750 300 L750 370 L330 370 Z" }
};

const mapBasePath =
  "M66 95 L141 69 L257 54 L292 88 L300 132 L335 203 L346 271 L331 364 L304 432 L267 565 L201 583 L152 559 L108 472 L89 340 L79 271 L58 227 L38 153 Z M364 110 L393 101 L447 87 L505 90 L550 101 L581 132 L637 153 L703 132 L784 138 L863 196 L914 232 L921 291 L882 325 L835 318 L775 345 L740 396 L713 433 L727 469 L705 508 L644 512 L611 579 L562 604 L523 579 L511 496 L451 458 L417 372 L400 286 L379 227 L350 180 Z M444 228 L502 244 L548 277 L587 343 L584 440 L559 497 L521 560 L485 515 L456 433 L445 350 L444 297 Z M789 433 L863 450 L884 486 L866 526 L800 540 L753 507 L749 469 Z";

export default function EventExplorer({ events }: Props) {
  const [eraFilter, setEraFilter] = useState<FilterValue>(FILTER_ALL);
  const [regionFilter, setRegionFilter] = useState<FilterValue>(FILTER_ALL);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(events[0]?.id ?? "");
  const [hoverRegion, setHoverRegion] = useState<Region | "세계 교류" | null>(null);

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
          <WorldMapCanvas
            activeRegion={selectedEvent?.region ?? null}
            hoverRegion={hoverRegion}
            onHoverRegion={setHoverRegion}
            onSelectRegion={(region) => setRegionFilter(region)}
          />
          <TimelineRibbon events={filteredEvents} selectedEvent={selectedEvent} />
        </div>

        <FilterBar eras={eras} regions={regions} eraFilter={eraFilter} regionFilter={regionFilter} query={query} onEraChange={setEraFilter} onRegionChange={setRegionFilter} onQueryChange={setQuery} />

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

function WorldMapCanvas({ activeRegion, hoverRegion, onHoverRegion, onSelectRegion }: { activeRegion: Region | null; hoverRegion: Region | "세계 교류" | null; onHoverRegion: (region: Region | "세계 교류" | null) => void; onSelectRegion: (region: Region) => void; }) {
  return (
    <section className="map-shell" aria-label="세계 지도 인터페이스">
      <div className="map-header"><strong>메인 세계지도 인터페이스</strong><span>지역 hover/click으로 필터</span></div>
      <svg viewBox="0 0 960 640" role="img" aria-label="세계사 학습용 세계 지도">
        <rect x="12" y="12" width="936" height="616" rx="14" className="map-frame" />
        <path d={mapBasePath} className="world-land" />
        {Object.entries(regionOverlays).map(([region, shape]) => {
          const isActive = activeRegion === region || hoverRegion === region;
          return (
            <path
              key={region}
              d={shape.d}
              className={`map-region ${isActive ? "active" : ""}`}
              onMouseEnter={() => onHoverRegion(region as Region | "세계 교류")}
              onMouseLeave={() => onHoverRegion(null)}
              onClick={() => region !== "세계 교류" && onSelectRegion(region as Region)}
            />
          );
        })}
      </svg>
      <p className="map-note">선택 사건 지역이 강조되며, 영역 클릭으로 지역 필터가 적용됩니다.</p>
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
