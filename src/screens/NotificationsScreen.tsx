import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const NotificationsScreen = () => {
    const [dailyReminders, setDailyReminders] = useState(false);
    const [weeklyReports, setWeeklyReports] = useState(false);
    const [achievementAlerts, setAchievementAlerts] = useState(true);
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.primary }]}>Notifications</Text>

            <View style={styles.section}>
                <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
                    <View style={styles.settingInfo}>
                        <Text style={[styles.settingTitle, { color: colors.text }]}>Daily Reminders</Text>
                        <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>Get reminded about your daily habits</Text>
                    </View>
                    <Switch
                        value={dailyReminders}
                        onValueChange={setDailyReminders}
                        trackColor={{ false: colors.border, true: colors.primary }}
                        thumbColor={dailyReminders ? colors.white : colors.card}
                    />
                </View>

                <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
                    <View style={styles.settingInfo}>
                        <Text style={[styles.settingTitle, { color: colors.text }]}>Weekly Reports</Text>
                        <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>Receive weekly progress summaries</Text>
                    </View>
                    <Switch
                        value={weeklyReports}
                        onValueChange={setWeeklyReports}
                        trackColor={{ false: colors.border, true: colors.primary }}
                        thumbColor={weeklyReports ? colors.white : colors.card}
                    />
                </View>

                <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
                    <View style={styles.settingInfo}>
                        <Text style={[styles.settingTitle, { color: colors.text }]}>Achievement Alerts</Text>
                        <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>Get notified when you reach milestones</Text>
                    </View>
                    <Switch
                        value={achievementAlerts}
                        onValueChange={setAchievementAlerts}
                        trackColor={{ false: colors.border, true: colors.primary }}
                        thumbColor={achievementAlerts ? colors.white : colors.card}
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
        marginBottom: 20,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
    },
    settingInfo: {
        flex: 1,
        marginRight: 10,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    settingDescription: {
        fontSize: 14,
    },
});

export default NotificationsScreen;
