// 科目編集画面のコンポーネント
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  LogBox,
  StatusBar,
} from "react-native";
import {
  Form,
  Item,
  Input,
  Icon,
  Textarea,
  Toast,
  Picker,
  Header,
  Left,
  Body,
  Button,
  Title,
  Right,
} from "native-base";
import { AntDesign, Entypo } from "@expo/vector-icons";
import firebase from "firebase/app";
import { useSelector } from "react-redux";
import { useTheme } from "@react-navigation/native";

const EditSubject = (props) => {
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  });

  // 編集情報の管理
  const [classroom, setClassroom] = useState(props.editData.classroom);
  const [memo, setMemo] = useState(props.editData.memo);
  const [absentCount, setAbsentCount] = useState(props.editData.absentCount);
  const [backgroundColor, setBackgroundColor] = useState(
    props.editData.backgroundColor
  );
  const user = useSelector((state) => state.auth.currentUser);
  const { colors } = useTheme();
  const theme = useTheme();

  // シラバスを開く関数
  const openSyllabus = () => {
    Linking.openURL(props.editData.syllabus).then((supported) => {
      if (!supported) {
        console.log("無効なURLです: " + props.editData.syllabus);
      } else {
        return Linking.openURL(props.editData.syllabus);
      }
    });
  };

  // 科目を消す関数　引数にはdb内のユーザーデータを受け取る
  const deleteSubject = async (editData) => {
    // 削除する授業のキーを取得
    const editDataKey = editData.key;
    try {
      await firebase
        .database()
        .ref("selectedSubject")
        .child(user.uid)
        .child(editDataKey)
        .remove();
    } catch (error) {
      console.log(error);
    }
  };

  // 科目教室を保存する関数　引数にはdb内のユーザーデータと入力された教室情報を受け取る
  const saveClassroom = async (classroom, editData) => {
    // 削除する授業のキーを取得
    const editDataKey = editData.key;

    try {
      await firebase
        .database()
        .ref("selectedSubject")
        .child(user.uid)
        .child(editDataKey)
        .child("name")
        .update({ classroom: classroom });
    } catch (error) {
      console.log(error);
    }
  };

  // メモを保存する関数　引数にはdb内のユーザーデータと入力されたメモ情報を受け取る
  const saveMemo = async (memo, editData) => {
    const editDataKey = editData.key;

    try {
      await firebase
        .database()
        .ref("selectedSubject")
        .child(user.uid)
        .child(editDataKey)
        .child("name")
        .update({ memo: memo });
    } catch (error) {
      console.log(error);
    }
  };

  // 欠席回数を保存する関数 引数にはdb内のユーザーデータと入力された欠席回数の情報を受け取る
  const saveAbsentCount = async (absentCount, editData) => {
    const editDataKey = editData.key;

    try {
      await firebase
        .database()
        .ref("selectedSubject")
        .child(user.uid)
        .child(editDataKey)
        .child("name")
        .update({ absentCount: absentCount });
    } catch (error) {
      console.log(error);
    }
  };

  const saveBackgroundColor = async (backgroundColor, editData) => {
    const editDataKey = editData.key;

    try {
      await firebase
        .database()
        .ref("selectedSubject")
        .child(user.uid)
        .child(editDataKey)
        .child("name")
        .update({ backgroundColor: backgroundColor });
    } catch (error) {
      console.log(error);
    }
  };

  // 入力された教室情報を取得
  const getRoomInfo = (classroom) => {
    setClassroom(classroom);
  };

  // 入力されたメモ情報を取得
  const getMemoInfo = (memo) => {
    setMemo(memo);
  };

  // 入力された欠席情報を取得
  const getAbsentInfo = (absentCount) => {
    setAbsentCount(absentCount);
  };

  const onValueChange = (value) => {
    setBackgroundColor(value);
  };

  return (
    <View
      style={{
        backgroundColor: colors.background,
        height: 550,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
      }}
    >
      <TouchableOpacity onPress={props.nav} style={styles.closeButton}>
        <View>
          <AntDesign
            name="close"
            size={30}
            style={{ borderRadius: 50, color: colors.textMain }}
          />
        </View>
      </TouchableOpacity>
      <View>
        <Text
          style={{
            marginTop: 20,
            fontSize: 20,
            fontWeight: "300",
            textAlign: "center",
            color: colors.textMain,
          }}
        >
          授業の編集
        </Text>
      </View>

      <ScrollView>
        <View style={styles.infoContainer}>
          <Text
            style={{ fontSize: 20, fontWeight: "100", color: colors.textMain }}
          >
            授業名：{props.editData.subject}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text
            style={{ fontSize: 20, fontWeight: "100", color: colors.textMain }}
          >
            開講時限：{props.editData.term}
          </Text>
        </View>

        <View style={styles.editClassroomContaimer}>
          <Text
            style={{ fontSize: 20, fontWeight: "100", color: colors.textMain }}
          >
            授業教室：
          </Text>

          <View>
            <Form style={styles.searchInput}>
              <Item>
                <Input
                  value={classroom}
                  onChangeText={getRoomInfo}
                  style={{ color: colors.textMain }}
                />
              </Item>
            </Form>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => saveClassroom(classroom, props.editData)}
              onPressIn={() =>
                Toast.show({
                  text: "教室を保存しました",
                  buttonText: "OK",
                })
              }
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderColor: colors.textMain,
                  borderWidth: 1,
                  borderRadius: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 10,
                }}
              >
                <Text style={{ color: colors.textMain }}>保存</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.editClassroomContaimer}>
          <Text
            style={{ fontSize: 20, fontWeight: "100", color: colors.textMain }}
          >
            メモ：
          </Text>

          <View>
            <Form style={styles.textArea}>
              <Textarea
                value={memo}
                onChangeText={getMemoInfo}
                rowSpan={3}
                bordered
                style={{ color: colors.textMain }}
              />
            </Form>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => saveMemo(memo, props.editData)}
              onPressIn={() =>
                Toast.show({
                  text: "メモを保存しました",
                  buttonText: "OK",
                })
              }
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderColor: colors.textMain,
                  borderWidth: 1,
                  borderRadius: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 10,
                }}
              >
                <Text style={{ color: colors.textMain }}>保存</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.editClassroomContaimer}>
          <Text
            style={{ fontSize: 20, fontWeight: "100", color: colors.textMain }}
          >
            欠席回数：
          </Text>
          <View>
            <Form style={styles.searchInput}>
              <Item>
                <Input
                  keyboardType="number-pad"
                  value={absentCount}
                  onChangeText={getAbsentInfo}
                  style={{ color: colors.textMain }}
                />
              </Item>
            </Form>
          </View>
          <TouchableOpacity
            onPress={() => saveAbsentCount(absentCount, props.editData)}
            onPressIn={() =>
              Toast.show({
                text: "欠席回数を保存しました",
                buttonText: "OK",
              })
            }
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderColor: colors.textMain,
                borderWidth: 1,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 10,
              }}
            >
              <Text style={{ color: colors.textMain }}>保存</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.editClassroomContaimer}>
          <Text
            style={{ fontSize: 20, fontWeight: "100", color: colors.textMain }}
          >
            背景色：
          </Text>
          <View>
            <Picker
              renderHeader={(backAction) => (
                <Header style={{ backgroundColor: colors.background }}>
                  <StatusBar
                    barStyle={theme.dark ? "light-content" : "dark-content"}
                  />
                  <Left>
                    <Button transparent onPress={backAction}>
                      <Icon
                        name="arrow-back"
                        style={{ color: colors.textMain }}
                      />
                    </Button>
                  </Left>
                  <Body style={{ flex: 3 }}>
                    <Title style={{ color: colors.textMain }}>
                      背景色を選択
                    </Title>
                  </Body>
                  <Right />
                </Header>
              )}
              mode="dropdown"
              iosIcon={
                <Icon name="arrow-down" style={{ color: colors.textMain }} />
              }
              selectedValue={backgroundColor}
              onValueChange={onValueChange}
              textStyle={{ color: colors.textMain }}
              itemTextStyle={{ color: colors.textMain }}
              modalStyle={{ backgroundColor: colors.background }}
            >
              <Picker.Item label="黒色" value="#2B3044" />
              <Picker.Item label="灰色" value="#ddd" />
              <Picker.Item label="黄色" value="yellow" />
              <Picker.Item label="緑色" value="lawngreen" />
              <Picker.Item label="桃色" value="pink" />
              <Picker.Item label="紫色" value="#dbed" />
              <Picker.Item label="赤色" value="tomato" />
            </Picker>
          </View>
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: backgroundColor,
                borderRadius: 50,
                width: 20,
                height: 20,
              }}
            >
              <Text></Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => saveBackgroundColor(backgroundColor, props.editData)}
            onPressIn={() =>
              Toast.show({
                text: "背景色を保存しました",
                buttonText: "OK",
              })
            }
            onPressOut={props.nav}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderColor: colors.textMain,
                borderWidth: 1,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 10,
              }}
            >
              <Text style={{ color: colors.textMain }}>保存</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottom}>
        <TouchableOpacity
          onPress={() => deleteSubject(props.editData)}
          onPressIn={props.nav}
          onPressOut={() =>
            Toast.show({
              text: "削除しました",
              buttonText: "OK",
              position: "bottom",
            })
          }
        >
          <View
            style={{
              height: 50,
              backgroundColor: colors.deleteButtonColor,
              paddingHorizontal: 5,
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 30,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Icon name="trash" />
            <Text style={{ textAlign: "center" }}>この授業を削除</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={openSyllabus}>
          <View
            style={{
              height: 50,
              backgroundColor: colors.buttonColor,
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 30,
              display: "flex",
              flexDirection: "row",
              paddingHorizontal: 5,
            }}
          >
            <Entypo size={24} name="open-book" />
            <Text style={{ textAlign: "center" }}>シラバスを参照</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditSubject;

const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    marginRight: 5,
    top: 5,
    right: 0,
  },
  infoContainer: {
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "100",
  },
  searchInput: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    width: 150,
    borderColor: "black",
    paddingHorizontal: 20,
  },
  editClassroomContaimer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  textArea: {
    width: 180,
  },
  deleteButton: {
    height: 50,
    // backgroundColor: "pink",
    backgroundColor: "tomato",
    paddingHorizontal: 5,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    display: "flex",
    flexDirection: "row",
  },
  saveButton: {
    width: 40,
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
