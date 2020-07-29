import React from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text
} from "react-native";

import Metrics from '../../Config/Metrics';
import AppStyles from '../../Config/AppStyles';


 export default class FloatingLabelInput extends React.Component {
  
    render() {
        const {onChangeText, value, placeHolder, keyboardType, AnimatedText, isSecureInput,containerStyle,editable,multiline, maxLength} = this.props;
      return (
        <View style={containerStyle? containerStyle: styles.inputContainer}>
            <TextInput
                style={styles.inputs}
                value={value}
                editable={editable}
                keyboardType={keyboardType}
                placeholder={placeHolder}
                underlineColorAndroid="transparent"
                onChangeText={onChangeText}
                secureTextEntry={isSecureInput}
                multiline={multiline}
                maxLength={maxLength}
                />
                <Text style={styles.inputHeading}>{AnimatedText}</Text>
        </View>
      );
    }
  }


  const styles = StyleSheet.create({
    inputContainer: {
        borderColor: '#979797',
        backgroundColor: AppStyles.colorWhite,
        borderRadius: 5,
        borderWidth: 1,
        width: Metrics.DEVICE_WIDTH / 1.2,
        height: 45,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25,
      },
      inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        fontSize: 15,
        // fontFamily: AppStyles.primaryFont,
        color: 'black',
      },
      inputHeading: {
        fontSize: 12,
        color: '#979797',
        backgroundColor: 'white',
        // width: 50,
        marginLeft: 10,
        position: 'absolute',
        top: -9,
        // fontFamily: AppStyles.fontRegular,
      },
  });
  