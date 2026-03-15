import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';

export default function ActivityFeed({ activities = [] }) {
  // Group activities by date
  const groupedActivities = activities.reduce((groups, activity) => {
    const date = activity.date ? new Date(activity.date).toLocaleDateString() : 'Today';
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
    return groups;
  }, {});

  const activityIcons = {
    session_completed: '✅',
    session_scheduled: '📅',
    message_received: '💬',
    rating_received: '⭐',
    achievement_unlocked: '🏆',
    skill_learned: '📚',
    tutor_joined: '👤',
    payment_received: '💳',
    request_pending: '📬',
    feedback_left: '💭',
  };

  const activityVariants = {
    session_completed: 'success',
    session_scheduled: 'info',
    message_received: 'default',
    rating_received: 'success',
    achievement_unlocked: 'success',
    skill_learned: 'info',
    tutor_joined: 'default',
    payment_received: 'success',
    request_pending: 'warning',
    feedback_left: 'default',
  };

  if (activities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Activity Feed</CardTitle>
          <CardDescription>Your recent activities</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <p className="text-foreground-secondary mb-2">No activities yet</p>
          <p className="text-sm text-foreground-tertiary">Your activity will appear here as you use Clario</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Feed</CardTitle>
        <CardDescription>Your recent activities and events</CardDescription>
      </CardHeader>
      <CardContent className="max-h-96 overflow-y-auto">
        {Object.entries(groupedActivities).map(([date, dateActivities]) => (
          <div key={date} className="mb-6">
            {/* Date Header */}
            <h4 className="text-xs font-semibold text-foreground-secondary uppercase tracking-wider mb-3 px-3">
              {date}
            </h4>

            {/* Activities for this date */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
              className="space-y-2"
            >
              {dateActivities.map((activity) => (
                <motion.div
                  key={activity.id}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    show: { opacity: 1, x: 0 },
                  }}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  {/* Icon */}
                  <div className="shrink-0 text-lg pt-0.5">
                    {activityIcons[activity.type] || '📌'}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground group-hover:text-foreground font-medium">
                      {activity.title}
                    </p>
                    <p className="text-xs text-foreground-tertiary mt-0.5">
                      {activity.description}
                    </p>
                  </div>

                  {/* Badge */}
                  {activity.type && (
                    <Badge
                      variant={activityVariants[activity.type] || 'default'}
                      size="sm"
                      className="shrink-0"
                    >
                      {activity.type.replace(/_/g, ' ')}
                    </Badge>
                  )}

                  {/* Time */}
                  {activity.time && (
                    <p className="text-xs text-foreground-tertiary shrink-0">
                      {activity.time}
                    </p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
