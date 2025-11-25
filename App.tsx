import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/Navigation/Appnavigator';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
