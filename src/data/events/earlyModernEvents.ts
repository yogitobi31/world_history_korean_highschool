import { WorldHistoryEvent } from "@/types/worldHistory";

export const earlyModernEvents: WorldHistoryEvent[] = [
  {
    id: "age-of-discovery",
    title: "대항해 시대의 전개",
    era: "근세",
    region: "세계 교류",
    dateLabel: "15~17세기",
    summary: "대서양과 인도양을 잇는 항로 개척으로 세계 해상 연결망이 빠르게 확대.",
    keywords: ["신항로", "해양 제국", "대서양 교역"],
    causes: ["향신료 무역 수요", "항해술·선박 기술 발달"],
    consequences: ["대륙 간 교류 심화", "식민지 경쟁 확대"],
    relatedEvents: ["몽골 제국과 유라시아 교류"],
    examPoints: ["포르투갈·에스파냐의 항로 비교", "대항해가 만든 세계 교역 변화"],
    commonConfusions: ["대항해 시대를 탐험사로만 보는 오류"],
    mapPoints: [
      { id: "lisbon", label: "리스본", coordinates: [-9.1393, 38.7223], type: "trade" },
      { id: "goa", label: "고아", coordinates: [73.8278, 15.4909], type: "trade" },
      { id: "seville", label: "세비야", coordinates: [-5.9845, 37.3891], type: "city" }
    ],
    mapLines: [
      { id: "portuguese-route", label: "포르투갈 인도 항로", points: [[-9.1393, 38.7223], [-17, 14], [18.4, -34.2], [52, -20], [73.8278, 15.4909]], type: "voyage" },
      { id: "atlantic-route", label: "대서양 횡단 항로", points: [[-5.9845, 37.3891], [-17.8, 28.3], [-61.2, 15.9], [-75.2, 20.1]], type: "voyage" }
    ],
    mapAreas: [
      { id: "atlantic-network", label: "대서양-인도양 교역권", polygon: [[-80, 45], [-60, 10], [-30, -25], [20, -32], [70, -10], [80, 20], [35, 45], [-10, 52]], type: "network" }
    ],
    reviewStatus: "검수 전 초안",
    verified: false
  }
];
