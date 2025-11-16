
import React, { useState, useEffect } from 'react';
// FIX: Add ActivityScore to import
import { UserData, Scores, ActivityScore } from '../types';
import { quizData } from '../constants';
import { formatTime } from '../utils/formatTime';
import Button from './Button';
import Card from './Card';
import QuizActivity from './QuizActivity';

interface MainPracticeProps {
  userData: UserData;
  onLogout: () => void;
  onFinishSession: (scores: Scores) => void;
}

const MainPractice: React.FC<MainPracticeProps> = ({ userData, onLogout, onFinishSession }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [scores, setScores] = useState<Scores>({
    1: { score: 0, time: 0, attempts: 0, finished: false },
    2: { score: 0, time: 0, attempts: 0, finished: false },
    3: { score: 0, time: 0, attempts: 0, finished: false },
  });

  useEffect(() => {
    // FIX: Add explicit type to `s` to fix inference issue.
    const allFinished = Object.values(scores).every((s: ActivityScore) => s.finished);
    if (allFinished) {
      onFinishSession(scores);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scores]);

  const handleCompleteActivity = (activityId: number, score: number, time: number, manualFinish = false) => {
    setScores(prev => ({
      ...prev,
      [activityId]: {
        ...prev[activityId],
        score: score,
        time: time,
        finished: true,
      }
    }));
    if (activityId < 3 && manualFinish) {
      setActiveTab(activityId + 1);
    }
  };

  const handleRestartActivity = (activityId: number) => {
    setScores(prev => ({
      ...prev,
      [activityId]: {
        score: 0,
        time: 0,
        attempts: prev[activityId].attempts + 1,
        finished: false,
      }
    }));
    setActiveTab(activityId);
  };

  const tabItems = [
    { id: 1, name: 'Hoạt động 1: Hub & Switch' },
    { id: 2, name: 'Hoạt động 2: WAP & Router' },
    { id: 3, name: 'Hoạt động 3: Modem & Kết nối' },
  ];

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="flex justify-between items-center bg-white p-6 rounded-xl shadow-lg mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-primary">🖥️ LUYỆN TẬP THIẾT BỊ MẠNG</h1>
          <p className="text-gray-600 mt-1">Chào, <span className="font-bold text-secondary">{userData.name}</span>! Lớp: <span className="font-bold">{userData.className}</span></p>
        </div>
        <Button onClick={onLogout} type="ghost" className="py-2 px-4 text-sm">
          Đăng Xuất
        </Button>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1 p-0">
          <nav>
            {tabItems.map(tab => {
              const isLocked = tab.id > 1 && !scores[tab.id - 1].finished;
              const isActive = activeTab === tab.id;
              const isCompleted = scores[tab.id].finished;
              
              let tabClass = "w-full text-left p-4 font-semibold transition duration-200 flex justify-between items-center";
              if (isActive) tabClass += " bg-primary text-white rounded-t-xl";
              else if (isCompleted) tabClass += " bg-green-100 hover:bg-green-200 text-secondary";
              else if (isLocked) tabClass += " bg-gray-100 text-gray-400 cursor-not-allowed";
              else tabClass += " bg-white hover:bg-indigo-50 text-gray-700";

              return (
                <button
                  key={tab.id}
                  className={tabClass}
                  onClick={() => !isLocked && setActiveTab(tab.id)}
                  disabled={isLocked}
                >
                  {tab.name}
                  {isCompleted && <span className="text-xl">✅</span>}
                  {isLocked && <span className="text-xl">🔒</span>}
                </button>
              );
            })}
          </nav>
        </Card>

        <div className="md:col-span-3">
          {tabItems.map(tab => (
            <div key={tab.id} className={activeTab === tab.id ? 'block' : 'hidden'}>
              <h2 className="text-2xl font-extrabold text-gray-800 mb-4">{tab.name}</h2>
              <QuizActivity 
                quiz={quizData.find(q => q.id === tab.id)!}
                onComplete={(score, time, manualFinish) => handleCompleteActivity(tab.id, score, time, manualFinish)}
                isLocked={tab.id > 1 && !scores[tab.id - 1].finished}
                attempts={scores[tab.id].attempts}
                onRestart={() => handleRestartActivity(tab.id)}
              />
              <Card className="mt-4 p-4 text-sm text-gray-700">
                <p>✨ **Thống kê Hoạt động {tab.id}:**</p>
                <p>- Số lần làm lại: <span className="font-bold text-warning">{scores[tab.id].attempts}</span></p>
                <p>- Điểm cao nhất đạt được: <span className="font-bold text-primary">{scores[tab.id].score}</span></p>
                <p>- Thời gian tốt nhất: <span className="font-bold text-secondary">{formatTime(scores[tab.id].time)}</span></p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPractice;