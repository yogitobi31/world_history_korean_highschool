"use client";

import { useMemo, useState } from "react";
import { WorldHistoryEvent } from "@/data/worldHistoryEvents";

type Props = {
  events: WorldHistoryEvent[];
};

const ALL = "전체";

export default function EventExplorer({ events }: Props) {
  const [eraFilter, setEraFilter] = useState(ALL);
  const [regionFilter, setRegionFilter] = useState(ALL);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(events[0]?.id ?? "");

  const eras = useMemo(() => [ALL, ...new Set(events.map((e) => e.era))], [events]);
  const regions = useMemo(() => [ALL, ...new Set(events.map((e) => e.region))], [events]);

  const filteredEvents = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();
    return events.filter((event) => {
      const matchesEra = eraFilter === ALL || event.era === eraFilter;
      const matchesRegion = regionFilter === ALL || event.region === regionFilter;
      const haystack = [
        event.title,
        event.summary,
        event.dateLabel,
        event.keywords.join(" "),
        event.examPoints.join(" ")
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);
      return matchesEra && matchesRegion && matchesQuery;
    });
  }, [events, eraFilter, regionFilter, query]);

  const selectedEvent = filteredEvents.find((e) => e.id === selectedId) ?? filteredEvents[0] ?? null;

  return (
    <div className="layout-grid">
      <section className="timeline-panel">
        <div className="panel-head">
          <h2>세계사 마스터맵</h2>
          <p>연표 흐름과 사건 카드를 함께 보며 개념 연결을 강화하세요.</p>
        </div>

        <div className="filters">
          <select value={eraFilter} onChange={(e) => setEraFilter(e.target.value)}>
            {eras.map((era) => (
              <option key={era} value={era}>
                시대: {era}
              </option>
            ))}
          </select>
          <select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)}>
            {regions.map((region) => (
              <option key={region} value={region}>
                지역: {region}
              </option>
            ))}
          </select>
          <input
            type="search"
            placeholder="사건명, 키워드, 시험 포인트 검색"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <ul className="card-list">
          {filteredEvents.map((event) => (
            <li key={event.id}>
              <button
                type="button"
                className={`event-card ${selectedEvent?.id === event.id ? "active" : ""}`}
                onClick={() => setSelectedId(event.id)}
              >
                <div className="card-top">
                  <span>{event.era}</span>
                  <span>{event.region}</span>
                </div>
                <h3>{event.title}</h3>
                <p>{event.dateLabel}</p>
                <small>{event.keywords.join(" · ")}</small>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <aside className="detail-panel">
        {selectedEvent ? (
          <>
            <header>
              <h2>{selectedEvent.title}</h2>
              <p>{selectedEvent.dateLabel}</p>
            </header>

            <DetailSection title="한 줄 요약" items={[selectedEvent.summary]} />
            <DetailSection title="왜 일어났나" items={selectedEvent.causes} />
            <DetailSection title="무엇이 바뀌었나" items={selectedEvent.consequences} />
            <DetailSection title="연결 사건" items={selectedEvent.relatedEvents} />
            <DetailSection title="시험 포인트" items={selectedEvent.examPoints} />
            <DetailSection title="헷갈리기 쉬운 점" items={selectedEvent.commonConfusions} />

            <section>
              <h3>검수 상태</h3>
              <p>
                {selectedEvent.reviewStatus} · verified: {String(selectedEvent.verified)}
              </p>
            </section>
          </>
        ) : (
          <p>조건에 맞는 사건이 없습니다.</p>
        )}
      </aside>
    </div>
  );
}

function DetailSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
