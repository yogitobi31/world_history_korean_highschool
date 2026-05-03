import { FilterValue } from "@/lib/filters";

type Props = {
  eras: string[];
  regions: string[];
  eraFilter: FilterValue;
  regionFilter: FilterValue;
  query: string;
  onEraChange: (value: FilterValue) => void;
  onRegionChange: (value: FilterValue) => void;
  onQueryChange: (value: string) => void;
};

export default function FilterBar({
  eras,
  regions,
  eraFilter,
  regionFilter,
  query,
  onEraChange,
  onRegionChange,
  onQueryChange
}: Props) {
  return (
    <div className="filters">
      <select value={eraFilter} onChange={(e) => onEraChange(e.target.value as FilterValue)}>
        {eras.map((era) => (
          <option key={era} value={era}>
            시대: {era}
          </option>
        ))}
      </select>
      <select value={regionFilter} onChange={(e) => onRegionChange(e.target.value as FilterValue)}>
        {regions.map((region) => (
          <option key={region} value={region}>
            지역: {region}
          </option>
        ))}
      </select>
      <input
        type="search"
        placeholder="사건명, 키워드, 시험 포인트 검색"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
    </div>
  );
}
