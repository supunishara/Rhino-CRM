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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LocalStorage from '../../../Helpers/LocalStorage';

//import device measurements
import Metrics from '../../../Config/Metrics';
import AppStyles from '../../../Config/AppStyles';

import {Pencil, Correct, backArrow} from '../../../Config/Images';

import {AnimatedAlert, FloatingLabelInput, FAB, DropDown} from '../../../Components/index';

import {requestCompanyDataWithId, resetReducer, sendUpdateCompanyData} from '../../../Redux/Actions/ViewCompany.actions';

let localStorage = new LocalStorage();

class ViewCompany extends Component {

    constructor(props){
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            business_name: null,
            address: null,
            city: null,
            editable:false,
        }
        this.resultArray = [];
        this.colorTheme = {};
      }

   async componentDidMount(){
        this.colorTheme = await localStorage.getData("ColorTheme");
        const item = this.props.route.params.item;
        this.props.requestCompanyDataWithId(item.id);
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
        console.log("nextProps===========",nextProps);
        if(nextProps.errors){
            this.child.handlePress(nextProps.errors, false);
            setTimeout(() => {
              this.props.resetReducer();
            }, 3500)
          }

        if(nextProps.data){
            if(nextProps.data.message == 'Update Successful'){
              this.child.handlePress('Update Successful', true);
              setTimeout(() => {
                this.props.navigation.reset({
                  routes: [{ name: 'Company' }],
                });
              }, 3500)
            }
          }

          if(nextProps.data){
            this.setState({
                business_name: nextProps.data.business_name,
                address: nextProps.data.registered_address,
                city: nextProps.data.city,
            });
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

    onFABPressed(){
        let {business_name, address, city, editable} = this.state;
        this.setState({
            editable: true
          });

        if(editable){
            if(!business_name || !address || !city){
                Alert.alert(
                  "Warning !!",
                  "Please Fill Missing Business Name, Address, City Fields",
                  [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                  ],
                  { cancelable: false }
                );
            }else{
                const item = this.props.route.params.item;

                let obj = {
                    id: item.id,
                    business_name: business_name,
                    address: address,
                    city: city,
                  }
                this.props.sendUpdateCompanyData(obj);
            }
        }
    }

    onBackPressed = () =>{
      this.props.navigation.navigate('CompanyMain');
    }


    renderData(){
        let {business_name, address, city, editable} = this.state;

        let textStyle = {
          color: this.colorTheme ? this.colorTheme : AppStyles.DashboardIconColor
        }
    
        let ThemeStyle = {
          backgroundColor:this.colorTheme ? this.colorTheme : AppStyles.DashboardIconColor
        }


        if(!this.props.isLoading && this.props.data && this.props.data != null ){
            return(
                <View style={styles.subContainerInnerView}>

                    <View style={styles.TextContainerView}>
                      <TouchableOpacity onPress={this.onBackPressed}>
                        <Image source={backArrow} style={styles.backArrow} />
                      </TouchableOpacity>
                      {!editable ? <Text style={[styles.contactText, textStyle]}>View Company</Text>: <Text style={[styles.contactText, textStyle]}>Edit Company</Text>}
                    </View>

                    <View style={styles.DetailContainerView}>
                    <KeyboardAwareScrollView
                      extraScrollHeight={130}
                      showsVerticalScrollIndicator={false}>
                            <FloatingLabelInput 
                                onChangeText={(value) => this.onChangeText(value, 'business_name')}
                                value={business_name}
                                editable={editable}
                                keyboardType='default'
                                AnimatedText="Business Name"
                                containerStyle={styles.containerStyle}
                                /> 

                            <FloatingLabelInput 
                                onChangeText={(value) => this.onChangeText(value, 'address')}
                                value={address}
                                editable={editable}
                                keyboardType='default'
                                AnimatedText="Registered Address"
                                containerStyle={styles.containerStyle}
                                />

                            <FloatingLabelInput 
                                onChangeText={(value) => this.onChangeText(value, 'city')}
                                value={city}
                                editable={editable}
                                keyboardType='default'
                                AnimatedText="City"
                                containerStyle={styles.containerStyle}
                                /> 
                                <View style={styles.bottomSpaceView}/>

                        </KeyboardAwareScrollView>
                         <FAB style={styles.fabStyle} menuStyle={ThemeStyle} icon={editable ? Correct :Pencil} onPress={() => this.onFABPressed()}/> 
                    </View>
                </View>
            )
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
              </View>;
      }
}

const mapStateToProps = state => {
    return {
      errors: state.ViewCompany.errors,
      data:state.ViewCompany.data,
      isLoading:state.ViewCompany.isLoading,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        requestCompanyDataWithId: (id) => dispatch(requestCompanyDataWithId(id)),
        resetReducer : () => dispatch(resetReducer()),
        sendUpdateCompanyData : (id) =>  dispatch(sendUpdateCompanyData(id))
    };
  };
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(ViewCompany);
  
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
    },
    bottomSpaceView:{
      width: Metrics.DEVICE_WIDTH-30,
      height:20
    }
  });
  