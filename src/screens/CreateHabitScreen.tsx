import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HabitForm } from '../components/Habits/HabitForm';
import { useTheme } from '../context/ThemeContext';

const CreateHabitScreen = ({ navigation }: any) => {
  const { colors } = useTheme();

  return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <HabitForm navigation={navigation} />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CreateHabitScreen;
