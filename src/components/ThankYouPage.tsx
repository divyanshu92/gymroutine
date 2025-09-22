import React from 'react';

interface ThankYouPageProps {
  selectedDay: string;
  selectedDate: string;
  onBack: () => void;
}

const ThankYouPage: React.FC<ThankYouPageProps> = ({ selectedDay, selectedDate, onBack }) => {
  return (
    <div className="h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center safe-top safe-bottom">
      <div className="max-w-sm mx-auto px-4 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold text-white mb-4">Great Job!</h1>
        <p className="text-xl text-white mb-2">You completed all exercises for</p>
        <p className="text-2xl font-bold text-white mb-8">{selectedDay}</p>
        <div className="text-white mb-8">
          {new Date(selectedDate).toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
        <button
          onClick={onBack}
          className="w-full py-4 bg-white text-green-600 rounded-2xl font-semibold text-lg shadow-lg touch-action-manipulation active-scale"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;