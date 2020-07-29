import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Alert,
  Text,
  BackHandler,
  TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LocalStorage from '../../../Helpers/LocalStorage';

//For Dispatching SetTimeout
import store from '../../../Redux/Store/Store';
import {REQUEST_LOADER, FINISH_LOADER} from '../../../Redux/Actions/ActionTypes';

//import device measurements
import Metrics from '../../../Config/Metrics';
import AppStyles from '../../../Config/AppStyles';

import {Correct, backArrow} from '../../../Config/Images';

import {sendAddCompanyData,resetReducer } from '../../../Redux/Actions/AddNewCompany.actions';

import {AnimatedAlert, FloatingLabelInput, FAB, DropDown} from '../../../Components/index';

let localStorage = new LocalStorage();

class AddNewCompany extends Component {

  constructor(props){
    super(props);
    this.colorTheme = {};
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
        business_name: null,
        address: null,
        city: null,
    }
    this.resultArray = [];
  }
//
  async componentDidMount(){
    store.dispatch({ type: REQUEST_LOADER })
    this.colorTheme = await localStorage.getData("ColorTheme");
    console.log("this.colorTheme----=====>",this.colorTheme);
    this.props.resetReducer();

    setTimeout(() => {
      store.dispatch({ type: FINISH_LOADER })
    }, 2000)

    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  ////Android Hardware BackButton Press Event
  handleBackButtonClick() {
    this.props.navigation.navigate('CompanyMain');
  }
  
  componentWillReceiveProps(nextProps){ 
    console.log("nextProps====------------Add New Company----=====>",nextProps);
    if(nextProps.data){
      if(nextProps.data.message == 'Adding Successful'){
        this.child.handlePress('Adding Successful', true);
        setTimeout(() => {
          this.props.navigation.reset({
            routes: [{ name: 'Company' }],
          });
        }, 3500)
      }
    }
    if(nextProps.errors){
      this.child.handlePress(nextProps.errors, false);
      setTimeout(() => {
        this.props.resetReducer();
      }, 3500)
    }
    
  }

  onFABPressed(){
    this.props.resetReducer();
    let {business_name, address, city, phone, email} = this.state;

    if(!business_name || !address || !city){
      Alert.alert(
        "Warning !!",
        "Please Fill Missing Business Name, Registered Address, City Fields",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }else{
      let obj = {
        business_name: business_name,
        address: address,
        city: city,
      }
      this.props.sendAddCompanyData(obj);
    }
  }

onChangeText(value, type){
  this.props.resetReducer();
  switch(type){
    case "business_name":
      this.setState({business_name: value});
      break; 
    case "address":
      this.setState({address: value});
      break; 
    case "city":
      this.setState({city: value});
      break;
  }
}

onBackPressed = () =>{
  this.props.navigation.navigate('CompanyMain');
}

//
  render() {
    let {business_name, address, city} = this.state;

    let textStyle = {
      color: this.colorTheme ? this.colorTheme : AppStyles.DashboardIconColor
    }

    let ThemeStyle = {
      backgroundColor:this.colorTheme ? this.colorTheme : AppStyles.DashboardIconColor
    }
//
    return <View style={styles.Container}>
              <Spinner visible={this.props.isLoading}/>
              <AnimatedAlert
                ref={instance => {this.child = instance}}
                isLoading={this.props.isLoading}
                error={this.props.errors }
              />
               
               <View style={styles.TextContainerView}>
                <TouchableOpacity onPress={this.onBackPressed}>
                  <Image source={backArrow} style={styles.backArrow} />
                </TouchableOpacity>
                <Text style={[styles.contactText, textStyle]}>Add a new Company</Text>
              </View>
              

              <View style={styles.DetailContainerView}>
              
              <KeyboardAwareScrollView
                      extraScrollHeight={130}
                      showsVerticalScrollIndicator={false}>
                
                <FloatingLabelInput 
                    onChangeText={(value) => this.onChangeText(value, 'business_name')}
                    value={business_name}
                    editable={true}
                    keyboardType='default'
                    AnimatedText="Business Name"
                    containerStyle={styles.containerStyle}
                    />

                <FloatingLabelInput 
                    onChangeText={(value) => this.onChangeText(value, 'address')}
                    value={address}
                    editable={true}
                    keyboardType='default'
                    AnimatedText="Registered Address"
                    containerStyle={styles.containerStyle}
                    />
                    
                
                <FloatingLabelInput 
                    onChangeText={(value) => this.onChangeText(value, 'city')}
                    value={city}
                    editable={true}
                    keyboardType='default'
                    AnimatedText="City"
                    containerStyle={styles.containerStyle}
                    />
                
                </KeyboardAwareScrollView>

                <FAB style={styles.fabStyle} menuStyle={ThemeStyle} icon={Correct} onPress={() => this.onFABPressed()}/>
              </View>
            </View>
          
  }
}

const mapStateToProps = state => {
  return {
    errors: state.AddNewCompany.errors,
    data:state.AddNewCompany.data,
    isLoading:state.AddNewCompany.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendAddCompanyData : (obj) => dispatch(sendAddCompanyData(obj)),
    resetReducer : () => dispatch(resetReducer()),
    requestLoader: () => dispatch(requestLoader())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(AddNewCompany);

const styles = StyleSheet.create({
  Container: {
    flex:1,
    width: Metrics.DEVICE_WIDTH,
    justifyContent: 'flex-start',
    alignItems: 'center',
    resizeMode: 'contain',
    backgroundColor:AppStyles.colorWhite
  },
  searchPartContainer:{
      height: Metrics.DEVICE_HEIGHT/15,
      width: Metrics.DEVICE_WIDTH,
  },
  subContainer:{
    flex:1,
    width: Metrics.DEVICE_WIDTH,
  },
  subContainerInnerView:{
    flex:1,
    marginLeft:15,
    marginRight:15,
    marginTop:15,
    marginBottom:15,
    alignItems:'flex-start',
},
TextContainerView:{
  // height: Metrics.DEVICE_HEIGHT/12,
  width: Metrics.DEVICE_WIDTH-30,
  borderBottomWidth:0.9,
  borderBottomColor: AppStyles.colorGray,
  flexDirection: 'row',
  justifyContent:'flex-start',
  alignItems:'center',
  paddingBottom:10
},
DetailContainerView:{
    flex:1,
    width: Metrics.DEVICE_WIDTH-30,
    alignItems:'flex-end'
},
contactText:{
  marginTop:10,
  fontSize: Metrics.DEVICE_WIDTH > 400 ? 20 : 18,
  paddingLeft:10
},
leadText:{
marginTop:5,
  marginBottom:10,
  color: AppStyles.colorBlack,
  fontSize: Metrics.DEVICE_WIDTH > 400 ? 14 : 12,
},
containerStyle:{
    borderColor: '#979797',
    backgroundColor: AppStyles.colorWhite,
    borderRadius: 5,
    borderWidth: 1,
    width: Metrics.DEVICE_WIDTH-30,
    height: 45,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },
  fabStyle:{
    bottom:Metrics.DEVICE_WIDTH/4,
    right:Metrics.DEVICE_WIDTH/10,
  },
  AddressContainerStyle:{
    borderColor: '#979797',
    backgroundColor: AppStyles.colorWhite,
    borderRadius: 5,
    borderWidth: 1,
    width: Metrics.DEVICE_WIDTH-30,
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },
  backArrow:{
    width:Metrics.DEVICE_HEIGHT/40,
    height:Metrics.DEVICE_HEIGHT/40,
    resizeMode:'contain',
    marginTop:10
  }
});
