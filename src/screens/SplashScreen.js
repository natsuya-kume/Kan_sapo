import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import { useTheme } from "@react-navigation/native";

const SplashScreen = (props) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
      }}
    >
      <LottieView
        style={{ height: 200, width: 200 }}
        source={require("../../assets/splash.json")}
        autoPlay
        loop
      />
    </View>
  );
};

export default SplashScreen;
