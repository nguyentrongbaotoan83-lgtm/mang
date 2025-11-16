
import React, { useState, useEffect } from 'react';
import { UserData, Scores, SessionData } from './types';
import LoginScreen from './components/LoginScreen';
import MainPractice from './components/MainPractice';
import FinalSummary from './components/FinalSummary';
import TeacherView from './components/TeacherView';

type AppState = 'login' | 'practice' | 'summary' | 'teacher';

const App: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(() => {
    const savedUser = localStorage.getItem('userData');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [appState, setAppState] = useState<AppState>('login');
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  useEffect(() => {
    if (userData) {
      if (userData.name === 'GVBM' && userData.className === 'GV') {
        setAppState('teacher');
      } else {
        setAppState('practice');
      }
    } else {
      setAppState('login');
    }
  }, [userData]);

  const handleLogin = (user: UserData) => {
    localStorage.setItem('userData', JSON.stringify(user));
    setUserData(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setUserData(null);
    setSessionData(null);
    setAppState('login');
  };

  const handleFinishSession = (scores: Scores) => {
    const totalScore = Object.values(scores).reduce((sum, s) => sum + s.score, 0);
    const totalTime = Object.values(scores).reduce((sum, s) => sum + s.time, 0);
    
    // FIX: Updated to match the new SessionData structure.
    setSessionData({
      scores,
      totalScore,
      totalTime,
      allFinished: true
    });
    setAppState('summary');
  };

  const handleRestartSession = () => {
    if (!window.confirm("Bạn có chắc muốn LÀM LẠI TỪ ĐẦU?")) return;
    setSessionData(null);
    setAppState('practice');
  };

  const renderContent = () => {
    switch (appState) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      case 'teacher':
        return <TeacherView onLogout={handleLogout} />;
      case 'practice':
        if (userData) {
          return <MainPractice userData={userData} onLogout={handleLogout} onFinishSession={handleFinishSession} />;
        }
        return <LoginScreen onLogin={handleLogin} />;
      case 'summary':
        // FIX: Update logic to pass correct props from the new SessionData structure.
        if (userData && sessionData && sessionData.totalScore !== undefined && sessionData.totalTime !== undefined) {
          return (
            <FinalSummary
              userData={userData}
              scores={sessionData.scores}
              totalTime={sessionData.totalTime}
              totalScore={sessionData.totalScore}
              onRestartSession={handleRestartSession}
            />
          );
        }
        // Fallback to practice if summary data is incomplete
        setAppState('practice');
        return null;
      default:
        return <LoginScreen onLogin={handleLogin} />;
    }
  };

  return <div className="min-h-screen bg-gray-50">{renderContent()}</div>;
};

export default App;