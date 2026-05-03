import { WorldHistoryEvent } from "@/types/worldHistory";

export const earlyModernEvents: WorldHistoryEvent[] = [
  {
    id: "renaissance-italy",
    title: "르네상스의 전개(이탈리아 중심)",
    era: "근세",
    region: "유럽",
    dateLabel: "14~16세기",
    summary: "고전 문화 재발견과 인문주의 확산이 유럽 문화 지형을 바꾼 흐름.",
    keywords: ["인문주의", "고전 문화", "도시 국가"],
    causes: ["이탈리아 도시 상공업 성장", "비잔티움 학자 유입", "후원 문화 확대"],
    consequences: ["예술·학문 혁신", "종교개혁·과학혁명에 간접 영향"],
    relatedEvents: ["종교개혁", "대항해시대"],
    examPoints: ["르네상스와 중세 스콜라 철학의 차이", "이탈리아 르네상스의 배경"],
    commonConfusions: ["르네상스를 근대의 시작과 완전히 동일시하는 오류"],
    mapPoints: [{ id: "florence", label: "피렌체", coordinates: [11.2558, 43.7696], type: "city" }],
    reviewStatus: "검수 전 초안",
    verified: false
  },
  {
    id: "age-of-discovery",
    title: "대항해시대의 전개",
    era: "근세",
    region: "세계 교류",
    dateLabel: "15~17세기",
    summary: "해상 진출과 교역망 확대가 세계 지역 연결을 급격히 강화.",
    keywords: ["콜럼버스", "향신료 무역", "해양 제국"],
    causes: ["신항로 개척 동기", "항해 기술 발달"],
    consequences: ["세계 교역 구조 변화", "식민지 지배 확대"],
    relatedEvents: ["상업혁명", "가격혁명"],
    examPoints: ["포르투갈·에스파냐의 진출 방향 비교"],
    commonConfusions: ["대항해시대를 유럽 내부 사건으로만 보는 오류"],
    mapPoints: [{ id: "lisbon", label: "리스본", coordinates: [-9.1393, 38.7223], type: "trade" }],
    reviewStatus: "검수 전 초안",
    verified: false
  }
];
