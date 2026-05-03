# 프로젝트 브리프: 고등 세계사 마스터맵

## 프로젝트 한 줄 정의

고등학생이 세계사를 단순 암기가 아니라, 시간·지역·원인과 결과·시험 포인트의 연결망으로 이해하게 만드는 학습 앱.

## 앱의 핵심 경험

학생이 하나의 사건 카드를 열면 다음 질문에 답할 수 있어야 합니다.

- 이 사건은 언제 일어났는가?
- 어느 지역 세계의 사건인가?
- 왜 일어났는가?
- 무엇이 바뀌었는가?
- 어떤 사건들과 연결되는가?
- 시험에서는 어떤 단서로 출제되는가?
- 무엇과 헷갈리기 쉬운가?

## 초기 화면 구조

첫 프로토타입의 화면은 다음 구조를 권장합니다.

1. Hero 영역
   - 앱 이름
   - 짧은 설명
   - 현재 데이터 검수 상태 안내

2. 필터 영역
   - 시대 필터: 전체, 고대, 중세, 근세, 근대, 현대
   - 지역 필터: 전체, 동아시아, 인도, 서아시아, 유럽, 아프리카, 아메리카, 세계 교류
   - 검색창

3. 사건 카드 목록
   - 제목
   - 시대
   - 지역
   - 시기 라벨
   - 핵심 키워드
   - 검수 상태 배지

4. 상세 패널
   - 한 줄 요약
   - 왜 일어났나
   - 무엇이 바뀌었나
   - 연결 사건
   - 시험 포인트
   - 헷갈리기 쉬운 점
   - 검수 상태

5. 향후 확장 자리
   - 퀴즈 모드
   - 약점 지도
   - 연표 맵
   - 지역별 비교표

## 콘텐츠 안전 원칙

이 앱은 학생 성적과 관련될 수 있습니다. 그러므로 다음 원칙을 지켜야 합니다.

1. 대량의 역사 콘텐츠를 임의 생성하지 않습니다.
2. 샘플 데이터는 5개 이하로 제한합니다.
3. 모든 샘플 데이터는 `verified: false`로 둡니다.
4. `reviewStatus: "검수 전 초안"`을 명확히 표시합니다.
5. 학생에게 확정 자료처럼 보이는 문구를 피합니다.
6. 앱의 핵심 구조를 먼저 만들고, 검수된 콘텐츠를 나중에 확장합니다.

## 권장 기술 스택

- Next.js
- React
- TypeScript
- Tailwind CSS

단, 기존 저장소에 이미 다른 구조가 있다면 그 구조를 존중하되, 학습 데이터는 반드시 코드와 분리합니다.

## 권장 폴더 구조

```txt
src/
  app/
    page.tsx
    layout.tsx
  components/
    EventCard.tsx
    EventDetailPanel.tsx
    FilterBar.tsx
    ReviewStatusBadge.tsx
  data/
    worldHistoryEvents.ts
  types/
    worldHistory.ts
  lib/
    filters.ts
```

## Event 타입 초안

```ts
export type Era = "고대" | "중세" | "근세" | "근대" | "현대";
export type Region = "동아시아" | "인도" | "서아시아" | "유럽" | "아프리카" | "아메리카" | "세계 교류";

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
  reviewStatus: "검수 전 초안" | "1차 검수" | "검수 완료";
  verified: boolean;
}
```

## 1차 작업 범위

1차 작업에서는 다음까지만 구현합니다.

- 프로젝트 기본 실행 가능 상태 만들기
- 위 데이터 타입 추가
- 샘플 사건 데이터 5개 이하 추가
- 필터/검색/상세 패널 구현
- 반응형 UI 구현
- 변경 파일 목록과 실행 방법 정리

## 1차 작업에서 하지 말 것

- 세계사 전체 콘텐츠 대량 생성 금지
- 로그인 기능 금지
- 서버/DB 연동 금지
- 복잡한 애니메이션 금지
- 검수 완료처럼 보이는 문구 금지
- 실제 수능 기출 문항을 저작권 검토 없이 복제 금지
