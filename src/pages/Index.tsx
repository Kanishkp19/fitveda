import { Activity, Heart, TrendingUp, Users, Utensils, Dumbbell } from 'lucide-react';
import { WellnessCard } from '../components/WellnessCard';
import { VoiceButton } from '../components/VoiceButton';
import { Button } from '../components/ui/button';
import heroImage from '../assets/yoga.jpg';

const Index = () => {
  const dashboardItems = [
    {
      icon: <Dumbbell className="text-primary" />,
      title: "Today's Workout",
      description: "Gentle morning yoga routine",
      variant: 'gradient' as const
    },
    {
      icon: <Utensils className="text-secondary" />,
      title: "Meal Plan",
      description: "Healthy, tasty recipes",
      variant: 'default' as const
    },
    {
      icon: <TrendingUp className="text-accent" />,
      title: "Progress",
      description: "Track your journey",
      variant: 'default' as const
    },
    {
      icon: <Users className="text-primary" />,
      title: "Community",
      description: "Connect with others",
      variant: 'default' as const
    },
    {
      icon: <Heart className="text-secondary" />,
      title: "Health Check",
      description: "Monitor vitals",
      variant: 'default' as const
    },
    {
      icon: <Activity className="text-accent" />,
      title: "Challenges",
      description: "Fun fitness goals",
      variant: 'default' as const
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/60" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6">
            FitVeda
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-medium">
            Your Fitness, Your Way – Safe & Simple for 40+
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="btn-large bg-orange-400 hover:bg-blue-100 text-accent-foreground"
              onClick={() => window.location.href = '/dashboard'}
            >
              Get Started Today
            </Button>
            <Button 
              variant="outline" 
              className="btn-large border-white text-black hover:bg-blue-200 hover:text-primary"
              onClick={() => window.location.href = '/workout'}
            >
              Try a Workout
            </Button>
          </div>
        </div>
      </section>

      {/* Welcome Dashboard */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-semibold text-text-primary mb-4">
            Welcome back! Ready for your wellness journey?
          </h2>
          <p className="text-xl text-text-secondary">
            Choose what you'd like to focus on today
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {dashboardItems.map((item, index) => {
            const routes = ['/workout', '/dashboard', '/progress', '/community', '/dashboard', '/dashboard'];
            return (
              <WellnessCard
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
                variant={item.variant}
                className="nav-card min-h-[10rem] rounded-2xl p-6"
                onClick={() => window.location.href = routes[index]}
              />
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-b from-blue-100 to-indigo-200  rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-heading font-semibold mb-4">
            Need help getting started?
          </h3>
          <p className="text-lg text-text-secondary mb-6">
            Ask me anything about your fitness journey using the voice button
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="outline" className="btn-large">
              "What workout should I do?"
            </Button>
            <Button variant="outline" className="btn-large">
              "Show me healthy recipes"
            </Button>
            <Button variant="outline" className="btn-large">
              "How am I progressing?"
            </Button>
          </div>
        </div>
      </section>

      {/* Voice Assistant */}
      <VoiceButton />
    </div>
  );
};

export default Index;
