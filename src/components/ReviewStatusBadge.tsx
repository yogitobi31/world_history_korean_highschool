import { ReviewStatus } from "@/types/worldHistory";

type Props = {
  status: ReviewStatus;
  verified: boolean;
};

export default function ReviewStatusBadge({ status, verified }: Props) {
  return (
    <span className="status-badge" data-verified={verified}>
      <strong>{verified ? "검증 완료" : "검수 필요"}</strong>
      <em>{status}</em>
    </span>
  );
}
