import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { HabitList } from '../components/Habits/HabitList';
import { ProgressChart } from '../components/Progress/ProgressChart';
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
    <View style={styles.container}>
      <ProgressChart />
      <HabitList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
