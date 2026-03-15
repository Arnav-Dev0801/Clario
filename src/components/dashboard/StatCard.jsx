import Card, { CardContent } from '../ui/Card';

export default function StatCard({ icon, label, value, trend, trendPositive = true }) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-foreground-secondary">{label}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
          {trend && (
            <p className={`mt-2 text-sm ${trendPositive ? 'text-success' : 'text-error'}`}>
              {trendPositive ? '↑' : '↓'} {trend}
            </p>
          )}
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </Card>
  );
}
