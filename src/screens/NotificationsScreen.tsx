import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useState } from 'react';

const NotificationsScreen = () => {
    const [dailyReminders, setDailyReminders] = useState(false);
    const [weeklyReports, setWeeklyReports] = useState(false);
    const [achievementAlerts, setAchievementAlerts] = useState(true);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notifications</Text>

            <View style={styles.section}>
                <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Text style={styles.settingTitle}>Daily Reminders</Text>
                        <Text style={styles.settingDescription}>Get reminded about your daily habits</Text>
                    </View>
                    <Switch
                        value={dailyReminders}
                        onValueChange={setDailyReminders}
                        trackColor={{ false: '#767577', true: '#6200ee' }}
                        thumbColor={dailyReminders ? '#fff' : '#f4f3f4'}
                    />
                </View>

                <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Text style={styles.settingTitle}>Weekly Reports</Text>
                        <Text style={styles.settingDescription}>Receive weekly progress summaries</Text>
                    </View>
                    <Switch
                        value={weeklyReports}
                        onValueChange={setWeeklyReports}
                        trackColor={{ false: '#767577', true: '#6200ee' }}
                        thumbColor={weeklyReports ? '#fff' : '#f4f3f4'}
                    />
                </View>

                <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Text style={styles.settingTitle}>Achievement Alerts</Text>
                        <Text style={styles.settingDescription}>Get notified when you reach milestones</Text>
                    </View>
                    <Switch
                        value={achievementAlerts}
                        onValueChange={setAchievementAlerts}
                        trackColor={{ false: '#767577', true: '#6200ee' }}
                        thumbColor={achievementAlerts ? '#fff' : '#f4f3f4'}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#6200ee',
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
        borderBottomColor: '#eee',
    },
    settingInfo: {
        flex: 1,
        marginRight: 10,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    settingDescription: {
        fontSize: 14,
        color: '#666',
    },
});

export default NotificationsScreen;
