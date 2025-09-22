import React from 'react';
import { Workout } from '../types/workout';

interface WorkoutListProps {
  workouts: Workout[];
}

const WorkoutList: React.FC<WorkoutListProps> = ({ workouts }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Workout List</h2>
      {workouts.length === 0 ? (
        <p className="text-gray-500">No workouts recorded for this day.</p>
      ) : (
        <div className="space-y-4">
          {workouts.map((workout) => (
            <div key={workout.date} className="border rounded p-4">
              <h3 className="font-semibold mb-2">Date: {workout.date}</h3>
              <ul className="space-y-2">
                {workout.exercises.map((exercise, exerciseIndex) => (
                  <li key={`${exercise.name}-${exerciseIndex}`} className="p-2 bg-gray-50 rounded">
                    <h4 className="font-medium">{exercise.name} ({exercise.type})</h4>
                    {exercise.type === 'reps' ? (
                      <>
                        <p>Target: {exercise.targetSets || 0} sets / {exercise.targetReps || 0} reps</p>
                        <p>Completed: {exercise.completedSets || 0} sets / {exercise.completedReps || 0} reps</p>
                      </>
                    ) : (
                      <>
                        <p>Target Weight: {exercise.targetWeight || 0} kg</p>
                        <p>Completed Weight: {exercise.completedWeight || 0} kg</p>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkoutList;