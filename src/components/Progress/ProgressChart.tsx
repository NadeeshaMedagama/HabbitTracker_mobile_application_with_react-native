import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useHabits } from '../../context/HabitContext';

export const ProgressChart = () => {
  const { habits } = useHabits();
  const today = new Date().toISOString().split('T')[0];

  const calculateProgress = () => {
    const todayHabits = habits.filter(habit => {
      if (habit.frequency === 'daily') return true;
      const habitDate = new Date(habit.createdAt);
      const targetDate = new Date(today);
      const diffTime = Math.abs(targetDate.getTime() - habitDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    });

    const completedHabits = todayHabits.filter(habit =>
      habit.completedDates.includes(today)
    );

    return {
      total: todayHabits.length,
      completed: completedHabits.length,
      percentage: todayHabits.length
        ? Math.round((completedHabits.length / todayHabits.length) * 100)
        : 0,
    };
  };

  const progress = calculateProgress();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Progress</Text>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${progress.percentage}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>{progress.percentage}%</Text>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{progress.completed}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{progress.total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6200ee',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6200ee',
    borderRadius: 10,
  },
  progressText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
}); 