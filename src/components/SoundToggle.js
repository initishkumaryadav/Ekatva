import { Volume2, VolumeX } from 'lucide-react';
import { useSound } from '../contexts/SoundContext';

export default function SoundToggle() {
  const { enabled, setEnabled, playClick } = useSound();

  return (
    <button
      onClick={() => {
        if (enabled) playClick();
        setEnabled(!enabled);
      }}
      data-testid="sound-toggle"
      className="fixed bottom-20 right-4 z-50 w-10 h-10 rounded-full backdrop-blur-xl bg-black/60 border border-white/10 flex items-center justify-center text-white/40 hover:text-cyan-400 hover:border-cyan-400/30 transition-all duration-200"
      title={enabled ? 'Sound On' : 'Sound Off'}
    >
      {enabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
    </button>
  );
}
