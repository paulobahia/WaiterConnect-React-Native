import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { Router } from './src/routes/Router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/context';

export default function App() {

  return (
    <>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar hidden={true} />
          <Router />
        </NavigationContainer>
      </AuthProvider>
      <Toast />
    </>
  );
};