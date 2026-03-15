import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SkillMap from '../components/SkillMap';
import { GlassPanel, PageHero, PageShell, PrimaryButton, StatusBadge } from '../components/AppShell';
import { subscribeSessionsForStudent } from '../services/sessionService';
import { StatCard, SessionCard, TimelineItem } from '../components/dashboard';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';

export default function StudentDashboard({ user, userProfile }) {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    if (!user?.uid) return undefined;
    return subscribeSessionsForStudent(user.uid, setSessions);
  }, [user?.uid]);

  const upcoming = sessions.filter((session) => session.status === 'accepted' || session.status === 'in_progress');
  const recent = sessions.filter((session) => session.status === 'completed').slice(0, 3);
  const greetingName = userProfile?.displayName || user?.displayName || user?.email || 'Student';
  const totalSessions = sessions.length;
  const completedSessions = recent.length;

  return (
    <PageShell>
      <PageHero
        eyebrow="Student workspace"
        title={`Welcome back, ${greetingName}`}
        description="Track your upcoming sessions, discover new mentors, and move into live rooms with less friction."
        actions={
          <>
            <Link to="/find-skills">
              <PrimaryButton type="button">Explore tutors</PrimaryButton>
            </Link>
            <StatusBadge tone="cyan">{upcoming.length} active sessions</StatusBadge>
          </>
        }
      />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <StatCard 
          icon="📚" 
          label="Total Sessions" 
          value={totalSessions}
          trend={upcoming.length > 0 ? `${upcoming.length} upcoming` : ''}
        />
        <StatCard 
          icon="✅" 
          label="Completed" 
          value={completedSessions}
          trend={completedSessions > 0 ? '100% rate' : 'No sessions'}
        />
        <StatCard 
          icon="⏳" 
          label="Learning Hours" 
          value={Math.round(sessions.reduce((acc, s) => acc + (s.duration || 0), 0) / 60)}
          trend={sessions.length > 0 ? 'Growing' : 'Start today'}
        />
        <StatCard 
          icon="⭐" 
          label="Avg Rating" 
          value={sessions.length > 0 ? '4.8' : 'N/A'}
          trend={sessions.length > 0 ? 'Excellent' : 'Rate sessions'}
        />
      </div>

      <div className="mb-8">
        <GlassPanel className="overflow-hidden">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-cyan/72">Interactive discovery</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Skill map</h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-white/58">Rotate, scan, and jump directly into a tutor search from the skills students are actively teaching.</p>
          </div>
          <SkillMap onSkillSelect={(skill) => navigate(`/find-skills?skill=${encodeURIComponent(skill)}`)} />
        </GlassPanel>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        {/* Upcoming Sessions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>{upcoming.length} scheduled sessions</CardDescription>
            </CardHeader>
            <CardContent>
              {upcoming.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-foreground-secondary mb-4">No upcoming sessions.</p>
                  <Link to="/find-skills">
                    <PrimaryButton type="button">Find a tutor</PrimaryButton>
                  </Link>
                </div>
              ) : (
                <motion.div 
                  initial="hidden" 
                  animate="show" 
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1 }
                    }
                  }}
                  className="space-y-3"
                >
                  {upcoming.map((session) => (
                    <SessionCard
                      key={session.id}
                      id={session.id}
                      skill={session.skill}
                      tutor={session.tutorName || 'Tutor'}
                      status={session.status}
                      time={session.scheduledTime}
                      onJoin={() => navigate(`/session/lobby/${session.id}`)}
                      isActive={session.status === 'in_progress'}
                    />
                  ))}
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Learning History */}
        <Card>
          <CardHeader>
            <CardTitle>Learning History</CardTitle>
            <CardDescription>Recent activity</CardDescription>
          </CardHeader>
          <CardContent className="max-h-96 overflow-y-auto">
            {recent.length === 0 ? (
              <p className="text-sm text-foreground-tertiary">No completed sessions yet.</p>
            ) : (
              <div className="space-y-4">
                {recent.map((session) => (
                  <TimelineItem
                    key={session.id}
                    icon="✅"
                    title={session.skill}
                    description="Session completed"
                    time={session.completedAt ? new Date(session.completedAt).toLocaleDateString() : 'Recently'}
                    variant="success"
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Sessions */}
      {recent.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Sessions</CardTitle>
            <CardDescription>{recent.length} completed sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div 
              initial="hidden" 
              animate="show" 
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
              className="space-y-3"
            >
              {recent.map((session) => (
                <SessionCard
                  key={session.id}
                  id={session.id}
                  skill={session.skill}
                  tutor={session.tutorName || 'Tutor'}
                  status={session.status}
                  time={session.completedAt}
                  onRate={() => navigate(`/session/rate/${session.id}`)}
                />
              ))}
            </motion.div>
          </CardContent>
        </Card>
      )}
    </PageShell>
  );
}
