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
import {requestContactsData, resetReducer} from '../../../Redux/Actions/ContactsMain.actions';

//import common Components
import {AnimatedAlert, Card, FAB} from '../../../Components/index';

let localStorage = new LocalStorage();


class ContactsMain extends Component {

  constructor(props){
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.colorTheme = {};
    this.state = {
      searchedText: null,
      dataList: [],
    }
  }
//
  async componentDidMount(){
   ///this method is called when coming from another screen to Dashboard
   this.viewDidAppear = this.props.navigation.addListener('focus', async() => {
    this.colorTheme = await localStorage.getData("ColorTheme");
    this.props.resetReducer();
    this.props.requestContactsData();
    });
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
//
  componentWillUnmount() {
    this.viewDidAppear();
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

   //Android Hardware BackButton Press Event
  handleBackButtonClick() {
    return true;
  }

  componentWillReceiveProps(nextProps){
    console.log('nextProps-------nextProps--->',nextProps);
    if(nextProps.data){
      this.setState({dataList: nextProps.data.data});
    }
    if(nextProps.errors){
      this.child.handlePress(nextProps.errors, false);
      setTimeout(() => {
        this.props.resetReducer();
      }, 3500)
    }
  }

    //render Item of the FlatList
    renderItem = ({item, index}) => {
      console.log("item------------>",item);
      return (
        <Card
          type="Contact-List"
          item={item}
          onPress={() => this.onCardPressed(item)}
        />
      );
    };

    //press event of Card
  onCardPressed(item) {
    this.props.navigation.navigate('ViewContact', {
      item: item,
    });
  }

  onFABPressed(){
    this.props.navigation.navigate('AddNewContact');
  }

  filterSearch(text){
    let {dataList} = this.state;

    const newData = dataList.filter(function(item){
      const itemData = item.first_name.toString().toUpperCase() 
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    });
    console.log('newData-------newData--->',newData);
    this.setState({
      searchedText: text,
      dataList: newData
    });

    if(text == ''){
      console.log('this.arrayList-------this.arrayList--->',this.props.data.data);
      this.setState({
        dataList: this.props.data.data
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
                ref={instance => {this.child = instance}}
                isLoading={this.props.isLoading}
                error={this.props.errors }
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
                <Text style={[styles.contactText, textStyle]}>Contacts</Text>
                {dataList && dataList.length > 0 && <FlatList
                  data={dataList}
                  horizontal={false}
                  keyExtractor={item => {return item.id;}}
                  extraData={this.state}
                  renderItem={this.renderItem}/> }
              </View>
            </View>
            <FAB style={styles.fabStyle} menuStyle={ThemeStyle} icon={Plus} onPress={() => this.onFABPressed()}/>
          </View>;
  }
}

const mapStateToProps = state => {
  return {
    errors: state.ContactsMain.errors,
    data:state.ContactsMain.data,
    isLoading:state.ContactsMain.isLoading,
  };
};
//
const mapDispatchToProps = dispatch => {
  return {
    requestContactsData: () => dispatch(requestContactsData()),
    resetReducer: () => dispatch(resetReducer())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ContactsMain);

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
