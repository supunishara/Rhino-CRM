import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Image,
  Text,
  BackHandler,
  TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

//import device measurements
import Metrics from '../../../Config/Metrics';
import AppStyles from '../../../Config/AppStyles';

import {Pencil, Correct, backArrow} from '../../../Config/Images';

import {AnimatedAlert, FloatingLabelInput, FAB, DropDown, FloatingButtonText} from '../../../Components/index';

import {requestContactsDataWithId, getMultipleDropDownData, resetReducer, sendUpdateContactData} from '../../../Redux/Actions/ViewContact.actions';

class ViewContact extends Component {
//
  constructor(props){
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      editable:false,
      selectedTitleText: null,
      selectedCompanyText: null,
      selectedCompanyIndex: null,

      first_name: null,
      last_name: null,
      Designation: null,
      address: null,
      city: null,
      email: null,
      phone: null,
      dob: moment(new Date().getDate()).format("YYYY-MM-DD"),
      notes: null,
      isDateTimePickerVisible: false
    }
    this.resultArray = [];
    this.companyArray = [];
  }

  componentDidMount(){
    const item = this.props.route.params.item;
    this.props.getMultipleDropDownData();
    this.props.requestContactsDataWithId(item.id);
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

  //Android Hardware BackButton Press Event
  handleBackButtonClick() {
    this.props.navigation.navigate('ContactsMain');
 }

  componentWillReceiveProps(nextProps){ 
    console.log("nextProps===========",nextProps);
    this.resultArray = [];
    this.companyArray = [];

    if(nextProps.multipleData && nextProps.multipleData.length > 0 && !nextProps.isLoading){
      
      nextProps.multipleData[0].name.map(result => {
        this.resultArray.push({title: result})
      });

      this.companyArray = nextProps.multipleData[1].name;

    }
    if(nextProps.errors){
      this.child.handlePress(nextProps.errors, false);
      setTimeout(() => {
        this.props.resetReducer();
      }, 3500)
    }

    if(nextProps.data){
      if(nextProps.data.message == 'Updating Successful'){
        this.child.handlePress('Updating Successful', true);
        setTimeout(() => {
          this.props.navigation.reset({
            routes: [{ name: 'Contacts' }],
          });
        }, 3500)
      }
    }
    if(nextProps.data.contact){
      console.log("nextProps.data.contact===========",nextProps.data.contact);
      this.setState({
        first_name: nextProps.data.contact.first_name,
        last_name: nextProps.data.contact.last_name,
        Designation: nextProps.data.contact.designation,
        address: nextProps.data.contact.address,
        city: nextProps.data.contact.city,
        email: nextProps.data.contact.email,
        phone: nextProps.data.contact.phone,
        dob: nextProps.data.contact.dob,
        notes: nextProps.data.contact.notes,
      });

    }
  }
//
  onFABPressed(){
    let {editable, selectedTitleText, first_name, last_name, selectedCompanyIndex, Designation, address, city, email, phone, dob, notes} = this.state;
    this.setState({
      editable: true
    });

    const item = this.props.route.params.item;
    console.log("item.id==========item.id==========item.id",item.id);
    if(editable){
      if(!selectedTitleText || !first_name || !last_name || !email || !phone){
        Alert.alert(
          "Warning !!",
          "Please Fill Missing Title, First Name, Last Name, Email, Phone Fields",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );
      }else{
        let obj = {
          id: item.id,
          selectedTitleText: selectedTitleText,
          first_name: first_name,
          last_name: last_name,
          selectedCompanyIndex: selectedCompanyIndex,
          Designation: Designation,
          address: address,
          city: city,
          email: email,
          phone: phone,
          dob: dob,
          notes: notes,
          isEditable: this.props.data.isEditable
        }
        this.props.sendUpdateContactData(obj);
      }
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
        this.setState({selectedCompanyText: value,
          selectedCompanyIndex: id});
        break;
    }
  }

  onChangeText(value, type){
    this.props.resetReducer();
    switch(type){
      case "first_name":
        this.setState({first_name: value});
        break; 
      case "last_name":
        this.setState({last_name: value});
        break; 
      case "Designation":
        this.setState({Designation: value});
        break; 
      case "address":
        this.setState({address: value});
        break; 
      case "city":
        this.setState({city: value});
        break; 
      case "email":
        this.setState({email: value});
        break; 
      case "phone":
        this.setState({phone: value});
        break; 
      case "dob":
        this.setState({dob: value});
        break; 
      case "notes":
        this.setState({notes: value});
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
    this.setState({dob: moment(date).format("YYYY-MM-DD")});
    this.hideDateTimePicker();
  };
//
  renderData(){
    
    let {editable, selectedTitleText, selectedCompanyText, first_name, last_name, Designation, address, city, email, phone, dob, notes} = this.state;
    if(!this.props.isLoading && this.props.data && this.props.data != null ){
      return(
            <View style={styles.subContainerInnerView}>

              <View style={styles.TextContainerView}>
                <TouchableOpacity onPress={this.onBackPressed}>
                  <Image source={backArrow} style={styles.backArrow} />
                </TouchableOpacity>
                <View style={{flex:1,justifyContent:'flex-start'}}>
                  {!editable ? <Text style={styles.contactText}>View Contact</Text>: <Text style={styles.contactText}>Edit Contact</Text>}
                  <Text style={styles.leadText}>This contact can be used as a lead</Text>
                </View>
              </View>

              <View style={styles.DetailContainerView}>
              <KeyboardAwareScrollView
                extraScrollHeight={130}
                showsVerticalScrollIndicator={false}>
                  {/* {!editable ? <FloatingLabelInput 
                    // onChangeText={(value) => this.onChangeText(value, 'email')}
                    value={this.props.data.contact && this.props.data.contact != null ? this.props.data.contact.title : "-"}
                    editable={editable}
                    keyboardType='default'
                    AnimatedText="Title"
                    containerStyle={styles.containerStyle}
                    /> :
                        <DropDown
                          data={this.resultArray && this.resultArray.length > 0 ? this.resultArray : null}
                          AnimatedText="Title"
                          containerStyle={styles.containerStyle}
                          onChangeText={(value, index, data) => this.onDropDownChanged(value, index, data,'Title')}
                          value={selectedTitleText}
                          lineWidth={0}
                          valueExtractor={({ title }) => title}
                        />  } */}

                  <FloatingLabelInput 
                    onChangeText={(value) => this.onChangeText(value, 'first_name')}
                    value={first_name}
                    editable={editable}
                    keyboardType='default'
                    AnimatedText="First Name"
                    containerStyle={styles.containerStyle}
                    /> 

                  <FloatingLabelInput 
                    onChangeText={(value) => this.onChangeText(value, 'last_name')}
                    value={last_name}
                    editable={editable}
                    keyboardType='default'
                    AnimatedText="Last Name"
                    containerStyle={styles.containerStyle}
                    />

                  {/* {!editable ? <FloatingLabelInput 
                    // onChangeText={(value) => this.onChangeText(value, 'email')}
                    value={this.props.data.contact && this.props.data.contact != null ? this.props.data.contact.business_name : "-"}
                    editable={editable}
                    keyboardType='default'
                    AnimatedText="Company"
                    containerStyle={styles.containerStyle}
                    />:this.companyArray && this.companyArray.length > 0 ? 
                       <DropDown
                          data={this.companyArray}
                          AnimatedText="Company"
                          onChangeText={(value, index, data) => this.onDropDownChanged(value, index, data,'Company')}
                          containerStyle={styles.containerStyle}
                          value={selectedCompanyText}
                          lineWidth={0}
                          valueExtractor={({ business_name }) => business_name}
                        /> : null} */}

                  <FloatingLabelInput 
                    onChangeText={(value) => this.onChangeText(value, 'Designation')}
                    value={Designation}
                    editable={editable}
                    keyboardType='default'
                    AnimatedText="Designation"
                    containerStyle={styles.containerStyle}
                    />

                  <FloatingLabelInput 
                    onChangeText={(value) => this.onChangeText(value, 'address')}
                    value={address}
                    editable={editable}
                    keyboardType='default'
                    AnimatedText="Address"
                    containerStyle={styles.AddressContainerStyle}
                    multiline={true}
                    />

                  <FloatingLabelInput 
                    onChangeText={(value) => this.onChangeText(value, 'city')}
                    value={city}                   
                    editable={editable}
                    keyboardType='default'
                    AnimatedText="City"
                    containerStyle={styles.containerStyle}
                    />  

                  <FloatingLabelInput 
                    onChangeText={(value) => this.onChangeText(value, 'email')}
                    value={email}   
                    editable={editable}
                    keyboardType='default'
                    AnimatedText="Email Address"
                    containerStyle={styles.containerStyle}
                    />

                  <FloatingLabelInput 
                    onChangeText={(value) => this.onChangeText(value, 'phone')}
                    value={phone} 
                    editable={editable}
                    keyboardType='default'
                    AnimatedText="Phone"
                    containerStyle={styles.containerStyle}
                    />

                  <FloatingButtonText 
                    onPress={this.showDateTimePicker}
                    value={dob} 
                    AnimatedText="Date of Birth"
                    containerStyle={styles.containerStyle}
                    isDisabled={!editable}
                    /> 

                  <FloatingLabelInput 
                    onChangeText={(value) => this.onChangeText(value, 'notes')}
                    value={notes} 
                    editable={editable}
                    keyboardType='default'
                    AnimatedText="Notes"
                    containerStyle={styles.AddressContainerStyle}
                    multiline={true}
                    />

                </KeyboardAwareScrollView>
                {this.props.data.isEditable && this.props.data.isEditable != null ? <FAB style={styles.fabStyle} icon={editable ? Correct :Pencil} onPress={() => this.onFABPressed()}/> : null} 
              </View>
            </View>
      );
    }
  }

  render() {
    return <View style={styles.Container}>
              <Spinner visible={this.props.isLoading}/>
              <AnimatedAlert
                ref={instance => {this.child = instance}}
                isLoading={this.props.isLoading}
                error={this.props.errors }
              />
              <View style={styles.subContainer}>
                {this.renderData()}  
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
    errors: state.ViewContact.errors,
    data:state.ViewContact.data,
    isLoading:state.ViewContact.isLoading,
    multipleData: state.ViewContact.multipleData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestContactsDataWithId: (id) => dispatch(requestContactsDataWithId(id)),
    getMultipleDropDownData : () => dispatch(getMultipleDropDownData()),
    resetReducer : () => dispatch(resetReducer()),
    sendUpdateContactData: (values) =>  dispatch(sendUpdateContactData(values))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ViewContact);

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
  color: AppStyles.DashboardIconColor,
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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
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
  fabStyle:{
    bottom:Metrics.DEVICE_HEIGHT/10,
    right:Metrics.DEVICE_HEIGHT/30,
  },
  backArrow:{
    width:Metrics.DEVICE_HEIGHT/40,
    height:Metrics.DEVICE_HEIGHT/40,
    resizeMode:'contain',
    marginTop:10
  }
});
