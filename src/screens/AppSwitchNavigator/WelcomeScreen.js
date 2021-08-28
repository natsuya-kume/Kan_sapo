// 最初の画面を表示するスクリーン
import React from "react";
import { View, Text, StatusBar } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CustomActionButton from "../../components/CustomActionButton";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          borderColor: "black",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AntDesign name="table" size={150} color={colors.welcomeTableColor} />
        <Text
          style={{ fontSize: 50, fontWeight: "100", color: colors.textMain }}
        >
          Kanさぽ
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          borderColor: "orange",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <CustomActionButton
          style={{
            width: 200,
            backgroundColor: "transparent",
            borderWidth: 1,
            marginBottom: 10,
            borderColor: colors.textMain,
          }}
          onPress={() => navigation.navigate("SignUpScreen")}
        >
          <Text style={{ color: colors.textMain }}>新規登録</Text>
        </CustomActionButton>
        <CustomActionButton
          style={{
            width: 200,
            backgroundColor: "transparent",
            borderWidth: 1,
            marginBottom: 10,
            borderColor: colors.textMain,
          }}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={{ color: colors.textMain }}>ログイン</Text>
        </CustomActionButton>
      </View>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
    </View>
  );
};

export default WelcomeScreen;
