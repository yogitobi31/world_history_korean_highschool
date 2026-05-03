import { ReviewStatus } from "@/types/worldHistory";

type Props = {
  status: ReviewStatus;
  verified: boolean;
};

export default function ReviewStatusBadge({ status, verified }: Props) {
  return (
    <span className="status-badge" data-verified={verified}>
      {status} · verified: {String(verified)}
    </span>
  );
}
