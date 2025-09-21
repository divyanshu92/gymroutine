# Gym Routine Tracker

## Overview
A mobile-first TypeScript React application for tracking structured gym workouts with comprehensive exercise logging, session timing, and progress tracking. Features a multi-page interface optimized for mobile usage with persistent data storage.

## Tech Stack
- **Frontend**: React 18.3.1 with TypeScript 4.9.5
- **Styling**: Tailwind CSS 3.4.0 (Mobile-first design)
- **Build Tool**: Create React App 5.0.1
- **Storage**: localStorage with custom hooks
- **Deployment**: GitHub Pages with automated CI/CD
- **CSS Processing**: PostCSS + Autoprefixer

## Key Features

### 🏋️ Structured Workout Routines
- **6-Day Program**: Monday-Saturday with specific exercises
- **Exercise Types**: Rep-based (Pull-ups, Push-ups) and Weight-based (4 sets each)
- **Cardio Integration**: 20-minute walks on Mon/Wed/Fri
- **Exercise Demonstrations**: GIF animations for proper form

### 📱 Mobile-Optimized Interface
- **Multi-page Navigation**: Date selection → Exercise selection → Set tracking
- **Touch-friendly Design**: Large buttons, card layouts, sticky headers
- **Responsive Layout**: Optimized for phone screens (max-width: 384px)
- **Page Persistence**: Maintains state across browser sessions

### ⏱️ Session Management
- **Automatic Timing**: Tracks total gym session duration
- **Live Timer**: Shows elapsed time during workout
- **Session Data**: Stores start/end times with each workout

### 📊 Progress Tracking
- **Set-by-Set Logging**: Individual set tracking with reps/weights
- **Progress Visualization**: Progress bars for rep and set completion
- **Historical Comparison**: Shows previous workout data for each exercise
- **Completion Status**: Visual indicators for completed exercises

### 💾 Data Management
- **Persistent Storage**: All data saved to localStorage
- **Date-based Organization**: Workouts organized by selected date
- **Detailed Exercise Records**: Stores individual sets, reps, and weights
- **Workout History**: Complete exercise history with timestamps

## Project Architecture

```
src/
├── components/              # React components
│   ├── DaySelection.tsx     # Date picker and day selection
│   ├── ExerciseSelection.tsx # Exercise list with progress indicators
│   ├── ExerciseTracker.tsx  # Individual exercise set tracking
│   ├── WorkoutHistory.tsx   # Bottom panel showing daily progress
│   ├── DatePicker.tsx       # Date input component
│   ├── WeekdayDropdown.tsx  # Weekday selector
│   ├── WorkoutForm.tsx      # Exercise logging form
│   └── WorkoutList.tsx      # Workout display component
├── hooks/                   # Custom React hooks
│   └── useLocalStorage.ts   # Persistent state management
├── types/                   # TypeScript definitions
│   └── workout.ts          # Exercise and workout interfaces
├── utils/                   # Utility functions
│   └── dateHelpers.ts      # Date manipulation helpers
├── App.tsx                 # Main application with routing
├── index.css              # Tailwind CSS imports
└── index.tsx              # Application entry point
```

## Workout Program

### Weekly Schedule
- **Monday**: Legs + 20min Walk (10 exercises)
- **Tuesday**: Shoulders + Dips (6 exercises)
- **Wednesday**: Back + Wrists + 20min Walk (6 exercises)
- **Thursday**: Biceps + Core (4 exercises)
- **Friday**: Chest + Core + 20min Walk (5 exercises)
- **Saturday**: Legs (10 exercises)

### Exercise Categories
- **Rep-based**: Pull-ups (60), Push-ups (150), Chin-ups (55), Dips (100)
- **Weight-based**: All other exercises (4 sets each)
- **Cardio**: 20-minute walks (tracked as 20 "reps")

## Installation & Setup

### Prerequisites
- Node.js 14+
- npm 5.6+

### Local Development
```bash
git clone https://github.com/divyanshudhiman/gym-routine-tracker.git
cd gym-routine-tracker
npm install
npm start          # Runs on localhost:3000
```

### Production Build
```bash
npm run build      # Creates optimized build
npm run deploy     # Deploys to GitHub Pages
```

## Usage Guide

### Starting a Workout
1. **Select Date**: Choose workout date (auto-navigates to exercises)
2. **View Routine**: See day-specific exercises with GIF demonstrations
3. **Track Sets**: Log individual sets with reps/weights
4. **Monitor Progress**: View real-time progress bars and completion status
5. **Session Timer**: Automatic timing from start to finish

### Data Tracking
- **Individual Sets**: Each set logged separately with specific values
- **Progress Comparison**: See previous workout performance for each set
- **Session Duration**: Total time spent in gym automatically calculated
- **Exercise Completion**: Visual indicators show completed vs remaining exercises

## Data Models

```typescript
interface Exercise {
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

interface Workout {
  date: string;
  exercises: Exercise[];
  startTime?: string;
  endTime?: string;
  duration?: number; // in minutes
}
```

## Deployment

- **Live Demo**: [https://divyanshudhiman.github.io/gym-routine-tracker](https://divyanshudhiman.github.io/gym-routine-tracker)
- **Auto-deployment**: GitHub Actions workflow deploys on push to main
- **SPA Support**: 404.html handles client-side routing on GitHub Pages

## Mobile Features

- **Touch Optimized**: 44px+ touch targets, active states
- **One-handed Use**: Thumb-friendly navigation and controls
- **Sticky Headers**: Important info always visible
- **Card-based UI**: Clean, modern interface with proper spacing
- **Progressive Enhancement**: Works offline with localStorage

## Browser Support

- **Production**: >0.2%, not dead, not op_mini all
- **Development**: Latest Chrome, Firefox, Safari
- **Mobile**: iOS Safari, Chrome Mobile, Samsung Internet