import { WorldHistoryEvent } from "@/types/worldHistory";

export const medievalEvents: WorldHistoryEvent[] = [
  {
    id: "mongol-eurasia-exchange",
    title: "몽골 제국과 유라시아 교류",
    era: "중세",
    region: "세계 교류",
    dateLabel: "13~14세기",
    summary: "몽골 제국의 광역 지배 아래 동서 교류가 빠르게 확대된 흐름.",
    keywords: ["팍스 몽골리카", "실크로드", "대제국"],
    causes: ["초원 세력 통합", "기동성 높은 군사력"],
    consequences: ["육상 교역망 안정", "기술·지식의 장거리 이동"],
    relatedEvents: ["이슬람 세계의 확대", "대항해시대의 전개"],
    examPoints: ["팍스 몽골리카의 교류 효과", "몽골 지배의 지역별 차이"],
    commonConfusions: ["몽골 제국을 단순 파괴 세력으로만 보는 오류"],
    mapPoints: [
      { id: "karakorum", label: "카라코룸", coordinates: [102.84, 47.2], type: "capital" },
      { id: "samarkand", label: "사마르칸트", coordinates: [66.972, 39.654], type: "trade" }
    ],
    mapLines: [
      { id: "mongol-silkroad", label: "유라시아 육상 교역로", points: [[116.4, 39.9], [89.2, 43.8], [66.972, 39.654], [37.617, 55.755]], type: "trade" }
    ],
    mapAreas: [
      { id: "mongol-sphere", label: "몽골 제국 영향권", polygon: [[43, 35], [55, 52], [88, 55], [116, 49], [125, 40], [108, 32], [78, 30], [55, 29]], type: "empire" }
    ],
    reviewStatus: "검수 전 초안",
    verified: false
  },
  {
    id: "islamic-world-expansion",
    title: "이슬람 세계의 확대",
    era: "중세",
    region: "서아시아",
    dateLabel: "7~10세기",
    summary: "정복과 교역을 통해 이슬람 문화권이 서아시아·북아프리카·이베리아로 확대.",
    keywords: ["칼리프", "우마이야", "아바스"],
    causes: ["아라비아 통합", "종교·정치 결합"],
    consequences: ["광역 문화권 형성", "인도양·지중해 교역 활성화"],
    relatedEvents: ["몽골 제국과 유라시아 교류"],
    examPoints: ["우마이야-아바스 전환", "이슬람 문화권의 다원성"],
    commonConfusions: ["이슬람 세계를 단일 민족권으로 보는 오류"],
    mapPoints: [
      { id: "mecca", label: "메카", coordinates: [39.8579, 21.3891], type: "center" },
      { id: "baghdad", label: "바그다드", coordinates: [44.3661, 33.3152], type: "capital" },
      { id: "cordoba", label: "코르도바", coordinates: [-4.7794, 37.8882], type: "city" }
    ],
    mapLines: [
      { id: "islam-expansion-west", label: "서방 확산 경로", points: [[39.8579, 21.3891], [31.2357, 30.0444], [13.1913, 32.8872], [-4.7794, 37.8882]], type: "expansion" }
    ],
    mapAreas: [
      { id: "islamic-sphere", label: "이슬람 문화권", polygon: [[-8, 36], [0, 33], [15, 30], [30, 26], [48, 28], [58, 35], [47, 41], [24, 40], [5, 39]], type: "sphere" }
    ],
    reviewStatus: "검수 전 초안",
    verified: false
  }
];
