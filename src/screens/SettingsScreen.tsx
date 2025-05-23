import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const SettingsScreen = () => {
    const { user } = useAuth();
    const { theme, toggleTheme, colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.primary }]}>Settings</Text>

            <View style={[styles.section, { backgroundColor: colors.card }]}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Account Details</Text>
                <Text style={[styles.text, { color: colors.textSecondary }]}>Name: {user?.name}</Text>
                <Text style={[styles.text, { color: colors.textSecondary }]}>Email: {user?.email}</Text>
                <Text style={[styles.text, { color: colors.textSecondary }]}>Gender: {user?.gender}</Text>
                <Text style={[styles.text, { color: colors.textSecondary }]}>Birthday: {user?.birthday}</Text>
            </View>

            <View style={[styles.section, { backgroundColor: colors.card }]}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>
                <View style={styles.settingItem}>
                    <Text style={[styles.settingText, { color: colors.text }]}>Dark Mode</Text>
                    <Switch
                        value={theme === 'dark'}
                        onValueChange={toggleTheme}
                        trackColor={{ false: '#767577', true: colors.primary }}
                        thumbColor={theme === 'dark' ? colors.white : '#f4f3f4'}
                    />
                </View>
            </View>
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
        marginBottom: 20,
    },
    section: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    settingText: {
        fontSize: 16,
    },
});

export default SettingsScreen;
