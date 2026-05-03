export type Era = "고대" | "중세" | "근세" | "근대" | "현대";

export type Region =
  | "동아시아"
  | "인도"
  | "서아시아"
  | "유럽"
  | "아프리카"
  | "아메리카"
  | "세계 교류";

export type ReviewStatus = "검수 전 초안" | "1차 검수" | "검수 완료";

export interface WorldHistoryEvent {
  id: string;
  title: string;
  era: Era;
  region: Region;
  dateLabel: string;
  summary: string;
  keywords: string[];
  causes: string[];
  consequences: string[];
  relatedEvents: string[];
  examPoints: string[];
  commonConfusions: string[];
  mapPoints?: {
    id: string;
    label: string;
    coordinates: [number, number];
    type: "center" | "city" | "battle" | "trade" | "capital";
  }[];
  reviewStatus: ReviewStatus;
  verified: boolean;
}
