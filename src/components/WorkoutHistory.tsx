import React from 'react';
import { Workout } from '../types/workout';

interface WorkoutHistoryProps {
  workouts: Workout[];
  selectedDay: string;
  selectedDate: string;
  onBack: () => void;
}

const WorkoutHistory: React.FC<WorkoutHistoryProps> = ({ workouts, selectedDay, selectedDate, onBack }) => {
  const selectedWorkout = workouts.find(w => w.date === selectedDate);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg safe-bottom">
      <div className="max-w-sm mx-auto px-4 py-3 max-h-36 overflow-y-auto">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-xs text-gray-700">Today's Progress</h3>
          <span className="text-xs text-gray-500">{new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </div>
        
        {!selectedWorkout || selectedWorkout.exercises.length === 0 ? (
          <p className="text-gray-400 text-xs text-center py-3">No exercises completed</p>
        ) : (
          <div className="space-y-2">
            {selectedWorkout.exercises.map((exercise, index) => (
              <div key={index} className="text-xs p-3 bg-gray-50 rounded-xl">
                <div className="font-medium text-gray-800 truncate">{exercise.name}</div>
                <div className="text-gray-500 mt-1">
                  {exercise.type === 'reps' ? (
                    `${exercise.completedSets} sets • ${exercise.completedReps} reps`
                  ) : (
                    `${exercise.completedWeight} kg`
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutHistory;