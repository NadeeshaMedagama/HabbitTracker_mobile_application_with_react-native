import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { HabitList } from '../components/Habits/HabitList';
import { useAuth } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({ navigation }: any) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Add header buttons
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
          <View style={styles.headerButtons}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
                style={styles.profileButton}
            >
              <Icon name="person" size={24} color="#6200ee" />
            </TouchableOpacity>
            {/*<TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>*/}
            {/*  <Text style={styles.logoutText}>Logout</Text>*/}
            {/*</TouchableOpacity>*/}
          </View>
      ),
    });
  }, [navigation]);

  return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Today's Habits</Text>
          <Text style={styles.subtitle}>Track your daily progress</Text>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Create')}
          >
            <Icon name="add-circle" size={24} color="#fff" />
            <Text style={styles.actionText}>New Habit</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Progress')}
          >
            <Icon name="insert-chart" size={24} color="#fff" />
            <Text style={styles.actionText}>View Progress</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.habitsSection}>
          <HabitList />
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#6200ee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginTop: 5,
  },
  quickActions: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-around',
  },
  actionButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '45%',
  },
  actionText: {
    color: '#fff',
    marginTop: 5,
    fontWeight: 'bold',
  },
  habitsSection: {
    padding: 20,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  profileButton: {
    marginRight: 16,
    padding: 4,
  },
  logoutButton: {
    marginRight: 16,
    backgroundColor: '#ff4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
