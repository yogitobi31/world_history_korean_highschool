"use client";

import { useMemo, useState } from "react";
import EventCard from "@/components/EventCard";
import EventDetailPanel from "@/components/EventDetailPanel";
import FilterBar from "@/components/FilterBar";
import { FILTER_ALL, FilterValue, filterEvents, getEras, getRegions } from "@/lib/filters";
import { WorldHistoryEvent } from "@/types/worldHistory";
import WorldMapPanel from "@/components/WorldMapPanel";

type Props = {
  events: WorldHistoryEvent[];
};

const ERA_ORDER: WorldHistoryEvent["era"][] = ["고대", "중세", "근세", "근대", "현대"];

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
    <div className="map-first-layout">
      <section className="timeline-panel map-primary-panel">
        <div className="panel-head">
          <h2>세계사 마스터맵</h2>
          <p>카드 · 지도 · 타임라인을 한 화면에서 연결해 역사 구조를 파악하세요.</p>
        </div>

        <div className="history-canvas" aria-label="세계사 구조 캔버스">
          <WorldMapPanel events={filteredEvents} selectedEvent={selectedEvent} onSelectEvent={setSelectedId} />
          <TimelineRibbon
            events={events}
            selectedEvent={selectedEvent}
            activeEra={eraFilter}
            onEraSelect={(era) => setEraFilter((prev) => (prev === era ? FILTER_ALL : era))}
          />
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

      <aside className="detail-panel map-side-panel">
        <EventDetailPanel event={selectedEvent} />
      </aside>
    </div>
  );
}

function TimelineRibbon({
  events,
  selectedEvent,
  activeEra,
  onEraSelect
}: {
  events: WorldHistoryEvent[];
  selectedEvent: WorldHistoryEvent | null;
  activeEra: FilterValue;
  onEraSelect: (era: WorldHistoryEvent["era"]) => void;
}) {
  const eraCounts = ERA_ORDER.map((era) => ({ era, count: events.filter((event) => event.era === era).length }));

  return (
    <section className="timeline-ribbon" aria-label="시대 타임라인">
      <div className="timeline-track" aria-hidden="true" />
      {eraCounts.map(({ era, count }, index) => {
        const isActive = activeEra === era || (activeEra === FILTER_ALL && selectedEvent?.era === era);
        const selectedInEra = events.filter((event) => event.era === era);
        return (
          <button
            key={era}
            type="button"
            className={`timeline-node ${isActive ? "active" : ""}`}
            onClick={() => onEraSelect(era)}
            aria-pressed={activeEra === era}
          >
            <span>{era}</span>
            <small>{count}</small>
            <div className="timeline-dots" aria-hidden="true">
              {selectedInEra.slice(0, 5).map((event) => (
                <i key={event.id} className={`timeline-dot ${event.id === selectedEvent?.id ? "active" : ""}`} />
              ))}
              {selectedInEra.length > 5 && <i className="timeline-more">+{selectedInEra.length - 5}</i>}
            </div>
            <em className="timeline-step" aria-hidden="true">
              {index + 1}
            </em>
          </button>
        );
      })}
    </section>
  );
}
