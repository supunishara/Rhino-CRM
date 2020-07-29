import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Linking,
  Platform,
  Text,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';
import MapView, {PROVIDER_GOOGLE, Marker,} from "react-native-maps";
import Spinner from 'react-native-loading-spinner-overlay';
import {AnimatedAlert} from '../../../Components/index';
import AppStyles from '../../../Config/AppStyles';

////import device measurements
import Metrics from '../../../Config/Metrics';

import { requestMapData} from '../../../Redux/Actions/MapMain.actions';


class MapMain extends Component {
  //making header null
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.mapArray = [];
  }

  async componentDidMount(){
    this.viewDidAppear = this.props.navigation.addListener('focus', async() => {
      try{
        this.props.requestMapData();
      }catch(error){
        console.log("error--->",error);
      }
    });
    
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillReceiveProps(nextProps){
    console.log("nextProps--->",nextProps);
    if(nextProps.mapData && !nextProps.isLoading){
      if(nextProps.mapData && nextProps.mapData.length > 0){
        
        this.mapArray = nextProps.mapData;
      }
    }
    if(nextProps.errors){
      this.child.handlePress('Cannot Acess Map Details', true);
    }
  }

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

  showMapMarkers = () => {
    if(!this.props.isLoading && this.mapArray && this.mapArray.length > 0){
      return(
        this.mapArray.map((marker, i) => (
          <Marker
            coordinate = {{
                    latitude: marker.lat,
                    longitude: marker.lng
                }}
          />
        ))
      );
    }
  }

  render() {
    return <View style={styles.Container}>
            <Spinner visible={this.props.isLoading}/>
            <AnimatedAlert
                  ref={instance => {this.child = instance}}
                  isLoading={this.props.isLoading}
                  error={this.props.errors }
                  style={AppStyles.alertErrorUpperTopStyle}
                />
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.mapStyle}
                initialRegion={{
                    latitude: 6.9271,
                    longitude: 79.8612,
                    latitudeDelta: 0.0972,
                    longitudeDelta: 0.0972,
                    }}
            >
              {this.showMapMarkers()}
            </MapView>
    </View>;
  }
}

const mapStateToProps = state => {
    return {
      errors: state.MapMain.errors,
      mapData:state.MapMain.mapData,
      isLoading:state.MapMain.isLoading,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        requestMapData: () => dispatch(requestMapData()),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(MapMain);

const styles = StyleSheet.create({
  Container: {
    height: Metrics.DEVICE_HEIGHT,
    width: Metrics.DEVICE_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  mapStyle:{
    height: Metrics.DEVICE_HEIGHT,
    width: Metrics.DEVICE_WIDTH,
  }
});
