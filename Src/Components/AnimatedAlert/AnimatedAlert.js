import React, {Component} from 'react';
import {
  AppRegistry,
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import AppStyles from '../../Config/AppStyles';

//import device measurements
import Metrics from '../../Config/Metrics';

// import Images

export default class AnimatedAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      animation: new Animated.Value(0),
      newMessage: null,
      isSuccess: false,
      zIndexValue: false
    };
  }

//   componentWillReceiveProps(nextProps){
//     if(nextProps.error && !nextProps.isLoading){
//       this.handlePress(nextProps.error , '');
//     }
//  }

  handlePress = (message, isSuccess) => {
    this.setState(
      {
        newMessage: message,
        isSuccess: isSuccess,
        zIndexValue:true
      },
      () => {
        Animated.timing(this.state.animation, {
          toValue: 1,
          duration: 350,
        }).start();
      
        setTimeout(() => {
          this.setState({zIndexValue:false});
          Animated.timing(this.state.animation, {
            toValue: 0,
            duration: 350,
          }).start();
        }, 3500)
      },
    );
  };

  render() {
    
    let {newMessage, isSuccess,zIndexValue} = this.state;
    let {errors} = this.props;
    const notificationStyle = {
      opacity: this.state.animation,
    };
    const style = {
      borderColor: isSuccess ? '#84F1B1' : '#DB615C', 
      backgroundColor: isSuccess? '#E1FFEE' : '#FAE2E2',
      top:Metrics.DEVICE_HEIGHT/2.5,
      zIndex:zIndexValue? 1 : 0
    }

    const TextColor = {
      color: isSuccess ? '#0B813D' :'#DB615C',
      textAlign: 'left',
      paddingLeft: 15,
    }

    return (
      <Animated.View
        style={[styles.notification, notificationStyle, style]}
        ref={notification => (this._notification = notification)}>
        <View style={styles.innerView}>
          <View style={{flex: 1}}>
          <Text style={TextColor}>{newMessage}</Text>
          </View>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  notification: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: Metrics.DEVICE_WIDTH-10,
    height:2*Metrics.BTN_HEIGHT,
    borderWidth:0.7,
    // zIndex:1
  },
  notificationTextSuccess: {
    color: '#FFF',
    textAlign: 'left',
    paddingLeft: 15,
  },
  notificationTextSuccess:{
    color: '#0B813D',
    textAlign: 'left',
    paddingLeft: 15,
  },
  lottieView: {
    height: Metrics.DEVICE_HEIGHT / 20,
    width: Metrics.DEVICE_HEIGHT / 20,
    paddingLeft: 15,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerView: {
    flex: 1,
    marginRight: 15,
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'yellow',
  },
});
