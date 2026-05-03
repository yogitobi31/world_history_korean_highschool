import { WorldHistoryEvent } from "@/types/worldHistory";

export const modernEvents: WorldHistoryEvent[] = [
  {
    id: "french-revolution",
    title: "프랑스 혁명",
    era: "근대",
    region: "유럽",
    dateLabel: "1789년~1799년",
    summary: "구체제 붕괴와 시민 주권 원리가 확산된 정치·사회 변동.",
    keywords: ["삼부회", "인권선언", "공화정"],
    causes: ["재정 위기", "계몽사상 확산", "신분제 모순"],
    consequences: ["나폴레옹 시대 전개", "유럽 전역에 혁명 이념 확산"],
    relatedEvents: ["미국 독립혁명", "빈 체제"],
    examPoints: ["혁명 단계별 전개", "인권선언 핵심 내용"],
    commonConfusions: ["프랑스 혁명과 산업혁명의 시기·성격 혼동"],
    mapPoints: [{ id: "paris", label: "파리", coordinates: [2.3522, 48.8566], type: "capital" }],
    reviewStatus: "검수 전 초안",
    verified: false
  },
  {
    id: "industrial-revolution",
    title: "산업혁명(영국 중심)",
    era: "근대",
    region: "유럽",
    dateLabel: "18세기 후반~19세기",
    summary: "기계화 생산체제 확산으로 경제·노동·도시 구조가 재편.",
    keywords: ["공장제", "증기기관", "도시화"],
    causes: ["자본 축적", "풍부한 자원", "농업 생산성 향상"],
    consequences: ["노동문제 대두", "제국주의 경쟁 심화"],
    relatedEvents: ["시민혁명", "사회주의 사상 확산"],
    examPoints: ["영국에서 먼저 시작된 배경", "산업혁명의 사회적 영향"],
    commonConfusions: ["산업혁명을 단순 기술 발명사로만 파악하는 오류"],
    mapPoints: [{ id: "manchester", label: "맨체스터", coordinates: [-2.2426, 53.4808], type: "city" }],
    reviewStatus: "검수 전 초안",
    verified: false
  }
];
