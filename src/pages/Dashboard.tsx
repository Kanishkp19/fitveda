
import { Calendar, Clock, Target, Award, Flame } from 'lucide-react';
import { WellnessCard } from '../components/WellnessCard';
import { VoiceButton } from '../components/VoiceButton';
import { Button } from '../components/ui/button';
import { useLocalStorage } from '../hooks/useLocalStorage';
// import { useToast } from '../src/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

type StreakData = {
  current: number;
  weekly: number;
  points: number;
  completedToday: string[];
};

const Dashboard = () => {
  // const { toast } = useToast();
  const navigate = useNavigate();
  const [streakData, setStreakData] = useLocalStorage<StreakData>('streakData', {
    current: 7,
    weekly: 85,
    points: 1250,
    completedToday: []
  });

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const completeActivity = (activityName: string) => {
    const updatedData = {
      ...streakData,
      points: streakData.points + 50,
      completedToday: [...streakData.completedToday, activityName]
    };
    setStreakData(updatedData);
    
    // toast({
    //   title: "Activity Completed! 🎉",
    //   description: `Great job completing ${activityName}! +50 points earned.`,
    // });
  };

  const startQuickWorkout = () => {
    // toast({
    //   title: "Starting Emergency Workout",
    //   description: "5-minute stress relief session beginning!",
    // });
    navigate('/workout');
  };

  const logHealthData = () => {
    // toast({
    //   title: "Health Data Logger",
    //   description: "Opening health tracking form...",
    // });
  };

  const todaysActivities = [
    {
      time: "9:00 AM",
      activity: "Morning Yoga",
      duration: "20 mins",
      status: "completed"
    },
    {
      time: "2:00 PM",
      activity: "Walk in Park",
      duration: "30 mins",
      status: "upcoming"
    },
    {
      time: "6:00 PM",
      activity: "Breathing Exercise",
      duration: "10 mins",
      status: "upcoming"
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-b from-blue-500 to-indigo-600 text-white px-6 py-8">

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-heading font-bold">Good Morning, Sarah! 👋</h1>
              <p className="text-lg opacity-90">{today}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-2xl font-bold">
                <Flame className="text-accent" />
                {streakData.current} day streak!
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 rounded-2xl p-4">
              <div className="text-2xl font-bold">{streakData.weekly}%</div>
              <div className="text-sm opacity-80">Weekly Goal</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4">
              <div className="text-2xl font-bold">{streakData.points}</div>
              <div className="text-sm opacity-80">Total Points</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4">
              <div className="text-2xl font-bold">3/3</div>
              <div className="text-sm opacity-80">Today's Goals</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8 max-w-4xl mx-auto space-y-8">
        {/* Today's Schedule */}
        <section>
          <h2 className="text-2xl font-heading font-semibold mb-6 flex items-center gap-3">
            <Calendar className="text-primary" />
            Today's Activities
          </h2>
          
          <div className="space-y-4">
            {todaysActivities.map((item, index) => (
              <WellnessCard key={index} className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <Clock className="text-black mx-auto mb-1" size={20} />
                    <div className="text-sm font-medium">{item.time}</div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{item.activity}</h3>
                    <p className="text-text-secondary">{item.duration}</p>
                  </div>
                </div>
                <div>
                  {item.status === 'completed' ? (
                    <div className="bg-success text-success-foreground px-4 py-2 rounded-full text-sm font-medium">
                      ✓ Completed
                    </div>
                  ) : (
                    <Button 
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => completeActivity(item.activity)}
                    >
                      Start Now
                    </Button>
                  )}
                </div>
              </WellnessCard>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-2xl font-heading font-semibold mb-6 flex items-center gap-3">
            <Target className="text-accent" />
            Quick Actions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
     <WellnessCard 
  variant="primary"
  className="text-center py-8 cursor-pointer rounded-2xl bg-blue-300"
  onClick={startQuickWorkout}
>
  <div className="space-y-4">
    <Award size={48} className="mx-auto text-primary-foreground" />
    <div>
      <h3 className="text-xl font-semibold text-black">Start Emergency Workout</h3>
      <p className="opacity-90 text-black">Quick 5-minute stress relief</p>
    </div>
  </div>
</WellnessCard>
            <WellnessCard 
              variant="secondary"
              className="text-center py-8 cursor-pointer rounded-2xl bg-green-300"
              onClick={logHealthData}
            >
              <div className="space-y-4">
                <Clock size={48} className="mx-auto text-secondary-foreground" />
                <div>
                  <h3 className="text-xl font-semibold">Log Health Data</h3>
                  <p className="opacity-90">Blood pressure, weight, mood</p>
                </div>
              </div>
            </WellnessCard>
          </div>
        </section>

        {/* Motivational Message */}
        <section>
          <WellnessCard className="bg-gradient-to-b from-blue-500 to-indigo-600 text-center py-8 rounded-2xl ">
            <div className="space-y-4 p-6">
              <h3 className="text-2xl font-heading font-semibold">
                🎉 Amazing progress this week!
              </h3>
              <p className="text-lg text-text-secondary">
                You've completed 6 out of 7 planned workouts. Keep up the fantastic work!
              </p>
              <Button className="btn-large bg-orange-400 hover:bg-black-hover">
                See Weekly Summary
              </Button>
            </div>
          </WellnessCard>
        </section>
      </main>

      <VoiceButton />
    </div>
  );
};

export default Dashboard;