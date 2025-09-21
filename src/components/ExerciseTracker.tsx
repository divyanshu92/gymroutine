import React, { useState } from 'react';
import { Exercise } from '../types/workout';

interface ExerciseTrackerProps {
  exercise: any;
  onSave: (data: Exercise) => void;
  onBack: () => void;
}

const ExerciseTracker: React.FC<ExerciseTrackerProps> = ({ exercise, onSave, onBack }) => {
  const [sets, setSets] = useState<any[]>([]);
  const [currentSet, setCurrentSet] = useState(1);
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [customTargetReps, setCustomTargetReps] = useState<number | null>(null);
  const [showTargetEditor, setShowTargetEditor] = useState(false);

  const targetReps = customTargetReps || ('targetReps' in exercise ? exercise.targetReps : 0);
  const targetSets = 'targetSets' in exercise ? exercise.targetSets : 0;
  const totalRepsCompleted = sets.reduce((total, set) => total + (set.reps || 0), 0);
  const remainingReps = Math.max(0, targetReps - totalRepsCompleted);
  const remainingSets = Math.max(0, targetSets - sets.length);
  const isRepBased = exercise.type === 'reps' && targetReps > 0;
  const isWeightBased = exercise.type === 'weight' && targetSets > 0;

  const updateTargetReps = (newTarget: number) => {
    setCustomTargetReps(newTarget);
    setShowTargetEditor(false);
  };

  // Get previous workout data for this exercise
  const getPreviousWorkout = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Get last Monday
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    
    const previousWorkouts = JSON.parse(localStorage.getItem('workouts') || '[]');
    return previousWorkouts
      .filter((w: any) => new Date(w.date) < today)
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .find((w: any) => w.exercises.some((e: any) => e.name === exercise.name));
  };

  const previousWorkout = getPreviousWorkout();
  const previousExercise = previousWorkout?.exercises.find((e: any) => e.name === exercise.name);

  const addSet = () => {
    if (exercise.type === 'reps' && reps) {
      setSets([...sets, { set: currentSet, reps: Number(reps) }]);
      setCurrentSet(currentSet + 1);
      setReps('');
    } else if (exercise.type === 'weight' && weight) {
      setSets([...sets, { set: currentSet, weight: Number(weight) }]);
      setCurrentSet(currentSet + 1);
      setWeight('');
    }
  };

  const removeSet = (index: number) => {
    setSets(sets.filter((_, i) => i !== index));
    setCurrentSet(Math.max(1, currentSet - 1));
  };

  const handleSave = () => {
    const exerciseData: Exercise = {
      name: exercise.name,
      type: exercise.type,
      sets: sets,
      ...(exercise.type === 'reps' ? {
        completedSets: sets.length,
        completedReps: totalRepsCompleted
      } : {
        completedWeight: sets.length > 0 ? sets[sets.length - 1].weight : 0
      })
    };
    onSave(exerciseData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 bg-white shadow-sm z-10 safe-top">
        <div className="flex items-center max-w-sm mx-auto px-4 py-3">
          <button 
            onClick={onBack}
            className="p-3 bg-gray-100 rounded-2xl active:bg-gray-200 active:scale-95 transition-all duration-150 mr-4 touch-action-manipulation"
          >
            ←
          </button>
          <h1 className="text-responsive-lg font-bold text-gray-800 flex-1 truncate">{exercise.name}</h1>
        </div>
      </div>

      <div className="px-4 safe-left safe-right">
        <div className="max-w-sm mx-auto pt-4">
          {exercise.gif && (
            <div className="mb-6">
              <img 
                src={exercise.gif} 
                alt={exercise.name}
                className="w-full h-44 rounded-2xl object-cover bg-gray-100"
              />
            </div>
          )}

          {isRepBased && (
            <div className="mb-6 p-5 bg-blue-50 rounded-2xl">
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="text-responsive-xl font-bold text-blue-600">{totalRepsCompleted}/{targetReps}</div>
                  <button
                    onClick={() => setShowTargetEditor(!showTargetEditor)}
                    className="text-xs bg-blue-500 text-white px-3 py-2 rounded-full active:bg-blue-600 active:scale-95 transition-all duration-150 touch-action-manipulation"
                  >
                    Edit
                  </button>
                </div>
                {showTargetEditor && (
                  <div className="mb-4 flex items-center justify-center gap-2">
                    <input
                      type="number"
                      placeholder={targetReps.toString()}
                      className="w-20 p-3 border-2 rounded-xl text-center text-responsive touch-action-manipulation"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const newTarget = parseInt((e.target as HTMLInputElement).value);
                          if (newTarget > 0) updateTargetReps(newTarget);
                        }
                      }}
                    />
                    <button
                      onClick={() => setShowTargetEditor(false)}
                      className="text-xs bg-gray-500 text-white px-3 py-2 rounded-full active:scale-95 transition-all duration-150 touch-action-manipulation"
                    >
                      Cancel
                    </button>
                  </div>
                )}
                <div className="text-xs text-gray-600 mb-3">Total Reps</div>
                <div className="mb-4">
                  <div className="text-responsive font-semibold text-orange-600">{remainingReps} left</div>
                  <div className="text-xs text-gray-600">{sets.length} sets done</div>
                </div>
                <div className="bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (totalRepsCompleted / targetReps) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {isWeightBased && (
            <div className="mb-6 p-5 bg-green-50 rounded-2xl">
              <div className="text-center">
                <div className="text-responsive-xl font-bold text-green-600 mb-3">{sets.length}/{targetSets}</div>
                <div className="text-xs text-gray-600 mb-3">Sets Completed</div>
                <div className="mb-4">
                  <div className="text-responsive font-semibold text-orange-600">{remainingSets} sets left</div>
                </div>
                <div className="bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-green-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (sets.length / targetSets) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

      {previousExercise && (
        <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Previous Workout ({new Date(previousWorkout.date).toLocaleDateString()})</h3>
          {previousExercise.sets ? (
            <div className="space-y-1">
              {previousExercise.sets.map((set: any, index: number) => (
                <div key={index} className="text-sm text-gray-700">
                  Set {set.set}: {exercise.type === 'reps' ? `${set.reps} reps` : `${set.weight} kg`}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-700">
              {exercise.type === 'reps' ? 
                `${previousExercise.completedSets} sets, ${previousExercise.completedReps} total reps` :
                `Weight: ${previousExercise.completedWeight} kg`
              }
            </div>
          )}
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Add Set {currentSet}</h3>
        {previousExercise?.sets && previousExercise.sets[currentSet - 1] && (
          <div className="mb-2 p-2 bg-gray-100 rounded text-sm">
            Last time Set {currentSet}: {exercise.type === 'reps' ? 
              `${previousExercise.sets[currentSet - 1].reps} reps` : 
              `${previousExercise.sets[currentSet - 1].weight} kg`
            }
          </div>
        )}
            <div className="space-y-4">
              {exercise.type === 'reps' ? (
                <input
                  type="number"
                  placeholder={isRepBased ? `Reps (${remainingReps} left)` : "Reps"}
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl text-responsive-lg focus:border-blue-500 focus:outline-none touch-action-manipulation"
                />
              ) : (
                <input
                  type="number"
                  placeholder="Weight (kg)"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl text-responsive-lg focus:border-blue-500 focus:outline-none touch-action-manipulation"
                />
              )}
              <button
                onClick={addSet}
                className="w-full py-4 bg-blue-500 text-white rounded-2xl font-semibold text-responsive-lg active:bg-blue-600 active:scale-95 transition-all duration-150 touch-action-manipulation"
              >
                Add Set {currentSet}
              </button>
            </div>
      </div>

          <div className="mb-6">
            <h3 className="text-responsive font-semibold mb-4 text-gray-700">Completed Sets</h3>
            {sets.length === 0 ? (
              <p className="text-gray-500 text-center py-6 text-responsive">No sets completed yet</p>
            ) : (
              <div className="space-y-3">
                {sets.map((set, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-white rounded-2xl border border-gray-100">
                    <span className="text-responsive font-medium">
                      Set {set.set}: {exercise.type === 'reps' ? `${set.reps} reps` : `${set.weight} kg`}
                    </span>
                    <button
                      onClick={() => removeSet(index)}
                      className="text-red-500 p-2 active:text-red-700 active:scale-95 transition-all duration-150 touch-action-manipulation"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pb-8 safe-bottom">
            {sets.length > 0 && (
              <button
                onClick={handleSave}
                className={`w-full py-4 rounded-2xl text-white font-semibold text-responsive-lg transition-all duration-150 active:scale-95 touch-action-manipulation ${
                  (isRepBased && remainingReps === 0) || (isWeightBased && remainingSets === 0)
                    ? 'bg-green-500 active:bg-green-600' 
                    : 'bg-blue-500 active:bg-blue-600'
                }`}
              >
                {(isRepBased && remainingReps === 0) || (isWeightBased && remainingSets === 0) ? '🎉 Complete!' : 'Save Exercise'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseTracker;