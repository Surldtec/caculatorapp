import React, { useState } from "react";
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
const { width } = Dimensions.get("window");
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  const [currentInput, setCurrentInput] = useState("0");
  const [previousInput, setPreviousInput] = useState("");
  const [operator, setOperator] = useState(null);
  const [history, setHistory] = useState([]);
  const scrollX = new Animated.Value(0);

  const formatResult = (input) => {
    return input % 1 !== 0 ? parseFloat(input.toFixed(7)) : input;
  };

  const logHistory = (calculation, result) => {
    setHistory((prevHistory) => [...prevHistory, `${calculation} = ${result}`]);
  };

  const handlePress = (value) => {
    if (value === "AC") {
      setCurrentInput("0");
      setPreviousInput("");
      setOperator(null);
    } else if (value === "=") {
      if (previousInput && operator) {
        const calculation = `${previousInput} ${operator} ${currentInput}`;
        const result = formatResult(eval(calculation)).toString();

        logHistory(calculation, result);

        setCurrentInput(result);
        setPreviousInput("");
        setOperator(null);
      }
    } else if (["+", "-", "*", "/"].includes(value)) {
      setOperator(value);
      setPreviousInput(currentInput);
      setCurrentInput("0");
    } else if (
      [
        "sin",
        "cos",
        "tan",
        "log",
        "ln",
        "√",
        "sinh",
        "cosh",
        "tanh",
        "Rad",
        "π",
        "e",
        "x!",
        "10ˣ",
        "x²",
        "x³",
        "1/x",
        "e³",
      ].includes(value)
    ) {
      const operations = {
        sin: Math.sin,
        cos: Math.cos,
        tan: Math.tan,
        log: Math.log10,
        ln: Math.log,
        "√": Math.sqrt,
        sinh: Math.sinh,
        cosh: Math.cosh,
        tanh: Math.tanh,
        Rad: (deg) => deg * (Math.PI / 180),
        π: () => Math.PI,
        e: () => Math.E,
        "x!": (n) =>
          n < 0
            ? "Error"
            : n === 0
            ? 1
            : Array.from({ length: n }, (_, i) => i + 1).reduce(
                (acc, val) => acc * val,
                1
              ),
        "10ˣ": (x) => Math.pow(10, x),
        "x²": (x) => Math.pow(x, 2),
        "x³": (x) => Math.pow(x, 3),
        "1/x": (x) => 1 / x,
        "e³": () => Math.pow(Math.E, 3),
      };

      const result = formatResult(
        operations[value](parseFloat(currentInput))
      ).toString();
      logHistory(`${value}(${currentInput})`, result);
      setCurrentInput(result);
    } else if (value === "x⁴") {
      const result = formatResult(
        Math.pow(parseFloat(currentInput), 4)
      ).toString();
      logHistory(`${currentInput}⁴`, result);
      setCurrentInput(result);
    } else if (value === "xʸ") {
      setPreviousInput(currentInput);
      setCurrentInput("0"); // Reset for exponent input
      setOperator("**"); // Set operator for power
    } else if (operator === "**" && value === "=") {
      if (previousInput) {
        const result = formatResult(
          Math.pow(parseFloat(previousInput), parseFloat(currentInput))
        ).toString();
        logHistory(`${previousInput}^${currentInput}`, result);
        setCurrentInput(result);
        setPreviousInput("");
        setOperator(null);
      }
    } else {
      setCurrentInput((prev) => (prev === "0" ? value : prev + value));
    }
  };

  return (
    <SafeAreaView className="bg-black flex-1">
      <StatusBar barStyle="light-content" />
      <TouchableOpacity
        className="ml-6 w-9 pt-2"
        onPress={() => navigation.navigate("History", { history })}
      >
        <Icon name="history" size={30} color="#fff" />
      </TouchableOpacity>
      <View className="w-full flex-grow bg-black  h-[36%] justify-end px-3">
        <Text className="text-white text-7xl mb-10 text-right">
          {currentInput}
        </Text>
      </View>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <Animated.View
          style={{
            width,
            transform: [
              {
                translateX: scrollX.interpolate({
                  inputRange: [0, width],
                  outputRange: [0, -width],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
          className="flex-1"
        >
          {[
            ["AC", "xʸ", "%", "/"],
            ["7", "8", "9", "*"],
            ["4", "5", "6", "-"],
            ["1", "2", "3", "+"],
            ["0", ".", "="],
          ].map((row, rowIndex) => (
            <View
              key={rowIndex}
              className="w-full h-24 flex-row justify-between px-1"
            >
              {row.map((value) => (
                <TouchableOpacity
                  key={value}
                  className={`${value === "0" ? "w-44" : "w-20"} h-20 ${
                    value === operator
                      ? "bg-white"
                      : ["+", "-", "*", "/", "="].includes(value)
                      ? "bg-[#505efa]"
                      : ["AC", "M", "%"].includes(value)
                      ? "bg-[#939395]"
                      : "bg-[#ffff]"
                  } rounded-full mb-auto mt-auto flex justify-center items-center`}
                  onPress={() => handlePress(value)}
                >
                  <Text
                    className={`text-3xl ${
                      value === operator
                        ? "text-black"
                        : ["+", "-", "*", "/", "="].includes(value)
                        ? "text-white"
                        : ["AC", "M", "%"].includes(value)
                        ? "text-black"
                        : "text-black"
                    }`}
                  >
                    {value}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </Animated.View>

        <Animated.View
          style={{
            width,
            transform: [
              {
                translateX: scrollX.interpolate({
                  inputRange: [-70000, width],
                  outputRange: [width, 0],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        >
          {[
            ["AC", "e", "x!", "√"],
            ["sin", "cos", "log", "tan"],
            ["sinh", "cosh", "tanh", "Rad"],
            ["10ˣ", "e³", "x²", "x³"],
            ["ln", "x⁴", "π", "1/x"],
          ].map((row, rowIndex) => (
            <View
              key={rowIndex}
              className="w-full h-24 flex-row justify-between px-1"
            >
              {row.map((value) => (
                <TouchableOpacity
                  key={value}
                  className="w-20 h-20 bg-[#98979d] rounded-full mb-auto mt-auto flex justify-center items-center"
                  onPress={() => handlePress(value)}
                >
                  <Text className="text-3xl text-black">{value}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
