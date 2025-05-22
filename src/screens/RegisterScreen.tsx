import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Register } from '../components/Auth/Register';

const RegisterScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Register navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default RegisterScreen; 