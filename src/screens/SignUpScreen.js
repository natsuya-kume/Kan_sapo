// ログインする時のスクリーン
import React, { useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { Form, Item, Input, Label } from "native-base";
import CustomActionButton from "../components/CustomActionButton";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "@react-navigation/native";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const { colors } = useTheme();
  const theme = useTheme();

  const onSignUp = async () => {
    if (email && password) {
      setIsLoading(true);
      try {
        const response = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        if (response) {
          setIsLoading(false);
          firebase.auth().currentUser.sendEmailVerification();

          const user = await firebase
            .database()
            .ref("users/")
            .child(response.user.uid)
            .set({ email: response.user.email, uid: response.user.uid });
          dispatch({ type: "SIGN_IN", payload: response.user });
        }
      } catch (error) {
        setIsLoading(false);

        if (error.code == "auth/email-already-in-use") {
          alert("そのユーザーは既に存在しています。");
        }
      }
    } else {
      alert("メールアドレスとパスワードを入力してください");
    }
  };

  return (
    <View style={styles.container}>
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
              style={{ color: colors.textMain }}
              onChangeText={(password) => setPassword(password)}
            />
          </Item>
        </Form>
      </View>
      <View
        style={{
          alignItems: "center",
          marginTop: 100,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("TermsScreen")}>
          <Text style={{ color: colors.linkColor, fontSize: 15 }}>
            利用規約(必読)
          </Text>
        </TouchableOpacity>
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: colors.textMain }}>
            ※新規登録をした場合、利用規約に同意したものとします
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CustomActionButton
          onPress={onSignUp}
          style={{
            borderWidth: 1,
            marginTop: 100,
            width: 200,
            borderColor: colors.textMain,
          }}
        >
          <Text style={{ fontWeight: "400", color: colors.textMain }}>
            新規登録
          </Text>
        </CustomActionButton>
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  buttonContainer: {
    alignItems: "center",
  },
  signUpButton: {
    borderWidth: 1,
    marginTop: 100,
    width: 200,
  },
});
