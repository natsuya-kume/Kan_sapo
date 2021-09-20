import React from "react";
import * as PropTypes from "prop-types";
import { TextInput } from "react-native";
import FormField from "./FormField";
import { useTheme } from "@react-navigation/native";

const Input = (props) => {
  const { placeholder, value, setFieldValue, setFieldTouched } = props;
  const { colors } = useTheme();
  return (
    <TextInput
      style={{
        width: "100%",
        height: 50,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: colors.textMain,
        borderRadius: 4,
        fontSize: 16,
        color: colors.textMain,
      }}
      placeholder={placeholder}
      placeholderTextColor="grey"
      autoCapitalize="none"
      onChangeText={setFieldValue}
      onBlur={() => setFieldTouched(true)}
      value={value}
    />
  );
};

Input.defaultProps = {
  placeholder: "",
  value: "",
};

Input.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  setFieldValue: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
};

export default FormField(Input);
