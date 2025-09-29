import { Users, Award, MessageCircle, Trophy, Heart } from 'lucide-react';
import { WellnessCard } from "../components/WellnessCard";
import { Button } from '../components/ui/button';
import { VoiceButton } from '../components/VoiceButton';

const Community = () => {
  const leaderboard = [
    { name: "Margaret K.", points: 2850, streak: 21, avatar: "👩‍🦳" },
    { name: "Robert S.", points: 2640, streak: 18, avatar: "👨‍🦲" },
    { name: "Sarah J.", points: 2420, streak: 15, avatar: "👩" },
    { name: "David M.", points: 2180, streak: 12, avatar: "👨" },
    { name: "Linda P.", points: 1950, streak: 9, avatar: "👵" }
  ];

  const challenges = [
    {
      title: "July Walking Challenge",
      description: "Walk 150,000 steps this month",
      participants: 234,
      progress: 75,
      daysLeft: 8
    },
    {
      title: "Morning Yoga Streak",
      description: "7 days of morning yoga",
      participants: 156,
      progress: 43,
      daysLeft: 4
    },
    {
      title: "Family Fitness",
      description: "Exercise with family members",
      participants: 89,
      progress: 60,
      daysLeft: 12
    }
  ];

  const communityPosts = [
    {
      author: "Margaret K.",
      time: "2 hours ago",
      content: "Just completed my 21st day of walking! Feeling stronger every day. Thank you all for the motivation! 💪",
      likes: 15,
      comments: 8
    },
    {
      author: "Dr. Maya Wellness",
      time: "4 hours ago",
      content: "Remember: consistency beats intensity. Even 10 minutes of movement daily makes a huge difference for your health!",
      likes: 42,
      comments: 12
    },
    {
      author: "Robert S.",
      time: "6 hours ago",
      content: "My grandson joined me for chair exercises today. It's never too late to inspire the next generation! 👨‍👦",
      likes: 28,
      comments: 6
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-heading font-bold mb-2">Community</h1>
          <p className="text-lg opacity-90">Connect, motivate, and achieve together</p>
        </div>
      </header>

      <main className="px-6 py-8 max-w-4xl mx-auto space-y-8">
        {/* Quick Stats */}
        <section>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <WellnessCard className="text-center p-4 rounded-2xl bg-green-100">
              <Users className="text-black mx-auto mb-2" size={24} />
              <div className="text-2xl font-bold">1,247</div>
              <div className="text-sm text-text-secondary">Active Members</div>
            </WellnessCard>
            <WellnessCard className="text-center p-4 rounded-2xl bg-blue-100">
              <Trophy className="text-black mx-auto mb-2" size={24} />
              <div className="text-2xl font-bold">15</div>
              <div className="text-sm text-text-secondary">Your Rank</div>
            </WellnessCard>
            <WellnessCard className="text-center p-4 rounded-2xl bg-yellow-100">
              <Award className="text-black mx-auto mb-2" size={24} />
              <div className="text-2xl font-bold">7</div>
              <div className="text-sm text-text-secondary">Day Streak</div>
            </WellnessCard>
            <WellnessCard className="text-center p-4 rounded-2xl bg-red-100">
              <Heart className="text-black mx-auto mb-2" size={24} />
              <div className="text-2xl font-bold">1,250</div>
              <div className="text-sm text-text-secondary">Total Points</div>
            </WellnessCard>
            </div>
        </section>

        {/* Active Challenges */}
        <section>
          <h2 className="text-2xl font-heading font-semibold mb-6 flex items-center gap-3">
            <Trophy className="text-accent" />
            Active Challenges
          </h2>
          
          <div className="space-y-4 ">
            {challenges.map((challenge, index) => (
              <WellnessCard key={index} className="p-6 rounded-2xl bg-blue-100">
                <div className="flex justify-between items-start mb-4 rounded-2xl" >
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{challenge.title}</h3>
                    <p className="text-text-secondary">{challenge.description}</p>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-medium">{challenge.daysLeft} days left</div>
                    <div className="text-text-secondary">{challenge.participants} participants</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{challenge.progress}%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-3">
                  <div
  className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full"
  style={{ width: `${challenge.progress}%` }}
/>

                  </div>
                </div>
                
                <Button className="w-full bg-primary hover:bg-primary-hover">
                  Join Challenge
                </Button>
              </WellnessCard>
            ))}
          </div>
        </section>

        {/* Leaderboard */}
        <section>
          <h2 className="text-2xl font-heading font-semibold mb-6 flex items-center gap-3">
            <Award className="text-secondary" />
            Weekly Leaderboard
          </h2>
          
          <WellnessCard className="p-6">
            <div className="space-y-4">
              {leaderboard.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-2xl hover:bg-primary/5">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl w-8 text-center">
                      {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                    </div>
                    <div className="text-3xl">{member.avatar}</div>
                    <div>
                      <div className="font-semibold">{member.name}</div>
                      <div className="text-sm text-text-secondary">
                        {member.streak} day streak
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{member.points.toLocaleString()}</div>
                    <div className="text-sm text-text-secondary">points</div>
                  </div>
                </div>
              ))}
            </div>
          </WellnessCard>
        </section>

        {/* Community Feed */}
        <section>
          <h2 className="text-2xl font-heading font-semibold mb-6 flex items-center gap-3">
            <MessageCircle className="text-primary" />
            Community Feed
          </h2>
          
          <div className="space-y-4">
            {communityPosts.map((post, index) => (
              <WellnessCard key={index} className="p-6 rounded-2xl bg-orange-100">
                <div className="flex justify-between items-start mb-3">
                  <div className="font-semibold">{post.author}</div>
                  <div className="text-sm text-text-secondary">{post.time}</div>
                </div>
                
                <p className="text-text-primary mb-4 leading-relaxed">{post.content}</p>
                
                <div className="flex items-center gap-6 text-sm text-text-secondary">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-primary">
                    <Heart size={16} />
                    <span>{post.likes} likes</span>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer hover:text-primary">
                    <MessageCircle size={16} />
                    <span>{post.comments} comments</span>
                  </div>
                </div>
              </WellnessCard>
            ))}
          </div>
        </section>

        {/* Join Community CTA */}
        <section>
          <WellnessCard className="bg-gradient-to-r from-green-200 via-blue-100  text-center p-8 rounded-2xl">
            <div className="space-y-4">
              <h3 className="text-2xl font-heading font-semibold">
                Share Your Journey!
              </h3>
              <p className="text-lg text-text-secondary">
                Post about your progress, motivate others, and get support from the community
              </p>
              <Button className="btn-large bg-primary hover:bg-primary-hover">
                Share an Update
              </Button>
            </div>
          </WellnessCard>
        </section>
      </main>

      <VoiceButton />
    </div>
  );
};

export default Community;