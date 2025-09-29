import { Play, Pause, RotateCcw, Volume2, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { WellnessCard } from '@/components/WellnessCard';
import { Button } from '@/components/ui/button';
import { VoiceButton } from '@/components/VoiceButton';
// import { useToast } from '@/hooks/use-toast';

const Workout = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [heartRate, setHeartRate] = useState(72);
  const totalTime = 1200; // 20 minutes in seconds
  // const { toast } = useToast();

  // Timer functionality
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying && currentTime < totalTime) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          // Change step every ~3.3 minutes (200 seconds)
          const newStepIndex = Math.floor(newTime / 200);
          if (newStepIndex !== currentStepIndex && newStepIndex < currentWorkout.steps.length) {
            setCurrentStepIndex(newStepIndex);
            // Voice guidance for step change
            if ('speechSynthesis' in window) {
              const utterance = new SpeechSynthesisUtterance(
                `Now starting: ${currentWorkout.steps[newStepIndex]}`
              );
              speechSynthesis.speak(utterance);
            }
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, currentStepIndex]);

  // Simulate heart rate changes during workout
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setHeartRate(() => {
          const variation = Math.random() * 10 - 5; // ±5 BPM variation
          const baseRate = 75 + (currentTime / totalTime) * 20; // Increase with workout
          return Math.round(Math.max(60, Math.min(100, baseRate + variation)));
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentTime]);

  const workoutRoutines = [
    {
      title: "Gentle Morning Yoga",
      duration: "20 mins",
      difficulty: "Beginner",
      description: "Perfect start to your day with gentle stretches",
      category: "Flexibility"
    },
    {
      title: "Chair Exercises",
      duration: "15 mins",
      difficulty: "Beginner",
      description: "Safe workout you can do sitting down",
      category: "Strength"
    },
    {
      title: "Walking Meditation",
      duration: "25 mins",
      difficulty: "Easy",
      description: "Combine gentle movement with mindfulness",
      category: "Cardio"
    },
    {
      title: "Balance & Stability",
      duration: "12 mins",
      difficulty: "Beginner",
      description: "Improve coordination and prevent falls",
      category: "Balance"
    }
  ];

  const currentWorkout = {
    title: "Gentle Morning Yoga",
    instructor: "Dr. Maya Wellness",
    currentStep: "Cat-Cow Stretch",
    nextStep: "Child's Pose",
    steps: [
      "Welcome & Breathing (2 min)",
      "Neck & Shoulder Rolls (3 min)", 
      "Cat-Cow Stretch (4 min)",
      "Child's Pose (3 min)",
      "Gentle Twists (4 min)",
      "Final Relaxation (4 min)"
    ]
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / totalTime) * 100;

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // toast({
    //   title: isPlaying ? "Workout Paused" : "Workout Started",
    //   description: isPlaying ? "Take a break when you need it!" : "Great job staying active!",
    // });
  };

  const handleRestart = () => {
    setCurrentTime(0);
    setCurrentStepIndex(0);
    setIsPlaying(false);
    // toast({
    //   title: "Workout Restarted",
    //   description: "Starting fresh from the beginning!",
    // });
  };

  const handleVolumeToggle = () => {
    // toast({
    //   title: "Audio Settings",
    //   description: "Voice guidance toggled",
    // });
  };

  const startWorkout = (_workoutName: string) => {
    // toast({
    //   title: `Starting ${_workoutName}`,
    //   description: "Remember to listen to your body and take breaks as needed!",
    // });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-heading font-bold mb-2">Workout Center</h1>
          <p className="text-lg opacity-90">Choose activities that feel right for you today</p>
        </div>
      </header>

      <main className="px-6 py-8 max-w-4xl mx-auto space-y-8">
        {/* Current Workout Player */}
        <section>
          <WellnessCard className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-heading font-semibold mb-2 ">
                {currentWorkout.title}
              </h2>
              <p className="text-text-secondary ">with {currentWorkout.instructor}</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-text-secondary mb-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(totalTime)}</span>
              </div>
              <div className="w-full bg-border rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Current Step */}
            <div className="text-center mb-6">
              <div className="bg-primary/10 rounded-2xl p-6 mb-4">
                <h3 className="text-xl font-semibold mb-2 ">
                  Current: {currentWorkout.steps[currentStepIndex]}
                </h3>
                <p className="text-text-secondary ">
                  {currentStepIndex < currentWorkout.steps.length - 1 
                    ? `Next up: ${currentWorkout.steps[currentStepIndex + 1]}`
                    : "Final step - you're almost done!"
                  }
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4 mb-6">
              <Button 
                variant="outline" 
                size="lg"
                className="rounded-full w-16 h-16"
                onClick={handleRestart}
              >
                <RotateCcw size={24} />
              </Button>
              
              <Button 
                className="rounded-full w-20 h-20 bg-primary hover:bg-primary-hover"
                onClick={handlePlayPause}
              >
                {isPlaying ? <Pause size={32} /> : <Play size={32} />}
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="rounded-full w-16 h-16"
                onClick={handleVolumeToggle}
              >
                <Volume2 size={24} />
              </Button>
            </div>

            {/* Workout Steps */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {currentWorkout.steps.map((step, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-xl text-center text-sm ${
                    index === currentStepIndex ? 'bg-primary text-primary-foreground' : 
                    index < currentStepIndex ? 'bg-success text-success-foreground' : 'bg-surface border'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
          </WellnessCard>
        </section>

        {/* Health Monitoring */}
        <section>
          <WellnessCard className="bg-gradient-to-r from-secondary/10 to-accent/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Heart className="text-secondary" size={32} />
                <div>
                  <h3 className="font-semibold text-lg">Heart Rate Monitor</h3>
                  <p className="text-text-secondary">Keep track during exercise</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-secondary">{heartRate} BPM</div>
                <div className={`text-sm ${heartRate > 85 ? 'text-warning' : 'text-success'}`}>
                  {heartRate > 85 ? 'Elevated - take it easy' : 'Normal range'}
                </div>
              </div>
            </div>
          </WellnessCard>
        </section>

        {/* Available Workouts */}
        <section>
          <h2 className="text-2xl font-heading font-semibold mb-6">
            More Workouts for You
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workoutRoutines.map((routine, index) => (
              <WellnessCard key={index} className="cursor-pointer hover:scale-105">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{routine.title}</h3>
                    <p className="text-text-secondary text-sm">{routine.description}</p>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-medium">{routine.duration}</div>
                    <div className="text-text-secondary">{routine.difficulty}</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {routine.category}
                  </span>
                  <Button 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => startWorkout(routine.title)}
                  >
                  Start
                  </Button>
                </div>
              </WellnessCard>
            ))}
          </div>
        </section>
      </main>

      <VoiceButton />
    </div>
  );
};

export default Workout;