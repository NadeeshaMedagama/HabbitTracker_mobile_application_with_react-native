import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HabitForm } from '../components/Habits/HabitForm';

const EditHabitScreen = ({ route, navigation }: any) => {
  const { habit } = route.params;

  return (
    <View style={styles.container}>
      <HabitForm navigation={navigation} habit={habit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default EditHabitScreen; 