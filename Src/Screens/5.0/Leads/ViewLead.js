import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Alert,
  Text,
  Linking,
  TouchableOpacity,
  BackHandler
} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LocalStorage from '../../../Helpers/LocalStorage';
import Modal from 'react-native-modal';

////import device measurements
import Metrics from '../../../Config/Metrics';
import AppStyles from '../../../Config/AppStyles';

import {Plus, Correct, Pencil, backArrow} from '../../../Config/Images';
//
import { getMultipleDropDownData, sendUpdateLeadData, getLeadData, resetReducer, getProjectData, addLeadToMap, sendShareData, resetOtherDataReducer} from '../../../Redux/Actions/ViewLead.actions';

import {AnimatedAlert, FloatingLabelInput, FAB, DropDown, Button} from '../../../Components/index';

let localStorage = new LocalStorage();

class ViewLead extends Component {

  constructor(props){
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.colorTheme = {};
    this.QualityArray = [];
      this.StageArray = [];
      this.SourceArray = [];
      this.ContactObj = {};
      this.projectArray = [];
      // this.shareArray = [];
    this.state = {
        editable:false,
        selectedContact: null,
        selectedCompany: null,
        selectedProject: null,
        selectedQuality: null,
        selectedStage: null,
        selectedSource: null,
        selectedNote: null,
        selectedValue: null,
        selectedShareId: null,

        selectedCompanyIndex: null,
        selectedContactIndex: null,
        selectedProjectIndex: null,
        isModalVisible: false

    }
      
  }
//
  async componentDidMount(){
    this.props.resetReducer();
    this.props.resetOtherDataReducer();
    this.colorTheme = await localStorage.getData("ColorTheme");
    const item = this.props.route.params.item;
    this.props.getLeadData(item.id);
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
    this.props.resetReducer();
    console.log("nextProps=====viewLead=========>",nextProps);
    if(nextProps.data && !nextProps.isLoading){ 
      if(nextProps.data.lead && nextProps.data.lead.length > 0){
        if(nextProps.data.lead[0].contact && nextProps.data.lead[0].contact != null){
          console.log("nextProps.data.lead[0].contact======hihihi==>",nextProps.data.lead[0].contact);
          this.ContactObj = nextProps.data.lead[0].contact;
          this.setState({
            selectedContact : nextProps.data.lead[0].contact.full_name,
            selectedContactIndex: nextProps.data.lead[0].contact.id
          });
        }

        if(nextProps.data.lead[0].project && nextProps.data.lead[0].project != null){
          this.setState({
            selectedProject : nextProps.data.lead[0].project.project_name,
            selectedProjectIndex: nextProps.data.lead[0].project.id
          });
        }
        
        if(nextProps.data.lead[0].company && nextProps.data.lead[0].company != null){
          console.log("business_name========>",nextProps.data.lead[0].company.business_name);
          this.setState({
            selectedCompany : nextProps.data.lead[0].company.business_name,
          });
        }

        if(nextProps.data.lead[0].quality && nextProps.data.lead[0].quality != null){
          this.setState({
            selectedQuality : nextProps.data.lead[0].quality,
          });
        }

        if(nextProps.data.lead[0].stage && nextProps.data.lead[0].stage != null){
          this.setState({
            selectedStage :  nextProps.data.lead[0].stage,
          });
        }

        if(nextProps.data.lead[0].source && nextProps.data.lead[0].source != null){
          this.setState({
            selectedSource : nextProps.data.lead[0].source,
          });
        }


        if(nextProps.data.shares[0].notes && nextProps.data.shares[0].notes != null){
          this.setState({
            selectedNote: nextProps.data.shares[0].notes,
          });
        }

        if(nextProps.data.lead[0].value && nextProps.data.lead[0].value != null){
          this.setState({
            selectedValue: nextProps.data.lead[0].value.toString(),
          });
        }
       }
    }

    if(nextProps.multipleData && nextProps.multipleData.length > 0 && !nextProps.isLoading){
      console.log("nextProps.multipleData-----------------",nextProps.multipleData[5].name);

      this.QualityArray = [];
      this.StageArray = [];
      this.SourceArray = [];

      let {selectedContact, selectedProject} = this.state;
      let that = this;
      if(nextProps.multipleData[0].name && nextProps.multipleData[0].name.length > 0){
        nextProps.multipleData[0].name.filter(function(contact){ 
          if(contact.name === selectedContact){
            that.setState({selectedContactIndex: contact.id});
          }
        })
      }

      if(nextProps.multipleData[2].name && nextProps.multipleData[2].name.length > 0){
        nextProps.multipleData[2].name.map(result => {
            this.QualityArray.push({quality: result})
        });
      }

      if(nextProps.multipleData[3].name && nextProps.multipleData[3].name.length > 0){
          nextProps.multipleData[3].name.map(result => {
              this.StageArray.push({stage: result})
          });
      }

      if(nextProps.multipleData[4].name && nextProps.multipleData[4].name.length > 0){
        nextProps.multipleData[4].name.map(result => {
          this.SourceArray.push({source: result})
        });
      }

      // if(nextProps.multipleData[5].name && nextProps.multipleData[5].name.length > 0){
      //   nextProps.multipleData[5].name.map(result => {
      //     this.shareArray.push({result})
      //     console.log("----hohoho",result);
      //   });
      // }
    }


    if(nextProps.data){
      if(nextProps.data.message == 'Updating successful.'){
        this.child.handlePress('Update Successful', true);
        setTimeout(() => {
          this.props.navigation.reset({
            routes: [{ name: 'Leads' }],
          });
        }, 3500)
      }

      if(nextProps.data.projects && nextProps.data.projects.length > 0){
        this.projectArray = nextProps.data.projects;
      }
      
    }

    if(nextProps.mapData){
      if(nextProps.mapData.message == 'City Adding Successful'){
        this.child.handlePress('City Adding Successful', true);
        this.fab.toggleMenu();
      }else{
        this.child.handlePress(nextProps.mapData.message, false);
        this.fab.toggleMenu();
      }
    }

    if(nextProps.otherData && !nextProps.isLoading){
      console.log("nextProps.otherData===-=-=-=0890-09876",nextProps.otherData);
      if(nextProps.otherData.message == 'Not implemented yet'){
        this.child.handlePress('Not implemented yet', false);
        setTimeout(() => {
          this.props.resetReducer();
          this.props.resetOtherDataReducer();
        }, 3500);
      }
    }


    this.props.resetReducer();
  }

   ////handle DropDown Changes
   onDropDownChanged = (value, index, data, type) => {
     let selectedCompanyIndex = data[index].id

    this.props.resetReducer();
    switch(type){
      case "Contact":
        let selectedContactIndex = data[index].id
        this.setState({selectedContact: value, selectedContactIndex: selectedContactIndex, selectedCompany:data[index].business_name != null ? data[index].business_name : '-', selectedCompanyIndex:data[index].company_id != null ? data[index].company_id : '-'});
        this.props.getProjectData(data[index].id );
        break;
      case "Project":
        let selectedProjectIndex = data[index].id
        this.setState({selectedProject: value, selectedProjectIndex: selectedProjectIndex});
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
      case "Share":
        this.setState({selectedShareId: data[index].id});
        break;
        
    }
  }

  onCallPressed(){
    this.fab.toggleMenu();
    if (Object.keys(this.ContactObj).length != 0){
      Linking.openURL(`tel:${this.ContactObj.phone}`);
    }
  }

  onSMSPressed(){
    this.fab.toggleMenu();
    if (Object.keys(this.ContactObj).length != 0){
      const url = (Platform.OS === 'android')? `sms:${this.ContactObj.phone}?body=your message`: `sms:${this.ContactObj.phone}`;
      Linking.canOpenURL(url).then(supported => {
        if (!supported) {
          console.log('Unsupported url: ' + url)
        } else {
          return Linking.openURL(url)
        }
      }).catch(err => console.error('An error occurred', err))
    }
  }

  onEmailPressed(){
    console.log("Email Pressed")
    this.fab.toggleMenu();
    if (Object.keys(this.ContactObj).length != 0){
      Linking.openURL(`mailto:${this.ContactObj.email}?subject=example&body=example`)
    }
  }

onEditPressed(){
  this.fab.toggleMenu();
    this.setState({
        editable: true
    });

    const item = this.props.route.params.item;
    let {editable, selectedCompanyIndex, selectedContactIndex, selectedProjectIndex, selectedQuality, selectedStage, selectedSource, selectedNote, selectedValue} = this.state;
    if(editable){
      if(!selectedValue || !selectedContactIndex || !selectedProjectIndex || !selectedQuality || !selectedStage || !selectedSource){
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
          id: item.id,
          value: selectedValue,
          contact_id: selectedContactIndex,
          project_id: selectedProjectIndex,
          quality: selectedQuality,
          stage: selectedStage,
          source: selectedSource,
          notes: selectedNote
          // company_id: selectedCompanyIndex,
        }
        console.log("obj-------->",obj);
        this.props.sendUpdateLeadData(obj);
      } 
    }
  }

  onMapPressed(){
    const item = this.props.route.params.item;
    this.props.addLeadToMap(item.id);
  }

  onSharePressed(){
    this.fab.toggleMenu();

    this.setState({isModalVisible: true});
  }

renderEditableView(){
    let {editable, selectedContact, selectedCompany, selectedProject, selectedQuality, selectedStage,selectedSource, selectedNote, selectedValue} = this.state;
    if(!editable){
        if(this.props.data.shares && this.props.data.shares != null){
            return(
                <View>
                    <FloatingLabelInput 
                        // onChangeText={(value) => this.setState({notesText: value})}
                        value={this.props.data.lead && this.props.data.lead != null ? this.props.data.lead[0].contact.full_name : "-"}
                        editable={editable}
                        keyboardType='default'
                        AnimatedText="Contact"
                        containerStyle={styles.containerStyle}
                        multiline={true}
                        /> 

                    <FloatingLabelInput 
                        // onChangeText={(value) => this.setState({notesText: value})}
                        value={selectedCompany}
                        editable={editable}
                        keyboardType='default'
                        AnimatedText="Company"
                        containerStyle={styles.containerStyle}
                        multiline={true}
                        />

                    <FloatingLabelInput 
                        // onChangeText={(value) => this.setState({notesText: value})}
                        value={selectedProject}
                        editable={editable}
                        keyboardType='default'
                        AnimatedText="Project"
                        containerStyle={styles.containerStyle}
                        multiline={true}
                        />

                    <FloatingLabelInput 
                        // onChangeText={(value) => this.setState({notesText: value})}
                        value={this.props.data.lead && this.props.data.lead != null ? this.props.data.lead[0].quality : "-"}
                        editable={editable}
                        keyboardType='default'
                        AnimatedText="Quality"
                        containerStyle={styles.containerStyle}
                        multiline={true}
                        />

                    <FloatingLabelInput 
                        // onChangeText={(value) => this.setState({notesText: value})}
                        value={this.props.data.lead && this.props.data.lead != null ? this.props.data.lead[0].stage : "-"}
                        editable={editable}
                        keyboardType='default'
                        AnimatedText="Stage"
                        containerStyle={styles.containerStyle}
                        multiline={true}
                        />

                    <FloatingLabelInput 
                        // onChangeText={(value) => this.setState({notesText: value})}
                        value={this.props.data.lead && this.props.data.lead != null ? this.props.data.lead[0].source : "-"}
                        editable={editable}
                        keyboardType='default'
                        AnimatedText="Source"
                        containerStyle={styles.containerStyle}
                        multiline={true}
                        />

                    <FloatingLabelInput 
                        // onChangeText={(value) => this.setState({notesText: value})}
                        value={this.props.data.lead && this.props.data.lead != null ? this.props.data.shares[0].notes : "-"}
                        editable={editable}
                        keyboardType='default'
                        AnimatedText="Notes"
                        containerStyle={styles.AddressContainerStyle}
                        multiline={true}
                        />

                    <FloatingLabelInput 
                        // onChangeText={(value) => this.setState({valueText: value})}
                        value={this.props.data.lead && this.props.data.lead != null ? this.props.data.lead[0].value.toString() : "-"}
                        editable={editable}
                        keyboardType='default'
                        AnimatedText="Value"
                        containerStyle={styles.containerStyle}
                        />

                </View>
            )
        }
    }else if(editable){
        if(this.props.multipleData && this.props.multipleData.length > 0){
          console.log("stage=======stage=======>",this.StageArray);
          console.log("quality=======quality=======>",this.QualityArray);
          console.log("stage=======stage=======>",this.SourceArray);

            return(
                <View>
                    <DropDown
                        data={this.props.multipleData[0].name}
                        AnimatedText="Contact"
                        onChangeText={(value, index, data) => this.onDropDownChanged(value, index, data,'Contact')}
                        containerStyle={styles.containerStyle}
                        value={selectedContact}
                        lineWidth={0}
                        valueExtractor={({ name }) => name}
                        /> 

                    <FloatingLabelInput 
                        // onChangeText={(value) => this.setState({notesText: value})}
                        value={selectedCompany}
                        editable={false}
                        keyboardType='default'
                        AnimatedText="Company"
                        containerStyle={styles.containerStyle}
                        multiline={true}
                        />


                    {this.projectArray && this.projectArray.length ? <DropDown
                        data={this.projectArray}
                        AnimatedText="Project"
                        onChangeText={(value, index, data) => this.onDropDownChanged(value, index, data,'Project')}
                        containerStyle={styles.containerStyle}
                        value={selectedProject}
                        lineWidth={0}
                        valueExtractor={({ project_name }) => project_name}
                        /> : <DropDown
                        data={[]}
                        AnimatedText="Project"
                        onChangeText={(value, index, data) => this.onDropDownChanged(value, index, data,'Project')}
                        containerStyle={styles.containerStyle}
                        value={selectedProject}
                        lineWidth={0}
                        valueExtractor={({ project_name }) => project_name}
                        /> }
                    

                    <DropDown
                        data={this.QualityArray}
                        AnimatedText="Quality"
                        onChangeText={(value, index, data) => this.onDropDownChanged(value, index, data,'Quality')}
                        containerStyle={styles.containerStyle}
                        value={selectedQuality}
                        lineWidth={0}
                        valueExtractor={({ quality }) => quality}
                        /> 

                    <DropDown
                        data={this.StageArray}
                        AnimatedText="Stage"
                        onChangeText={(value, index, data) => this.onDropDownChanged(value, index, data,'Stage')}
                        containerStyle={styles.containerStyle}
                        value={selectedStage}
                        lineWidth={0}
                        valueExtractor={({ stage }) => stage}
                        />

                    <DropDown
                        data={this.SourceArray}
                        AnimatedText="Source"
                        onChangeText={(value, index, data) => this.onDropDownChanged(value, index, data,'Source')}
                        containerStyle={styles.containerStyle}
                        value={selectedSource}
                        lineWidth={0}
                        valueExtractor={({ source }) => source}
                        />

                    <FloatingLabelInput 
                        onChangeText={(value) => this.setState({selectedNote: value})}
                        value={selectedNote}
                        editable={true}
                        keyboardType='default'
                        AnimatedText="Notes"
                        containerStyle={styles.AddressContainerStyle}
                        multiline={true}
                        />

                    <FloatingLabelInput 
                        onChangeText={(value) => this.setState({selectedValue: value})}
                        value={selectedValue}
                        editable={true}
                        keyboardType='default'
                        AnimatedText="Value"
                        containerStyle={styles.containerStyle}
                        />
                </View>
            );
        }
    }
}

renderModalView(){
  let {isModalVisible} = this.state;
  let ThemeStyle = {
    backgroundColor:this.colorTheme ? this.colorTheme : AppStyles.DashboardIconColor
  }
  if(this.props.multipleData){
    if(this.props.multipleData[5].name && this.props.multipleData[5].name.length && !this.props.isLoading){
      return(
        <Modal isVisible={isModalVisible}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalInnerView}>
                      <View style={styles.upperView}>
                        <TouchableOpacity onPress={this.onCancelPressed}>
                          <Image source={backArrow} style={styles.modalBackArrow} />
                        </TouchableOpacity>
                        <Text style={styles.LeadShareText}>Lead Share</Text>
                      </View>
                      <View style={styles.lowerView}>
                        <FloatingLabelInput 
                            onChangeText={(value) => this.setState({selectedValue: value})}
                            value={this.ContactObj.full_name}
                            editable={false}
                            keyboardType='default'
                            AnimatedText="Name"
                            containerStyle={styles.shareInputContainer}
                            />
  
                        <FloatingLabelInput 
                            onChangeText={(value) => this.setState({selectedValue: value})}
                            value={this.ContactObj.email}
                            editable={false}
                            keyboardType='default'
                            AnimatedText="Email"
                            containerStyle={styles.shareInputContainer}
                            />
  
                        <FloatingLabelInput 
                            onChangeText={(value) => this.setState({selectedValue: value})}
                            value={this.ContactObj.phone}
                            editable={false}
                            keyboardType='default'
                            AnimatedText="Phone"
                            containerStyle={styles.shareInputContainer}
                            />
  
                        {this.props.multipleData[5].name && this.props.multipleData[5].name.length ?<DropDown
                          data={this.props.multipleData[5].name}
                          AnimatedText="Share With"
                          onChangeText={(value, index, data) => this.onDropDownChanged(value, index, data,'Share')}
                          containerStyle={styles.shareInputContainer}
                          itemTextStyle={styles.itemTextStyle}
                          dropDownItem = {styles.dropDownItem}
                          // value={selectedQuality}
                          lineWidth={0}
                          valueExtractor={({full_name }) => full_name}
                          /> : null }  
                      </View>
                      <View style={styles.buttonView}>

                      <FAB 
                        style={styles.fabStyle} 
                        menuStyle={ThemeStyle}  
                        icon={Correct} 
                        onPress={() => this.onExtSharePressed()}/>

                        

{/* 
                        <View style={styles.buttonInner}>
                          <Button
                            type="solid"
                            text="Cancel"
                            containerStyle={styles.cancelButtonStyle}
                            textStyle={styles.signInText}
                            onPress={this.onCancelPressed}
                          />
                        </View>
                        <View style={styles.buttonInner}>
                          <Button
                              type="solid"
                              text="Share"
                              containerStyle={styles.submitButtonStyle}
                              textStyle={styles.signInText}
                              onPress={this.onExtSharePressed}
                            />
                        </View> */}
                      </View>
                  </View>
                </View>
              </Modal>
      );
    }
  }
}

onBackPressed = () =>{
  this.props.navigation.navigate('LeadsMain');
}

//Share methods
onCancelPressed = () => {
  this.setState({isModalVisible: false});
}

//Share methods
onExtSharePressed(){
  this.setState({selectedShareId: null});
  let {selectedShareId} = this.state;
  let obj = {
    lead_id: this.props.data.lead[0].id,
    user_id: selectedShareId
  };
  console.log(obj);
  if(!selectedShareId){
    Alert.alert(
      "Warning !!",
      "Please Select User to share",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  }else {
    this.setState({isModalVisible: false});
    this.props.sendShareData(obj);
  }

}

  render() {
    let {editable, isModalVisible} = this.state;
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
                />
            <View style={styles.subContainer}>
              <View style={styles.subContainerInnerView}>

              <View style={styles.TextContainerView}>
                <TouchableOpacity onPress={this.onBackPressed}>
                  <Image source={backArrow} style={styles.backArrow} />
                </TouchableOpacity>
                {editable ? <Text style={[styles.contactText, textStyle]}>Edit Lead</Text> : <Text style={[styles.contactText, textStyle]}>View Lead</Text>}
              </View>

              <View style={styles.DetailContainerView}>
                <KeyboardAwareScrollView
                  extraScrollHeight={130}
                  showsVerticalScrollIndicator={false}>
                    {this.renderEditableView()}
                </KeyboardAwareScrollView>

                <FAB  isTogglingAvailable={true}
                      style={styles.fabStyle} 
                      icon={Plus}  
                      ref={instance => {this.fab = instance}}
                      onEditPressed={() => this.onEditPressed()} 
                      editIcon={editable ? Correct : Pencil} 
                      onCallPressed={() => this.onCallPressed()}
                      onSMSPressed={() => this.onSMSPressed()}
                      onEmailPressed={() => this.onEmailPressed()}
                      onSharePressed={() => this.onSharePressed()}
                      onMapPressed = {() => this.onMapPressed()}
                      menuStyle={ThemeStyle}
                      />
              </View>
                
              </View>
            </View>

            {this.renderModalView()}
          </View>;
  }
}

//
const mapStateToProps = state => {
  return {
    errors: state.ViewLead.errors,
    data:state.ViewLead.data,
    isLoading:state.ViewLead.isLoading,
    multipleData: state.ViewLead.multipleData,
    mapData: state.ViewLead.mapData,
    otherData : state.ViewLead.otherData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMultipleDropDownData : () => dispatch(getMultipleDropDownData()),
    sendAddMultipleData : (obj) => dispatch(sendAddMultipleData(obj)),
    getLeadData : (id) => dispatch(getLeadData(id)),
    resetReducer: () => dispatch(resetReducer()),
    getProjectData: (id) =>  dispatch(getProjectData(id)),
    sendUpdateLeadData : (id) =>  dispatch(sendUpdateLeadData(id)),
    addLeadToMap : (id) => dispatch(addLeadToMap(id)),
    sendShareData : (obj) => dispatch(sendShareData(obj)),
    resetOtherDataReducer:() => dispatch(resetOtherDataReducer())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ViewLead);

const styles = StyleSheet.create({
  Container: {
    flex:1,
    width: Metrics.DEVICE_WIDTH,
    justifyContent: 'center',
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
backArrow:{
  width:Metrics.DEVICE_HEIGHT/40,
  height:Metrics.DEVICE_HEIGHT/40,
  resizeMode:'contain',
  marginTop:10
},
modalBackArrow:{
  width:Metrics.DEVICE_HEIGHT/40,
  height:Metrics.DEVICE_HEIGHT/40,
  resizeMode:'contain',
  marginRight:10
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
  modalContainer:{
    flex: 1,
    marginTop: Metrics.DEVICE_HEIGHT/10,
    marginBottom: Metrics.DEVICE_HEIGHT/10,
    backgroundColor:AppStyles.colorWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInnerView:{
    height:'90%',
    width:'90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperView:{
    width:'90%',
    height:1.2*Metrics.BTN_HEIGHT,
    borderBottomWidth:0.9,
    borderBottomColor: AppStyles.colorGray,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent:'flex-start',
    flexDirection:'row',
  },
  lowerView:{
    width:'90%',
    paddingTop:20,
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  buttonView:{
    width:'90%',
    height:Metrics.BTN_HEIGHT,
    flexDirection:'row'
  },
  // buttonInner:{
  //   height:Metrics.BTN_HEIGHT,
  //   alignItems: 'center',
  //   justifyContent:'center',
  //   flex:1,
  // },
  LeadShareText:{
    fontSize: Metrics.DEVICE_WIDTH > 400 ? 18 : 16,
    fontWeight: "bold"
  },
  // submitButtonStyle: {
  //   height: Metrics.BTN_HEIGHT,
  //   width: Metrics.DEVICE_WIDTH/3.5,
  //   backgroundColor: AppStyles.colorGreen,
  //   borderRadius: Metrics.BORDER_RADIUS,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // cancelButtonStyle:{
  //   height: Metrics.BTN_HEIGHT,
  //   width: Metrics.DEVICE_WIDTH/3.5,
  //   backgroundColor: AppStyles.colorRed,
  //   borderRadius: Metrics.BORDER_RADIUS,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },

  shareInputContainer:{
    borderColor: '#979797',
    backgroundColor: AppStyles.colorWhite,
    borderRadius: 5,
    borderWidth: 1,
    width:Metrics.DEVICE_WIDTH-(Metrics.DEVICE_WIDTH/4),
    height: 45,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },
  itemTextStyle: {
    marginLeft: 10,
    width:Metrics.DEVICE_WIDTH-(Metrics.DEVICE_WIDTH/4),
    height: Metrics.BTN_HEIGHT,
    justifyContent:'center',
    // alignItems:'center',
  },
  dropDownItem:{
    width:Metrics.DEVICE_WIDTH-(Metrics.DEVICE_WIDTH/4),
    height: Metrics.BTN_HEIGHT,
    justifyContent:'center',
  
  },
  signInText: {
    fontSize: Metrics.DEVICE_WIDTH > 400 ? 16 : 14,
    color: AppStyles.colorWhite,
    textAlign: 'center',
    // fontFamily: 'SFProDisplay-Bold',
  },

  
});
