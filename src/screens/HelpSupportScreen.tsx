import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../context/ThemeContext';

const HelpSupportScreen = () => {
    const { colors } = useTheme();
    const faqs = [
        {
            question: "How do I create a new habit?",
            answer: "Go to the Create tab and fill in the habit details including name, frequency, and reminder time."
        },
        {
            question: "How do I track my progress?",
            answer: "Your progress is automatically tracked in the Progress tab, showing your completion rates and streaks."
        },
        {
            question: "Can I change my notification settings?",
            answer: "Yes, go to Profile > Notifications to customize your notification preferences."
        },
    ];

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.primary }]}>Help & Support</Text>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Frequently Asked Questions</Text>
                {faqs.map((faq, index) => (
                    <View key={index} style={[styles.faqItem, { borderBottomColor: colors.border }]}>
                        <Text style={[styles.question, { color: colors.text }]}>{faq.question}</Text>
                        <Text style={[styles.answer, { color: colors.textSecondary }]}>{faq.answer}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Contact Support</Text>
                <TouchableOpacity style={[styles.contactItem, { borderBottomColor: colors.border }]}>
                    <Icon name="email" size={24} color={colors.primary} />
                    <View style={styles.contactInfo}>
                        <Text style={[styles.contactTitle, { color: colors.text }]}>Email Support</Text>
                        <Text style={[styles.contactText, { color: colors.textSecondary }]}>support@habittracker.com</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.contactItem, { borderBottomColor: colors.border }]}>
                    <Icon name="chat" size={24} color={colors.primary} />
                    <View style={styles.contactInfo}>
                        <Text style={[styles.contactTitle, { color: colors.text }]}>Live Chat</Text>
                        <Text style={[styles.contactText, { color: colors.textSecondary }]}>Available 24/7</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>App Information</Text>
                <Text style={[styles.version, { color: colors.textSecondary }]}>Version 1.0.0</Text>
            </View>
        </ScrollView>
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
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    faqItem: {
        marginBottom: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
    },
    question: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    answer: {
        fontSize: 14,
        lineHeight: 20,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
    },
    contactInfo: {
        marginLeft: 15,
    },
    contactTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    contactText: {
        fontSize: 14,
        marginTop: 2,
    },
    version: {
        fontSize: 14,
        textAlign: 'center',
    },
});

export default HelpSupportScreen;
