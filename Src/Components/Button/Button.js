import React, {Component, Children} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  Keyboard,
  Fragment,
  Animated,
} from 'react-native';

import AppStyles from '../../Config/AppStyles';

import Metrics from '../../Config/Metrics';

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  getInnerComponent = () => {
    const {text, icon, textStyle, iconStyle} = this.props;
    let innerComponent;
    if (text && icon) {
      innerComponent = (
        <Fragment>
          <View>{icon}</View>
          <Text style={textStyle}>{text}</Text>
        </Fragment>
      );
    } else if (icon) {
      // innerComponent = icon;
      innerComponent = <Image source={icon} style={iconStyle} />;
    }
    return innerComponent;
  };

  setInnerComponent = () => {
    const {text, textStyle, Children} = this.props;
    return <Text style={textStyle}>{text}</Text>;
  };

  renderButton = () => {
    const {type, containerStyle, icon, iconStyle, textStyle, text} = this.props;
    const animatedStyle = {
      opacity: this.state.opacityAnimation,
    };
    switch (type) {
      case 'solid':
        return (
          <View style={containerStyle}>
            <Text style={textStyle}>{text}</Text>
          </View>
        );
      case 'text-only':
        return (
          <View style={containerStyle}>
            <Animated.Text style={[textStyle, animatedStyle]}>
              {text}
            </Animated.Text>
          </View>
        );
      case 'img-only':
        return (
          <View>
            <Image source={icon} style={iconStyle} />
          </View>
        );
      case 'img-text':
        return (
          <View style={containerStyle}>
            <Image source={icon} style={iconStyle} />
            <Text style={textStyle}>{text}</Text>
          </View>
        );
      case 'card':
        return <View style={containerStyle}>{Children}</View>;
    }
  };

  render() {
    const {style, onPress, isBtnDisabled} = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss();
          onPress();
        }}
        disabled={isBtnDisabled}>
        {this.renderButton()}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    height: Metrics.DEVICE_HEIGHT / 8,
    width: Metrics.DEVICE_WIDTH,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
