
import React, { useState, useEffect, useRef } from 'react';
import { QuizActivityData } from '../types';
import { formatTime } from '../utils/formatTime';
import Button from './Button';
import Card from './Card';

interface QuizActivityProps {
  quiz: QuizActivityData;
  onComplete: (score: number, time: number, manualFinish?: boolean) => void;
  isLocked: boolean;
  attempts: number;
  onRestart: () => void;
}

const QuizActivity: React.FC<QuizActivityProps> = ({ quiz, onComplete, isLocked, attempts, onRestart }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const [localScore, setLocalScore] = useState(0);
  const [localTotalTime, setLocalTotalTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isLocked) {
      setIsRunning(true);
    }
  }, [isLocked]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setLocalTotalTime(prev => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const maxScore = quiz.questions.reduce((sum, q) => sum + q.score, 0);
  const isFinished = currentQuestionIndex === quiz.questions.length;

  const handleOptionSelect = (option: string) => {
    if (!isFeedbackVisible) {
      setSelectedOption(option);
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption) return;

    setIsFeedbackVisible(true);
    if (selectedOption === currentQuestion.answer) {
      setLocalScore(prev => prev + currentQuestion.score);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 === quiz.questions.length) {
      setIsRunning(false);
      onComplete(localScore, localTotalTime);
    }
    setSelectedOption(null);
    setIsFeedbackVisible(false);
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const handleRestartQuiz = () => {
    if (!window.confirm(`Bạn có chắc muốn LÀM LẠI HOẠT ĐỘNG ${quiz.id}? Mọi điểm đã đạt được sẽ bị xóa.`)) return;
    
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsFeedbackVisible(false);
    setLocalScore(0);
    setLocalTotalTime(0);
    setIsRunning(true);
    onRestart();
  };

  if (isLocked) {
    return (
      <Card className="min-h-[400px] relative flex items-center justify-center">
        <div className="locked-overlay">
          <p className="text-2xl font-bold text-gray-800 p-4 bg-white rounded-lg shadow-lg">
            🔒 Hoạt động này bị khóa. Vui lòng hoàn thành Hoạt động {quiz.id - 1} trước.
          </p>
        </div>
      </Card>
    );
  }

  if (isFinished) {
    return (
      <Card className="min-h-[400px] flex flex-col items-center justify-center text-center bg-green-50">
        <svg className="w-16 h-16 text-secondary mb-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <h3 className="text-3xl font-extrabold text-secondary mb-2">🎉 HOÀN THÀNH HOẠT ĐỘNG {quiz.id}</h3>
        <p className="text-xl text-gray-700 mb-6">
          Điểm đạt được: <span className="text-primary font-bold">{localScore}/{maxScore}</span> | Thời gian: <span className="text-primary font-bold">{formatTime(localTotalTime)}</span>
        </p>
        <div className="flex space-x-4">
          <Button onClick={handleRestartQuiz} type="danger">
            <span className="mr-2">🔄</span> Làm Lại Hoạt Động {quiz.id} (Lần: {attempts + 1})
          </Button>
          <Button onClick={() => onComplete(localScore, localTotalTime, true)} type="secondary">
            <span className="mr-2">➡️</span> Tiếp Tục
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="min-h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h4 className="text-xl font-bold text-gray-700">
          Câu hỏi <span className="text-primary">{currentQuestionIndex + 1}/{quiz.questions.length}</span>
        </h4>
        <div className="flex space-x-4">
          <span className="text-lg font-bold text-gray-700">⏳ {formatTime(localTotalTime)}</span>
          <span className="text-lg font-bold text-primary">Điểm: {localScore}</span>
        </div>
      </div>
      
      <p className="text-2xl font-semibold mb-8 text-gray-800">{currentQuestion.q}</p>
      
      <div className="grid md:grid-cols-2 gap-4 flex-grow">
        {currentQuestion.options.map((option, index) => {
          const isCorrect = option === currentQuestion.answer;
          const isSelected = selectedOption === option;
          let optionClass = "p-4 border rounded-xl cursor-pointer transition duration-200 text-lg font-medium";
          
          if (isFeedbackVisible) {
            if (isCorrect) optionClass += " bg-secondary border-secondary text-white shadow-lg scale-105";
            else if (isSelected && !isCorrect) optionClass += " bg-danger border-danger text-white shadow-lg";
            else optionClass += " bg-gray-100 text-gray-600 cursor-not-allowed";
          } else {
            if (isSelected) optionClass += " bg-primary border-primary text-white shadow-md";
            else optionClass += " bg-white hover:bg-indigo-50 border-gray-300";
          }

          return (
            <div
              key={index}
              className={optionClass}
              onClick={() => handleOptionSelect(option)}
            >
              <span className="font-extrabold mr-2">{String.fromCharCode(65 + index)}.</span> {option}
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-4 border-t flex justify-between items-center">
        <Button onClick={handleRestartQuiz} type="danger" className="py-2 px-4 text-sm shadow-none">
          Làm Lại Hoạt Động
        </Button>
        {isFeedbackVisible ? (
          <Button onClick={handleNextQuestion} type="secondary" className="w-48">
            {currentQuestionIndex + 1 === quiz.questions.length ? 'Hoàn thành' : 'Câu Tiếp Theo ➡️'}
          </Button>
        ) : (
          <Button onClick={handleSubmitAnswer} disabled={!selectedOption} className="w-48">
            Kiểm Tra
          </Button>
        )}
      </div>
    </Card>
  );
};

export default QuizActivity;