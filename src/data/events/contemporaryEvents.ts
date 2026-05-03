import { WorldHistoryEvent } from "@/types/worldHistory";

export const contemporaryEvents: WorldHistoryEvent[] = [
  {
    id: "world-war-i",
    title: "제1차 세계대전",
    era: "현대",
    region: "세계 교류",
    dateLabel: "1914년~1918년",
    summary: "동맹 체제와 제국주의 갈등이 총력전으로 폭발한 세계 전쟁.",
    keywords: ["총력전", "동맹", "베르사유"],
    causes: ["군비 경쟁", "민족주의 갈등", "발칸 위기"],
    consequences: ["제국 해체", "국제질서 재편 시도"],
    relatedEvents: ["러시아 혁명", "국제연맹 창설"],
    examPoints: ["전쟁 원인 구조", "전후 처리의 한계"],
    commonConfusions: ["1차·2차 세계대전의 전후 체제 결과 혼동"],
    mapPoints: [{ id: "sarajevo", label: "사라예보", coordinates: [18.4131, 43.8563], type: "battle" }],
    reviewStatus: "검수 전 초안",
    verified: false
  }
];
