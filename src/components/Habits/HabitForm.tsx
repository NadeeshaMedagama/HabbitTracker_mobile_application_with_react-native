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
    <View style={styles.container}>
      <Text style={styles.title}>{habit ? 'Edit Habit' : 'Create New Habit'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Habit Name"
        value={name}
        onChangeText={setName}
      />
      <View style={styles.frequencyContainer}>
        <TouchableOpacity
          style={[
            styles.frequencyButton,
            frequency === 'daily' && styles.frequencyButtonActive,
          ]}
          onPress={() => setFrequency('daily')}
        >
          <Text
            style={[
              styles.frequencyButtonText,
              frequency === 'daily' && styles.frequencyButtonTextActive,
            ]}
          >
            Daily
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.frequencyButton,
            frequency === 'weekly' && styles.frequencyButtonActive,
          ]}
          onPress={() => setFrequency('weekly')}
        >
          <Text
            style={[
              styles.frequencyButtonText,
              frequency === 'weekly' && styles.frequencyButtonTextActive,
            ]}
          >
            Weekly
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{habit ? 'Update Habit' : 'Create Habit'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#6200ee',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
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
    borderColor: '#6200ee',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  frequencyButtonActive: {
    backgroundColor: '#6200ee',
  },
  frequencyButtonText: {
    color: '#6200ee',
    fontSize: 16,
    fontWeight: 'bold',
  },
  frequencyButtonTextActive: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#6200ee',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 