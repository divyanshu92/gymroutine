import React from 'react';
import { DAILY_ROUTINES, Workout } from '../types/workout';
import WorkoutHistory from './WorkoutHistory';

interface ExerciseSelectionProps {
  selectedDay: keyof typeof DAILY_ROUTINES;
  selectedDate: string;
  onExerciseSelect: (exercise: any) => void;
  onBack: () => void;
  workouts: Workout[];
}

const ExerciseSelection: React.FC<ExerciseSelectionProps> = ({ 
  selectedDay, 
  selectedDate,
  onExerciseSelect, 
  onBack,
  workouts
}) => {
  const [sessionTime, setSessionTime] = React.useState(0);
  
  React.useEffect(() => {
    const sessionStartTime = localStorage.getItem('sessionStartTime');
    if (sessionStartTime) {
      const timer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - new Date(JSON.parse(sessionStartTime)).getTime()) / 60000);
        setSessionTime(elapsed);
      }, 60000);
      return () => clearInterval(timer);
    }
  }, []);
  const exercises = DAILY_ROUTINES[selectedDay];
  const todayWorkout = workouts.find(w => w.date === selectedDate);
  const completedExercises = todayWorkout?.exercises.map(e => e.name) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 bg-white shadow-sm z-10 p-4">
        <div className="flex items-center justify-between max-w-sm mx-auto">
          <button 
            onClick={onBack}
            className="p-3 bg-gray-100 rounded-xl active:bg-gray-200"
          >
            ← Back
          </button>
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-800">{selectedDay}</h1>
            <div className="text-xs text-gray-500">
              {new Date(selectedDate).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
            {sessionTime > 0 && (
              <div className="text-xs text-blue-600 font-semibold">
                {sessionTime}min
              </div>
            )}
          </div>
          <div className="w-12"></div>
        </div>
      </div>
      
      <div className="p-4 pb-32">
        <div className="max-w-sm mx-auto space-y-3">
          {exercises.map((exercise, index) => {
            const isCompleted = completedExercises.includes(exercise.name);
            return (
              <button
                key={index}
                onClick={() => onExerciseSelect(exercise)}
                className={`w-full p-4 rounded-xl transition-colors text-left shadow-sm ${
                  isCompleted 
                    ? 'bg-green-50 border-2 border-green-200' 
                    : 'bg-white border-2 border-gray-100 active:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    {exercise.gif && (
                      <img 
                        src={exercise.gif} 
                        alt={exercise.name}
                        className="w-14 h-14 rounded-lg mr-3 object-cover bg-gray-100"
                      />
                    )}
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 text-sm leading-tight">{exercise.name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {exercise.type === 'reps' ? 
                          ('targetReps' in exercise ? `${exercise.targetReps} reps` : 'Reps') : 
                          ('targetSets' in exercise ? `${exercise.targetSets} sets` : 'Weight')
                        }
                      </div>
                    </div>
                  </div>
                  {isCompleted && <span className="text-green-500 text-xl ml-2">✓</span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
      <WorkoutHistory workouts={workouts} selectedDay={selectedDay} selectedDate={selectedDate} onBack={onBack} />
    </div>
  );
};

export default ExerciseSelection;