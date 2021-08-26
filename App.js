import React, { useEffect } from "react";
import { Root } from "native-base";
import { firebaseConfig } from "./src/config/config";
import firebase from "firebase/app";
import { Provider } from "react-redux";
import store from "./src/redux/store";

import Kulms from "./Kulms";

if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);

const App = () => {
  // 学期が変わったらここを変更する
  // useEffect(()=>{
  //   firebase.database().ref('subjectsData').push(
      
  //   )
  // },[])
  return (
    <Provider store={store}>
      <Root>
        <Kulms />
      </Root>
    </Provider>
  );
};

export default App;
