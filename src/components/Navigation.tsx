import { Heart, Home, User, Settings } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Heart, label: 'Health', path: '/health' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border px-4 py-2 md:hidden">
      <div className="flex justify-around">
        {navItems.map(({ icon: Icon, label, path }) => (
          <a
            key={path}
            href={path}
            className={`flex flex-col items-center py-2 px-3 rounded-xl transition-[var(--transition-smooth)] ${
              location.pathname === path 
                ? 'text-primary bg-primary/10' 
                : 'text-text-secondary hover:text-primary'
            }`}
          >
            <Icon size={24} />
            <span className="text-xs mt-1 font-medium">{label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};