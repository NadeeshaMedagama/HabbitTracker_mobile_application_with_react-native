import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Profile = ({ navigation }: any) => {
  const { user, logout } = useAuth();
  const { colors } = useTheme();

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
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <Icon name="account-circle" size={80} color={colors.primary} />
          <Text style={[styles.name, { color: colors.text }]}>{user?.name}</Text>
          <Text style={styles.profileInfo}>Email: {user?.email || '-'}</Text>
          <Text style={styles.profileInfo}>
            Gender: {user?.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : '-'}
          </Text>
          <Text style={styles.profileInfo}>Birthday: {user?.birthday || '-'}</Text>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
              style={[styles.menuItem, { borderBottomColor: colors.border }]}
              onPress={() => navigation.navigate('Settings')}
          >
            <Icon name="settings" size={24} color={colors.primary} />
            <Text style={[styles.menuText, { color: colors.text }]}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={[styles.menuItem, { borderBottomColor: colors.border }]}
              onPress={() => navigation.navigate('Notifications')}
          >
            <Icon name="notifications" size={24} color={colors.primary} />
            <Text style={[styles.menuText, { color: colors.text }]}>Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={[styles.menuItem, { borderBottomColor: colors.border }]}
              onPress={() => navigation.navigate('HelpSupport')}
          >
            <Icon name="help" size={24} color={colors.primary} />
            <Text style={[styles.menuText, { color: colors.text }]}>Help & Support</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: colors.error }]}
            onPress={handleLogout}
        >
          <Icon name="logout" size={24} color={colors.white} />
          <Text style={[styles.logoutText, { color: colors.white }]}>Logout</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileInfo: {
    fontSize: 16,
    marginTop: 8,
    color: '#222',
    marginRight: 10,
    alignSelf: 'flex-start',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    marginTop: 5,
  },
  gender: {
    fontSize: 16,
    marginTop: 5,
    textTransform: 'capitalize',
  },
  birthday: {
    fontSize: 16,
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
  },
  menuText: {
    fontSize: 16,
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 'auto',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
