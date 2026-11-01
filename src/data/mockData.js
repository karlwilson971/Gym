// Realistic mock data for PulseFit. Swap this file for API calls when a backend exists.

export const user = {
  name: 'Alex Rivera',
  firstName: 'Alex',
  handle: '@alexlifts',
  initials: 'AR',
  membership: 'Pro Elite',
  memberSince: 'March 2024',
  renews: 'Nov 1',
  homeGym: 'PulseFit Downtown',
  level: 14,
  xp: 2340,
  xpNext: 3000,
  totalWorkouts: 186,
  streak: 12,
  longestStreak: 31,
  weeklyGoal: 5,
  weekWorkouts: 3,
  activeMinutesGoal: 300,
  goalsHit: 6,
  goalsTotal: 8,
}

export const communityStats = [
  { label: 'Active members', value: 48250, suffix: '+' },
  { label: 'Workouts completed', value: 1284930 },
  { label: 'Classes this week', value: 342 },
]

// Mon → Sun. Days after today are zeroed out at render time.
export const weeklyActivity = [
  { day: 'Mon', minutes: 52 },
  { day: 'Tue', minutes: 38 },
  { day: 'Wed', minutes: 24 },
  { day: 'Thu', minutes: 64 },
  { day: 'Fri', minutes: 45 },
  { day: 'Sat', minutes: 31 },
  { day: 'Sun', minutes: 0 },
]

export const todayWorkout = {
  id: 'upper-power',
  title: 'Upper Body Power',
  focus: 'Chest · Back · Arms',
  duration: 50,
  calories: 460,
  difficulty: 'Intermediate',
  coachNote: 'Three seconds down, explode up.',
  exercises: [
    { id: 'bench', name: 'Barbell Bench Press', sets: 4, reps: 8, weight: '80 kg', rest: 90 },
    { id: 'row', name: 'Bent-Over Row', sets: 4, reps: 10, weight: '70 kg', rest: 75 },
    { id: 'ohp', name: 'Seated Dumbbell Press', sets: 3, reps: 10, weight: '24 kg', rest: 60 },
    { id: 'pullup', name: 'Weighted Pull-Up', sets: 3, reps: 6, weight: '+10 kg', rest: 90 },
    { id: 'curl', name: 'Incline Hammer Curl', sets: 3, reps: 12, weight: '14 kg', rest: 45 },
  ],
}

export const muscleGroups = ['Chest', 'Back', 'Legs', 'Arms', 'Core', 'Cardio']

export const exercises = [
  { id: 'e1', name: 'Barbell Bench Press', muscle: 'Chest', sets: 4, reps: '8', rest: 90, difficulty: 'Intermediate', equipment: 'Barbell', description: 'The king of upper-body pushing. Drive your feet, squeeze the bar, touch mid-chest.' },
  { id: 'e2', name: 'Incline Dumbbell Press', muscle: 'Chest', sets: 3, reps: '10', rest: 75, difficulty: 'Beginner', equipment: 'Dumbbells', description: 'Builds the upper chest with a bigger range of motion than the barbell.' },
  { id: 'e3', name: 'Cable Crossover', muscle: 'Chest', sets: 3, reps: '12–15', rest: 45, difficulty: 'Beginner', equipment: 'Cable', description: 'Constant tension finisher. Hug the tree and squeeze at the peak.' },
  { id: 'e4', name: 'Weighted Dips', muscle: 'Chest', sets: 4, reps: '8', rest: 90, difficulty: 'Advanced', equipment: 'Dip belt', description: 'Lean forward to bias the chest. Control the descent below parallel.' },
  { id: 'e5', name: 'Conventional Deadlift', muscle: 'Back', sets: 5, reps: '5', rest: 150, difficulty: 'Advanced', equipment: 'Barbell', description: 'Full posterior chain power. Brace hard, push the floor away.' },
  { id: 'e6', name: 'Lat Pulldown', muscle: 'Back', sets: 3, reps: '12', rest: 60, difficulty: 'Beginner', equipment: 'Cable', description: 'Pull elbows to your back pockets for wider, stronger lats.' },
  { id: 'e7', name: 'Bent-Over Row', muscle: 'Back', sets: 4, reps: '10', rest: 75, difficulty: 'Intermediate', equipment: 'Barbell', description: 'Hinge, flat back, row to the belly button. Thickness builder.' },
  { id: 'e8', name: 'Back Squat', muscle: 'Legs', sets: 5, reps: '5', rest: 150, difficulty: 'Intermediate', equipment: 'Barbell', description: 'Sit between your hips, knees track toes, drive up through mid-foot.' },
  { id: 'e9', name: 'Bulgarian Split Squat', muscle: 'Legs', sets: 3, reps: '10 / leg', rest: 75, difficulty: 'Intermediate', equipment: 'Dumbbells', description: 'Single-leg strength and balance. Humbling in the best way.' },
  { id: 'e10', name: 'Leg Press', muscle: 'Legs', sets: 4, reps: '12', rest: 90, difficulty: 'Beginner', equipment: 'Machine', description: 'Load the quads safely. Full depth, no locking out at the top.' },
  { id: 'e11', name: 'Romanian Deadlift', muscle: 'Legs', sets: 3, reps: '10', rest: 90, difficulty: 'Intermediate', equipment: 'Barbell', description: 'Hamstring and glute builder. Push hips back until you feel the stretch.' },
  { id: 'e12', name: 'Barbell Curl', muscle: 'Arms', sets: 3, reps: '10', rest: 60, difficulty: 'Beginner', equipment: 'EZ bar', description: 'Classic biceps mass builder. Elbows pinned, no swinging.' },
  { id: 'e13', name: 'Skull Crushers', muscle: 'Arms', sets: 3, reps: '12', rest: 60, difficulty: 'Intermediate', equipment: 'EZ bar', description: 'Long-head triceps focus. Lower behind the head for a deeper stretch.' },
  { id: 'e14', name: 'Hammer Curl', muscle: 'Arms', sets: 3, reps: '12', rest: 45, difficulty: 'Beginner', equipment: 'Dumbbells', description: 'Builds the brachialis and forearms for thicker-looking arms.' },
  { id: 'e15', name: 'Plank Hold', muscle: 'Core', sets: 3, reps: '60 s', rest: 45, difficulty: 'Beginner', equipment: 'Bodyweight', description: 'Squeeze glutes, ribs down, breathe. Quality over time.' },
  { id: 'e16', name: 'Hanging Leg Raise', muscle: 'Core', sets: 3, reps: '12', rest: 60, difficulty: 'Advanced', equipment: 'Pull-up bar', description: 'Curl the pelvis up, no swinging. Lower abs on fire.' },
  { id: 'e17', name: 'Cable Woodchop', muscle: 'Core', sets: 3, reps: '12 / side', rest: 45, difficulty: 'Intermediate', equipment: 'Cable', description: 'Rotational power for athletes. Pivot the back foot.' },
  { id: 'e18', name: 'Dead Bug', muscle: 'Core', sets: 3, reps: '10 / side', rest: 30, difficulty: 'Beginner', equipment: 'Bodyweight', description: 'Anti-extension control. Lower back glued to the floor.' },
  { id: 'e19', name: 'Rowing Intervals', muscle: 'Cardio', sets: 8, reps: '250 m', rest: 60, difficulty: 'Intermediate', equipment: 'Rower', description: 'Legs, then back, then arms. Sub-55s splits if you dare.' },
  { id: 'e20', name: 'Assault Bike Sprints', muscle: 'Cardio', sets: 10, reps: '20 s', rest: 40, difficulty: 'Advanced', equipment: 'Air bike', description: 'All-out effort. The fastest way to empty the tank.' },
  { id: 'e21', name: 'Jump Rope', muscle: 'Cardio', sets: 5, reps: '2 min', rest: 30, difficulty: 'Beginner', equipment: 'Rope', description: 'Light feet, quick wrists. Great warm-up or finisher.' },
  { id: 'e22', name: 'Incline Treadmill Walk', muscle: 'Cardio', sets: 1, reps: '25 min', rest: 0, difficulty: 'Beginner', equipment: 'Treadmill', description: '12% incline, 5 km/h. Low impact, high calorie burn.' },
]

export const strengthHistory = [
  { week: 'Jul 27', bench: 70, squat: 100, deadlift: 140 },
  { week: 'Aug 3', bench: 72.5, squat: 102.5, deadlift: 142.5 },
  { week: 'Aug 10', bench: 72.5, squat: 105, deadlift: 147.5 },
  { week: 'Aug 17', bench: 75, squat: 107.5, deadlift: 150 },
  { week: 'Aug 24', bench: 75, squat: 107.5, deadlift: 152.5 },
  { week: 'Aug 31', bench: 77.5, squat: 110, deadlift: 155 },
  { week: 'Sep 7', bench: 77.5, squat: 115, deadlift: 155 },
  { week: 'Sep 14', bench: 80, squat: 115, deadlift: 160 },
  { week: 'Sep 21', bench: 80, squat: 117.5, deadlift: 162.5 },
  { week: 'Sep 28', bench: 82.5, squat: 120, deadlift: 165 },
  { week: 'Oct 5', bench: 82.5, squat: 122.5, deadlift: 167.5 },
  { week: 'Oct 12', bench: 85, squat: 125, deadlift: 170 },
]

export const progressSummary = [
  { label: 'Strength gain', value: 21, prefix: '+', suffix: '%', hint: 'last 12 weeks' },
  { label: 'Total volume', value: 142300, suffix: ' kg', hint: 'this quarter' },
  { label: 'PRs this month', value: 4, hint: 'Oct 2026' },
  { label: 'Avg session', value: 54, suffix: ' min', hint: 'last 30 days' },
]

export const personalRecords = [
  { lift: 'Deadlift', value: '170', unit: 'kg', date: 'Oct 12', gain: '+7.5 kg', tier: 'gold' },
  { lift: 'Back Squat', value: '125', unit: 'kg', date: 'Oct 12', gain: '+5 kg', tier: 'gold' },
  { lift: 'Bench Press', value: '85', unit: 'kg', date: 'Oct 10', gain: '+2.5 kg', tier: 'silver' },
  { lift: 'Pull-Ups', value: '18', unit: 'reps', date: 'Oct 3', gain: '+3 reps', tier: 'silver' },
  { lift: '5K Run', value: '22:41', unit: 'min', date: 'Sep 27', gain: '−48 s', tier: 'bronze' },
  { lift: 'Plank', value: '3:15', unit: 'min', date: 'Sep 19', gain: '+40 s', tier: 'bronze' },
]

export const achievements = [
  { id: 'a1', name: 'On Fire', description: 'Hit a 10-day streak', icon: 'flame', earned: true, date: 'Oct 16' },
  { id: 'a2', name: 'Centurion', description: 'Complete 100 workouts', icon: 'dumbbell', earned: true, date: 'Jun 2' },
  { id: 'a3', name: 'PR Machine', description: 'Set 10 personal records', icon: 'trophy', earned: true, date: 'Sep 28' },
  { id: 'a4', name: 'Early Bird', description: '5 workouts before 7am', icon: 'sunrise', earned: true, date: 'Aug 14' },
  { id: 'a5', name: 'Class Act', description: 'Attend 25 group classes', icon: 'calendar', earned: false, progress: 18, goal: 25 },
  { id: 'a6', name: '500 Club', description: '500 kg big-three total', icon: 'medal', earned: false, progress: 380, goal: 500 },
  { id: 'a7', name: 'Unstoppable', description: 'Reach a 30-day streak', icon: 'zap', earned: false, progress: 12, goal: 30 },
  { id: 'a8', name: 'Cardio King', description: 'Log 100 km of cardio', icon: 'heart', earned: false, progress: 64, goal: 100 },
]

export const classTypes = ['Yoga', 'HIIT', 'Spin', 'Boxing']

const classTemplates = [
  { type: 'Yoga', name: 'Sunrise Flow', coach: 'Maya Chen', duration: 45, room: 'Studio Lotus', capacity: 20 },
  { type: 'HIIT', name: 'Burn 45', coach: 'Jordan Blake', duration: 45, room: 'Turf Zone', capacity: 16 },
  { type: 'Spin', name: 'Rhythm Ride', coach: 'Sam Ortiz', duration: 50, room: 'Cycle Studio', capacity: 24 },
  { type: 'Boxing', name: 'Fight Club Fundamentals', coach: 'Dre Williams', duration: 60, room: 'The Ring', capacity: 14 },
  { type: 'Yoga', name: 'Power Vinyasa', coach: 'Priya Nair', duration: 60, room: 'Studio Lotus', capacity: 18 },
  { type: 'HIIT', name: 'Tabata Blast', coach: 'Kai Morgan', duration: 30, room: 'Turf Zone', capacity: 16 },
  { type: 'Spin', name: 'Climb & Sprint', coach: 'Lena Fischer', duration: 45, room: 'Cycle Studio', capacity: 24 },
  { type: 'Boxing', name: 'Boxfit Conditioning', coach: 'Dre Williams', duration: 45, room: 'The Ring', capacity: 14 },
]

const slots = ['06:30', '07:15', '12:15', '17:30', '18:45', '19:45']

// `day` is an offset from today (0 = today … 6 = six days from now).
export const classes = Array.from({ length: 7 }, (_, day) => {
  const count = 4 + (day % 2)
  return Array.from({ length: count }, (_, i) => {
    const t = classTemplates[(day * 3 + i * 5) % classTemplates.length]
    const seed = (day * 5 + i * 7) % 11
    const spots = seed === 0 ? 0 : Math.max(1, Math.round((t.capacity * seed) / 12))
    return { ...t, id: `c-${day}-${i}`, day, time: slots[i + (day % 2 === 0 ? 1 : 0)], spots }
  })
}).flat()

export const quotes = [
  { text: 'The only bad workout is the one that didn’t happen.', author: 'Gym wisdom' },
  { text: 'Success isn’t always about greatness. It’s about consistency.', author: 'Dwayne Johnson' },
  { text: 'Take care of your body. It’s the only place you have to live.', author: 'Jim Rohn' },
  { text: 'Motivation is what gets you started. Habit is what keeps you going.', author: 'Jim Ryun' },
  { text: 'You don’t have to be extreme, just consistent.', author: 'Unknown' },
  { text: 'Strength doesn’t come from what you can do. It comes from overcoming the things you once thought you couldn’t.', author: 'Rikki Rogers' },
  { text: 'The pain you feel today will be the strength you feel tomorrow.', author: 'Unknown' },
  { text: 'Don’t count the days. Make the days count.', author: 'Muhammad Ali' },
  { text: 'Fall in love with taking care of yourself.', author: 'Unknown' },
  { text: 'Small progress is still progress.', author: 'Unknown' },
]
