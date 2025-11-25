import React from "react";
import { View, ScrollView } from "react-native";
import Header from "../../components/HeaderFooter/Header"; 
import HeroScreen from "../../components/LandingPages/HeroScreen"; // HeroScreen component
import Cards from "../../components/LandingPages/Cards"; // HeroScreen component



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
