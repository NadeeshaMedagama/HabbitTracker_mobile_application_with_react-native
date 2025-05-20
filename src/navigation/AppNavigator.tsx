import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import HelpSupportScreen from '../screens/HelpSupportScreen';

// Auth Screens
import LoginScreen from '../screens/AuthScreen';
import RegisterScreen from '../screens/RegisterScreen';

// Main Screens
import HomeScreen from '../screens/HomeScreen';
import CreateHabitScreen from '../screens/CreateHabitScreen';
import ProgressScreen from '../screens/ProgressScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
);

const ProfileStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="ProfileMain" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
                title: 'Settings',
                headerStyle: {
                    backgroundColor: '#6200ee',
                },
                headerTintColor: '#fff',
            }}
        />
        <Stack.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{
                title: 'Notifications',
                headerStyle: {
                    backgroundColor: '#6200ee',
                },
                headerTintColor: '#fff',
            }}
        />
        <Stack.Screen
            name="HelpSupport"
            component={HelpSupportScreen}
            options={{
                title: 'Help & Support',
                headerStyle: {
                    backgroundColor: '#6200ee',
                },
                headerTintColor: '#fff',
            }}
        />
    </Stack.Navigator>
);

const MainTabs = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                switch (route.name) {
                    case 'Home':
                        return <Icon name="home" size={size} color={color} />;
                    case 'Create':
                        return <Icon name="add-circle" size={size} color={color} />;
                    case 'Progress':
                        return <Icon name="insert-chart" size={size} color={color} />;
                    case 'Profile':
                        return <Icon name="person" size={size} color={color} />;
                    default:
                        return <Icon name="help" size={size} color={color} />;
                }
            },
            tabBarActiveTintColor: '#6200ee',
            tabBarInactiveTintColor: 'gray',
        })}
    >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Create" component={CreateHabitScreen} />
        <Tab.Screen name="Progress" component={ProgressScreen} />
        <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
);

export const AppNavigator = () => {
    const { user } = useAuth();

    return (
        <NavigationContainer>
            {user ? <MainTabs /> : <AuthStack />}
        </NavigationContainer>
    );
};
