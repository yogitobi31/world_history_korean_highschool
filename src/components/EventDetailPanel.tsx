import ReviewStatusBadge from "@/components/ReviewStatusBadge";
import { WorldHistoryEvent } from "@/types/worldHistory";

type Props = { event: WorldHistoryEvent | null };

export default function EventDetailPanel({ event }: Props) {
  if (!event) {
    return <p>조건에 맞는 사건이 없습니다.</p>;
  }

  return (
    <>
      <header>
        <h2>{event.title}</h2>
        <p>{event.dateLabel}</p>
      </header>

      <DetailSection title="한 줄 요약" items={[event.summary]} />
      <DetailSection title="왜 일어났나" items={event.causes} />
      <DetailSection title="무엇이 바뀌었나" items={event.consequences} />
      <DetailSection title="연결 사건" items={event.relatedEvents} />
      <DetailSection title="시험 포인트" items={event.examPoints} />
      <DetailSection title="헷갈리기 쉬운 점" items={event.commonConfusions} />

      <section>
        <h3>검수 상태</h3>
        <ReviewStatusBadge status={event.reviewStatus} verified={event.verified} />
      </section>
    </>
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
