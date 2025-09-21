import React, { useState } from 'react';

interface WorkoutFormProps {
    onSave: (workoutData: any) => void;
    todayRoutine: any[];
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({ onSave, todayRoutine }) => {
    const [exerciseName, setExerciseName] = useState('');
    const [exerciseType, setExerciseType] = useState<'reps' | 'weight'>('reps');
    const [targetSets, setTargetSets] = useState('');
    const [targetReps, setTargetReps] = useState('');
    const [completedSets, setCompletedSets] = useState('');
    const [completedReps, setCompletedReps] = useState('');
    const [targetWeight, setTargetWeight] = useState('');
    const [completedWeight, setCompletedWeight] = useState('');

    const handleExerciseSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedExercise = todayRoutine.find(ex => ex.name === e.target.value);
        if (selectedExercise) {
            setExerciseName(selectedExercise.name);
            setExerciseType(selectedExercise.type);
            if (selectedExercise.targetReps) {
                setTargetReps(selectedExercise.targetReps.toString());
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const workoutData = {
            exerciseName,
            type: exerciseType,
            ...(exerciseType === 'reps' ? {
                targetSets: Number(targetSets),
                targetReps: Number(targetReps),
                completedSets: Number(completedSets),
                completedReps: Number(completedReps)
            } : {
                targetWeight: Number(targetWeight),
                completedWeight: Number(completedWeight)
            })
        };
        onSave(workoutData);
        resetForm();
    };

    const resetForm = () => {
        setExerciseName('');
        setTargetSets('');
        setTargetReps('');
        setCompletedSets('');
        setCompletedReps('');
        setTargetWeight('');
        setCompletedWeight('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 bg-white rounded shadow-md">
            <select
                onChange={handleExerciseSelect}
                className="p-2 border border-gray-300 rounded"
            >
                <option value="">Select from today's routine</option>
                {todayRoutine.map((exercise, index) => (
                    <option key={index} value={exercise.name}>
                        {exercise.name} ({exercise.type})
                    </option>
                ))}
            </select>
            
            <input
                type="text"
                placeholder="Exercise Name"
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
                className="p-2 border border-gray-300 rounded"
                required
            />
            
            <select
                value={exerciseType}
                onChange={(e) => setExerciseType(e.target.value as 'reps' | 'weight')}
                className="p-2 border border-gray-300 rounded"
            >
                <option value="reps">Reps-based</option>
                <option value="weight">Weight-based</option>
            </select>

            {exerciseType === 'reps' ? (
                <>
                    <div className="flex space-x-4">
                        <input
                            type="number"
                            placeholder="Target Sets"
                            value={targetSets}
                            onChange={(e) => setTargetSets(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="number"
                            placeholder="Target Reps"
                            value={targetReps}
                            onChange={(e) => setTargetReps(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <input
                            type="number"
                            placeholder="Completed Sets"
                            value={completedSets}
                            onChange={(e) => setCompletedSets(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Completed Reps"
                            value={completedReps}
                            onChange={(e) => setCompletedReps(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                </>
            ) : (
                <div className="flex space-x-4">
                    <input
                        type="number"
                        placeholder="Target Weight (kg)"
                        value={targetWeight}
                        onChange={(e) => setTargetWeight(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="number"
                        placeholder="Completed Weight (kg)"
                        value={completedWeight}
                        onChange={(e) => setCompletedWeight(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
            )}
            
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Save Progress
            </button>
        </form>
    );
};

export default WorkoutForm;