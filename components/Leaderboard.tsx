
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Button from './Button';
import { formatTime } from '../utils/formatTime';
import { LocalSubmission } from '../types';

interface LeaderboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ isOpen, onClose }) => {
  const [localSubmissions, setLocalSubmissions] = useState<LocalSubmission[]>([]);

  useEffect(() => {
    if (isOpen) {
      const storedData: LocalSubmission[] = JSON.parse(localStorage.getItem('local_submissions') || '[]');
      const sortedData = storedData.sort((a, b) => {
        if (b.totalScore !== a.totalScore) {
          return b.totalScore - a.totalScore;
        }
        return a.totalTime - b.totalTime;
      });
      setLocalSubmissions(sortedData);
    }
  }, [isOpen]);

  const handleClearHistory = () => {
    if (window.confirm('Bạn có chắc muốn xóa toàn bộ lịch sử làm bài cá nhân?')) {
      localStorage.removeItem('local_submissions');
      setLocalSubmissions([]);
      alert('Lịch sử đã được xóa thành công!');
    }
  };

  return (
    <Modal title="🏆 Bảng Xếp Hạng Cá Nhân" isOpen={isOpen} onClose={onClose}>
      <p className="text-gray-600 mb-4">Dữ liệu được lưu trữ trên trình duyệt của bạn. Đây là thành tích cá nhân của bạn qua các lần làm bài.</p>
      {localSubmissions.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p>Chưa có dữ liệu làm bài nào được lưu trên thiết bị này.</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto mb-4 max-h-96">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Hạng</th>
                  <th className="px-3 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Họ và Tên</th>
                  <th className="px-3 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Điểm số</th>
                  <th className="px-3 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">T.Gian H.Thành</th>
                  <th className="px-3 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Ngày Làm Bài</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {localSubmissions.map((sub, index) => (
                  <tr key={index} className={index < 3 ? 'bg-yellow-50 font-semibold' : ''}>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1} {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : ''}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{sub.name} - {sub.className}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-lg text-primary font-extrabold">{sub.totalScore}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{formatTime(sub.totalTime)}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(sub.timestamp).toLocaleDateString('vi-VN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={handleClearHistory} type="danger">Xóa Lịch Sử</Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default Leaderboard;
