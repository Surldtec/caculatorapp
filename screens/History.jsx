import React from "react";
import { View, Text, Button, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-vector-icons/FontAwesome";

const HistoryScreen = ({ navigation, route }) => {

  const { history, setHistory } = route.params;

  return (
    <View className=" flex-1 p-6 bg-black ">
      <Text className=" text-2xl text-white mb-3">Calculation History</Text>
      <ScrollView>
        {history.length === 0 ? (
          <Text className=" text-3xl text-gray-800">No history available</Text>
        ) : (
          history.map((item, index) => (
            <Text key={index} className=" text-3xl text-white  mb-1">
              {item}
            </Text>
          ))
        )}
      </ScrollView>
      <TouchableOpacity
        className="bg-blue-900 w-52 h-12 flex justify-center items-center mt-4"
        onPress={() => setHistory([])}
      >
        <Text className="text-white font-bold text-xl">Clear History</Text>
      </TouchableOpacity>
    </View>
  );
};



export default HistoryScreen;
