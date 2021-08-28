import React, { useState, useMemo } from "react";
import { StyleSheet, Text, Image, View } from "react-native";

import HomeScreen from "./src/screens/HomeScreen";
import PublicScreen from "./src/screens/PublicScreen";
import LogoutScreen from "./src/screens/LogoutScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import LoginScreen from "./src/screens/LoginScreen";
import TermsDrawerScreen from "./src/screens/TermsDrawerScreen";
import PrivacyPolicyScreen from "./src/screens/AppSwitchNavigator/PrivacyPolicyScreen";
import WelcomeScreen from "./src/screens/AppSwitchNavigator/WelcomeScreen";
import CustomDrawerComponent from "./src/screens/DrawerNavigator/CustomDrawerComponent";
import SplashScreen from "./src/screens/SplashScreen";
import firebase from "firebase/app";
import "firebase/auth";

import { useSelector } from "react-redux";

import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  useTheme,
} from "@react-navigation/native";
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from "react-native-paper";
import { AuthContext } from "./src/components/context";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import useAuthenticateUser from "./src/hooks/useAuthenticateUser";
import TermsScreen from "./src/screens/AppSwitchNavigator/TermsScreen";

import kansapo_header from "./assets/kansapo_header.png";
import transparent_kansapo_header from "./assets/transparent_kansapo_header.png";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const KulmsHooks = () => {
  useAuthenticateUser();

  const auth = useSelector((state) => state.auth);

  // テーマの切り替えの状態を管理
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  // デフォルトではこのスタイルが適用される
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: "#ffffff",
      textMain: "#333333",
      periodBackgroundColor: "skyblue",
      subjectBackgroundColor: "#dddddd",
      headerFonts: kansapo_header,
      buttonColor: "skyblue",
      deleteButtonColor: "pink",
      linkColor: "blue",
      welcomeTableColor: "blue",
    },
  };

  // ダークテーマに切り替えた時はこのテーマが適用される
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: "#1c222d",
      textMain: "#d4dae3",
      periodBackgroundColor: "transparent",
      subjectBackgroundColor: "#2B3044",
      headerFonts: transparent_kansapo_header,
      buttonColor: "#d4dae3",
      deleteButtonColor: "#d4dae3",
      linkColor: "skyblue",
      welcomeTableColor: "#d4dae3",
    },
  };

  // テーマの値に応じて適用するスタイルを切り替える
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  // テーマをぜアプリ全体で使うためにコンテキストを作成
  const themeContext = React.useMemo(
    // テーマ切り替え関数
    () => ({
      toggleTheme: () => {
        setIsDarkTheme((isDarkTheme) => !isDarkTheme);
      },
    }),
    []
  );

  if (auth.isLoading) {
    return <SplashScreen />;
  }
  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={themeContext}>
        <NavigationContainer theme={theme}>
          {!auth.isSignedIn ? (
            <Stack.Navigator
              screenOptions={({ route }) => ({
                headerTintColor: theme.colors.textMain,
                headerStyle: { backgroundColor: theme.colors.background },
                headerTitle: () => {
                  switch (route.name) {
                    case "SignUpScreen":
                      return (
                        <Text
                          style={{
                            fontWeight: "500",
                            color: theme.colors.textMain,
                          }}
                        >
                          新規登録
                        </Text>
                      );
                    case "LoginScreen":
                      return (
                        <Text
                          style={{
                            fontWeight: "500",
                            color: theme.colors.textMain,
                          }}
                        >
                          ログイン
                        </Text>
                      );
                    case "TermsScreen":
                      return (
                        <Text
                          style={{
                            fontWeight: "500",
                            color: theme.colors.textMain,
                          }}
                        >
                          利用規約
                        </Text>
                      );
                  }
                },
              })}
            >
              <Stack.Screen
                name="WelcomeScreen"
                component={WelcomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                options={{ headerBackTitleVisible: false }}
              />
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerBackTitleVisible: false }}
              />
              <Stack.Screen
                name="TermsScreen"
                component={TermsScreen}
                options={{ headerBackTitleVisible: false }}
              />
            </Stack.Navigator>
          ) : (
            <AppDrawerNavigator />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

const HomeTabNavigator = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused, size }) => {
          switch (route.name) {
            case "時間割":
              return <AntDesign name="table" size={30} color={color} />;
            case "公式":
              return <FontAwesome5 name="school" size={24} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: "#f67690",
        style: { backgroundColor: colors.background },
      }}
    >
      <Tab.Screen name="時間割" component={HomeScreen} />
      <Tab.Screen
        options={{ tabBarLabel: "公式" }}
        name="公式"
        component={PublicScreen}
      />
    </Tab.Navigator>
  );
};

const getHeaderTitle = (route) => {
  const { colors } = useTheme();
  const routeName = getFocusedRouteNameFromRoute(route);
  const hideOnScreens = ["HomeTabNavigator"];
  switch (routeName) {
    case "TermsTabNavigator":
      return (
        <View
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image
            source={colors.headerFonts}
            style={{ width: 130, height: 35 }}
          />
        </View>
      );
    default:
      return (
        <View
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image
            source={colors.headerFonts}
            style={{ width: 130, height: 35 }}
          />
        </View>
      );
  }
};

const HomeStackNavigator = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "black",
        headerStyle: { backgroundColor: colors.background },
        headerLeft: () => (
          <Ionicons
            name="ios-menu"
            size={30}
            color={colors.textMain}
            style={{ marginLeft: 10 }}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    >
      <Stack.Screen
        options={({ route }) => ({
          title: getHeaderTitle(route),
        })}
        name="HomeTabNavigator"
        component={HomeTabNavigator}
      />
    </Stack.Navigator>
  );
};

const AppDrawerNavigator = ({ navigation }) => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerComponent {...props} />}
  >
    <Drawer.Screen name="Home" component={HomeStackNavigator} />
    <Drawer.Screen name="Terms" component={TermsDrawerScreen} />
    <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
    <Drawer.Screen name="Logout" component={LogoutScreen} />
  </Drawer.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default KulmsHooks;
