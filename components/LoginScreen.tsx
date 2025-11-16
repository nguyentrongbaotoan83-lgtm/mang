
import React, { useState } from 'react';
import { UserData } from '../types';
import Button from './Button';
import Card from './Card';

interface LoginScreenProps {
  onLogin: (user: UserData) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  
  const handleLogin = () => {
    if (name.trim() && className.trim()) {
      onLogin({ name: name.trim(), className: className.trim() });
    } else {
      alert('Vui lòng nhập đầy đủ Họ và tên và Lớp.');
    }
  };

  const isFormValid = name.trim() && className.trim();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="max-w-md w-full text-center p-10 bg-gradient-to-br from-white to-indigo-50">
        <h2 className="text-4xl font-extrabold text-primary mb-2">🚀 KHỞI ĐỘNG LUYỆN TẬP</h2>
        <p className="text-gray-600 mb-8">Ôn tập Bài 3: Mạng máy tính và Internet</p>
        
        <div className="space-y-6">
          <input
            type="text"
            placeholder="Họ và Tên (Ví dụ: Nguyễn Văn A)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 border-2 border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
          />
          <input
            type="text"
            placeholder="Lớp (Ví dụ: 12A1)"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="w-full p-4 border-2 border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
          />
        </div>

        <Button 
          onClick={handleLogin} 
          disabled={!isFormValid}
          className="mt-8 w-full text-xl py-4"
        >
          Bắt Đầu Luyện Tập
        </Button>
        <p className="text-sm text-gray-500 mt-4">Nhập "GVBM" và "GV" để truy cập trang quản lý.</p>
      </Card>
    </div>
  );
};

export default LoginScreen;
