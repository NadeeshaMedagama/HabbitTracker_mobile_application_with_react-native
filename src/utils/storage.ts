import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Habit } from './types';

const STORAGE_KEYS = {
  USER: '@user',
  HABITS: '@habits',
};

export const storage = {
  // User operations
  saveUser: async (user: User) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  },

  getUser: async (): Promise<User | null> => {
    try {
      const user = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  // Habits operations
  saveHabits: async (habits: Habit[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
    } catch (error) {
      console.error('Error saving habits:', error);
      throw error;
    }
  },

  getHabits: async (): Promise<Habit[]> => {
    try {
      const habits = await AsyncStorage.getItem(STORAGE_KEYS.HABITS);
      return habits ? JSON.parse(habits) : [];
    } catch (error) {
      console.error('Error getting habits:', error);
      return [];
    }
  },

  // Clear all data
  clearAll: async () => {
    try {
      await AsyncStorage.multiRemove([STORAGE_KEYS.USER, STORAGE_KEYS.HABITS]);
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  },
}; 