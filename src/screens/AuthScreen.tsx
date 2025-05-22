import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Login } from '../components/Auth/Login';

const AuthScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Login navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default AuthScreen; 