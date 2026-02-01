import { RaceSummary } from "@/types/races";

interface RaceDetailsProps {
  race: RaceSummary;
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface-hover/50 rounded-lg p-3">
      <div className="text-xs text-text-secondary mb-1">{title}</div>
      <div className="text-sm font-semibold text-white">{children}</div>
    </div>
  );
}

export function RaceDetails({ race }: RaceDetailsProps) {
  return (
    <div className="space-y-3">
      {race.race_form.race_comment && (
        <div className="bg-surface-hover/50 rounded-lg p-3">
          <div className="text-xs text-text-secondary mb-2 flex items-center gap-1">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 14 }}
            >
              info
            </span>
            Race Preview
          </div>
          <div className="text-xs text-white leading-relaxed line-clamp-4">
            {race.race_form.race_comment}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Card title="Distance">
          {race.race_form.distance}
          {race.race_form.distance_type.short_name}
        </Card>
        <Card title="Track">{race.race_form.track_condition?.name}</Card>
      </div>
    </div>
  );
}
