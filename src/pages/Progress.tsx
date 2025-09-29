import { TrendingUp, Calendar, Heart, Activity, Target } from 'lucide-react';
import { WellnessCard } from '../components/WellnessCard';
import { VoiceButton } from '../components/VoiceButton';
// import { useLocalStorage } from '../hooks/useLocalStorage';
import { useState } from 'react';
import { Button } from '../components/ui/button';

const Progress = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  // Removed unused streakData state

  const weeklyStats = [
    { day: 'Mon', workouts: 1, duration: 20 },
    { day: 'Tue', workouts: 1, duration: 25 },
    { day: 'Wed', workouts: 0, duration: 0 },
    { day: 'Thu', workouts: 1, duration: 15 },
    { day: 'Fri', workouts: 1, duration: 30 },
    { day: 'Sat', workouts: 1, duration: 35 },
    { day: 'Sun', workouts: 1, duration: 20 },
  ];

  const monthlyStats = [
    { day: 'Week 1', workouts: 5, duration: 120 },
    { day: 'Week 2', workouts: 6, duration: 150 },
    { day: 'Week 3', workouts: 4, duration: 95 },
    { day: 'Week 4', workouts: 6, duration: 145 }
  ];

  const currentStats = selectedPeriod === 'week' ? weeklyStats : monthlyStats;

  const healthMetrics = [
    {
      icon: <Heart className="text-secondary" />,
      label: "Average Heart Rate",
      value: "72 BPM",
      trend: "+2%",
      status: "good"
    },
    {
      icon: <Activity className="text-primary" />,
      label: "Daily Steps",
      value: "6,840",
      trend: "+15%",
      status: "excellent"
    },
    {
      icon: <Target className="text-accent" />,
      label: "Goals Achieved",
      value: "85%",
      trend: "+12%",
      status: "good"
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-heading font-bold mb-2">Your Progress</h1>
          <p className="text-lg opacity-90">See how well you're doing on your fitness journey</p>
        </div>
      </header>

      <main className="px-6 py-8 max-w-4xl mx-auto space-y-8">
        {/* Activity Overview */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-heading font-semibold flex items-center gap-3">
              <Calendar className="text-primary" />
              Activity Overview
            </h2>
            <div className="flex gap-2">
              <Button 
                variant={selectedPeriod === 'week' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod('week')}
              >
                Week
              </Button>
              <Button 
                variant={selectedPeriod === 'month' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod('month')}
              >
                Month
              </Button>
            </div>
          </div>
          
          <WellnessCard className="p-6">
            <div className={`grid ${selectedPeriod === 'week' ? 'grid-cols-7' : 'grid-cols-4'} gap-2 mb-6`}>
              {currentStats.map((day, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs text-text-secondary mb-2">{day.day}</div>
                  <div 
                    className={`h-16 rounded-lg flex items-end justify-center ${
                      day.workouts > 0 ? 'bg-gradient-to-r from-blue-500 to-green-500' : 'bg-border'
                    }`}
                  >
                    <div className="text-xs text-white mb-1">
                      {day.duration > 0 ? `${day.duration}m` : ''}
                    </div>
                  </div>
                  <div className="text-xs mt-1">
                    {day.workouts > 0 ? '✓' : '—'}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {selectedPeriod === 'week' ? '6/7 Days' : '21/28 Days'}
              </div>
              <p className="text-text-secondary">
                {selectedPeriod === 'week' 
                  ? 'You exercised 6 out of 7 days this week!' 
                  : 'You exercised 21 out of 28 days this month!'
                }
              </p>
            </div>
          </WellnessCard>
        </section>

        {/* Health Metrics */}
        <section>
          <h2 className="text-2xl font-heading font-semibold mb-6 flex items-center gap-3">
            <TrendingUp className="text-secondary" />
            Health Metrics
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {healthMetrics.map((metric, index) => (
              <WellnessCard key={index} className="text-center p-6 rounded-2xl bg-green-100">
                <div className="mb-4 text-black">{metric.icon}</div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{metric.label}</h3>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className={`text-sm flex items-center justify-center gap-1 ${
                    metric.status === 'excellent' ? 'text-success' : 'text-primary'
                  }`}>
                    <TrendingUp size={16} />
                    {metric.trend} from last week
                  </div>
                </div>
              </WellnessCard>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section>
          <WellnessCard className="bg-gradient-to-r from-blue-200 to-green-100 p-8 text-center rounded-2xl">
            <div className="space-y-4">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-2xl font-heading font-semibold">
                Week Warrior Achievement!
              </h3>
              <p className="text-lg text-text-secondary">
                You've completed 6 workouts this week. Amazing dedication!
              </p>
              <div className="flex justify-center gap-4 mt-6">
                <div className="bg-accent/20 rounded-full px-4 py-2">
                  <span className="text-sm font-medium">+50 Points</span>
                </div>
                <div className="bg-blue-200 rounded-full px-4 py-2">
                  <span className="text-sm font-medium">Level 3 Achieved</span>
                </div>
              </div>  
            </div>
          </WellnessCard>
        </section>

        {/* Monthly Goals */}
        <section>
          <h2 className="text-2xl font-heading font-semibold mb-6">
            Monthly Goals Progress
          </h2>
          
          <div className="space-y-4">
            <WellnessCard className="p-6 rounded-2xl bg-green-100">
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium">Complete 20 Workouts</span>
                <span className="text-sm text-text-secondary">16/20</span>
              </div>
              <div className="w-full bg-border rounded-full h-3">
                <div className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full" style={{ width: '80%' }} />
              </div>
            </WellnessCard>
            
            <WellnessCard className="p-6 rounded-2xl bg-green-100">
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium">Walk 100,000 Steps</span>
                <span className="text-sm text-text-secondary">68,400/100,000</span>
              </div>
              <div className="w-full bg-border rounded-full h-3">
                <div className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full" style={{ width: '68%' }} />
              </div>
            </WellnessCard>
          </div>
        </section>
      </main>

      <VoiceButton />
    </div>
  );
};

export default Progress;