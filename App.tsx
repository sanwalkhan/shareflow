import React from 'react';
import { SafeAreaView } from 'react-native';
import LoginScreen from './src/Screens/LoginScreen';
// import ContactDetails from './src/Screens/ContactDetails';


const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoginScreen />
      {/* <ContactDetails/> */}
    </SafeAreaView>

    
  );
};

export default App;
