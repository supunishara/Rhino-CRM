import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  Keyboard,
  Fragment,
} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';

import AppStyles from '../../Config/AppStyles';

//import device measurements
import Metrics from '../../Config/Metrics';

////import GradientView

export default class DropDown extends Component {

  constructor(props){
    super(props);
  }
  render() {
    const {titleStyle, AnimatedText, data, onChangeText, valueExtractor,containerStyle,labelExtractror, value, itemTextStyle, dropDownItem} = this.props;
    return (
        <View style={containerStyle? containerStyle: styles.inputContainer}>
            <Dropdown
              onChangeText={onChangeText}
              data={data}
              dropdownOffset={styles.dropdownOffset}
              valueExtractor={valueExtractor}
              labelExtractror={labelExtractror}
              lineWidth={0}
              value={value}
            //   overlayStyle={styles.containerStyle}
              itemPadding={10}
              containerStyle={itemTextStyle ? itemTextStyle : styles.itemTextStyle}
              dropDownItemStyle={dropDownItem ? dropDownItem : styles.dropDownItem}
              itemTextStyle={dropDownItem ? dropDownItem : styles.dropDownItem}
              // pickerStyle={dropDownItem}
              itemColor={AppStyles.colorBlack}
              selectedItemColor="#000"
              disabledItemColor="#000"
              itemColor="#000"
            />
                <Text style={styles.inputHeading}>{AnimatedText}</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({ 
  textInputContainer: {
    height: Metrics.BTN_HEIGHT,
    width: Metrics.DEVICE_WIDTH -30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 10,
    borderRadius: Metrics.BORDER_RADIUS,
    borderWidth: 0.3,
    borderColor: '#979797',
    flexDirection: 'row',
  },
  descriptionPart: {
    flex: 1,
  },
  containerStyle: {
    height: Metrics.BTN_HEIGHT,
    width: Metrics.DEVICE_WIDTH -30,
  },
  dropdownOffset: {
    top: Metrics.BTN_HEIGHT / 3,
    left: 5,
  },
  itemTextStyle: {
    marginLeft: 10,
    width: Metrics.DEVICE_WIDTH -45,
    height: Metrics.BTN_HEIGHT,
    justifyContent:'center',
    // alignItems:'center',
  },
  dropDownItem:{
    width: Metrics.DEVICE_WIDTH -45,
    height: Metrics.BTN_HEIGHT,
    justifyContent:'center',
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
