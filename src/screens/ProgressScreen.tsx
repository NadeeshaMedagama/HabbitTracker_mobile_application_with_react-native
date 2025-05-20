import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ProgressChart } from '../components/Progress/ProgressChart';
import { HabitList } from '../components/Habits/HabitList';

export const ProgressScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <ProgressChart />
      <HabitList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default ProgressScreen; 