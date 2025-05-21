import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface HabitCalendarProps {
    completedDates: string[];
    currentMonth?: Date;
}

export const HabitCalendar: React.FC<HabitCalendarProps> = ({
                                                                completedDates,
                                                                currentMonth = new Date(),
                                                            }) => {
    const { colors } = useTheme();
    const screenWidth = Dimensions.get('window').width;
    const daySize = (screenWidth - 40) / 7; // 7 days in a week, with some padding

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        return { daysInMonth, firstDayOfMonth };
    };

    const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentMonth);

    const renderCalendarDays = () => {
        const days = [];
        const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        // Add weekday headers
        weekDays.forEach((day, index) => (
            <View key={`header-${index}`} style={[styles.dayHeader, { width: daySize }]}>
                <Text style={[styles.dayHeaderText, { color: colors.textSecondary }]}>{day}</Text>
            </View>
        ));

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(
                <View key={`empty-${i}`} style={[styles.dayCell, { width: daySize, height: daySize }]} />
            );
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            const dateString = date.toISOString().split('T')[0];
            const isCompleted = completedDates.includes(dateString);

            days.push(
                <View
                    key={`day-${day}`}
                    style={[
                        styles.dayCell,
                        {
                            width: daySize,
                            height: daySize,
                            backgroundColor: isCompleted ? colors.primary : colors.card,
                        },
                    ]}
                >
                    <Text
                        style={[
                            styles.dayText,
                            { color: isCompleted ? colors.white : colors.text },
                        ]}
                    >
                        {day}
                    </Text>
                </View>
            );
        }

        return days;
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.monthHeader, { color: colors.text }]}>
                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </Text>
            <View style={styles.calendarGrid}>
                {renderCalendarDays()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
    },
    monthHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    calendarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    dayHeader: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
    },
    dayHeaderText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    dayCell: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2,
        borderRadius: 8,
    },
    dayText: {
        fontSize: 14,
        fontWeight: '500',
    },
});
