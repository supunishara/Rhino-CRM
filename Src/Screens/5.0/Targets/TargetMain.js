import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Alert,
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

////import Actions
import {requestTargetData, resetReducer, getOneSalesmanData} from '../../../Redux/Actions/TargetMain.actions';

//import common Components
import {AnimatedAlert, Card, DropDown} from '../../../Components/index';

let localStorage = new LocalStorage();


class TargetMain extends Component {

  constructor(props){
    super(props);
    this.colorTheme = {};
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.resultArray = [];
    this.state = {
      selectedYear: null
    }
  }

  async componentDidMount(){
   ///this method is called when coming from another screen to Dashboard
   this.viewDidAppear = this.props.navigation.addListener('focus', async () => {
    this.colorTheme = await localStorage.getData("ColorTheme");
    this.props.requestTargetData();
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

  handleBackButtonClick() {
    return true;
  }

  componentWillReceiveProps(nextProps){
    console.log('nextProps--------->',nextProps);
    if(nextProps.multipleData && nextProps.multipleData != null){
      if(nextProps.multipleData[0].name && nextProps.multipleData[0].name.length > 0){
        this.resultArray = [];
          nextProps.multipleData[0].name.map(result => {
            this.resultArray.push({title: result})
          });
      }
    }

    if(nextProps.data && nextProps.data != null){
      if(nextProps.data.message && !nextProps.isLoading ){
        Alert.alert(
          "Warning !!!",
            nextProps.data.message, 
          [
            { text: "OK", onPress: () => this.props.resetReducer()}
          ],
          { cancelable: false }
        );
      }
    }
    
    if(nextProps.errors){
      this.child.handlePress(nextProps.errors, false);
      setTimeout(() => {
        this.props.resetReducer();
      }, 3500)
    }
  }

  //handle DropDown Changes
 onDropDownChanged = (value, index, data) => {
  this.props.resetReducer();
  this.setState({selectedYear:value });
  this.props.getOneSalesmanData(value);
 }

 //render Item of the FlatList
 renderItem = ({item, index}) => {
  console.log("item------------>",item);
  return (
    <View style={styles.rowTitles}>
        <View style={styles.listItem}>{item.period_no != null ? <Text>{item.period_no}</Text> : <Text>0</Text>}</View>
        <View style={styles.listItem}>{item.target_sales != null ? <Text>{item.target_sales}</Text> :  <Text>0</Text>}</View>
        <View style={styles.listItem}>{item.ongoing_sales != null ? <Text>{item.ongoing_sales}</Text> : <Text>0</Text>}</View>
        <View style={styles.listItem}>{item.closed_sales != null ? <Text>{item.closed_sales}</Text> : <Text>0</Text>}</View>
      </View>
  );
};

 renderData(){
   if(this.props.data && this.props.data.length > 0){
      return(
        <View style={styles.flatListContainer}>
          <View style={styles.listTitles}>
            <View style={styles.listItem}><Text>Period</Text></View>
            <View style={styles.listItem}><Text>Target</Text></View>
            <View style={styles.listItem}><Text>Ongoing</Text></View>
            <View style={styles.listItem}><Text>Closed</Text></View>
          </View>
          <View>
          {this.props.data && this.props.data.length > 0 && <FlatList
                        data={this.props.data}
                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => {return item.id;}}
                        extraData={this.state}
                        renderItem={this.renderItem}/> }
          </View>
        </View>
     )
   }
 }

  render() {
    let {selectedYear} = this.state;

    let textStyle = {
      color: this.colorTheme ? this.colorTheme : AppStyles.DashboardIconColor
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
                    <View style={{flex:1,justifyContent:'flex-start'}}>
                        <Text style={[styles.contactText, textStyle]}>Targets</Text>
                        <Text style={styles.leadText}>View Screen</Text>
                    </View>
                </View>

                <View style={styles.DetailContainerView}>
                {this.resultArray && this.resultArray.length > 0 ?
                  <DropDown
                          data={this.resultArray}
                          AnimatedText="Year"
                          onChangeText={(value, index, data) => this.onDropDownChanged(value, index, data)}
                          containerStyle={styles.containerStyle}
                          value={selectedYear}
                          lineWidth={0}
                          valueExtractor={({ title }) => title}
                        /> : null}

                      {this.renderData()}  
                      <View style={styles.listTitles}/>
                </View>

              </View>
            </View>

          </View>;
  }
}
//
const mapStateToProps = state => {
  return {
    errors: state.TargetMain.errors,
    data:state.TargetMain.data,
    isLoading:state.TargetMain.isLoading,
    multipleData: state.TargetMain.multipleData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestTargetData: () => dispatch(requestTargetData()),
    resetReducer: () => dispatch(resetReducer()),
    getOneSalesmanData: (id) => dispatch(getOneSalesmanData(id))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(TargetMain);

const styles = StyleSheet.create({
  Container: {
    flex:1,
    width: Metrics.DEVICE_WIDTH,
    justifyContent: 'flex-start',
    alignItems: 'center',
    resizeMode: 'contain',
    backgroundColor:'white'
  },
  flatListContainer:{
    flex:1,
    width: Metrics.DEVICE_WIDTH,
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
  leadText:{
    marginTop:5,
    marginBottom:5,
    color: AppStyles.colorBlack,
    fontSize: Metrics.DEVICE_WIDTH > 400 ? 14 : 12,
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
DetailContainerView:{
  flex:1,
  width: Metrics.DEVICE_WIDTH-30,
  alignItems:'center',
},
flatListContainer:{
  flex:1,
  width: Metrics.DEVICE_WIDTH-30,
},
listTitles:{
  width: Metrics.DEVICE_WIDTH-30,
  height: 1.5*Metrics.BTN_HEIGHT,
  flexDirection: 'row'
},
rowTitles:{
  width: Metrics.DEVICE_WIDTH-30,
  height: 1.5*Metrics.BTN_HEIGHT,
  flexDirection: 'row',
  borderBottomWidth: 1,
  borderBottomColor : AppStyles.colorGray
},
listItem:{
  flex:1,
  justifyContent:'center',
  alignItems:'center'
}

});
