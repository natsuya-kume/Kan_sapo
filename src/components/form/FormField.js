import React from "react";
import * as PropTypes from "prop-types";
import { View, Text } from "react-native";
import { withFormikControl } from "react-native-formik";
import { useTheme } from "@react-navigation/native";

const FormField = (WrappedComponent) => {
  return withFormikControl(function (props) {
    const { label, error, touched } = props;

    const { colors } = useTheme();

    return (
      <View style={{ width: "100%", marginVertical: 12, paddingBottom: 24 }}>
        <Text
          style={{ fontSize: 16, marginBottom: 10, color: colors.textMain }}
        >
          {label}
        </Text>
        <WrappedComponent {...props} />
        {error && touched ? (
          <Text
            style={{
              position: "absolute",
              color: "tomato",
              fontWeight: "bold",
              fontSize: 12,
              bottom: 0,
            }}
          >
            {error}
          </Text>
        ) : null}
      </View>
    );
  });
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
};

export default FormField;
