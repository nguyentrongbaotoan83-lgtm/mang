
import React, { useState, useEffect } from 'react';
import { UserData, Scores } from '../types';
import { formatTime } from '../utils/formatTime';
import { quizData } from '../constants';
import Button from './Button';
import Card from './Card';
import Leaderboard from './Leaderboard';
// NOTE: Firebase service is not created as it requires setup.
// This component assumes a 'saveSubmission' function exists.
// To make this fully functional, create a services/firebaseService.ts
// with your Firebase config and functions.

interface FinalSummaryProps {
  userData: UserData;
  scores: Scores;
  totalTime: number;
  totalScore: number;
  onRestartSession: () => void;
}

const FinalSummary: React.FC<FinalSummaryProps> = ({ userData, scores, totalTime, totalScore, onRestartSession }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [saveStatus, setSaveStatus] = useState('Chưa nộp bài');
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [totalCorrect, setTotalCorrect] = useState(0);

  useEffect(() => {
    const totalQ = quizData.reduce((sum, q) => sum + q.questions.length, 0);
    const maxScore = quizData.reduce((sum, q) => sum + q.questions.reduce((s, c) => s + c.score, 0), 0);
    const avgScorePerQ = maxScore / totalQ;
    setTotalCorrect(Math.round(totalScore / avgScorePerQ));
  }, [totalScore]);

  const saveLocalSubmission = () => {
    const newSubmission = {
      name: userData.name,
      className: userData.className,
      totalScore: totalScore,
      totalTime: totalTime,
      timestamp: new Date().toISOString(),
      attempts: scores[1].attempts + scores[2].attempts + scores[3].attempts,
    };
    const storedData = JSON.parse(localStorage.getItem('local_submissions') || '[]');
    storedData.push(newSubmission);
    localStorage.setItem('local_submissions', JSON.stringify(storedData));
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    setSaveStatus('Đang lưu trữ...');
    
    // In a real app, you would call your Firebase service here.
    // e.g., await saveSubmission({ ... });
    setTimeout(() => { // Simulating API call
      try {
        saveLocalSubmission();
        setIsSaved(true);
        setSaveStatus('✅ Nộp bài thành công!');
      } catch (error) {
        console.error("Lỗi khi nộp bài: ", error);
        setSaveStatus(`❌ Lỗi nộp bài`);
        alert("Đã xảy ra lỗi khi nộp bài.");
      } finally {
        setIsSaving(false);
      }
    }, 1500);
  };
  
  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="text-center bg-gradient-to-br from-primary to-indigo-600 text-white">
        <svg className="w-20 h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.636-2.025a7.5 7.5 0 11-10.606 0 7.5 7.5 0 0110.606 0zm-1.06 1.06a6 6 0 10-8.484 0 6 6 0 008.484 0z"></path></svg>
        <h2 className="text-4xl font-extrabold mb-2">🥳 HOÀN THÀNH XUẤT SẮC!</h2>
        <p className="text-xl">Chúc mừng bạn, <span className="font-bold">{userData.name}</span>, đã hoàn thành tất cả các hoạt động.</p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card className="col-span-1 bg-secondary text-white text-center"><p className="text-5xl font-extrabold">{totalScore}</p><p className="text-lg mt-2 font-semibold">TỔNG ĐIỂM</p></Card>
        <Card className="col-span-1 bg-warning text-white text-center"><p className="text-5xl font-extrabold">{formatTime(totalTime)}</p><p className="text-lg mt-2 font-semibold">TỔNG THỜI GIAN</p></Card>
        <Card className="col-span-1 bg-primary text-white text-center"><p className="text-5xl font-extrabold">{totalCorrect}/12</p><p className="text-lg mt-2 font-semibold">TỔNG SỐ CÂU ĐÚNG</p></Card>
      </div>

      <Card className="mt-6">
        <h3 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Chi tiết từng hoạt động</h3>
        <div className="space-y-4">
          {/* FIX: Changed loop to use Object.keys for more reliable type inference. */}
          {Object.keys(scores).map((key) => {
            const item = scores[key];
            return (
              <div key={key} className="p-4 border rounded-xl bg-gray-50 flex justify-between items-center">
                <p className="font-bold text-lg text-primary">Hoạt động {key}</p>
                <div className="text-right">
                  <p>Điểm: <span className="font-extrabold text-secondary">{item.score}</span></p>
                  <p>Thời gian: <span className="font-extrabold">{formatTime(item.time)}</span></p>
                  <p>Làm lại: <span className="font-extrabold text-danger">{item.attempts} lần</span></p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="mt-8 flex justify-between items-center">
        <Button onClick={onRestartSession} type="ghost" className="bg-gray-300 text-gray-800 hover:bg-gray-400">🔄 Làm Lại Từ Đầu</Button>
        <div className="flex space-x-4">
          <Button onClick={() => setShowLeaderboard(true)} type="warning">🏆 Bảng Xếp Hạng</Button>
          <Button onClick={handleSubmit} disabled={isSaved || isSaving} type="primary" className="w-56">{isSaving ? 'Đang Nộp...' : isSaved ? 'ĐÃ NỘP BÀI' : '✅ Hoàn Thành & Nộp Bài'}</Button>
        </div>
      </div>
      <p className={`text-right mt-2 font-semibold ${isSaved ? 'text-secondary' : 'text-danger'}`}>{saveStatus}</p>
      <Leaderboard isOpen={showLeaderboard} onClose={() => setShowLeaderboard(false)} />
    </div>
  );
};

export default FinalSummary;