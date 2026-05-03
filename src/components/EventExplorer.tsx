"use client";

import { useMemo, useState } from "react";
import EventCard from "@/components/EventCard";
import EventDetailPanel from "@/components/EventDetailPanel";
import FilterBar from "@/components/FilterBar";
import { FILTER_ALL, filterEvents, getEras, getRegions } from "@/lib/filters";
import { WorldHistoryEvent } from "@/types/worldHistory";

type Props = {
  events: WorldHistoryEvent[];
};

export default function EventExplorer({ events }: Props) {
  const [eraFilter, setEraFilter] = useState(FILTER_ALL);
  const [regionFilter, setRegionFilter] = useState(FILTER_ALL);
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
          <p>연표 흐름과 사건 카드를 함께 보며 개념 연결을 강화하세요.</p>
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

        <ul className="card-list">
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
