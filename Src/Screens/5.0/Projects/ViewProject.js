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

import {sendUpdateProjectData, resetReducer, getDropDownData, requestProjectDataWithId} from '../../../Redux/Actions/ViewProject.actions';

let localStorage = new LocalStorage();

class ViewProject extends Component {

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
            selectedCompanyId: null,
            editable: false
        }
      }

    async componentDidMount(){
        this.colorTheme = await localStorage.getData("ColorTheme");
        const item = this.props.route.params.item;
        this.props.getDropDownData();
        this.props.requestProjectDataWithId(item.id);
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
//
    componentWillReceiveProps(nextProps){ 
      console.log("nextProps====ViewProject=========>",nextProps);
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
                  routes: [{ name: 'Project' }],
                });
              }, 3500)
            }
          }

          if(nextProps.data && !nextProps.isLoading){
            this.setState({
                project_name: nextProps.data.project_name,
                address: nextProps.data.address,
                city: nextProps.data.city,
                note: nextProps.data.notes,
                selectedCompanyId : nextProps.data.company_id
            });
          }

          if(nextProps.data.company && nextProps.data.company != null && !nextProps.isLoading){
            this.setState({
              selectedCompany: nextProps.data.company.business_name,
            });
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

    onFABPressed(){
        let {project_name, address, city, note, selectedCompanyId, editable} = this.state;

        this.setState({
            editable: true
          });

          console.log("project_name---------------",project_name);
          console.log("selectedCompanyId---------------",selectedCompanyId);
          console.log("city---------------",city);

        if(editable){
            if(!project_name || !selectedCompanyId || !city){
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
                    project_name: project_name,
                    address: address,
                    city: city,
                    comapny_id: selectedCompanyId,
                    notes: note,
                    project_id: item.id
                  }

                  console.log("obj---------------",obj);
                this.props.sendUpdateProjectData(obj);
            }
        }
    }

    renderDropDown = () => {
        let { selectedCompany, editable} = this.state;
        console.log("editable---------------",editable);
        if(!editable){
          return (
            <FloatingLabelInput 
                                onChangeText={(value) => this.onChangeText(value, 'note')}
                                value={selectedCompany}
                                editable={editable}
                                keyboardType='default'
                                AnimatedText="Company"
                                containerStyle={styles.containerStyle}
                                />
          )
        }else if(editable){
          if(!this.props.isLoading && this.props.multipleData && this.props.multipleData != null ){
            return(
                      <View>
                          <DropDown
                              data={this.props.multipleData[0].name}
                              AnimatedText="Company"
                              onChangeText={(value, index, data) => this.onDropDownChanged(value, index, data,'Project')}
                              containerStyle={styles.containerStyle}
                              value={selectedCompany}
                              lineWidth={0}
                              valueExtractor={({ business_name }) => business_name}
                              /> 
                      </View>
                  )
          }
        }
    }

    onBackPressed = () =>{
      this.props.navigation.navigate('ProjectMain');
    }

    renderData(){
        let {project_name, address, city, note, selectedCompany, editable} = this.state;

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
                      {!editable ? <Text style={[styles.contactText, textStyle]}>View Project</Text>: <Text style={[styles.contactText, textStyle]}>Edit Project</Text>}
                    </View>

                    <View style={styles.DetailContainerView}>
                    <KeyboardAwareScrollView
                      extraScrollHeight={130}
                      showsVerticalScrollIndicator={false}>
                            <FloatingLabelInput 
                                onChangeText={(value) => this.onChangeText(value, 'project_name')}
                                value={project_name}
                                editable={editable}
                                keyboardType='default'
                                AnimatedText="Project Name"
                                containerStyle={styles.containerStyle}
                                /> 

                            <FloatingLabelInput 
                                onChangeText={(value) => this.onChangeText(value, 'address')}
                                value={address}
                                editable={editable}
                                keyboardType='default'
                                AnimatedText="Address"
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

                            <FloatingLabelInput 
                                onChangeText={(value) => this.onChangeText(value, 'note')}
                                value={note}
                                editable={editable}
                                keyboardType='default'
                                AnimatedText="Notes"
                                containerStyle={styles.containerStyle}
                                />

                            {this.renderDropDown()} 

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
      errors: state.ViewProject.errors,
      data:state.ViewProject.data,
      isLoading:state.ViewProject.isLoading,
      multipleData: state.ViewProject.multipleData
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        requestProjectDataWithId: (id) => dispatch(requestProjectDataWithId(id)),
        resetReducer : () => dispatch(resetReducer()),
        getDropDownData : () => dispatch(getDropDownData()),
        sendUpdateProjectData : (obj) =>  dispatch(sendUpdateProjectData(obj))
    };
  };
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(ViewProject);
  
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
  