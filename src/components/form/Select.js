import React, { PureComponent } from "react";
import * as PropTypes from "prop-types";
import {
  Dimensions,
  FlatList,
  Modal,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import FormField from "./FormField";

class Select extends PureComponent {
  state = {
    active: false,
    colors: "",
  };

  /**
   * ドロップダウンを表示
   */
  open = () => {
    // 絶対座標で表示するために要素の位置・サイズを取得
    this.currentComponent.measureInWindow((x, y, width, height) => {
      const { maxHeight, minHeight, options } = this.props;
      const windowHeight = Dimensions.get("window").height;
      let modalY = y;
      const modalMinHeight = minHeight
        ? Math.min(options.length * height, minHeight)
        : null;
      let modalMaxHeight = Math.min(windowHeight - y, maxHeight);
      if (modalMinHeight > modalMaxHeight) {
        // 選択肢が下に見切れる場合は上向きに表示する
        modalMaxHeight = Math.min(y + height, maxHeight);
        modalY = y + height - modalMaxHeight;
      }
      this.setState({
        active: true,
        x,
        y: modalY,
        width,
        height,
        minHeight: modalMinHeight,
        maxHeight: modalMaxHeight,
      });
    });
  };

  /**
   * ドロップダウンを非表示
   */
  dismiss = () => {
    const { setFieldTouched } = this.props;
    setFieldTouched(true);
    this.setState({ active: false });
  };

  render() {
    const { active, x, y, width, height, minHeight, maxHeight } = this.state;
    const { value, options, placeholder, setFieldValue, colors } = this.props;
    const selectedOption = options[value];

    if (this.props.colors) {
      this.setState({ colors: colors });
    }

    return (
      <View style={{ position: "relative", width: "100%" }}>
        <TouchableOpacity onPress={this.open}>
          <View>
            <Text
              ref={(component) => {
                this.currentComponent = component;
              }}
              style={{
                width: "100%",
                height: 50,
                lineHeight: 50,
                justifyContent: "center",
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: this.state.colors.textMain,
                backgroundColor: this.state.colors.background,
                borderRadius: 4,
                fontSize: 16,
                color: this.state.colors.textMain,
              }}
              suppressHighlighting
            >
              {selectedOption ? selectedOption.label : placeholder}
            </Text>
            <Icon
              name="ios-arrow-down"
              color={this.state.colors.textMain}
              size={24}
              style={{ position: "absolute", top: 13, right: 16 }}
            />
          </View>
        </TouchableOpacity>
        <Modal visible={active} transparent={true}>
          <View style={{ width: "100%", height: "100%" }}>
            <TouchableWithoutFeedback onPressIn={this.dismiss}>
              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  top: 0,
                  left: 0,
                }}
              />
            </TouchableWithoutFeedback>
            <View
              style={[
                {
                  position: "absolute",
                  height: "100%",
                  zIndex: 1,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: this.state.colors.textMain,
                  shadowColor: "black",
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                  shadowOffset: {
                    width: 2,
                    height: 2,
                  },
                  elevation: 4,
                },
                {
                  left: x,
                  top: y,
                  width: width,
                  minHeight,
                  maxHeight,
                },
              ]}
            >
              <FlatList
                data={options}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      width: "100%",
                      height: 1,
                      backgroundColor: colors.textMain,
                    }}
                  />
                )}
                keyExtractor={(item) => item.label}
                initialScrollIndex={value}
                getItemLayout={(data, index) => ({
                  length: height,
                  offset: height * index,
                  index,
                })}
                style={{
                  backgroundColor: this.state.colors.background,
                  borderRadius: 4,
                }}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => {
                      this.dismiss();
                      setFieldValue(index);
                    }}
                    key={index}
                  >
                    <Text
                      style={{
                        width: "100%",
                        height: 49,
                        lineHeight: 49,
                        justifyContent: "center",
                        paddingHorizontal: 10,
                        backgroundColor: this.state.colors.background,
                        color: this.state.colors.textMain,
                        fontSize: 16,
                      }}
                      suppressHighlighting
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

Select.defaultProps = {
  selectedIndex: -1,
  maxHeight: 225,
  minHeight: 125,
  placeholder: "学期を選択してください",
};

Select.propTypes = {
  // value: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  maxHeight: PropTypes.number,
};

export default FormField(Select);
