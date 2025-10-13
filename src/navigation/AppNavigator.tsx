import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExpensesScreen from '../screens/ExpensesScreen';
import ShareholdersScreen from '../screens/ShareholdersScreen';
import PayrollScreen from '../screens/PayrollScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
<<<<<<< Updated upstream
      <Tab.Navigator
=======
      <Stack.Navigator
<<<<<<< Updated upstream
        initialRouteName="Dashboard"
>>>>>>> Stashed changes
=======
        initialRouteName="Landing"
>>>>>>> Stashed changes
        screenOptions={{
          headerShown: true,
          tabBarStyle: { backgroundColor: '#fff' },
        }}
      >
        <Tab.Screen name="Expenses" component={ExpensesScreen} />
        <Tab.Screen name="Shareholders" component={ShareholdersScreen} />
        <Tab.Screen name="Payroll" component={PayrollScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
