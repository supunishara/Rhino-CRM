import React from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from "react-native";

import Metrics from '../../Config/Metrics';
import AppStyles from '../../Config/AppStyles';

 export default class FloatingButtonText extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      value: null,
    }
  }

  componentWillReceiveProps(nextProps){
    console.log("nextProps===isDisabled====>",nextProps.isDisabled);
    this.setState({value: nextProps.value});
  }
  
    render() {
        const { AnimatedText, containerStyle, onPress, isDisabled} = this.props;
        console.log("isDisabled====isDisabled===>",isDisabled);
      return (
        <TouchableOpacity style={containerStyle? containerStyle: styles.inputContainer} onPress={() => {onPress()}} disabled={isDisabled}>
                <Text style={styles.inputs}>{this.state.value}</Text>
                <Text style={styles.inputHeading}>{AnimatedText}</Text>
        </TouchableOpacity>
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
        backgroundColor:'yellow'
      },
      inputs: {
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
  