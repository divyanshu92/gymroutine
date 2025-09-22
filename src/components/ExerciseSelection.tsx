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
      let timer: NodeJS.Timeout;
      try {
        const startTime = new Date(JSON.parse(sessionStartTime)).getTime();
        timer = setInterval(() => {
          const elapsed = Math.floor((Date.now() - startTime) / 60000);
          setSessionTime(elapsed);
        }, 60000);
      } catch (error) {
        console.error('Invalid session start time:', error);
      }
      return () => timer && clearInterval(timer);
    }
  }, []);
  const exercises = DAILY_ROUTINES[selectedDay];
  const todayWorkout = workouts.find(w => w.date === selectedDate);
  const completedExercises = todayWorkout?.exercises.map(e => e.name) || [];

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <div className="bg-white shadow-sm z-10 safe-top flex-shrink-0">
        <div className="flex items-center justify-between max-w-sm mx-auto px-4 py-3">
          <button 
            onClick={onBack}
            className="p-3 bg-gray-100 rounded-2xl touch-action-manipulation active-scale"
          >
            ←
          </button>
          <div className="text-center flex-1">
            <h1 className="text-responsive-lg font-bold text-gray-800">{selectedDay}</h1>
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
      
      <div className="flex-1 overflow-hidden">
        <div className="h-full scroll-container px-6 safe-left safe-right">
          <div className="max-w-sm mx-auto space-y-3 pt-8 pb-40">
            {exercises.map((exercise) => {
              const isCompleted = completedExercises.includes(exercise.name);
              return (
                <button
                  key={exercise.name}
                  onClick={() => onExerciseSelect(exercise)}
                  className={`w-full p-4 rounded-2xl text-left shadow-sm touch-action-manipulation active-scale ${
                    isCompleted 
                      ? 'bg-green-50 border-2 border-green-200' 
                      : 'bg-white border-2 border-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1 min-w-0">
                      {exercise.gif && (
                        <img 
                          src={exercise.gif} 
                          alt={exercise.name}
                          className="w-12 h-12 rounded-xl mr-3 object-cover bg-gray-100 flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-800 text-responsive leading-tight truncate">{exercise.name}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {exercise.type === 'reps' ? 
                            ('targetReps' in exercise ? `${exercise.targetReps} reps` : 'Reps') : 
                            ('targetSets' in exercise ? `${exercise.targetSets} sets` : 'Weight')
                          }
                        </div>
                      </div>
                    </div>
                    {isCompleted && <span className="text-green-500 text-lg ml-2 flex-shrink-0">✓</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      
      <WorkoutHistory workouts={workouts} selectedDay={selectedDay} selectedDate={selectedDate} onBack={onBack} />
    </div>
  );
};

export default ExerciseSelection;