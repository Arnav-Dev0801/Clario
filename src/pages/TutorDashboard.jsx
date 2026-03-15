import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GlassPanel, PageHero, PageShell, PrimaryButton, StatusBadge } from '../components/AppShell';
import { subscribePendingRequestsForTutor, subscribeSessionsForTutor } from '../services/sessionService';
import { getUserById } from '../services/userService';
import { StatCard, SessionCard, ActivityCard } from '../components/dashboard';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';

export default function TutorDashboard({ user, userProfile }) {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [pending, setPending] = useState([]);
  const [studentNames, setStudentNames] = useState({});

  useEffect(() => {
    if (!user?.uid) return undefined;
    const unsubSessions = subscribeSessionsForTutor(user.uid, setSessions);
    const unsubPending = subscribePendingRequestsForTutor(user.uid, setPending);
    return () => {
      unsubSessions();
      unsubPending();
    };
  }, [user?.uid]);

  useEffect(() => {
    const ids = [...new Set([...sessions.map((session) => session.studentId), ...pending.map((request) => request.studentId)])];
    ids.forEach(async (studentId) => {
      if (studentNames[studentId]) return;
      const profile = await getUserById(studentId);
      if (profile) {
        setStudentNames((current) => ({ ...current, [studentId]: profile.displayName }));
      }
    });
  }, [pending, sessions, studentNames]);

  const upcoming = sessions.filter((session) => session.status === 'accepted' || session.status === 'in_progress');
  const greetingName = userProfile?.displayName || user?.displayName || user?.email || 'Tutor';
  const skills = userProfile?.skills || [];
  const totalEarnings = sessions
    .filter(s => s.status === 'completed')
    .reduce((acc, s) => {
      const skill = skills.find(sk => (typeof sk === 'string' ? sk : sk?.name || sk?.skill) === s.skill);
      const rate = typeof skill === 'object' && skill.rate ? skill.rate : 0;
      return acc + rate;
    }, 0);

  return (
    <PageShell>
      <PageHero
        eyebrow="Tutor workspace"
        title={`Teach with momentum, ${greetingName}`}
        description="Review incoming requests, manage your teaching calendar, and move sessions into live rooms that sync across devices."
        actions={
          <>
            <Link to="/tutor/profile">
              <PrimaryButton type="button">Add skill</PrimaryButton>
            </Link>
            <StatusBadge tone="coral">{pending.length} pending requests</StatusBadge>
          </>
        }
      />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <StatCard 
          icon="📚" 
          label="Total Sessions" 
          value={sessions.length}
          trend={upcoming.length > 0 ? `${upcoming.length} upcoming` : 'No upcoming'}
        />
        <StatCard 
          icon="💰" 
          label="Total Earnings" 
          value={`Rs ${totalEarnings}`}
          trend={sessions.length > 0 ? 'In progress' : 'Start teaching'}
        />
        <StatCard 
          icon="📊" 
          label="Active Skills" 
          value={skills.length}
          trend={skills.length > 0 ? 'Taught by you' : 'Add skills'}
        />
        <StatCard 
          icon="⭐" 
          label="Avg Rating" 
          value={sessions.length > 0 ? '4.9' : 'N/A'}
          trend={sessions.length > 0 ? 'Excellent' : 'Get rated'}
        />
      </div>

      {/* Skills Section */}
      <GlassPanel className="mb-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Your Skills</h2>
          <StatusBadge tone="cyan">{skills.length} active</StatusBadge>
        </div>
        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => {
              const name = typeof skill === 'string' ? skill : skill?.name || skill?.skill || skill;
              const rate = typeof skill === 'object' && skill.rate != null ? skill.rate : null;
              const slots = typeof skill === 'object' && skill.timingSlots ? skill.timingSlots : [];
              return (
                <div key={name} className="rounded-lg border border-cyan/20 bg-cyan/10 px-4 py-3">
                  <p className="font-medium text-white">{name}</p>
                  {rate != null && rate > 0 ? <p className="mt-1 text-sm text-teal">Rs {rate} / session</p> : null}
                  {slots.length > 0 ? <p className="mt-2 text-xs text-white/55">{slots.join(', ')}</p> : null}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-surface/50 p-6 text-center">
            <p className="text-foreground-secondary mb-4">No skills uploaded yet.</p>
            <Link to="/tutor/profile">
              <PrimaryButton type="button">Add your first skill</PrimaryButton>
            </Link>
          </div>
        )}
      </GlassPanel>

      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        {/* Pending Requests */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Pending Requests</CardTitle>
              <CardDescription>{pending.length} waiting for response</CardDescription>
            </CardHeader>
            <CardContent className="max-h-96 overflow-y-auto">
              {pending.length === 0 ? (
                <p className="text-sm text-foreground-tertiary">No pending requests right now.</p>
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
                  {pending.slice(0, 5).map((request) => (
                    <ActivityCard
                      key={request.id}
                      title={request.skill}
                      description={studentNames[request.studentId] || 'Student'}
                      status="pending"
                      statusVariant="warning"
                      action="Review"
                      onActionClick={() => navigate('/tutor/requests')}
                    />
                  ))}
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Sessions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>{upcoming.length} scheduled</CardDescription>
            </CardHeader>
            <CardContent>
              {upcoming.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-foreground-secondary mb-4">No upcoming sessions yet.</p>
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
                      tutor={studentNames[session.studentId] || 'Student'}
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
      </div>
    </PageShell>
  );
}
