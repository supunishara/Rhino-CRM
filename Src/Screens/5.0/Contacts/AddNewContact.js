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
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LocalStorage from '../../../Helpers/LocalStorage';

//import device measurements
import Metrics from '../../../Config/Metrics';
import AppStyles from '../../../Config/AppStyles';

import {Correct, backArrow} from '../../../Config/Images';
//
import { getMultipleDropDownData, sendAddContactData,resetReducer} from '../../../Redux/Actions/AddNewContact.actions';

import {AnimatedAlert, FloatingLabelInput, FAB, DropDown, FloatingButtonText} from '../../../Components/index';

let localStorage = new LocalStorage();
//
class AddNewContact extends Component {

  constructor(props){
    super(props);
    this.colorTheme = {};
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      selectedTitleText:null,
      selectedCompanyText: null,
      f_name: null,
      l_name: null,
      designation: null,
      address: null,
      city: null,
      email: "",
      emailErrorText: null,
      isEmailCorrect: false,
      Phone: null,
      dob: "",
      Notes: null,
      selectedCompanyIndex: null,
      showAlert: false,
      isDateTimePickerVisible: false
    }
    this.resultArray = [];
  }
//
  async componentDidMount(){
    this.colorTheme = await localStorage.getData("ColorTheme");
    this.props.getMultipleDropDownData();
    this.props.resetReducer();
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
    this.props.navigation.navigate('ContactsMain');
 }

  
  componentWillReceiveProps(nextProps){ 
    console.log("nextProps=========>",nextProps);
    if(nextProps){
      if(nextProps.multipleData && nextProps.multipleData.length > 0 && nextProps.multipleData[0].name != undefined){
        this.resultArray = [];
        nextProps.multipleData[0].name.map(result => {
          this.resultArray.push({title: result})
        });
      }
    }
    if(nextProps.data){
      if(nextProps.data.message == 'Adding Successful'){
        this.child.handlePress('Adding Successful', true);
        setTimeout(() => {
          this.props.navigation.reset({
            routes: [{ name: 'Contacts' }],
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
//
  onFABPressed(){
    this.props.resetReducer();
    let {selectedTitleText, f_name, l_name, selectedCompanyIndex, designation, address, city, email, Phone, dob, Notes, isEmailCorrect} = this.state;

    if(!selectedTitleText || !f_name || !l_name || !email || !Phone){
      Alert.alert(
        "Warning !!",
        "Please Fill Missing Title, First Name, Last Name, Email, Phone Fields",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }else if(!isEmailCorrect){
      Alert.alert(
        "Warning !!",
        "Please Enter a correct Email",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }
    else{
      let obj = {
        selectedTitleText: selectedTitleText,
        f_name: f_name,
        l_name: l_name,
        selectedCompanyIndex: selectedCompanyIndex,
        designation: designation,
        address: address,
        city: city,
        email: email,
        Phone: Phone,
        dob: dob,
        Notes: Notes
      }
  
      this.props.sendAddContactData(obj);
    }
  }

 //handle DropDown Changes
 onDropDownChanged = (value, index, data, type) => {
   this.props.resetReducer();
  switch(type){
    case "Title":
      this.setState({selectedTitleText: value});
      break;
    case "Company":
      let id = data[index].id
      this.setState({
        selectedCompanyText: value,
        selectedCompanyIndex: id
      });
      break;
  }
}

validate = (text) => {
  // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  console.log(text.length);
  if (reg.test(text) === false) {
    this.setState({ email: text,  isEmailCorrect: false })
    return false;
  }
  else {
    this.setState({ email: text ,  isEmailCorrect: true})
  }
}

onChangeText(value, type){
  this.props.resetReducer();
  switch(type){
    case "f_name":
      this.setState({f_name: value});
      break; 
    case "l_name":
      this.setState({l_name: value});
      break; 
    case "l_name":
      this.setState({l_name: value});
      break;
    case "designation":
      this.setState({designation: value});
      break; 
    case "address":
      this.setState({address: value});
      break; 
    case "city":
      this.setState({city: value});
      break; 
    case "Phone":
      this.setState({Phone: value});
      break; 
    case "Notes":
      this.setState({Notes: value});
      break;
  }
}

onBackPressed = () =>{
  this.props.navigation.navigate('ContactsMain');
}

//Date Picker methods
showDateTimePicker = () => {
  this.setState({ isDateTimePickerVisible: true });
};

hideDateTimePicker = () => {
  this.setState({ isDateTimePickerVisible: false });
};

handleDatePicked = date => {;
  // console.log(moment(date).format("YYYY-MM-DD"));
  this.setState({dob: moment(date).format("YYYY-MM-DD")});
  this.hideDateTimePicker();
};

  render() {
    let {showAlert, editable, selectedTitleText, selectedCompanyText, f_name, l_name, designation, address, city, email, Phone, dob, Notes, emailErrorText, isEmailCorrect} = this.state;

    let textStyle = {
      color: this.colorTheme ? this.colorTheme : AppStyles.DashboardIconColor
    }

    let ThemeStyle = {
      backgroundColor:this.colorTheme ? this.colorTheme : AppStyles.DashboardIconColor
    }

    let correctStyle = {
      color: AppStyles.colorGreen,
      fontSize: Metrics.DEVICE_WIDTH > 400 ? 14 : 12,
    };

    let inCorrectStyle = {
      color: AppStyles.colorRed,
      fontSize: Metrics.DEVICE_WIDTH > 400 ? 14 : 12,
    };


    let EmailErrorText = isEmailCorrect ? "Email is Correct" : "Email is not Correct";
    let EmailErrorTextStyle = isEmailCorrect ? correctStyle : inCorrectStyle;

    return <View style={styles.Container}>
              <Spinner visible={this.props.isLoading}/>
              <AnimatedAlert
                ref={instance => {this.child = instance}}
                isLoading={this.props.isLoading}
                error={this.props.errors }
              />
            <View style={styles.subContainer}>
              <View style={styles.subContainerInnerView}>

              <View style={styles.TextContainerView}>
                <TouchableOpacity onPress={this.onBackPressed}>
                  <Image source={backArrow} style={styles.backArrow} />
                </TouchableOpacity>
                <View style={{flex:1,justifyContent:'flex-start'}}>
                  <Text style={[styles.contactText, textStyle]}>Add a new Contact</Text>
                  <Text style={styles.leadText}>This contact can be used as a lead</Text>
                  <Text style={styles.leadText}>Please type email and/or phone to look up</Text>
                </View>
              </View>

              <View style={styles.DetailContainerView}>
              
              <KeyboardAwareScrollView
                extraScrollHeight={130}
                showsVerticalScrollIndicator={false}>
                {this.resultArray && this.resultArray.length > 0 ?
                  <DropDown
                          data={this.resultArray}
                          AnimatedText="Title"
                          onChangeText={(value, index, data) => this.onDropDownChanged(value, index, data,'Title')}
                          containerStyle={styles.containerStyle}
                          value={selectedTitleText}
                          lineWidth={0}
                          valueExtractor={({ title }) => title}
                        /> : null}
                
                <FloatingLabelInput 
                    onChangeText={(value) => this.onChangeText(value, 'f_name')}
                    value={f_name}
                    editable={true}
                    keyboardType='default'
                    AnimatedText="First Name"
                    containerStyle={styles.containerStyle}
                    />

                <FloatingLabelInput 
                    onChangeText={(value) => this.onChangeText(value, 'l_name')}
                    value={l_name}
                    editable={true}
                    keyboardType='default'
                    AnimatedText="Last Name"
                    containerStyle={styles.containerStyle}
                    />

                  {this.props.multipleData && this.props.multipleData.length > 0 ? 
                    <DropDown
                    data={this.props.multipleData[1].name}
                    AnimatedText="Company"
                    onChangeText={(value, index, data) => this.onDropDownChanged(value, index, data,'Company')}
                    containerStyle={styles.containerStyle}
                    value={selectedCompanyText}
                    lineWidth={0}
                    valueExtractor={({ business_name }) => business_name}
                    /> : null
                   }
                 
                    
                
                <FloatingLabelInput 
                    onChangeText={(value) => this.onChangeText(value, 'designation')}
                    value={designation}
                    editable={true}
                    keyboardType='default'
                    AnimatedText="Designation"
                    containerStyle={styles.containerStyle}
                    />

                <FloatingLabelInput 
                    onChangeText={(value) => this.onChangeText(value, 'address')}
                    value={address}
                    editable={true}
                    keyboardType='default'
                    AnimatedText="Address"
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
                
                <FloatingLabelInput 
                    onChangeText={(text) => this.validate(text)}
                    value={email}
                    editable={true}
                    keyboardType='default'
                    AnimatedText="Email Address"
                    containerStyle={styles.containerStyle}
                    />

                    {email.length > 0 ? <Text style={EmailErrorTextStyle}>{EmailErrorText}</Text> : null}

                <FloatingLabelInput 
                    onChangeText={(value) => this.onChangeText(value, 'Phone')}
                    value={Phone}
                    editable={true}
                    keyboardType='default'
                    AnimatedText="Phone"
                    containerStyle={styles.containerStyle}
                    maxLength={15}
                    />


                <FloatingButtonText 
                    onPress={this.showDateTimePicker}
                    value={dob} 
                    AnimatedText="Date of Birth"
                    containerStyle={styles.containerStyle}
                    /> 

                  <FloatingLabelInput 
                    onChangeText={(value) => this.onChangeText(value, 'Notes')}
                    value={Notes}
                    editable={editable}
                    keyboardType='default'
                    AnimatedText="Notes"
                    containerStyle={styles.AddressContainerStyle}
                    multiline={true}
                    />

                    <View style={styles.bottomSpaceView}/>
                
                </KeyboardAwareScrollView>

                <FAB style={styles.fabStyle} menuStyle={ThemeStyle} icon={Correct} onPress={() => this.onFABPressed()}/>
              </View>
                
              </View>
            </View>
            <DateTimePicker
                mode="date"
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDateTimePicker}
              />
          </View>;
  }
}

const mapStateToProps = state => {
  return {
    errors: state.AddNewContact.errors,
    data:state.AddNewContact.data,
    isLoading:state.AddNewContact.isLoading,
    multipleData: state.AddNewContact.multipleData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMultipleDropDownData : () => dispatch(getMultipleDropDownData()),
    sendAddContactData : (obj) => dispatch(sendAddContactData(obj)),
    generateSuccessMessage : (value) =>  dispatch(generateSuccessMessage(value)),
    resetReducer : () => dispatch(resetReducer())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(AddNewContact);

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
    marginBottom:5,
    color: AppStyles.colorBlack,
    fontSize: Metrics.DEVICE_WIDTH > 400 ? 14 : 12,
    paddingLeft:10
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
    bottom:Metrics.DEVICE_HEIGHT/10,
    right:Metrics.DEVICE_HEIGHT/30,
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
  },
  bottomSpaceView:{
    width: Metrics.DEVICE_WIDTH-30,
    height:20
  }
});
