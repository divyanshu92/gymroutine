import React, { useState } from 'react';
import DaySelection from './components/DaySelection';
import ExerciseSelection from './components/ExerciseSelection';
import ExerciseTracker from './components/ExerciseTracker';
import useLocalStorage from './hooks/useLocalStorage';
import { Workout, Exercise, DAILY_ROUTINES } from './types/workout';

type Page = 'daySelection' | 'exerciseSelection' | 'exerciseTracker';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useLocalStorage<Page>('currentPage', 'daySelection');
  const [selectedDay, setSelectedDay] = useLocalStorage<keyof typeof DAILY_ROUTINES>('selectedDay', 'Monday');
  const [selectedDate, setSelectedDate] = useLocalStorage<string>('selectedDate', new Date().toISOString().split('T')[0]);
  const [selectedExercise, setSelectedExercise] = useState<any>(null);
  const [workouts, setWorkouts] = useLocalStorage<Workout[]>('workouts', []);
  const [sessionStartTime, setSessionStartTime] = useLocalStorage<string | null>('sessionStartTime', null);

  const handleDaySelect = (day: keyof typeof DAILY_ROUTINES, date: string) => {
    setSelectedDay(day);
    setSelectedDate(date);
    setCurrentPage('exerciseSelection');
    // Start gym session timer
    if (!sessionStartTime) {
      setSessionStartTime(new Date().toISOString());
    }
  };

  const handleExerciseSelect = (exercise: any) => {
    setSelectedExercise(exercise);
    setCurrentPage('exerciseTracker');
  };

  const handleSaveExercise = (exerciseData: Exercise) => {
    const existingWorkoutIndex = workouts.findIndex(w => w.date === selectedDate);
    
    let updatedWorkouts;
    if (existingWorkoutIndex >= 0) {
      updatedWorkouts = [...workouts];
      updatedWorkouts[existingWorkoutIndex] = {
        ...updatedWorkouts[existingWorkoutIndex],
        exercises: [...updatedWorkouts[existingWorkoutIndex].exercises, exerciseData]
      };
    } else {
      const newWorkout: Workout = {
        date: selectedDate,
        exercises: [exerciseData],
        startTime: sessionStartTime || undefined
      };
      updatedWorkouts = [...workouts, newWorkout];
    }
    
    setWorkouts(updatedWorkouts);
    setCurrentPage('exerciseSelection');
  };

  const handleBack = () => {
    if (currentPage === 'exerciseTracker') {
      setCurrentPage('exerciseSelection');
    } else if (currentPage === 'exerciseSelection') {
      // End gym session and calculate duration
      if (sessionStartTime) {
        const endTime = new Date().toISOString();
        const duration = Math.round((new Date(endTime).getTime() - new Date(sessionStartTime).getTime()) / 60000);
        
        const existingWorkoutIndex = workouts.findIndex(w => w.date === selectedDate);
        if (existingWorkoutIndex >= 0) {
          const updatedWorkouts = [...workouts];
          updatedWorkouts[existingWorkoutIndex] = {
            ...updatedWorkouts[existingWorkoutIndex],
            endTime,
            duration
          };
          setWorkouts(updatedWorkouts);
        }
        
        setSessionStartTime(null);
      }
      setCurrentPage('daySelection');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'daySelection' && (
        <DaySelection onDaySelect={handleDaySelect} />
      )}
      
      {currentPage === 'exerciseSelection' && (
        <ExerciseSelection 
          selectedDay={selectedDay}
          selectedDate={selectedDate}
          onExerciseSelect={handleExerciseSelect}
          onBack={handleBack}
          workouts={workouts}
        />
      )}
      
      {currentPage === 'exerciseTracker' && selectedExercise && (
        <ExerciseTracker 
          exercise={selectedExercise}
          onSave={handleSaveExercise}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default App;