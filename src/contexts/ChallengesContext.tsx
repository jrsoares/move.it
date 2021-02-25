import {createContext, useState, ReactNode, useEffect} from 'react';
import challenges from '../../challenges.json';

type Challenge = {
  type: 'body' | 'eye';
  description: string;
  amount: number
}

type ChallengesContextData = {
    level: number;
    levelUp: () => void;
    currentExperience: number;
    startNewChallenge: () => void;
    challengesCompleted: number;
    activeChallenge: Challenge,
    resetChallenge: () => void;
    experienceToNextLevel: number;
    completedChallenge: () => void;
}

type ChallengesProviderProps = {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience ] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    },[])
  function levelUp() {
    setLevel( level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge)
      new Audio('/notification.mp3')
      if(Notification.permission === 'granted') {
          new Notification('Novo desafio 🥳',
              {
                  body: `Valendo ${challenge.amount}xp!`
              })
      }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completedChallenge() {
    if (!activeChallenge) {
        return;
    }

    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
        finalExperience = finalExperience - experienceToNextLevel;
        levelUp();
    }
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1)
  }

  return (
    <ChallengesContext.Provider value={{ 
        level,
        levelUp,
        currentExperience,
        startNewChallenge,
        challengesCompleted,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completedChallenge
      }}>
      {children}
    </ChallengesContext.Provider>
  )
}