import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useHabits } from '../../context/HabitContext';
import { useTheme } from '../../context/ThemeContext';
import { Habit } from '../../utils/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HabitFormProps = {
  navigation: NativeStackNavigationProp<any>;
  habit?: Habit;
};

export const HabitForm = ({ navigation, habit }: HabitFormProps) => {
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');
  const { addHabit, updateHabit } = useHabits();
  const { colors } = useTheme();

  useEffect(() => {
    if (habit) {
      setName(habit.name);
      setFrequency(habit.frequency);
    }
  }, [habit]);

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a habit name');
      return;
    }

    try {
      if (habit) {
        await updateHabit(habit.id, { name: name.trim(), frequency });
      } else {
        await addHabit({ name: name.trim(), frequency });
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save habit');
    }
  };

  return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.primary }]}>
          {habit ? 'Edit Habit' : 'Create New Habit'}
        </Text>
        <TextInput
            style={[styles.input, {
              backgroundColor: colors.card,
              color: colors.text,
              borderColor: colors.border
            }]}
            placeholder="Habit Name"
            placeholderTextColor={colors.textSecondary}
            value={name}
            onChangeText={setName}
        />
        <View style={styles.frequencyContainer}>
          <TouchableOpacity
              style={[
                styles.frequencyButton,
                { borderColor: colors.primary },
                frequency === 'daily' && { backgroundColor: colors.primary }
              ]}
              onPress={() => setFrequency('daily')}
          >
            <Text
                style={[
                  styles.frequencyButtonText,
                  { color: colors.primary },
                  frequency === 'daily' && { color: colors.white }
                ]}
            >
              Daily
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={[
                styles.frequencyButton,
                { borderColor: colors.primary },
                frequency === 'weekly' && { backgroundColor: colors.primary }
              ]}
              onPress={() => setFrequency('weekly')}
          >
            <Text
                style={[
                  styles.frequencyButtonText,
                  { color: colors.primary },
                  frequency === 'weekly' && { color: colors.white }
                ]}
            >
              Weekly
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={handleSubmit}
        >
          <Text style={[styles.buttonText, { color: colors.white }]}>
            {habit ? 'Update Habit' : 'Create Habit'}
          </Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  frequencyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  frequencyButton: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  frequencyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
