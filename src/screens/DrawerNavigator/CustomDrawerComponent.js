import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { View, StyleSheet, Platform, Linking } from "react-native";
import {
  useTheme,
  Title,
  Drawer,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { AuthContext } from "../../components/context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CustomDrawerComponent = (props) => {
  const paperTheme = useTheme();

  // コンテキストから関数取得
  const { toggleTheme } = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1, backgroundColor: paperTheme.colors.background }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.tableImageSection}>
            <AntDesign
              name="table"
              size={100}
              color={paperTheme.dark ? paperTheme.colors.textMain : "#2B3044"}
            />
            <Title style={styles.title}>Kanさぽ</Title>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="ホーム"
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="note-outline" color={color} size={size} />
              )}
              label="利用規約"
              onPress={() => {
                props.navigation.navigate("Terms");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="check-outline" color={color} size={size} />
              )}
              label="プライバシーポリシー"
              onPress={() => {
                props.navigation.navigate("PrivacyPolicy");
              }}
            />
            <DrawerItem
              label="お問い合わせ"
              activeBackgroundColor="skyblue"
              icon={({ color, size, focused }) => (
                <AntDesign name="mail" size={size} color={color} />
              )}
              onPress={() =>
                Linking.openURL(
                  "https://docs.google.com/forms/d/e/1FAIpQLSe9TpS0OZWEERbwkKC-LBPLAySQnVM0XsEoAFbbntWYOf1GSQ/viewform"
                )
              }
            />
          </Drawer.Section>
          <Drawer.Section title="表示設定">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}
            >
              <View style={styles.preference}>
                <Title style={styles.darkThemeTitle}>ダークテーマ</Title>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="ログアウト"
          onPress={() => {
            // signOut();
            props.navigation.navigate("Logout");
          }}
        />
      </Drawer.Section>
    </View>
  );
};

export default CustomDrawerComponent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  tableImageSection: {
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: (Platform.OS = "android" ? 20 : 0),
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  darkThemeTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
