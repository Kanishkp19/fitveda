import { Mic, MicOff } from 'lucide-react';
import { useState, useEffect } from 'react';
// import { useToast } from '@/hooks/use-toast';

// Type definitions for Speech Recognition API
interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: () => void;
  onend: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: {
      new(): SpeechRecognition;
    };
    webkitSpeechRecognition: {
      new(): SpeechRecognition;
    };
  }
}

export const VoiceButton = () => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
//   const { toast } = useToast();

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        handleVoiceCommands(command);
      };
      
      recognitionInstance.onerror = () => {
        setIsListening(false);
        // toast({
        //   title: "Voice command failed",
        //   description: "Please try again or check your microphone",
        //   variant: "destructive",
        // });
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }
  }, []);

  const handleVoiceCommands = (command: string) => {
    if (command.includes('workout') || command.includes('exercise')) {
      window.location.href = '/workout';
    //   toast({
    //     title: "Voice command received",
    //     description: "Taking you to workouts!",
    //   });
    } else if (command.includes('progress') || command.includes('track')) {
      window.location.href = '/progress';
    //   toast({
    //     title: "Voice command received", 
    //     description: "Opening your progress!",
    //   });
    } else if (command.includes('dashboard') || command.includes('home')) {
      window.location.href = '/dashboard';
    //   toast({
    //     title: "Voice command received",
    //     description: "Going to dashboard!",
    //   });
    } else {
    //   toast({
    //     title: "Command not recognized",
    //     description: `You said: "${command}". Try saying "workout", "progress", or "dashboard"`,
    //   });
    }
  };

  const handleVoiceCommand = () => {
    if (!recognition) {
    //   toast({
    //     title: "Voice commands not supported",
    //     description: "Your browser doesn't support voice commands",
    //     variant: "destructive",
    //   });
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    //   toast({
    //     title: "Listening...",
    //     description: "Say a command like 'workout', 'progress', or 'dashboard'",
    //   });
    }
  };

  return (
    <button
      onClick={handleVoiceCommand}
      className={`voice-btn ${isListening ? 'animate-pulse' : ''}`}
      aria-label="Voice command"
      title="Ask me anything about your fitness!"
    >
      {isListening ? <MicOff size={24} /> : <Mic size={24} />}
    </button>
  );
};