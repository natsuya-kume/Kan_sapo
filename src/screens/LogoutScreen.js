import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import firebase from "firebase/app";
import "firebase/auth";
import { useTheme } from "@react-navigation/native";

const LogoutScreen = (props) => {
  const { colors } = useTheme();

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
      props.signOut();
    } catch (error) {
      alert("Unable to sign out right now.");
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={signOut}>
        <View
          style={{
            height: 50,
            width: 200,
            borderWidth: 1,
            borderRadius: 50,
            borderColor: colors.textMain,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
          }}
          title="Sign Up"
        >
          <Text style={{ fontWeight: "400", color: colors.textMain }}>
            ログアウト
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch({ type: "SIGN_OUT" }),
  };
};

export default connect(null, mapDispatchToProps)(LogoutScreen);
