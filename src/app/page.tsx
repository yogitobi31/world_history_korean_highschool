import EventExplorer from "@/components/EventExplorer";
import { worldHistoryEvents } from "@/data/worldHistoryEvents";

export default function HomePage() {
  return (
    <main className="container">
      <header className="hero">
        <h1>세계사 사건 카드 프로토타입</h1>
        <p>학습 콘텐츠는 검수된 데이터로 교체 예정이며, 현재는 구조 검증용 초안 데이터만 표시됩니다.</p>
      </header>
      <EventExplorer events={worldHistoryEvents} />
    </main>
  );
}
