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
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HabitCalendar } from './HabitCalendar';

type FilterType = 'all' | 'today' | 'completed';

const HabitItem = ({ item, onComplete, onDelete, colors }: any) => {
  const today = new Date().toISOString().split('T')[0];
  const isCompleted = item.completedDates.includes(today);

  return (
      <View style={[
        styles.habitItem,
        {
          backgroundColor: isCompleted ? colors.primary : colors.card,
        }
      ]}>
        <View style={styles.habitInfo}>
          <Text style={[styles.habitName, { color: isCompleted ? colors.white : colors.text }]}>
            {item.name}
          </Text>
          <Text style={[styles.habitFrequency, { color: isCompleted ? colors.white : colors.textSecondary }]}>
            {item.frequency.charAt(0).toUpperCase() + item.frequency.slice(1)}
          </Text>
        </View>
        <View style={styles.habitActions}>
          <TouchableOpacity
              style={[styles.actionButton, isCompleted && styles.completedButton]}
              onPress={() => onComplete(item.id)}
              activeOpacity={0.7}
          >
            <Icon
                name={isCompleted ? 'check-circle' : 'radio-button-unchecked'}
                size={24}
                color={isCompleted ? colors.white : colors.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={() => onDelete(item.id)}
              activeOpacity={0.7}
          >
            <Icon name="delete" size={24} color={colors.error} />
          </TouchableOpacity>
        </View>
      </View>
  );
};

export const HabitList = () => {
  const { habits, completeHabit, deleteHabit, getHabitsByDate } = useHabits();
  const [filter, setFilter] = useState<FilterType>('all');
  const [showCalendar, setShowCalendar] = useState(false);
  const { colors } = useTheme();
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

  const getCompletedDates = () => {
    const allDates = new Set<string>();
    habits.forEach(habit => {
      habit.completedDates.forEach(date => allDates.add(date));
    });
    return Array.from(allDates);
  };

  return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.filterContainer, { borderBottomColor: colors.border }]}>
          <TouchableOpacity
              style={[styles.filterButton, filter === 'all' && { backgroundColor: colors.primary }]}
              onPress={() => setFilter('all')}
          >
            <Text style={[styles.filterText, filter === 'all' && { color: colors.white }]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={[styles.filterButton, filter === 'today' && { backgroundColor: colors.primary }]}
              onPress={() => setFilter('today')}
          >
            <Text style={[styles.filterText, filter === 'today' && { color: colors.white }]}>
              Today
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={[styles.filterButton, filter === 'completed' && { backgroundColor: colors.primary }]}
              onPress={() => setFilter('completed')}
          >
            <Text style={[styles.filterText, filter === 'completed' && { color: colors.white }]}>
              Completed
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
            style={[styles.calendarToggle, { backgroundColor: colors.card }]}
            onPress={() => setShowCalendar(!showCalendar)}
        >
          <Icon
              name={showCalendar ? 'calendar-today' : 'calendar-month'}
              size={24}
              color={colors.primary}
          />
          <Text style={[styles.calendarToggleText, { color: colors.text }]}>
            {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
          </Text>
        </TouchableOpacity>

        {showCalendar && (
            <HabitCalendar
                completedDates={getCompletedDates()}
                currentMonth={new Date()}
            />
        )}

        <FlatList
            data={filteredHabits()}
            renderItem={({ item }) => (
                <HabitItem
                    item={item}
                    onComplete={handleComplete}
                    onDelete={handleDelete}
                    colors={colors}
                />
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  filterText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  list: {
    padding: 10,
  },
  habitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
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
    backgroundColor: 'transparent',
  },
  deleteButton: {
    backgroundColor: 'transparent',
  },
  calendarToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 8,
  },
  calendarToggleText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
});
