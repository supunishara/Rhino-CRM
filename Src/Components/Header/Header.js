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
import LocalStorage from '../../Helpers/LocalStorage';

import AppStyles from '../../Config/AppStyles';

//import device measurements
import Metrics from '../../Config/Metrics';

//import GradientView
import {Button} from '../index';


//default geader types
// 2. LeftImg + Text  = typeSecond
// 3. LeftImg + Text + RightImg = typeThird
// 4. LeftImg + Text + RightTEXT = typeFourth

let localStorage = new LocalStorage();

export default class Header extends Component {

  constructor(props) {
    super(props);
    this.userData = {};
  }

  async componentDidMount(){
    this.userData = await localStorage.getData("userData");
    console.log("---------------userData==============================================================>",userData);
  }


  getInnerComponent = () => {
    const {text, icon, textStyle} = this.props;
    let innerComponent;
    if (text && icon) {
      innerComponent = (
        <Fragment>
          <View>{icon}</View>
          <Text style={textStyle}>{text}</Text>
        </Fragment>
      );
    } else if (text) {
      innerComponent = <Text style={textStyle}>{text}</Text>;
    } else if (icon) {
      innerComponent = icon;
    }
    return innerComponent;
  };

  //
  setInnerComponent() {
    const {
      type,
      leftIcon,
      rightIcon,
      title,
      onLeftPressed,
      onRightPressed,
      RightSideTitle,
      navigation
    } = this.props;
    
    switch (type) {
      case 'typeSecond':
        var that = this;
        return (
          <View style={styles.multiContainer}>
            {/* <Button type="img-only" icon={Close} iconStyle={styles.closeBtn} />
            <Text>Add New Vehicle</Text> */}
            <View style={styles.leftSide}>
              <Button
                type="img-only"
                icon={leftIcon}
                iconStyle={styles.closeBtn}
                onPress={onLeftPressed ? onLeftPressed : () => navigation.navigate('Dashboard')}
              />
            </View>
            <View style={styles.middleSide}>
              <Text style={styles.titleText} numberOfLines={1}>
                {title}
              </Text>
            </View>
          </View>
        );
      case 'typeThird':
        return (
          <View style={styles.multiContainer}>
            <View style={styles.leftSide}>
              <Button
                type="img-only"
                icon={leftIcon}
                iconStyle={styles.typeThirdIcon}
                onPress={onLeftPressed ? onLeftPressed : () => navigation.openDrawer('hi')}
              />
            </View>
            <View style={styles.middleSide}>
              <Text style={styles.titleText} numberOfLines={1}>
                {this.userData.full_name}
              </Text>
            </View>
            <View style={styles.rightSide}>
              <Button
                type="img-only"
                icon={rightIcon}
                iconStyle={styles.typeThirdIcon}
                onPress={onRightPressed}
              />
            </View>
          </View>
        );

      case 'typeFourth':
        return (
          <View style={styles.multiContainer}>
            <View style={styles.leftSide}>
              <Button
                type="img-only"
                icon={leftIcon}
                iconStyle={styles.typeThirdIcon}
                onPress={onLeftPressed}
              />
            </View>
            <View style={styles.middleSide}>
              <Text style={styles.titleText} numberOfLines={1}>
                {title}
              </Text>
            </View>
            <View style={styles.rightTextSide}>
              <Text style={styles.rightSideText} numberOfLines={1}>
                {RightSideTitle}
              </Text>
            </View>
          </View>
        );
    }
  }

  renderHeader = () => {
    const {type, containerStyle} = this.props;

    return (
      <View style={styles.Container}>
        {this.setInnerComponent()}
      </View>
    );
  };
//
  render() {
    const {style} = this.props;
    return <View>{this.renderHeader()}</View>;
  }
}

const styles = StyleSheet.create({
  Container: {
    height: Metrics.HEADER_HEIGHT,
    width: Metrics.DEVICE_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:AppStyles.HeaderColor
  },
  logoImg: {
    height: Metrics.DEVICE_HEIGHT / 8,
    width: Metrics.DEVICE_HEIGHT / 8,
    resizeMode: 'contain',
    position: 'absolute',
    top: 20,
  },
  multiContainer: {
    height: Metrics.DEVICE_HEIGHT / 20,
    width: Metrics.DEVICE_WIDTH,
    flexDirection: 'row',
  },
  closeBtn: {
    height: Metrics.DEVICE_HEIGHT / 30,
    width: Metrics.DEVICE_HEIGHT / 30,
    resizeMode: 'contain',
    backgroundColor:'red'
  },
  typeThirdIcon: {
    height: Metrics.DEVICE_HEIGHT / 35,
    width: Metrics.DEVICE_HEIGHT / 35,
    resizeMode: 'contain',
  },
  leftSide: {
    height: Metrics.DEVICE_HEIGHT / 20,
    width: Metrics.DEVICE_HEIGHT / 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  middleSide: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  rightSide: {
    height: Metrics.DEVICE_HEIGHT / 20,
    width: Metrics.DEVICE_HEIGHT / 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  titleText: {
    fontSize: Metrics.DEVICE_WIDTH > 400 ? 19 : 17,
    color: AppStyles.colorWhite,
    textAlign: 'center',
  },
  rightTextSide: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 20,
  },
  rightSideText: {
    fontSize: Metrics.DEVICE_WIDTH > 400 ? 18 : 16,
    color: AppStyles.colorWhite,
    textAlign: 'center',
  },
});
