// SubjectsModal内で表示する授業リストの詳細を表示するコンポーネント
import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { Toast } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

const ListItem = ({ item, onPress, closeModal }) => {
  const { colors } = useTheme();

  // シラバスを開く関数
  const openSyllabus = () => {
    Linking.openURL(item.syllabus).then((supported) => {
      if (!supported) {
        console.log("無効なURLです: " + item.syllabus);
      } else {
        return Linking.openURL(item.syllabus);
      }
    });
  };
  return (
    <View
      style={{
        minHeight: 100,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: colors.buttonColor,
      }}
    >
      <TouchableOpacity onPress={openSyllabus}>
        <View>
          <Entypo name="open-book" size={20} color={colors.buttonColor} />
        </View>
      </TouchableOpacity>
      <View style={{ paddingLeft: 5, width: 200 }}>
        <Text
          style={{ fontSize: 20, fontWeight: "100", color: colors.textMain }}
        >
          {item.subject}
        </Text>
        <Text
          style={{ fontSize: 20, fontWeight: "100", color: colors.textMain }}
        >
          {item.term}
        </Text>
      </View>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={closeModal}
        onPressOut={() =>
          Toast.show({
            text: "授業を追加しました!",
            type: "success",
            buttonText: "OK",
            position: "top",
            duration: 2500,
            style: { marginTop: 20 },
          })
        }
      >
        <View
          style={{
            width: 50,
            height: 40,
            backgroundColor: colors.buttonColor,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>追加</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ListItem;
