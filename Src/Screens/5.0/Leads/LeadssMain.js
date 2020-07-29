import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  BackHandler
} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import LocalStorage from '../../../Helpers/LocalStorage';

//import device measurements
import Metrics from '../../../Config/Metrics';
import AppStyles from '../../../Config/AppStyles';

import {Search, Plus} from '../../../Config/Images';

//import Actions
import {requestLeadData, resetReducer} from '../../../Redux/Actions/LeadsMain.actions';

//import common Components
import {AnimatedAlert, Card, FAB} from '../../../Components/index';

let localStorage = new LocalStorage();

class LeadsMain extends Component {

  constructor(props){
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.colorTheme = {};
    this.state = {
      searchedText: null,
      dataList: [],
    }
  }

  async componentDidMount(){
   ///this method is called when coming from another screen to Dashboard
   this.viewDidAppear = this.props.navigation.addListener('focus', async() => {
    this.colorTheme = await localStorage.getData("ColorTheme");
    this.props.resetReducer();
    this.props.requestLeadData();
    });
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

   ////Android Hardware BackButton Press Event
   handleBackButtonClick() {
    return true;
  }


  componentWillReceiveProps(nextProps){
    console.log('nextProps-------nextProps--->',nextProps);
    // if(this.props.isLoading && nextProps.data){
    //   this.setState({dataList: nextProps.data.data});
    // }
    if(nextProps.data){
      if(nextProps.data.lead_list){
        console.log("nextProps.data.lead_list==============>",nextProps.data.lead_list);
        this.setState({dataList: nextProps.data.lead_list.data});
      }
    }
  }

  componentWillUnmount() {
    this.viewDidAppear();
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

    //render Item of the FlatList
    renderItem = ({item, index}) => {
      return (
        <Card
          type="Leads-List"
          item={item}
          onPress={() => this.onCardPressed(item, index)}
        />
      );
    };

    //press event of Card
    onCardPressed(item, index) {
    this.props.navigation.navigate('ViewLead', {
      item: item,
     });
  }

  onFABPressed(){
    this.props.navigation.navigate('AddNewLead');
  }

  filterSearch(text){
    let {dataList} = this.state;
    console.log('dataList-------dataList--->',dataList);

    const newData = dataList.filter(function(item){
      console.log('item-------item--->',item);
      const itemData = item.contact.first_name.toString().toUpperCase() 
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    });
    console.log('newData-------newData--->',newData);
    this.setState({
      searchedText: text,
      dataList: newData
    });

    if(text == ''){
      console.log('this.arrayList-------this.arrayList--->',this.props.data.lead_list);
      this.setState({
        dataList: this.props.data.lead_list.data
      });
    }

  }

  render() {
    let {searchedText,dataList} = this.state;
    let textStyle = {
      color: this.colorTheme ? this.colorTheme : AppStyles.DashboardIconColor
    }

    let ThemeStyle = {
      backgroundColor:this.colorTheme ? this.colorTheme : AppStyles.DashboardIconColor
    }

    return <View style={styles.Container}>
              <Spinner visible={this.props.isLoading}/>
              <AnimatedAlert
                  isLoading={this.props.isLoading}
                  error={this.props.errors }
                  style={AppStyles.alertErrorUpperTopStyle}
                />
            <View style={styles.searchPartContainer}>
                <View style={styles.searchView}>
                    <TextInput 
                      style={styles.textInputStyle}
                      value={searchedText}
                      keyboardType="default"
                      underlineColorAndroid="transparent"
                      placeholder="Search Here"
                      onChangeText={(text) => this.filterSearch(text)}
                      />
                    <TouchableOpacity style={styles.searchIcon}>
                      <Image source={Search} style={styles.searchIcon} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.flatListContainer}>
              <View style={styles.flatListInnerView}>
                <Text style={[styles.contactText, textStyle]}>Leads</Text>
                {dataList && dataList.length > 0 && <FlatList
                  data={dataList}
                  horizontal={false}
                  keyExtractor={item => {return item.id;}}
                  extraData={this.state}
                  renderItem={this.renderItem}/> }
              </View>
            </View>
            <FAB style={styles.fabStyle} menuStyle={ThemeStyle}  icon={Plus} onPress={() => this.onFABPressed()}/>
          </View>;
  }
}

const mapStateToProps = state => {
  return {
    errors: state.LeadsMain.errors,
    data:state.LeadsMain.data,
    isLoading:state.LeadsMain.isLoading,
  };
};
//
const mapDispatchToProps = dispatch => {
  return {
    requestLeadData: () => dispatch(requestLeadData()),
    resetReducer: () => dispatch(resetReducer())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(LeadsMain);

const styles = StyleSheet.create({
  Container: {
    flex:1,
    width: Metrics.DEVICE_WIDTH,
    justifyContent: 'flex-start',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  searchPartContainer:{
    height: Metrics.DEVICE_HEIGHT/13,
    width: Metrics.DEVICE_WIDTH,
  },
  flatListContainer:{
    flex:1,
    width: Metrics.DEVICE_WIDTH,
  },
  searchView:{
      flex:1,
      marginLeft:15,
      marginRight:15,
      marginTop:10,
      borderRadius:Metrics.BORDER_RADIUS,
      borderWidth: 1.5,
      borderColor:AppStyles.colorGray,
      flexDirection:'row',
      alignItems:'center',
  },
  searchIcon:{
    height: Metrics.DEVICE_HEIGHT / 35,
    width: Metrics.DEVICE_HEIGHT / 35,
    resizeMode: 'contain',
    marginRight:10
  },
  textInputStyle:{
      flex:1,
      height: 40,
      paddingLeft:10
  },
  flatListInnerView:{
    flex:1,
    marginLeft:15,
    marginRight:15,
    marginTop:15,
    marginBottom:15,
    alignItems:'flex-start',
},
contactText:{
  marginTop:10,
  marginBottom:10,
  fontSize: Metrics.DEVICE_WIDTH > 400 ? 18 : 16,
},
fabStyle:{
  bottom:Metrics.DEVICE_WIDTH/5,
  right:Metrics.DEVICE_WIDTH/8,
}


});
