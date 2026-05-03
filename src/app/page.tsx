import EventExplorer from "@/components/EventExplorer";
import { worldHistoryEvents } from "@/data/worldHistoryEvents";

export default function HomePage() {
  return (
    <main className="container">
      <header className="hero">
        <h1>고등 세계사 마스터맵</h1>
        <p>현재 화면은 앱 구조/UI 검증용입니다. 세계사 콘텐츠는 검수 전 초안만 제한적으로 표시됩니다.</p>
        <p className="notice">데이터 상태: 검수 전 초안(verified: false) · 샘플 5건</p>
      </header>
      <EventExplorer events={worldHistoryEvents} />

      <section className="future-panel">
        <h2>향후 확장 예정</h2>
        <ul>
          <li>퀴즈 모드</li>
          <li>약점 지도</li>
          <li>연표 맵</li>
          <li>지역별 비교표</li>
        </ul>
      </section>
    </main>
  );
}
