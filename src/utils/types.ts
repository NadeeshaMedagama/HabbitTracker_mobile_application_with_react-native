export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Habit {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly';
  userId: string;
  createdAt: string;
  completedDates: string[];
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface HabitContextType {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id' | 'userId' | 'createdAt' | 'completedDates'>) => Promise<void>;
  updateHabit: (habitId: string, habitData: Partial<Habit>) => Promise<void>;
  completeHabit: (habitId: string) => Promise<void>;
  deleteHabit: (habitId: string) => Promise<void>;
  getHabitsByDate: (date: string) => Habit[];
} 