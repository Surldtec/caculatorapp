import React, { useState } from "react";
import {
  StyleSheet,
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
  const [currentValue, setCurrentValue] = useState("");
  const scrollX = new Animated.Value(0);

  const formatResult = (input) => {
    if (input % 1 !== 0) {
      return parseFloat(input.toFixed(7));
    }
    return input;
  };

  const handlePress = (value) => {
    if (value === "AC") {
      setCurrentInput("0");
      setPreviousInput("");
      setOperator(null);
    } else if (value === "=") {
      if (previousInput && operator) {
        const calculation = eval(previousInput + operator + currentInput);
        const result = formatResult(calculation).toString();

        setHistory([
          ...history,
          `${previousInput} ${operator} ${currentInput} = ${result}`,
        ]);

        setCurrentInput(result);
        setPreviousInput("");
        setOperator(null);
      }
    } else if (["+", "-", "*", "/"].includes(value)) {
      setOperator(value);
      setPreviousInput(currentInput);
      setCurrentInput("0");
    } else if (value === "sin") {
      const result = formatResult(
        Math.sin(parseFloat(currentInput))
      ).toString();

      setHistory([...history, `sin(${currentInput}) = ${result}`]);
      setCurrentInput(result);
    } else if (value === "cos") {
      const result = formatResult(
        Math.cos(parseFloat(currentInput))
      ).toString();

      setHistory([...history, `cos(${currentInput}) = ${result}`]);
      setCurrentInput(result);
    } else if (value === "tan") {
      const result = formatResult(
        Math.tan(parseFloat(currentInput))
      ).toString();

      setHistory([...history, `tan(${currentInput}) = ${result}`]);
      setCurrentInput(result);
    } else if (value === "log") {
      const result = formatResult(
        Math.log10(parseFloat(currentInput))
      ).toString();

      setHistory([...history, `log(${currentInput}) = ${result}`]);
      setCurrentInput(result);
    } else if (value === "ln") {
      const result = formatResult(
        Math.log(parseFloat(currentInput))
      ).toString();

      setHistory([...history, `ln(${currentInput}) = ${result}`]);
      setCurrentInput(result);
    } else if (value === "√") {
      const result = formatResult(
        Math.sqrt(parseFloat(currentInput))
      ).toString();

      setHistory([...history, `√(${currentInput}) = ${result}`]);
      setCurrentInput(result);
    } else if (value === "x²") {
      const result = formatResult(
        Math.pow(parseFloat(currentInput), 2)
      ).toString();

      setHistory([...history, `${currentInput}² = ${result}`]);
      setCurrentInput(result);
    } else if (value === "sinh") {
      const result = formatResult(
        Math.sinh(parseFloat(currentInput))
      ).toString();

      setHistory([...history, `sinh(${currentInput}) = ${result}`]);
      setCurrentInput(result);
    } else if (value === "cosh") {
      const result = formatResult(
        Math.cosh(parseFloat(currentInput))
      ).toString();

      setHistory([...history, `cosh(${currentInput}) = ${result}`]);
      setCurrentInput(result);
    } else if (value === "tanh") {
      const result = formatResult(
        Math.tanh(parseFloat(currentInput))
      ).toString();

      setHistory([...history, `tanh(${currentInput}) = ${result}`]);
      setCurrentInput(result);
    } else if (value === "Rad") {
      const result = formatResult(
        parseFloat(currentInput) * (Math.PI / 180)
      ).toString();

      setHistory([...history, `${currentInput} rad = ${result}`]);
      setCurrentInput(result);
    } else if (value === "x³") {
      const result = formatResult(
        Math.pow(parseFloat(currentInput), 3)
      ).toString();

      setHistory([...history, `${currentInput}³ = ${result}`]);
      setCurrentInput(result);
    } else if (value === "1/x") {
      const result = formatResult(1 / parseFloat(currentInput)).toString();

      setHistory([...history, `1/${currentInput} = ${result}`]);
      setCurrentInput(result);
    } else if (value === "10ˣ") {
      const result = formatResult(
        Math.pow(10, parseFloat(currentInput))
      ).toString();

      setHistory([...history, `10^${currentInput} = ${result}`]);
      setCurrentInput(result);
    } else if (value === "%") {
      const result = formatResult(parseFloat(currentInput) / 100).toString();

      setHistory([...history, `${currentInput}% = ${result}`]);
      setCurrentInput(result);
    } else if (value === "e³") {
      const result = formatResult(Math.pow(Math.E, 3)).toString();

      setHistory([...history, `e³ = ${result}`]);
      setCurrentInput(result);
    } else if (value === "xʸ") {
      setOperator("**");
      setPreviousInput(currentInput);
      setCurrentInput("0");
    } else if (value === "π") {
      const result = formatResult(Math.PI).toString();

      setHistory([...history, `π = ${result}`]);
      setCurrentInput(result);
    } else if (value === "e") {
      const result = formatResult(Math.E).toString();

      setHistory([...history, `e = ${result}`]);
      setCurrentInput(result);
    } else if (value === "x!") {
      const factorial = (n) => {
        if (n < 0) return "Error";
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
          result *= i;
        }
        return result;
      };
      const result = factorial(parseInt(currentInput)).toString();

      setHistory([...history, `${currentInput}! = ${result}`]);
      setCurrentInput(result);
    } else {
      setCurrentInput((prev) => (prev === "0" ? value : prev + value));
    }
  };

  return (
    <SafeAreaView className=" bg-black flex-1 ">
      <StatusBar barStyle="light-content" />
      <TouchableOpacity
        className=" ml-6 w-9 pt-2"
        onPress={() => navigation.navigate("History", { history, setHistory })}
      >
        <Icon name="history" size={30} color="#fff" />
      </TouchableOpacity>
      <View className="w-full h-[300px] bg-black justify-end px-3">
        <Text className="text-white text-7xl mb-10 text-right">{currentInput}</Text>
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
        >
          {[
            ["AC", "M", "%", "/"],
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
                    value === operator && value !== "="
                      ? "bg-white"
                      : value === "+" ||
                        value === "-" ||
                        value === "*" ||
                        value === "/" ||
                        value === "="
                      ? "bg-[#ff9f0a]"
                      : value === "AC" || value === "M" || value === "%"
                      ? "bg-[#a5a5a5]"
                      : "bg-[#333333]"
                  } rounded-full mb-auto mt-auto flex justify-center items-center`}
                  onPress={() => handlePress(value)}
                >
                  <Text
                    className={`text-3xl ${
                      value === operator && value !== "="
                        ? "text-black"
                        : value === "+" ||
                          value === "-" ||
                          value === "*" ||
                          value === "/" ||
                          value === "="
                        ? "text-white"
                        : value === "AC" || value === "M" || value === "%"
                        ? "text-black"
                        : "text-white"
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
                  inputRange: [-6000, width],
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
            ["ln", "xʸ", "π", "1/x"],
          ].map((row, rowIndex) => (
            <View
              key={rowIndex}
              className="w-full h-24 flex-row justify-between px-1"
            >
              {row.map((value) => (
                <TouchableOpacity
                  key={value}
                  className="w-20 h-20 bg-[#333333] rounded-full mb-auto mt-auto flex justify-center items-center"
                  onPress={() => handlePress(value)}
                >
                  <Text className="text-3xl text-white">{value}</Text>
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
