import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { ProgressChart } from '../components/Progress/ProgressChart';
import { HabitList } from '../components/Habits/HabitList';
import { useTheme } from '../context/ThemeContext';

export const ProgressScreen = () => {
    const { colors } = useTheme();

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.header, { backgroundColor: colors.primary }]}>
                <Text style={[styles.title, { color: colors.white }]}>Your Progress</Text>
            </View>

            <View style={[styles.section, { backgroundColor: colors.card }]}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Overall Progress</Text>
                <ProgressChart />
            </View>

            <View style={[styles.section, { backgroundColor: colors.card }]}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Habit Statistics</Text>
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={[styles.statValue, { color: colors.primary }]}>85%</Text>
                        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Completion Rate</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={[styles.statValue, { color: colors.primary }]}>7</Text>
                        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Day Streak</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={[styles.statValue, { color: colors.primary }]}>12</Text>
                        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total Habits</Text>
                    </View>
                </View>
            </View>

            <View style={[styles.section, { backgroundColor: colors.card }]}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Activity</Text>
                <HabitList />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    section: {
        padding: 20,
        borderRadius: 10,
        margin: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 14,
        marginTop: 5,
    },
});

export default ProgressScreen;
