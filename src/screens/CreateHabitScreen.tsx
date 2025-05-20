import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HabitForm } from '../components/Habits/HabitForm';

const CreateHabitScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <HabitForm navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default CreateHabitScreen; 