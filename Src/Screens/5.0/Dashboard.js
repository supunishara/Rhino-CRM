import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  RefreshControl,
  BackHandler
} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import LocalStorage from '../../Helpers/LocalStorage';
import store from '../../Redux/Store/Store';
import {REQUEST_LOADER, FINISH_LOADER} from '../../Redux/Actions/ActionTypes';
import {Calendar, Phone, EmailAt, chat, shakeHand} from '../../Config/Images';

//
import {requestDashboardData} from '../../Redux/Actions/DashBoard.actions';

//import device measurements
import Metrics from '../../Config/Metrics';
import AppStyles from '../../Config/AppStyles';

//import common Components
import {AnimatedAlert, Card, DropDown} from '../../Components/index';
import { ScrollView } from 'react-native-gesture-handler';

//For Dispatching SetTimeout
//
let localStorage = new LocalStorage();

class DashBoard extends Component {

  constructor(props) {
    super(props);
    this.colorTheme = {};
    this.state = {
      refreshing: false
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
//
  async componentDidMount(){
    this.viewDidAppear = this.props.navigation.addListener('focus', async() => {
      try{
        store.dispatch({ type: REQUEST_LOADER })
        this.colorTheme = await localStorage.getData("ColorTheme");
        // let data = await localStorage.getData("DashboardData");
        // console.log("DashboardData--->",data);
        // this.setState({ DashboardData: data});
        // console.log("this.colorTheme--->",this.colorTheme);
        // store.dispatch({ type: FINISH_LOADER })

        this.props.requestDashboardData();


        
      }catch(error){
        console.log("error--->",error);
      }
    });
    
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    // this.viewDidAppear();
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillReceiveProps(nextProps){
    console.log('nextProps-------Dashboard--->',nextProps);
    // if(!nextProps.isLoading && nextProps.data != null ){
    //   console.log('nextProps-------ViewProject--->',nextProps);
    //   this.setState({
    //     DashboardData: nextProps.data
    //   });
    // }
  }

   //Android Hardware BackButton Press Event
   handleBackButtonClick() {
    return true;
  }

   //render Item of the FlatList
   renderItem = ({item, index}) => {
     console.log("renderItem",item);
    return (
      <View style={styles.singleItem }>
        <View style={styles.itemLeftSide}>
          <Text style={styles.weekTitleText}>{item.title}</Text>
          {item.location ? <Text style={styles.weekText}>{item.start} at {item.location}</Text> : <Text style={styles.weekText}>{item.start}</Text>}
          {item.calendar_contact && item.calendar_contact.length > 0 ? <Text style={styles.weekText}>{item.calendar_contact[0].contact.full_name}</Text> : null}
        </View>
        <View style={styles.itemRightSide}>
          {item.type && this.renderTypeImage(item)}
        </View>
      </View>
    );
  };

  //render Item of the FlatList Today
  renderItemToday = ({item, index}) => {
    console.log("DashboardData.todo",item);
   return (
     <View style={styles.singleItem }>
        <View style={styles.itemLeftSide}>
          <Text style={styles.weekTitleText}>{item.title}</Text>
          {item.location ? <Text style={styles.weekText}>{item.start} at {item.location}</Text> : <Text style={styles.weekText}>{item.start}</Text>}
          {item.calendar_contact && item.calendar_contact.length > 0 ? <Text style={styles.weekText}>{item.calendar_contact[0].contact.full_name}</Text> : null}
        </View>
        <View style={styles.itemRightSide}>
          {item.type && this.renderTypeImage(item)}
        </View>
     </View>
   );
 };


 onRefresh = () => {
  this.props.requestDashboardData();
}

 renderTypeImage(item){
  switch (item.type) {
    case 'Other':
      return (
        <Image source={Calendar} style={styles.typeIcon} />
      );
    case 'Call':
      return (
        <Image source={Phone} style={styles.typeIcon} />
      );
    case 'Email':
      return (
        <Image source={EmailAt} style={styles.typeIcon} />
      );
    case 'IM':
      return (
        <Image source={chat} style={styles.typeIcon} />
      );
    case 'Visit':
      return (
        <Image source={shakeHand} style={styles.typeIcon} />
      );
  }
 }


  renderDashBoardData(){
    let textStyle = {
      color: this.colorTheme ? this.colorTheme : AppStyles.DashboardIconColor 
    };

    if(!this.props.isLoading && this.props.data && this.props.data != null ){
      let {data} = this.props;
      console.log("DashboardData--->",data);
      return(
            <View style={styles.dayaMoreContainer}>
              <View style={styles.cardContainer}>
                  <View style={styles.leftSingleCard}>
                    <Text style={styles.upperNodeText}>Target</Text>
                    {data.salesmanTarget && <Text style={[styles.priceText, textStyle]}>{data.salesmanTarget.target_sales}</Text>}
                    
                  </View>
                  <View style={styles.middlesingleCard}>
                    <Text style={styles.upperNodeText}>Ongoing</Text>
                    {data.salesmanTarget &&  <Text style={[styles.priceText, textStyle]}>{data.salesmanTarget.ongoing_sales}</Text>}
                  </View>
                  <View style={styles.rightSingleCard}>
                    <Text style={styles.upperNodeText}>Closed</Text>
                    {data.salesmanTarget && <Text style={[styles.priceText, textStyle]}>{data.salesmanTarget.closed_sales}</Text>}
                  </View>
              </View>
              <View style={styles.dayaMoreContainerMain}>
                {data.salesmanTarget && <Text style={styles.monthText}>Sales period: {data.salesmanTarget.period_label}</Text>}
              </View>
              <View style={styles.lowerContainer}>

              {data.todo && data.todo.length > 0 &&
                  <View style={styles.weekContainer}>
                    <View style={styles.todayMainTextView}><Text style={[styles.todayText,textStyle]}>Today</Text></View>
                    <View style={styles.flatListContainer}> 
                      {data.todo && data.todo.length > 0 && <FlatList
                        data={data.todo}
                        horizontal={false}
                        keyExtractor={item => {return item.id;}}
                        renderItem={this.renderItemToday}/> }
                    </View>
                  </View>
                }

                {data.calendar && data.calendar.length > 0 &&
                  <View style={styles.weekContainer}>
                    <View style={styles.todayMainTextView}><Text style={[styles.todayText, textStyle]}>This Week</Text></View>
                    <View style={styles.flatListContainer}> 
                      {data.calendar && data.calendar.length > 0 && <FlatList
                        data={data.calendar}
                        horizontal={false}
                        keyExtractor={item => {return item.id;}}
                        renderItem={this.renderItem}/> }
                    </View>
                  </View>
                }
              </View>
            </View>
            )
    }
  }


  render() {

    let textStyle = {
      color: this.colorTheme
    }

    let {isLoading} = this.props;

    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var d = new Date();
    var dayName = days[d.getDay()];
    var monthName = Months[d.getMonth()];

    let {refreshing} = this.state;

    return (
      <View style={styles.Container}>
           <Spinner visible={isLoading}/>
              <AnimatedAlert
                ref={instance => {this.child = instance}}
                // isLoading={this.props.isLoading}
                // error={this.props.errors }
              />

          <ScrollView style={styles.subContainer}  showsVerticalScrollIndicator={false} 
            refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
            }>
            <View style={styles.subContainerInnerView}>
              <View style={styles.upperPart}>
                <Text style={styles.currentdateText}>{dayName} {d.getDate()}, {monthName} {d.getFullYear()}</Text>
              </View>
              {!isLoading && this.renderDashBoardData()}
            </View>
            <View style={styles.bottomSpaceView}/>
          </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading:state.Dashboard.isLoading,
    errors: state.Dashboard.errors,
    data:state.Dashboard.data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestDashboardData: () => dispatch(requestDashboardData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);

const styles = StyleSheet.create({
  Container: {
    height: Metrics.DEVICE_HEIGHT,
    width: Metrics.DEVICE_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
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
    justifyContent:'flex-start'
},
upperPart:{
  width: Metrics.DEVICE_WIDTH-30,
},
currentdateText:{
  fontSize: Metrics.DEVICE_WIDTH > 400 ? 21 : 19,
  color: 'black',
  paddingBottom:10,
},
cardContainer:{
  width: Metrics.DEVICE_WIDTH-30,
  // height: Metrics.DEVICE_HEIGHT/8,
  flexDirection:'row',
  marginTop:20,
  marginBottom:20,
},
dayaMoreContainer:{
  width: Metrics.DEVICE_WIDTH-30,
  flex:1,
  alignItems:'center',
  justifyContent:'flex-start'
},
dayaMoreContainerMain:{
  width: Metrics.DEVICE_WIDTH-30,
  borderBottomWidth:0.9,
  borderBottomColor: AppStyles.colorGray,
  alignItems:'center',
  justifyContent:'flex-start',
},
lowerContainer:{
  width: Metrics.DEVICE_WIDTH-30,
  alignItems:'flex-start',
  justifyContent:'flex-start',
  flex:1
},
todayContainer:{
  marginTop:10,
  width: Metrics.DEVICE_WIDTH-30,
  alignItems:'flex-start',
  justifyContent:'flex-start',
  borderRadius:Metrics.BORDER_RADIUS,
  borderWidth: 1.2,
  borderColor:AppStyles.colorGray,
},
weekContainer:{
  marginTop:10,
  width: Metrics.DEVICE_WIDTH-30,
  alignItems:'flex-start',
  justifyContent:'flex-start',
  borderRadius:Metrics.BORDER_RADIUS,
  borderWidth: 1.2,
  borderColor:AppStyles.colorGray,
},
todayLowerMainView:{
  width: Metrics.DEVICE_WIDTH-30,
  alignItems:'flex-start',
  justifyContent:'flex-start',
  flexDirection: 'row',
  marginTop:5,
  marginBottom:10,
},
todayLowerLeftView:{
  flex:1
},
todayLowerRightView:{
  height:25,
  width:25
},
todayMainTextView:{
  marginTop:10,
  width: Metrics.DEVICE_WIDTH-30,
  alignItems:'center',
  justifyContent:'flex-start',
},
flatListContainer:{
  width: Metrics.DEVICE_WIDTH-30,
  alignItems:'center',
  justifyContent:'flex-start',
  // flex:1
},
todayText:{
  fontSize: Metrics.DEVICE_WIDTH > 400 ? 19 : 17,
  marginTop:5,
  paddingBottom:10,
  color:AppStyles.colorBlack 
},
leftSingleCard:{
  // height: Metrics.DEVICE_HEIGHT/8,
  flex:1,
  marginRight:2.5,
  borderRadius:Metrics.BORDER_RADIUS,
  borderWidth: 1.2,
  borderColor:AppStyles.colorGray,
  justifyContent:'center',
  alignItems:'center',
  paddingLeft:5
},
middlesingleCard:{
  // height: Metrics.DEVICE_HEIGHT/8,
  flex:1,
  marginRight:2.5,
  marginLeft:2.5,
  borderRadius:Metrics.BORDER_RADIUS,
  borderWidth: 1.2,
  borderColor:AppStyles.colorGray,
  justifyContent:'center',
  alignItems:'center',
  paddingLeft:5
},
rightSingleCard:{
  // height: Metrics.DEVICE_HEIGHT/8,
  flex:1,
  marginLeft:2.5,
  borderRadius:Metrics.BORDER_RADIUS,
  borderWidth: 1.2,
  borderColor:AppStyles.colorGray,
  justifyContent:'center',
  alignItems:'center',
  paddingLeft:5
},
priceText:{
  fontSize: Metrics.DEVICE_WIDTH > 400 ? 19 : 17,
  marginTop:5,
  paddingBottom:10
},
upperNodeText:{
  paddingTop:10
},
monthText:{
  marginTop:5,
  paddingBottom:10,
},
weekTitleText:{
  marginTop:5,
  paddingBottom:5,
  fontSize: Metrics.DEVICE_WIDTH > 400 ? 15 : 13,
  fontWeight: "bold"
},
weekText:{
  marginTop:5,
  paddingBottom:5,
  fontSize: Metrics.DEVICE_WIDTH > 400 ? 15 : 13,
},
daysText:{
  marginBottom:10
},
singleItem:{
  borderBottomWidth: 1.2,
  borderBottomColor:AppStyles.colorGray,
  paddingBottom:15,
  paddingTop:15,
  flexDirection:'row'
},
bottomSpaceView:{
  width: Metrics.DEVICE_WIDTH-30,
  height:200
},
itemLeftSide:{
  width: Metrics.DEVICE_WIDTH-90,
},
itemRightSide:{
  height:40,
  width:40,
  justifyContent:'center',
  alignItems:'center'
},
typeIcon:{
  height: 20,
  width: 20,
  resizeMode:'contain'
},

});
