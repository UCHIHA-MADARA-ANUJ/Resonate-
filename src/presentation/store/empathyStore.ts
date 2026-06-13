import { create } from 'zustand';

interface EmpathyState {
  currentMoodScore: number;
  activeDistortions: string[];
  resonancePoints: number;
  updateMood: (score: number) => void;
  addDistortion: (distortion: string) => void;
  clearDistortions: () => void;
  awardPoints: (pts: number) => void;
}

export const useEmpathyStore = create<EmpathyState>((set) => ({
  currentMoodScore: 0,
  activeDistortions: [],
  resonancePoints: 120,
  
  updateMood: (score) => set({ currentMoodScore: score }),
  
  addDistortion: (distortion) => set((state) => ({ 
    activeDistortions: [...new Set([...state.activeDistortions, distortion])] 
  })),
  
  clearDistortions: () => set({ activeDistortions: [] }),
  
  awardPoints: (pts) => set((state) => ({ 
    resonancePoints: state.resonancePoints + pts 
  }))
}));
