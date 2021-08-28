// ログインする時のスクリーン
import React, { useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { Form, Item, Input, Label } from "native-base";
import CustomActionButton from "../components/CustomActionButton";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { useDispatch } from "react-redux";
import { useTheme } from "@react-navigation/native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const { colors } = useTheme();
  const theme = useTheme();

  const onSignIn = async () => {
    if (email && password) {
      setIsLoading(true);
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        if (response) {
          setIsLoading(false);
          dispatch({ type: "SIGN_IN", payload: response.user });
        }
      } catch (error) {
        setIsLoading(false);

        switch (error.code) {
          case "auth/user-not-found":
            alert(
              "そのユーザーは存在しません。メールアドレス・パスワードが正しいことを確認してください。"
            );
            break;
          case "auth/invalid-email":
            alert("メールアドレスとパスワードを入力してください");
            break;
          default:
            alert("エラー");
        }
      }
    } else {
      alert("メールアドレスとパスワードを入力してください");
    }
  };

  return (
    <View style={{ flex: 1, marginTop: 10 }}>
      {isLoading ? (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              elevation: 1000,
            },
          ]}
        >
          <ActivityIndicator size="large" color="#7acbe1" />
        </View>
      ) : null}
      <View style={{ justifyContent: "center" }}>
        <View style={{ marginHorizontal: 5 }}>
          <Form>
            <Item floatingLabel>
              <Label style={{ color: colors.textMain, opacity: 0.8 }}>
                メールアドレス
              </Label>
              <Input
                onChangeText={(email) => setEmail(email)}
                style={{ color: colors.textMain }}
              />
            </Item>
            <Item floatingLabel>
              <Label style={{ color: colors.textMain, opacity: 0.8 }}>
                パスワード
              </Label>
              <Input
                secureTextEntry
                onChangeText={(password) => setPassword(password)}
                style={{ color: colors.textMain }}
              />
            </Item>
          </Form>
        </View>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <CustomActionButton
            onPress={onSignIn}
            style={{
              borderWidth: 1,
              backgroundColor: "transparent",
              marginTop: 20,
              width: 200,
              borderColor: colors.textMain,
            }}
          >
            <Text style={{ fontWeight: "400", color: colors.textMain }}>
              ログイン
            </Text>
          </CustomActionButton>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
