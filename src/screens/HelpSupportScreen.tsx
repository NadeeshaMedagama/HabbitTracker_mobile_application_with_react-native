import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HelpSupportScreen = () => {
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
        }
    ];

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Help & Support</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
                {faqs.map((faq, index) => (
                    <View key={index} style={styles.faqItem}>
                        <Text style={styles.question}>{faq.question}</Text>
                        <Text style={styles.answer}>{faq.answer}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Contact Support</Text>
                <TouchableOpacity style={styles.contactItem}>
                    <Icon name="email" size={24} color="#6200ee" />
                    <View style={styles.contactInfo}>
                        <Text style={styles.contactTitle}>Email Support</Text>
                        <Text style={styles.contactText}>support@habittracker.com</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.contactItem}>
                    <Icon name="chat" size={24} color="#6200ee" />
                    <View style={styles.contactInfo}>
                        <Text style={styles.contactTitle}>Live Chat</Text>
                        <Text style={styles.contactText}>Available 24/7</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>App Information</Text>
                <Text style={styles.version}>Version 1.0.0</Text>
            </View>
        </ScrollView>
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
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    faqItem: {
        marginBottom: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    question: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    answer: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    contactInfo: {
        marginLeft: 15,
    },
    contactTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    contactText: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    version: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
});

export default HelpSupportScreen;
