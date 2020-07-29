import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Alert,
  Text,
  ScrollView,
  TouchableOpacity,
  BackHandler
} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LocalStorage from '../../../Helpers/LocalStorage';


///import device measurements
import Metrics from '../../../Config/Metrics';
import AppStyles from '../../../Config/AppStyles';

import {Correct, backArrow} from '../../../Config/Images';

import { getMultipleDropDownData, sendLeadData, getProjectData, resetReducer} from '../../../Redux/Actions/AddNewLead.actions';

import {AnimatedAlert, FloatingLabelInput, FAB, DropDown} from '../../../Components/index';

let localStorage = new LocalStorage();

class AddNewLead extends Component {

  constructor(props){
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.colorTheme = {};
    this.state = {
      selectedContact:null,
      selectedCompany: null,
      selectedProject: null,
      selectedQuality: null,
      selectedStage: null,
      selectedSource:null,
      notesText: "",
      valueText:"",
      selectedContactId: null,
      selectedCompanyId: null,
      selectedProjectId: null

    }
    this.qualityArray = [];
    this.stageArray = [];
    this.sourceArray = [];
    this.projectArray = [];
  }
//
  async componentDidMount(){
    this.colorTheme = await localStorage.getData("ColorTheme");
    console.log("this.colorTheme=======this.colorTheme=======>",this.colorTheme);
    this.props.getMultipleDropDownData();
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
    this.props.navigation.navigate('LeadsMain');
 }

  componentWillReceiveProps(nextProps){ 
    console.log("nextProps=======AddNewLead=======>",nextProps);
    if(nextProps.multipleData){
        if(nextProps.multipleData[2].name && nextProps.multipleData[2].name.length > 0){
            this.qualityArray = [];
            nextProps.multipleData[2].name.map(result => {
                this.qualityArray.push({title: result})
            });
        }

        if(nextProps.multipleData[3].name && nextProps.multipleData[3].name.length > 0){
            this.statusArray = [];
            nextProps.multipleData[3].name.map(result => {
              this.stageArray.push({title: result})
            });
        }

        if(nextProps.multipleData[4].name && nextProps.multipleData[4].name.length > 0){
            this.sourceArray = [];
            nextProps.multipleData[4].name.map(result => {
                this.sourceArray.push({title: result})
            });
        }  
    }

    if(nextProps.data){
      if(nextProps.data.projects && nextProps.data.projects.length > 0){
        console.log("projects=======projects=======>",nextProps);
        this.projectArray = nextProps.data.projects;
      }
    }

    if(nextProps.data){
      if(nextProps.data.message == 'Adding successful'){
        this.child.handlePress('Adding successful', true);
        setTimeout(() => {
          this.props.navigation.reset({
            routes: [{ name: 'Leads' }],
          });
        }, 3500)
      }
    }
    this.props.resetReducer();
  }

 //handle DropDown Changes
 onDropDownChanged = (value, index, data, type) => {
     this.props.resetReducer();
  switch(type){
    case "Contact":
      let contact_id = data[index].id;
      this.setState({selectedContact: value, selectedContactId: contact_id, selectedCompany: data[index].business_name != null ? data[index].business_name : "-", selectedCompanyId: data[index].company_id != null ? data[index].company_id : "-"});
      this.props.getProjectData(contact_id);
      break;
    case "Project":
        console.log("data[index]",data[index]);
        let project_id = data[index].id;
        this.setState({selectedProject: value, selectedProjectId: project_id});
        break;
    case "Quality":
        this.setState({selectedQuality: value});
        break;
    case "Stage":
        this.setState({selectedStage: value});
        break; 
    case "Source":
        this.setState({selectedSource: value});
        break; 
  }
}

onFABPressed(){
    let {selectedProjectId, selectedContactId, selectedCompanyId, selectedContact, selectedCompany, selectedProject, selectedQuality, selectedStage, selectedSource, notesText, valueText} = this.state;
    if(!selectedContact || !selectedCompany || !selectedQuality || !selectedStage || !selectedSource || !notesText || !valueText){
        Alert.alert(
            "Warning !!",
            "Please Fill All Fields",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
    }else{
      let obj = {
        contact_id: selectedContactId,
        quality: selectedQuality,
        stage: selectedStage,
        source: selectedSource,
        value: valueText,
        company_id: selectedCompanyId,
        project_id: selectedProjectId,
        notes: notesText

      }
//
      console.log("obj",obj);
        this.props.sendLeadData(obj);
    }
  }

  onBackPressed = () =>{
    this.props.navigation.navigate('LeadsMain');
  }

  render() {
    let {selectedContact, selectedCompany, selectedProject, notesText, valueText, selectedQuality, selectedStage, selectedSource} = this.state;
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
                  style={AppStyles.alertErrorUpperTopStyle}
                />
            <View style={styles.subContainer}>
              <View style={styles.subContainerInnerView}>
              <View style={styles.TextContainerView}>
                <TouchableOpacity onPress={this.onBackPressed}>
                  <Image source={backArrow} style={styles.backArrow} />
                </TouchableOpacity>
                <Text style={[styles.contactText, textStyle]}>Add a new Lead</Text>
              </View>
              <View style={styles.DetailContainerView}>
              <KeyboardAwareScrollView
                extraScrollHeight={130}
                showsVerticalScrollIndicator={false}>

                {this.props.multipleData && this.props.multipleData.length > 0 ? 
                    <DropDown
                        data={this.props.multipleData[0].name}
                        AnimatedText="Contact"
                        onChangeText={(value, index, data) => this.onDropDownChanged(value, index, data,'Contact')}
                        containerStyle={styles.containerStyle}
                        value={selectedContact}
                        lineWidth={0}
                        valueExtractor={({ name }) => name}
                        /> : null
                   }

                   {/* {this.props.multipleData && this.props.multipleData.length > 0 ? 
                    <DropDown
                        data={this.props.multipleData[1].name}
                        AnimatedText="Company"
                        onChangeText={(value, index, data) => this.onDropDownChanged(value, index, data,'Company')}
                        containerStyle={styles.containerStyle}
                        value={selectedCompany}
                        lineWidth={0}
                        valueExtractor={({ business_name }) => business_name}
                        /> : null
                   } */}

                   <FloatingLabelInput 
                        // onChangeText={(value) => this.setState({notesText: value})}
                        value={selectedCompany}
                        editable={false}
                        keyboardType='default'
                        AnimatedText="Company"
                        containerStyle={styles.containerStyle}
                        multiline={false}
                        />

                   {this.projectArray && this.projectArray.length > 0 ? 
                    <DropDown
                        data={this.projectArray}
                        AnimatedText="Project"
                        onChangeText={(value, index, data) => this.onDropDownChanged(value, index, data,'Project')}
                        containerStyle={styles.containerStyle}
                        value={selectedProject}
                        lineWidth={0}
                        valueExtractor={({ project_name }) => project_name}
                        /> : <FloatingLabelInput 
                            value={"No Project Found"}
                            editable={false}
                            keyboardType='default'
                            AnimatedText="Project"
                            containerStyle={styles.containerStyle}
                            /> 
                   }

                   {this.qualityArray && this.qualityArray.length > 0 ? 
                    <DropDown
                        data={this.qualityArray}
                        AnimatedText="Quality"
                        onChangeText={(value, index, data) => this.onDropDownChanged(value, index, data,'Quality')}
                        containerStyle={styles.containerStyle}
                        value={selectedQuality}
                        lineWidth={0}
                        valueExtractor={({ title }) => title}
                        /> : null
                   }

                   {this.stageArray && this.stageArray.length > 0 ? 
                    <DropDown
                        data={this.stageArray}
                        AnimatedText="Stage"
                        onChangeText={(value, index, data) => this.onDropDownChanged(value, index, data,'Stage')}
                        containerStyle={styles.containerStyle}
                        value={selectedStage}
                        lineWidth={0}
                        valueExtractor={({ title }) => title}
                        /> : null
                   }
    
                   {this.sourceArray && this.sourceArray.length > 0 ? 
                    <DropDown
                        data={this.sourceArray}
                        AnimatedText="Source"
                        onChangeText={(value, index, data) => this.onDropDownChanged(value, index, data,'Source')}
                        containerStyle={styles.containerStyle}
                        value={selectedSource}
                        lineWidth={0}
                        valueExtractor={({ title }) => title}
                        /> : null
                   }

                   <FloatingLabelInput 
                    onChangeText={(value) => this.setState({notesText: value})}
                    value={notesText}
                    editable={true}
                    keyboardType='default'
                    AnimatedText="Notes"
                    containerStyle={styles.AddressContainerStyle}
                    multiline={true}
                    />

                <FloatingLabelInput 
                    onChangeText={(value) => this.setState({valueText: value})}
                    value={valueText}
                    editable={true}
                    AnimatedText="Value"
                    containerStyle={styles.containerStyle}
                    keyboardType="numeric"
                    />

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
    errors: state.AddNewLead.errors,
    data:state.AddNewLead.data,
    isLoading:state.AddNewLead.isLoading,
    multipleData: state.AddNewLead.multipleData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMultipleDropDownData : () => dispatch(getMultipleDropDownData()),
    sendAddMultipleData : (obj) => dispatch(sendAddMultipleData(obj)),
    getProjectData : (id) => dispatch(getProjectData(id)),
    resetReducer: () => dispatch(resetReducer()),
    sendLeadData: (obj) => dispatch(sendLeadData(obj))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(AddNewLead);

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
  alignSelf:'center',
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
  }
});
