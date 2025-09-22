export interface Workout {
    date: string;
    exercises: Exercise[];
    startTime?: string;
    endTime?: string;
    duration?: number; // in minutes
}

export interface Exercise {
    name: string;
    type: 'reps' | 'weight';
    targetSets?: number;
    targetReps?: number;
    completedSets?: number;
    completedReps?: number;
    targetWeight?: number;
    completedWeight?: number;
    sets?: Array<{
        set: number;
        reps?: number;
        weight?: number;
    }>;
}

export const DAILY_ROUTINES = {
    Monday: [
        { name: 'Leg Extension', type: 'weight', targetSets: 4, gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/LEG-EXTENSION.gif' },
        { name: 'Seated Leg Curl', type: 'weight', targetSets: 4, gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/08/Seated-Leg-Curl.gif' },
        { name: 'Leg Press', type: 'weight', targetSets: 4, gif: 'https://fitnessprogramer.com/wp-content/uploads/2015/11/Leg-Press.gif' },
        { name: 'Squat', type: 'weight', targetSets: 4, gif: 'https://fitnessprogramer.com/wp-content/uploads/2024/10/smith-machine-squat.gif' },
        { name: 'Romanian Deadlift', type: 'weight', targetSets: 4, gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Romanian-Deadlift.gif' },
        { name: 'Bodyweight Standing Calf Raise', type: 'reps', targetSets: 4,gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/06/Standing-Calf-Raise.gif' },
        { name: 'Leg Press Calf Raise', type: 'weight', targetSets: 4, gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/05/Leg-Press-Calf-Raise.gif' },
        { name: 'Lever Seated Calf Raise', type: 'weight', targetSets: 4, gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/06/Lever-Seated-Calf-Raise.gif' },
        { name: 'Single Leg Calves Stretch', type: 'weight', targetSets: 4, gif: 'https://fitnessprogramer.com/wp-content/uploads/2022/02/Single-Leg-Calves-Stretch.gif' },
    ],
    Tuesday: [
        { name: 'Dips', type: 'reps', targetReps: 100, gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Triceps-Dips.gif' },
        { name: 'Seated Dumbbell Shoulder Press', type: 'weight', targetSets: 4, gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shoulder-Press.gif' },
        { name: 'Barbell Front Raise', type: 'weight', targetSets: 4, gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Front-Raise.gif' },
        { name: 'Dumbbell Lateral Raise', type: 'weight', targetSets: 4, gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif' },
        { name: 'Barbell Upright Row', type: 'weight', targetSets: 4, gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Upright-Row.gif' },
        { name: 'Reverse Dumbbell Flyes', type: 'weight', targetSets: 4, gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Reverse-Fly.gif' },
    ],
    Wednesday: [
        { name: 'Pull-ups', type: 'reps', targetReps: 60, gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pull-up.gif' },
        { name: 'Seated Barbell Finger Curl', type: 'weight', targetSets: 4, gif: 'https://fitnessprogramer.com/wp-content/uploads/2025/07/seated-barbell-finger-curl.gif' },
        { name: 'Wrist Roller', type: 'weight', targetSets: 4, gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/08/wrist-roller.gif' },
        { name: 'Barbell Reverse Wrist Curl', type: 'weight', targetSets: 4, gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/06/Barbell-Reverse-Wrist-Curl.gif' },
        { name: 'Barbell Reverse Curl', type: 'weight', targetSets: 4, gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Reverse-Curl.gif' },
        { name: '20 Min Walk', type: 'reps', targetReps: 20, gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/07/Run.gif' }
    ],
    Thursday: [
        { name: 'Chin-ups', type: 'reps', targetReps: 55, gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/03/Chin-Up.gif' },
        { name: 'Captains Chair Leg Raise', type: 'reps', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/05/Captains-Chair-Leg-Raise.gif' },
        { name: 'Bench Side Bend', type: 'reps', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/05/Bench-Side-Bend.gif' },
        { name: 'Weighted Back Extension', type: 'reps', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/06/Weighted-Back-Extension.gif' }
    ],
    Friday: [
        { name: 'Push-ups', type: 'reps', targetReps: 150, gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/10/Push-up-With-Push-up-Bars.gif' },
        { name: 'Captains Chair Leg Raise', type: 'reps', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/05/Captains-Chair-Leg-Raise.gif' },
        { name: 'Bench Side Bend', type: 'reps', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/05/Bench-Side-Bend.gif' },
        { name: 'Weighted Back Extension', type: 'reps', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/06/Weighted-Back-Extension.gif' },
        { name: '20 Min Walk', type: 'reps', targetReps: 20, gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/07/Run.gif' }
    ],
    Saturday: [
        { name: 'Squat', type: 'weight', targetSets: 4, gif: 'https://fitnessprogramer.com/wp-content/uploads/2024/10/smith-machine-squat.gif' },
        { name: 'Leg Press', type: 'weight', targetSets: 4, gif: 'https://fitnessprogramer.com/wp-content/uploads/2015/11/Leg-Press.gif' },
        { name: 'Leg Extension', type: 'weight', targetSets: 4, gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/LEG-EXTENSION.gif' },
        { name: 'Seated Leg Curl', type: 'weight', targetSets: 4, gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/08/Seated-Leg-Curl.gif' },
        { name: 'Romanian Deadlift', type: 'weight', targetSets: 4, gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Romanian-Deadlift.gif' },
        { name: 'Barbell Lunge', type: 'weight', targetSets: 4, gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/05/Barbell-Lunge.gif' },
        { name: 'Bodyweight Standing Calf Raise', type: 'reps', gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/06/Standing-Calf-Raise.gif' },
        { name: 'Leg Press Calf Raise', type: 'weight', targetSets: 4, gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/05/Leg-Press-Calf-Raise.gif' },
        { name: 'Lever Seated Calf Raise', type: 'weight', targetSets: 4, gif: 'https://fitnessprogramer.com/wp-content/uploads/2021/06/Lever-Seated-Calf-Raise.gif' },
        { name: 'Single Leg Calves Stretch', type: 'weight', targetSets: 4, gif: 'https://fitnessprogramer.com/wp-content/uploads/2022/02/Single-Leg-Calves-Stretch.gif' }
    ]
} as const;