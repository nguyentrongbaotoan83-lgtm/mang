
import React, { useState, useEffect } from 'react';
import { FirestoreSubmission } from '../types';
import { formatTime } from '../utils/formatTime';
import Button from './Button';
import Card from './Card';
// NOTE: Firebase service is not created as it requires setup.
// This component assumes a 'listenForSubmissions' function exists.
// To make this fully functional, create a services/firebaseService.ts
// with your Firebase config and functions that returns a cleanup function.

interface TeacherViewProps {
  onLogout: () => void;
}

const TeacherView: React.FC<TeacherViewProps> = ({ onLogout }) => {
  const [submissions, setSubmissions] = useState<FirestoreSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would call your Firebase service here.
    // e.g., const unsubscribe = listenForSubmissions((data) => { ... });
    // return () => unsubscribe();
    
    // Simulating data fetching
    setLoading(true);
    setTimeout(() => {
        // This is mock data. In a real app, this would come from Firestore.
        const mockData: FirestoreSubmission[] = [
            { id: '1', name: 'Nguyễn Văn A', className: '12A1', totalScore: 110, totalCorrect: 11, totalTime: 185, attempts: 0, submissionTime: { toDate: () => new Date() }, activity1: { score: 40, time: 60, attempts: 0, finished: true }, activity2: { score: 40, time: 65, attempts: 0, finished: true }, activity3: { score: 30, time: 60, attempts: 0, finished: true } },
            { id: '2', name: 'Trần Thị B', className: '12A2', totalScore: 90, totalCorrect: 9, totalTime: 250, attempts: 1, submissionTime: { toDate: () => new Date() }, activity1: { score: 30, time: 80, attempts: 1, finished: true }, activity2: { score: 40, time: 80, attempts: 0, finished: true }, activity3: { score: 20, time: 90, attempts: 0, finished: true } },
        ];
        mockData.sort((a, b) => {
          if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
          return a.totalTime - b.totalTime;
        });
        setSubmissions(mockData);
        setLoading(false);
    }, 1000);

  }, []);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="flex justify-between items-center bg-white p-6 rounded-xl shadow-lg mb-6">
        <h1 className="text-3xl font-extrabold text-danger">👨‍🏫 TRANG QUẢN LÝ GIÁO VIÊN</h1>
        <Button onClick={onLogout} type="danger" className="py-2 px-4 text-sm">Đăng Xuất GV</Button>
      </header>
      
      <Card>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Bảng Thống Kê Kết Quả Làm Bài</h2>
        {loading ? (
          <p className="text-center py-10 text-xl text-primary">Đang tải dữ liệu...</p>
        ) : submissions.length === 0 ? (
          <p className="text-center py-10 text-xl text-gray-500">Chưa có học sinh nào nộp bài.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Hạng</th>
                  <th className="px-3 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Họ và Tên</th>
                  <th className="px-3 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Lớp</th>
                  <th className="px-3 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Điểm Số</th>
                  <th className="px-3 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Câu Đúng</th>
                  <th className="px-3 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">T.Gian H.Thành</th>
                  <th className="px-3 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">T.Gian Nộp Bài</th>
                  <th className="px-3 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Số Lần Chơi Lại</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submissions.map((sub, index) => (
                  <tr key={sub.id} className={index < 3 ? 'bg-yellow-50' : ''}>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sub.name}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{sub.className}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-lg font-extrabold text-secondary">{sub.totalScore}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-primary font-bold">{sub.totalCorrect}/12</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{formatTime(sub.totalTime)}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{sub.submissionTime ? new Date(sub.submissionTime.toDate()).toLocaleString('vi-VN') : 'N/A'}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-danger font-bold">{sub.attempts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TeacherView;
