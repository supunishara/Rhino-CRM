import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, FlatList} from 'react-native';
import { StackActions, CommonActions } from '@react-navigation/native';
import LocalStorage from '../../Helpers/LocalStorage';
let localStorage = new LocalStorage();

import {connect} from 'react-redux';
//import Device Dimensions
import Metrics from '../../Config/Metrics';

//import default AppStyles
import AppStyles from '../../Config/AppStyles';
import AsyncStorage from '@react-native-community/async-storage';

// import Images
import {User, DashboardGrayRed, LeadsGrayRed, ContactsGrayRed, CompaniesGrayRed, ProjectsGrayRed, TargetsGrayRed, MapsGrayRed, SettingsGrayRed, LogoutGrayRed, 
              DashboardBlueOrange, LeadsBlueOrange, ContactsBlueOrange, CompaniesBlueOrange, ProjectsBlueOrange, TargetsBlueOrange, MapsBlueOrange, SettingsBlueOrange, LogoutBlueOrange,
              DashboardGreenOrange, LeadsGreenOrange, ContactsGreenOrange, CompaniesGreenOrange, ProjectsGreenOrange, TargetsGreenOrange, MapsGreenOrange, SettingsGreenOrange, LogoutGreenOrange} from '../../Config/Images';

//import Common Components
import {Button} from '../../Components/index';


//import Store To dispatch action from outsider class
import store from '../../Redux/Store/Store';
import {FETCHING_DATA} from '../../Redux/Actions/ActionTypes';
import {API, APIEndPoints} from '../../Helpers/URL';

 class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.userData = {};
    this.colorTheme = {};

    this.state = {
      indexChecked: '1',
      items: [
        {
          id: 1,
          navName: 'Dashboard',
          screenToNavigate: 'Dashboard',
          icon: DashboardGrayRed

        },
        {
          id: 2,
          navName: 'Leads',
          screenToNavigate: 'Leads',
          icon: LeadsGrayRed
        },
        {
          id: 3,
          navName: 'Contacts',
          screenToNavigate: 'Contacts',
          icon: ContactsGrayRed
        },
        {
          id: 4,
          navName: 'Companies',
          screenToNavigate: 'Company',
          icon: CompaniesGrayRed
        },
        {
          id: 5,
          navName: 'Projects',
          screenToNavigate: 'Project',
          icon: ProjectsGrayRed
        },
        {
          id: 6,
          navName: 'Targets',
          screenToNavigate: 'Target',
          icon: TargetsGrayRed
        },
        {
          id: 7,
          navName: 'Map',
          screenToNavigate: 'Map',
          icon: MapsGrayRed
        },
        {
          id: 8,
          navName: 'Settings',
          screenToNavigate: 'Settings',
          icon: SettingsGrayRed
        },
        {
          id: 9,
          navName: 'Logout',
          screenToNavigate: 'Marketplace',
          icon: LogoutGrayRed
        },
      ],
    };
  }

   async componentWillReceiveProps(newProps) {
    console.log("componentWillReceiveProps--->",newProps);
  }


  async componentDidMount(){
    console.log("componentDidMount--->");
    this.userData = await localStorage.getData("userData");
    let data = await localStorage.getData("DashboardData");
    this.setState({ DashboardData: data});
  }

  async componentDidUpdate(prevProps) {
    console.log("componentDidUpdate--->",prevProps);
  }

  onItemPressed = item => {
    this.setState({
      indexChecked: item.id,
    });

    if(item.id == 9){
      this.props.navigation.closeDrawer();
      store.dispatch(this.LogoutAction());
    }
    this.props.navigation.closeDrawer();
    this.props.navigation.reset({
      routes: [{ name: item.screenToNavigate }],
    });
      
  };
//
   LogoutAction() {
    return {
      type: FETCHING_DATA,
      payload: {
        ReqType: 'GET',
        nextScreen:'SignIn',
        isAuthorizationAvailable:true,
        baseURL: `${API.baseURL}${APIEndPoints.logout}`,
    },
    }
  }

  render() {
    let {indexChecked} = this.state;
    return (
      <View style={styles.Container}>
        <View style={styles.upperPart}>
          <Image source={{uri: this.userData.avatar_location}} style={styles.userImage} />
        </View>
        <View style={styles.lowerPart}>
          <FlatList
            data={this.props.items}
            keyExtractor={item => item.id}
            extraData={this.state}
            renderItem={({item}) => (
              <View style={item.id=== 7 ? styles.wrapContentBottom: styles.wrapContent}>
                <View style={styles.leftPart}>
                  <Image source={item.icon} style={styles.icon} />
                </View>
                <View style={styles.rightPart}>
                  <Button
                    containerStyle={styles.flatListBtn}
                    type="text-only"
                    text={item.navName}
                    textStyle={
                      indexChecked == item.id
                        ? styles.itemSelected
                        : styles.itemNonSelected
                    }
                    onPress={() => this.onItemPressed(item)}
                  />
                </View>
              </View>
            )}
          />
          <View style={styles.bottomSpaceView}/>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    items:state.SettingsMain.items,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);

const styles = StyleSheet.create({
  Container: {
    height: Metrics.DEVICE_HEIGHT,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  upperPart: {
    height: Metrics.DEVICE_HEIGHT / 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerPart: {
    flex: 1,
    width: '100%',
  },
  userImage: {
    height: Metrics.DEVICE_HEIGHT / 10,
    width: Metrics.DEVICE_HEIGHT / 10,
    resizeMode: 'contain',
    borderRadius: Metrics.DEVICE_HEIGHT / 14,
  },
  nameText: {
    fontSize: Metrics.DEVICE_WIDTH > 400 ? 18 : 16,
    // color: AppStyles.primaryTextColor,
    textAlign: 'center',
    marginTop: 15,
  },
  emailText: {
    fontSize: Metrics.DEVICE_WIDTH > 400 ? 16 : 14,
    color: AppStyles.lightGrey,
    textAlign: 'center',
    marginTop: 5,
  },
  itemNonSelected: {
    fontSize: Metrics.DEVICE_WIDTH > 400 ? 18 : 16,
    color: AppStyles.primaryTextColor,
    marginLeft: Metrics.DEVICE_WIDTH / 10,
  },
  itemSelected: {
    fontSize: Metrics.DEVICE_WIDTH > 400 ? 18 : 16,
    color: AppStyles.DrawerSelectedRed,
    marginLeft: Metrics.DEVICE_WIDTH / 10,
  },
  wrapContent: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection:'row'
  },
  wrapContentBottom: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomWidth: 0.7,
    borderBottomColor: AppStyles.colorGray,
    flexDirection:'row'
  },
  flatListBtn: {
    width: Metrics.DEVICE_WIDTH - 100,
  },
  leftPart:{
    height: 50,
    width:50,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  rightPart:{
    height: 50,
    flex:1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  icon:{
    height: Metrics.DEVICE_HEIGHT / 35,
    width: Metrics.DEVICE_HEIGHT / 35,
    resizeMode: 'contain',
  },
  bottomSpaceView:{
    width: '100%',
    height:40
  }
});
