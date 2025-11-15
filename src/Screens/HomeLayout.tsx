import React from "react";
import { View, ScrollView } from "react-native";
import Header from "../Screens/Header"; // Header component
import HeroScreen from "../Screens/HeroScreen"; // HeroScreen component
import Cards from "../Screens/Cards"; // HeroScreen component



const HomeLayout: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* Header fixed on top */}
      <Header />

      {/* HeroScreen content below Header */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <HeroScreen />
        {/* <Cards/> */}
       
      </ScrollView>
      
    </View>
  );
};

export default HomeLayout;
