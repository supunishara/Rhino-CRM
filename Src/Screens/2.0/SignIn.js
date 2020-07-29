import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  ImageBackground,
  Alert
} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import LocalStorage from '../../Helpers/LocalStorage';

import {CheckBox} from 'react-native-elements';

////import device measurements
import Metrics from '../../Config/Metrics';
import AppStyles from '../../Config/AppStyles';

///import common Components
import {
  FloatingLabelInput,
  Button,
  AnimatedAlert
} from '../../Components/index';

//Import Images
import {SignInIcon} from '../../Config/Images';

///import Actions
import {requestLoginData, resetReducer} from '../../Redux/Actions/SignIn.actions';

let localStorage = new LocalStorage();


class SignIn extends Component {
  //making header null
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = {
      userName:'',
      password:'',
      checked:false
    }
  }

  componentDidMount(){
    this.props.resetReducer();
  }

  async componentWillReceiveProps(nextProps){ 
    console.log('nextProps------------->',nextProps);
    if(nextProps.data && nextProps.data != null){
      if(nextProps.data.user && nextProps.data.user != null){
        await localStorage.storeData('userData',nextProps.data.user);
        await localStorage.storeData('DashboardData',nextProps.data);
        this.props.navigation.navigate('Dashboard');
      }
    } 
    
    if(nextProps.errors){
      this.child.handlePress(nextProps.errors, false);
      setTimeout(() => {
        this.props.resetReducer();
      }, 3500)
    }
  }

  //textInput Onchange Events
  onChangeText = (value, type) => {
    switch(type){
      case 'email': 
        this.setState({userName: value});
        break;
      case 'password': 
        this.setState({password: value});
        break;
    }
  }
  
  ///SignUp button Press event
  onSignUpPressed = () => {
    console.log('SignUp Pressed');
  }

  //Forgot Password Press event
  onForgotPasswordPressed = () => {
    console.log('Forgot password Pressed');
  }

  //SignIn Button Press event
  onSignInPressed = async() => {
    this.props.resetReducer();
    let {userName, password, checked} = this.state;
    if(!userName){
      Alert.alert(
        "Error",
        "Please Fill Email",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }else if(!password){
      Alert.alert(
        "Error",
        "Please Fill Password",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }else{
      try{
        if(checked){
          await localStorage.storeData('isStaySignedIn',true);
        }
        let valueObj = {
          userName: userName,
          password: password
        }
        this.props.requestLoginData(valueObj);
      }catch(error){
    
      }
    }
    
  }

  render() {
    let {userName, password,checked} = this.state;
    return (
      <View style={styles.Container}>
      <Spinner
          visible={this.props.isLoading}
        />
      <AnimatedAlert
          ref={instance => {this.child = instance}}
          isLoading={this.props.isLoading}
          error={this.props.errors }
        />
        <View>
          <Image source={SignInIcon} style={styles.Image} />
          <Text style={styles.signtext}>Sign In</Text>
        </View>
        <FloatingLabelInput 
          onChangeText={(value) => this.onChangeText(value, 'email')}
          value={userName}
          placeHolder="UserName"
          keyboardType='default'
          AnimatedText="UserName"
          editable={true}
        />

        <FloatingLabelInput 
          onChangeText={(value) => this.onChangeText(value, 'password')}
          value={password}
          placeHolder="Password"
          keyboardType='default'
          AnimatedText="Password"
          isSecureInput={true}
          editable={true}
        />

      <View style={styles.CheckBoxContainer}>
        <CheckBox
            title="Remember Me"
            // titleProps={{fontFamily: AppStyles.fontRegular}}
            checked={checked}
            onPress={() => this.setState({checked: !checked})}
            checkedColor={AppStyles.primaryColor}
            containerStyle={{backgroundColor:AppStyles.colorWhite, borderColor:AppStyles.colorWhite, marginLeft:0}}
                      />
      </View>

      <Button
              type="solid"
              text="SIGN IN"
              containerStyle={styles.buttonStyle}
              textStyle={styles.signInText}
              onPress={this.onSignInPressed}
            />

      <View style={styles.lowerContainer}>
        <View style={styles.forgotPassContainer}>
          <Button
            type="text-only"
            text="Forgot Password?"
            textStyle={styles.accountText}
            onPress={this.onForgotPasswordPressed}
          />
        </View>
        <View style={styles.signUpContainer}>
          <Button
            type="text-only"
            text="Sign Up"
            textStyle={styles.accountText}
            onPress={this.onSignUpPressed}
          />
        </View>
      </View>
        
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.SignIn.errors,
    data:state.SignIn.data,
    isLoading:state.SignIn.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestLoginData: (values, nextScreen) => dispatch(requestLoginData(values, nextScreen)),
    resetReducer: () => dispatch(resetReducer())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

const styles = StyleSheet.create({
  Container: {
    height: Metrics.DEVICE_HEIGHT,
    width: Metrics.DEVICE_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
    backgroundColor: AppStyles.colorWhite
  },
  passwordTxtInputStyle:{
    width:'70%',
    height:50, 
    backgroundColor:"#FFF",
    borderWidth:0.5,
    borderRadius:5,
    borderColor:"#888888"
  },
  passwordStyleContainer:{
    width:'65%',
    marginLeft:15,
    height:50,
  },
  inputStyle:{
    flex:1,
    height:50,
    fontSize: 15,
    color: "#979797",
    // underlineColorAndroid:"transparent",
    // underlineColorAndroid:'rgba(0,0,0,0)'Lo
  },
  CheckBoxContainer:{
    width: Metrics.DEVICE_WIDTH / 1.2,
    backgroundColor: AppStyles.colorWhite,
    alignItems: 'flex-start',
  },
  buttonStyle: {
    height: Metrics.BTN_HEIGHT,
    width: Metrics.DEVICE_WIDTH / 1.2,
    backgroundColor: AppStyles.colorGreen,
    borderRadius: Metrics.BORDER_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    fontSize: Metrics.DEVICE_WIDTH > 400 ? 16 : 14,
    color: AppStyles.colorWhite,
    textAlign: 'center',
    // fontFamily: 'SFProDisplay-Bold',
  },
  lowerContainer:{
    width: Metrics.DEVICE_WIDTH / 1.2,
    height:45,
    flexDirection:'row',
  },
  forgotPassContainer:{
    flex:1,
    alignItems:'flex-start',
    justifyContent:'center'
  },
  signUpContainer:{
    flex:1,
    alignItems:'flex-end',
    justifyContent:'center'
  },
  accountText: {
    fontSize: Metrics.DEVICE_WIDTH > 400 ? 14 : 12,
    color: AppStyles.colorGreen,
    textAlign: 'center',
  },
  Image: {
    height: Metrics.DEVICE_HEIGHT / 15,
    width: Metrics.DEVICE_HEIGHT / 15,
    resizeMode: 'contain',
  },
  signtext:{
    fontSize: Metrics.DEVICE_WIDTH > 400 ? 20 : 18,
    textAlign: 'center',
    marginBottom:20
  }
});
