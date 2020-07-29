import React from "react";
import {
    TouchableWithoutFeedback,
  StyleSheet,
  View,
  Image,
  Animated
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';


////import Device Dimensions
import Metrics from '../../Config/Metrics';

import AppStyles from '../../Config/AppStyles';

import {Call, SMS, Email, Pencil, Location, ShareIcon} from '../../Config/Images';

 export default class FAB extends React.Component {
//
  constructor(props) {
    super(props);
    this.state = {
    };
    this.animation = new Animated.Value(0);
  }

    toggleMenu = () => {
      let{isTogglingAvailable} = this.props;

      if(isTogglingAvailable || isTogglingAvailable != null){

        const toValue = this.open ? 0 : 1;
        Animated.spring(this.animation ,{
          toValue: toValue,
          friction: 5
        }).start();
  
        this.open = !this.open;
      }else{
        this.props.onPress();
      }
    }
  
    render() {
        let {style, icon, menuStyle, editIcon, onMapPressed,  onEditPressed, onCallPressed, onSMSPressed, onEmailPressed, onSharePressed} = this.props;

        const shareStyle = {
          transform: [
            {scale: this.animation},
            {
              translateY: this.animation.interpolate({
                inputRange:[0, 1],
                outputRange: [0, -60]
              })
            }
          ]
        }

        const LocationStyle = {
          transform: [
            {scale: this.animation},
            {
              translateY: this.animation.interpolate({
                inputRange:[0, 1],
                outputRange: [0, -120]
              })
            }
          ]
        }


        const EditStyle = {
          transform: [
            {scale: this.animation},
            {
              translateY: this.animation.interpolate({
                inputRange:[0, 1],
                outputRange: [0, -180]
              })
            }
          ]
        }

        const EmailStyle = {
          transform: [
            {scale: this.animation},
            {
              translateY: this.animation.interpolate({
                inputRange:[0, 1],
                outputRange: [0, -240]
              })
            }
          ]
        }

        const SMSStyle = {
          transform: [
            {scale: this.animation},
            {
              translateY: this.animation.interpolate({
                inputRange:[0, 1],
                outputRange: [0, -300]
              })
            }
          ]
        }

        const CallStyle = {
          transform: [
            {scale: this.animation},
            {
              translateY: this.animation.interpolate({
                inputRange:[0, 1],
                outputRange: [0, -360]
              })
            }
          ]
        }

        const rotation = {
          transform:[
            {
              rotate: this.animation.interpolate({
                inputRange: [0, 1],
                outputRange:["0deg", "45deg"]
              })
            }
          ]
        }
      return (
        
          <View style={[styles.container, style]}>

              <TouchableWithoutFeedback onPress={() => {onCallPressed()}}>
                  <Animated.View style={[styles.button, menuStyle, styles.secondary, CallStyle ]}>
                      <Image source={Call} style={styles.FABIcon} />
                  </Animated.View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={() => {onSMSPressed()}}>
                  <Animated.View style={[styles.button, menuStyle, styles.secondary, SMSStyle]}>
                      <Image source={SMS} style={styles.FABIcon} />
                  </Animated.View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={() => {onEmailPressed()}}>
                  <Animated.View style={[styles.button, menuStyle, styles.secondary, EmailStyle]}>
                      <Image source={Email} style={styles.FABIcon} />
                  </Animated.View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={() => {onEditPressed()}}>
                  <Animated.View style={[styles.button, menuStyle, styles.secondary, EditStyle]}>
                      <Image source={editIcon} style={styles.FABIcon} />
                  </Animated.View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={() => {onMapPressed()}}>
                  <Animated.View style={[styles.button, menuStyle, styles.secondary, LocationStyle]}>
                      <Image source={Location} style={styles.FABIcon} />
                  </Animated.View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={() => {onSharePressed()}}>
                  <Animated.View style={[styles.button, menuStyle, styles.secondary, shareStyle]}>
                      <Image source={ShareIcon} style={styles.FABIcon} />
                  </Animated.View>
              </TouchableWithoutFeedback>


              <TouchableWithoutFeedback onPress={this.toggleMenu}>
                  <Animated.View style={[styles.button, menuStyle, rotation]}>
                      <Image source={icon} style={styles.FABIcon} />
                  </Animated.View>
              </TouchableWithoutFeedback>
          </View>
        
      );
    }
  }


  const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        position:'absolute'
    },
    button:{
        position:'absolute',
        width:60,
        height:60,
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center',
        shadowRadius:10,
        shadowColor:'#F02A4B',
        shadowOpacity:0.3,
        shadowOffset:{height:10},
    },
    FABIcon:{
      width:Metrics.DEVICE_HEIGHT/40,
      height:Metrics.DEVICE_HEIGHT/40,
    },
    secondary:{
      width: 48,
      height: 48,
      borderRadius:48/2,
    }
  });
  