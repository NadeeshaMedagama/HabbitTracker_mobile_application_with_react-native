import React, { createContext, useState, useContext, useEffect } from 'react';
import { HabitContextType, Habit } from '../utils/types';
import { storage } from '../utils/storage';
import { useAuth } from './AuthContext';

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const loadHabits = async () => {
      const savedHabits = await storage.getHabits();
      if (user) {
        setHabits(savedHabits.filter(habit => habit.userId === user.id));
      }
    };
    loadHabits();
  }, [user]);

  const addHabit = async (habitData: Omit<Habit, 'id' | 'userId' | 'createdAt' | 'completedDates'>) => {
    if (!user) throw new Error('User not authenticated');

    const newHabit: Habit = {
      ...habitData,
      id: Date.now().toString(),
      userId: user.id,
      createdAt: new Date().toISOString(),
      completedDates: [],
    };

    const updatedHabits = [...habits, newHabit];
    await storage.saveHabits(updatedHabits);
    setHabits(updatedHabits);
  };

  const updateHabit = async (habitId: string, habitData: Partial<Habit>) => {
    const updatedHabits = habits.map(habit => {
      if (habit.id === habitId) {
        return { ...habit, ...habitData };
      }
      return habit;
    });

    await storage.saveHabits(updatedHabits);
    setHabits(updatedHabits);
  };

  const completeHabit = async (habitId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const updatedHabits = habits.map(habit => {
      if (habit.id === habitId) {
        const completedDates = habit.completedDates.includes(today)
          ? habit.completedDates.filter(date => date !== today)
          : [...habit.completedDates, today];
        return { ...habit, completedDates };
      }
      return habit;
    });

    await storage.saveHabits(updatedHabits);
    setHabits(updatedHabits);
  };

  const deleteHabit = async (habitId: string) => {
    const updatedHabits = habits.filter(habit => habit.id !== habitId);
    await storage.saveHabits(updatedHabits);
    setHabits(updatedHabits);
  };

  const getHabitsByDate = (date: string) => {
    return habits.filter(habit => {
      if (habit.frequency === 'daily') {
        return true;
      }
      // For weekly habits, check if the date is within the current week
      const habitDate = new Date(habit.createdAt);
      const targetDate = new Date(date);
      const diffTime = Math.abs(targetDate.getTime() - habitDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    });
  };

  return (
    <HabitContext.Provider value={{ habits, addHabit, updateHabit, completeHabit, deleteHabit, getHabitsByDate }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
}; 