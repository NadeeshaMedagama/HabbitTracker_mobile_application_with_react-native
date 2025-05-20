import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Profile } from '../components/Profile/Profile';

const ProfileScreen = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <Profile navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default ProfileScreen;
