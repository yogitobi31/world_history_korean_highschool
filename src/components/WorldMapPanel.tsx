"use client";

import { Region, WorldHistoryEvent } from "@/types/worldHistory";
import { useMemo, useState } from "react";

const REGION_HOTSPOTS: Array<{ region: Region; label: string; points: string }> = [
  { region: "아메리카", label: "아메리카", points: "8,18 30,14 36,52 22,70 10,58" },
  { region: "유럽", label: "유럽", points: "45,16 58,15 60,29 49,31 43,23" },
  { region: "아프리카", label: "아프리카", points: "45,30 60,31 64,69 49,74 41,55" },
  { region: "서아시아", label: "서아시아", points: "56,24 69,23 72,38 59,41 52,31" },
  { region: "인도", label: "인도", points: "67,35 75,35 77,50 71,56 65,44" },
  { region: "동아시아", label: "동아시아", points: "73,21 92,20 95,50 80,56 71,40" },
  { region: "세계 교류", label: "세계 교류", points: "0,0 100,0 100,78 0,78" }
];

const REGION_CENTER: Record<Region, [number, number]> = {
  "동아시아": [116.4, 39.9],
  "인도": [77.2, 28.6],
  "서아시아": [44.4, 33.3],
  "유럽": [2.3, 48.8],
  "아프리카": [31.2, 30],
  "아메리카": [-74, 40.7],
  "세계 교류": [0, 0]
};

const project = ([lon, lat]: [number, number]) => {
  const x = ((lon + 180) / 360) * 100;
  const y = ((90 - lat) / 180) * 78;
  return { x, y };
};

export default function WorldMapPanel({
  events,
  selectedEvent,
  onSelectEvent
}: {
  events: WorldHistoryEvent[];
  selectedEvent: WorldHistoryEvent | null;
  onSelectEvent: (id: string) => void;
}) {
  const hoverRegion = selectedEvent?.region ?? null;
  const [hoveredPointId, setHoveredPointId] = useState<string | null>(null);

  const mapPoints = useMemo(
    () =>
      events.map((event) => {
        const primaryPoint = event.mapPoints?.[0];
        const coordinates = primaryPoint?.coordinates ?? REGION_CENTER[event.region];
        return {
          event,
          pointId: primaryPoint?.id ?? event.id,
          label: primaryPoint?.label ?? event.title,
          projected: project(coordinates)
        };
      }),
    [events]
  );

  return (
    <section className="world-map-panel" aria-label="인터랙티브 세계지도">
      <div className="map-header">
        <strong>세계사 인터랙티브 맵</strong>
        <span>실제 세계지도 윤곽 기반 · mapPoints 우선 표시</span>
      </div>

      <div className="world-map-stage">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
          alt="세계지도 윤곽"
          className="world-map-base"
        />

        <svg viewBox="0 0 100 78" className="world-map-overlay" role="img" aria-label="세계사 사건 지도 오버레이">
          {REGION_HOTSPOTS.map((region) => (
            <polygon
              key={region.region}
              points={region.points}
              className={`region-hotspot ${hoverRegion === region.region ? "active" : ""}`}
            >
              <title>{region.label}</title>
            </polygon>
          ))}

          {mapPoints.map(({ event, pointId, label, projected }) => {
            const active = selectedEvent?.id === event.id || hoveredPointId === pointId;
            return (
              <g
                key={event.id}
                onClick={() => onSelectEvent(event.id)}
                onMouseEnter={() => setHoveredPointId(pointId)}
                onMouseLeave={() => setHoveredPointId(null)}
                className="event-point-group"
              >
                <circle cx={projected.x} cy={projected.y} r={active ? 1.8 : 1.25} className={`event-point ${active ? "active" : ""}`} />
                {hoveredPointId === pointId && (
                  <text x={projected.x + 1.4} y={projected.y - 1.6} className="event-point-label">
                    {label}
                  </text>
                )}
                <title>{event.title}</title>
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
}
