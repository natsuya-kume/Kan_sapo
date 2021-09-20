import React, { useEffect, useRef } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Toast } from "native-base";
import { Formik } from "formik";
import * as Yup from "yup";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase/app";
import Input from "../components/form/Input";
import Select from "../components/form/Select";
import terms from "../components/form/terms";
import times from "../components/form/times";
import { snapshotToArray } from "../helpers/FirebaseHelpers";
import { useSelector, useDispatch } from "react-redux";
import { loadSelectedSubjects } from "../redux/actions";

// フォームのスキーマ定義
const schema = Yup.object().shape({
  subject: Yup.string().required("授業名を入力してください"),
  term: Yup.number()
    .oneOf(
      terms.map((option) => option.value),
      "学期を選択してください"
    )
    .nullable()
    .required("学期を選択してください"),
  subjectId: Yup.number()
    .oneOf(
      times.map((option) => option.value),
      "授業時間を選択してください"
    )
    .nullable()
    .required("授業時間を選択してください"),
});

const CreateSubjectScreen = (props) => {
  // テーマ取得
  const { colors } = useTheme();

  // 初回レンダリングのフラグ定義
  const renderFlgRef = useRef(false);

  const dispatch = useDispatch();
  // ユーザの取得
  const user = useSelector((state) => state.auth.currentUser);
  // ユーザーが登録した授業情報の取得
  const subjects = useSelector((state) => state.subjects.selectedSubjects);

  useEffect(() => {
    // 授業情報の取得
    const fetchData = async () => {
      const selectedSubjects = await firebase
        .database()
        .ref("selectedSubject")
        .child(user.uid)
        .once("value");
      const selectedSubjectsArray = snapshotToArray(selectedSubjects);
      dispatch(loadSelectedSubjects(selectedSubjectsArray));
      // レンダリングの後にフラグをtrueに変更
      renderFlgRef.current = true;
    };
    fetchData();
    // ユーザーとdispatchが変更されるたびにsubjectを更新
  }, [user, dispatch]);

  // フォームが送信される時の関数 valuesでフォームの入力値を受け取る
  const onSubmit = async (values, actions) => {
    // termsの中の学期を抜き出す
    const string_term = terms[values.term].label;
    // timesの中の授業IDを抜き出す
    const subject_id = times[values.subjectId].value;
    // timesの中の授業時間を抜き出す
    const subject_time = times[values.subjectId].label;

    // valuesオブジェクトをデータベースに保存する形で更新
    values.subjectId = subject_id;
    values.term = string_term + "   " + subject_time;

    try {
      // 授業を登録する時に既に同じ時間に登録した授業があるか確認する
      if (subjects.some((data) => data.subjectId === values.subjectId)) {
        // 既に同じ時間に授業を登録していた場合はフォームをリセットする
        actions.resetForm();
        // トーストを表示する
        return Toast.show({
          text: "その時間には既に授業を登録しています",
          type: "warning",
          buttonText: "OK",
          position: "top",
          duration: 2500,
          style: { marginTop: 20 },
        });
      } else {
        // キーを追加
        const key = await firebase
          .database()
          .ref("selectedSubject")
          .child(user.uid)
          .push().key;

        // ↑で追加したキーの中にnameとして情報を保存
        const setSelectedSubject = await firebase
          .database()
          .ref("selectedSubject")
          .child(user.uid)
          .child(key)
          .set({ name: values, select: true });

        //　授業削除のために必要なkeyを追加する
        const addKey = await firebase
          .database()
          .ref("selectedSubject")
          .child(user.uid)
          .child(key)
          .child("name")
          .update({ key: key });

        // ユーザーごとに授業内容を取得して、配列に変換する
        const selectedSubjects = await firebase
          .database()
          .ref("selectedSubject")
          .child(user.uid)
          .once("value");

        // 配列に変換
        const selectedSubjectsArray = snapshotToArray(selectedSubjects);
        dispatch(loadSelectedSubjects(selectedSubjectsArray));

        // フォームをリセット
        actions.resetForm();
        // トーストを表示する
        return Toast.show({
          text: "授業を追加しました!",
          type: "success",
          buttonText: "OK",
          position: "top",
          duration: 2500,
          style: { marginTop: 20 },
        });
      }
    } catch (error) {
      console.log(error);
    }

    // 送信できたらフォームをリセット
    actions.resetForm();
  };

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <View
        style={{
          position: "absolute",
          zIndex: 2,
          top: 40,
          left: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            props.navigation.openDrawer();
          }}
        >
          <Ionicons name="ios-menu" size={30} color={colors.textMain} />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center", marginTop: 50 }}>
        <Text
          style={{
            color: colors.textMain,
            fontSize: 25,
          }}
        >
          授業の作成
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          width: "100%",
          padding: 24,
          backgroundColor: colors.background,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ width: "100%" }}>
          <Formik
            initialValues={{
              subject: "",
              term: null,
              subjectId: null,
            }}
            validateOnMount
            validationSchema={schema}
            onSubmit={onSubmit}
          >
            {({ handleSubmit, isSubmitting, errors }) => (
              <>
                <Input
                  label="授業名"
                  name="subject"
                  placeholder="授業名を入力してください"
                />
                <Select
                  label="学期"
                  name="term"
                  options={terms}
                  colors={colors}
                />
                <Select
                  label="授業時間"
                  name="subjectId"
                  options={times}
                  colors={colors}
                />
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity onPress={handleSubmit}>
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
                        marginTop: 20,
                      }}
                      title="Sign Up"
                    >
                      <Text
                        style={{
                          fontWeight: "400",
                          color: colors.textMain,
                        }}
                      >
                        この内容で授業を作成する
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateSubjectScreen;
