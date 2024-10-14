import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // Corrected import
import Home from "./screens/Home";
import HistoryScreen from "./screens/History";

const Stack = createNativeStackNavigator(); // Updated to createNativeStackNavigator

const App = () => {
  const [history, setHistory] = useState([]);

  const addToHistory = (entry) => {
    setHistory([...history, entry]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
