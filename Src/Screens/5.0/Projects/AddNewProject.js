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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LocalStorage from '../../../Helpers/LocalStorage';

//import device measurements
import Metrics from '../../../Config/Metrics';
import AppStyles from '../../../Config/AppStyles';

import {Correct, backArrow} from '../../../Config/Images';

import {sendAddProjectData,resetReducer, getDropDownData} from '../../../Redux/Actions/AddNewProject.actions';

import {AnimatedAlert, FloatingLabelInput, FAB, DropDown} from '../../../Components/index';

let localStorage = new LocalStorage();

class AddNewProject extends Component {

  constructor(props){
    super(props);
    this.colorTheme = {};
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
        project_name: null,
        address: null,
        city: null,
        note: null,
        selectedCompany: null,
        selectedCompanyId: null
    }
    this.resultArray = [];
    this.companyArray = [];
  }

  async componentDidMount(){
    this.colorTheme = await localStorage.getData("ColorTheme");
    this.props.resetReducer();
    this.props.getDropDownData();
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
      this.props.navigation.navigate('ProjectMain');
    }

  
  componentWillReceiveProps(nextProps){ 
    console.log("nextProps====------------Add New Project----=====>",nextProps);

    if(nextProps.multipleData){
      if(nextProps.multipleData[0].name && nextProps.multipleData[0].name.length > 0){
        this.companyArray = [];
        this.companyArray = nextProps.multipleData[0].name;
      }
  }

    if(nextProps.data){
      if(nextProps.data.message == 'Adding Successful'){
        this.child.handlePress('Adding Successful', true);
        setTimeout(() => {
          this.props.navigation.reset({
            routes: [{ name: 'Project' }],
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

    this.props.resetReducer();
    
  }

  onFABPressed(){
    this.props.resetReducer();
    let {project_name, address, city, note, selectedCompanyId} = this.state;

    if(!project_name || !address || !selectedCompanyId){
      Alert.alert(
        "Warning !!",
        "Please Fill Missing Project Name, Address, Company Fields",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }else{
      let obj = {
        project_name: project_name,
        address: address,
        city: city,
        notes: note ? note : "-",
        company_id: selectedCompanyId
      }
      console.log("obj--------->",obj);
      this.props.sendAddProjectData(obj);
    }
  }

  onChangeText(value, type){
    this.props.resetReducer();
    switch(type){
      case "project_name":
        this.setState({project_name: value});
        break; 
      case "address":
        this.setState({address: value});
        break; 
      case "city":
        this.setState({city: value});
        break;
      case "note":
        this.setState({note: value});
        break; 
    }
  }

onDropDownChanged = (value, index, data, type) => {
  this.props.resetReducer();
 switch(type){
   case "Project":
    let id = data[index].id
     this.setState({selectedCompany: value, selectedCompanyId: id});
     break;
 }
}

onBackPressed = () =>{
  this.props.navigation.navigate('ProjectMain');
}
//
  render() {
    let {project_name, address, city, note, selectedCompany} = this.state;

    let textStyle = {
      color: this.colorTheme ? this.colorTheme : AppStyles.DashboardIconColor
    }

    let ThemeStyle = {
      backgroundColor:this.colorTheme ? this.colorTheme : AppStyles.DashboardIconColor
    }

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
                <Text style={[styles.contactText, textStyle]}>Add a new Project</Text>
              </View>


              <View style={styles.DetailContainerView}>
              
              <KeyboardAwareScrollView
                      extraScrollHeight={130}
                      showsVerticalScrollIndicator={false}>
                
                <FloatingLabelInput 
                    onChangeText={(value) => this.onChangeText(value, 'project_name')}
                    value={project_name}
                    editable={true}
                    keyboardType='default'
                    AnimatedText="Project Name"
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
                    onChangeText={(value) => this.onChangeText(value, 'note')}
                    value={note}
                    editable={true}
                    keyboardType='default'
                    AnimatedText="Notes"
                    containerStyle={styles.containerStyle}
                    />

                {this.companyArray && this.companyArray.length > 0 ?
                    <DropDown
                          data={this.companyArray}
                          AnimatedText="Company"
                          onChangeText={(value, index, data) => this.onDropDownChanged(value, index, data,'Project')}
                          containerStyle={styles.containerStyle}
                          value={selectedCompany}
                          lineWidth={0}
                          valueExtractor={({ business_name }) => business_name}
                        /> : null} 

                      <View style={styles.bottomSpaceView}/>
                
                </KeyboardAwareScrollView>

                <FAB style={styles.fabStyle} menuStyle={ThemeStyle} icon={Correct} onPress={() => this.onFABPressed()}/>
              </View>
                
              </View>
            </View>
          </View>;
  }
}

const mapStateToProps = state => {
  return {
    errors: state.AddNewProject.errors,
    data:state.AddNewProject.data,
    isLoading:state.AddNewProject.isLoading,
    multipleData: state.AddNewProject.multipleData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendAddProjectData : (obj) => dispatch(sendAddProjectData(obj)),
    getDropDownData : () => dispatch(getDropDownData()),
    resetReducer : () => dispatch(resetReducer())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(AddNewProject);

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
