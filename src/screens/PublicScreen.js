import React from "react";
import {
  Content,
  List,
  ListItem,
  Text,
  Body,
  Right,
  Button,
} from "native-base";
import { Linking } from "react-native";
import { useTheme } from "@react-navigation/native";

const PublicScreen = () => {
  const { colors } = useTheme();

  // lmsを開く関数
  const openKulms = () => {
    Linking.openURL("https://kulms.tl.kansai-u.ac.jp/").then((supported) => {
      if (!supported) {
        console.log("無効なURLです: " + "https://kulms.tl.kansai-u.ac.jp/");
      } else {
        return Linking.openURL("https://kulms.tl.kansai-u.ac.jp/");
      }
    });
  };

  const openInfoSystem = () => {
    // インフォメーションシステムを開く関数
    Linking.openURL("https://portal.kansai-u.ac.jp/Portal/index.jsp").then(
      (supported) => {
        if (!supported) {
          console.log(
            "無効なURLです: " + "https://portal.kansai-u.ac.jp/Portal/index.jsp"
          );
        } else {
          return Linking.openURL(
            "https://portal.kansai-u.ac.jp/Portal/index.jsp"
          );
        }
      }
    );
  };
  return (
    <Content>
      <List>
        <ListItem thumbnail>
          <Body>
            <Text style={{ color: colors.textMain }}>関大LMS(公式)</Text>
            <Text style={{ color: colors.textMain }} note numberOfLines={1}>
              KU Learning Management System
            </Text>
          </Body>
          <Right>
            <Button
              transparent
              onPress={openKulms}
              style={{ backgroundColor: colors.buttonColor, borderRadius: 20 }}
            >
              <Text style={{ color: "black", fontWeight: "500" }}>
                サイトへ
              </Text>
            </Button>
          </Right>
        </ListItem>
        <ListItem thumbnail>
          <Body>
            <Text style={{ color: colors.textMain }}>
              インフォメーションシステム
            </Text>
            <Text style={{ color: colors.textMain }} note numberOfLines={1}>
              InformationSystem
            </Text>
          </Body>
          <Right>
            <Button
              transparent
              onPress={openInfoSystem}
              style={{ backgroundColor: colors.buttonColor, borderRadius: 20 }}
            >
              <Text style={{ color: "black", fontWeight: "500" }}>
                サイトへ
              </Text>
            </Button>
          </Right>
        </ListItem>
      </List>
    </Content>
  );
};

export default PublicScreen;
