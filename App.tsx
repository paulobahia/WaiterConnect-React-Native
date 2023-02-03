import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { Router } from './src/routes/Router';
import { StatusBar } from 'expo-status-bar';

export default function App() {

  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      <Router />
    </NavigationContainer>
  );
};