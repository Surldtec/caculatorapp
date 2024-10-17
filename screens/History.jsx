import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

const HistoryScreen = ({ navigation, route }) => {
  const { history } = route.params; // Accessing only the history array

  // Create local state for history if you want to manage it locally
  const [localHistory, setLocalHistory] = useState(history);

  const clearHistory = () => {
    setLocalHistory([]); // Clear the history
    // If you need to inform the previous screen, consider a callback or use context
  };

  return (
    <View className="flex-1 p-6 bg-black">
      <Text className="text-2xl text-white mb-3">Calculation History</Text>
      <ScrollView>
        {localHistory.length === 0 ? (
          <Text className="text-3xl text-gray-800">No history available</Text>
        ) : (
          localHistory.map((item, index) => (
            <Text key={index} className="text-3xl text-white mb-1">
              {item}
            </Text>
          ))
        )}
      </ScrollView>
      <TouchableOpacity
        className="bg-blue-900 w-52 h-12 flex justify-center items-center mt-4"
        onPress={clearHistory}
      >
        <Text className="text-white font-bold text-xl">Clear History</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HistoryScreen;
