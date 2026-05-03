import ReviewStatusBadge from "@/components/ReviewStatusBadge";
import { WorldHistoryEvent } from "@/types/worldHistory";

type Props = {
  event: WorldHistoryEvent;
  active: boolean;
  onSelect: (id: string) => void;
};

export default function EventCard({ event, active, onSelect }: Props) {
  return (
    <button type="button" className={`event-card ${active ? "active" : ""}`} onClick={() => onSelect(event.id)}>
      <div className="card-top">
        <span>{event.era}</span>
        <span>{event.region}</span>
      </div>
      <h3>{event.title}</h3>
      <p>{event.dateLabel}</p>
      <small>{event.keywords.join(" · ")}</small>
      <div className="card-status">
        <ReviewStatusBadge status={event.reviewStatus} verified={event.verified} />
      </div>
    </button>
  );
}
