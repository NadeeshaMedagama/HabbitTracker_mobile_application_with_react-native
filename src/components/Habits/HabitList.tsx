import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useHabits } from '../../context/HabitContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

type FilterType = 'all' | 'today' | 'completed';

export const HabitList = () => {
  const { habits, completeHabit, deleteHabit, getHabitsByDate } = useHabits();
  const [filter, setFilter] = useState<FilterType>('all');
  const today = new Date().toISOString().split('T')[0];

  const filteredHabits = () => {
    switch (filter) {
      case 'today':
        return getHabitsByDate(today);
      case 'completed':
        return habits.filter(habit => habit.completedDates.includes(today));
      default:
        return habits;
    }
  };

  const handleComplete = async (habitId: string) => {
    try {
      await completeHabit(habitId);
    } catch (error) {
      Alert.alert('Error', 'Failed to update habit');
    }
  };

  const handleDelete = async (habitId: string) => {
    Alert.alert(
      'Delete Habit',
      'Are you sure you want to delete this habit?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteHabit(habitId);
            } catch (error) {
              Alert.alert('Error', 'Failed to delete habit');
            }
          },
        },
      ]
    );
  };

  const renderHabit = ({ item }: { item: any }) => {
    const isCompleted = item.completedDates.includes(today);

    return (
      <View style={styles.habitItem}>
        <View style={styles.habitInfo}>
          <Text style={styles.habitName}>{item.name}</Text>
          <Text style={styles.habitFrequency}>
            {item.frequency.charAt(0).toUpperCase() + item.frequency.slice(1)}
          </Text>
        </View>
        <View style={styles.habitActions}>
          <TouchableOpacity
            style={[styles.actionButton, isCompleted && styles.completedButton]}
            onPress={() => handleComplete(item.id)}
          >
            <Icon
              name={isCompleted ? 'check-circle' : 'radio-button-unchecked'}
              size={24}
              color={isCompleted ? '#fff' : '#6200ee'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => handleDelete(item.id)}
          >
            <Icon name="delete" size={24} color="#ff4444" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'today' && styles.filterButtonActive]}
          onPress={() => setFilter('today')}
        >
          <Text style={[styles.filterText, filter === 'today' && styles.filterTextActive]}>
            Today
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'completed' && styles.filterButtonActive]}
          onPress={() => setFilter('completed')}
        >
          <Text style={[styles.filterText, filter === 'completed' && styles.filterTextActive]}>
            Completed
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredHabits()}
        renderItem={renderHabit}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  filterButtonActive: {
    backgroundColor: '#6200ee',
  },
  filterText: {
    color: '#6200ee',
    fontSize: 14,
    fontWeight: 'bold',
  },
  filterTextActive: {
    color: '#fff',
  },
  list: {
    padding: 10,
  },
  habitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  habitFrequency: {
    fontSize: 14,
    color: '#666',
  },
  habitActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 20,
  },
  completedButton: {
    backgroundColor: '#6200ee',
  },
  deleteButton: {
    backgroundColor: '#fff',
  },
}); 