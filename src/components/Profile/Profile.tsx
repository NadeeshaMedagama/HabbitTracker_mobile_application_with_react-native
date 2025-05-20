import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Profile = ({ navigation }: any) => {
  const { user, logout } = useAuth();

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

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon name="account-circle" size={80} color="#6200ee" />
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('Settings')}
          >
            <Icon name="settings" size={24} color="#6200ee" />
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('Notifications')}
          >
            <Icon name="notifications" size={24} color="#6200ee" />
            <Text style={styles.menuText}>Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('HelpSupport')}
          >
            <Icon name="help" size={24} color="#6200ee" />
            <Text style={styles.menuText}>Help & Support</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={24} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  section: {
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff4444',
    padding: 15,
    borderRadius: 10,
    marginTop: 'auto',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
