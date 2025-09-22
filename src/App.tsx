import React, { useState } from 'react';
import DaySelection from './components/DaySelection';
import ExerciseSelection from './components/ExerciseSelection';
import ExerciseTracker from './components/ExerciseTracker';
import ThankYouPage from './components/ThankYouPage';
import useLocalStorage from './hooks/useLocalStorage';
import { Workout, Exercise, DAILY_ROUTINES } from './types/workout';

type Page = 'daySelection' | 'exerciseSelection' | 'exerciseTracker' | 'thankYou';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useLocalStorage<Page>('currentPage', 'daySelection');
  const [selectedDay, setSelectedDay] = useLocalStorage<keyof typeof DAILY_ROUTINES>('selectedDay', 'Monday');
  const [selectedDate, setSelectedDate] = useLocalStorage<string>('selectedDate', new Date().toISOString().split('T')[0]);
  const [selectedExercise, setSelectedExercise] = useLocalStorage<Exercise & { gif?: string } | null>('selectedExercise', null);
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

  const handleExerciseSelect = (exercise: Exercise & { gif?: string }) => {
    setSelectedExercise(exercise);
    setCurrentPage('exerciseTracker');
  };

  const handleSaveExercise = (exerciseData: Exercise) => {
    console.log('Saving exercise:', exerciseData);
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
    
    console.log('Updated workouts:', updatedWorkouts);
    setWorkouts(updatedWorkouts);
    
    // Check if all exercises are completed
    const todayExercises = DAILY_ROUTINES[selectedDay];
    const completedExercises = updatedWorkouts.find(w => w.date === selectedDate)?.exercises || [];
    
    if (completedExercises.length >= todayExercises.length) {
      setCurrentPage('thankYou');
    } else {
      setCurrentPage('exerciseSelection');
    }
  };

  const handleBack = () => {
    if (currentPage === 'exerciseTracker') {
      setCurrentPage('exerciseSelection');
    } else if (currentPage === 'exerciseSelection' || currentPage === 'thankYou') {
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

  try {
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
        
        {currentPage === 'exerciseTracker' && (
          selectedExercise ? (
            <ExerciseTracker 
              exercise={selectedExercise}
              onSave={handleSaveExercise}
              onBack={handleBack}
            />
          ) : (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-600 mb-4">Exercise not found</p>
                <button 
                  onClick={() => setCurrentPage('exerciseSelection')}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Back to Exercises
                </button>
              </div>
            </div>
          )
        )}
        
        {currentPage === 'thankYou' && (
          <ThankYouPage 
            selectedDay={selectedDay}
            selectedDate={selectedDate}
            onBack={handleBack}
          />
        )}
      </div>
    );
  } catch (error) {
    console.error('App render error:', error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-4">Something went wrong</h1>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Reload App
          </button>
        </div>
      </div>
    );
  }
};

export default App;