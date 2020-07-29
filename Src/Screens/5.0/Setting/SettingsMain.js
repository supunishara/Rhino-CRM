import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Platform,
  Text,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';
import LocalStorage from '../../../Helpers/LocalStorage';
import {setTheme} from '../../../Redux/Actions/SettingsMain.actions';

//import device measurements
import Metrics from '../../../Config/Metrics';
import AppStyles from '../../../Config/AppStyles';
import Spinner from 'react-native-loading-spinner-overlay';
import {DropDown, FAB} from '../../../Components/index';
import {Correct} from '../../../Config/Images';

let localStorage = new LocalStorage();
let data = [{value: 'Gray Red',code: '#7C1E4E'}, {value: 'Blue Orange', code: '#EFAC4E'}, {value: 'Green Orange', code: '#EB6138'}];

class SettingsMain extends Component {
  //making header null
  static navigationOptions = {
    header: null,
    
  };

  constructor(props) {
    super(props);
    this.userData = {};
    this.state = {
      isLoading: true,
      selectedTheme: 'Gray Red',
      colorTheme: '#7C1E4E'
    }
  }

  async componentDidMount(){
    this.viewDidAppear = this.props.navigation.addListener('focus', async() => {
      try{
        var that = this;
        this.userData = await localStorage.getData("userData");
        let colorTheme = await localStorage.getData("ColorTheme");
        this.setState({colorTheme: colorTheme});
        console.log("colorTheme--->",colorTheme);
        data.filter(function(data){
          if(colorTheme == null){
            that.setState({colorTheme: '#7C1E4E', selectedTheme: 'Gray Red', });
          }else{
            if(data.code === colorTheme){
              that.setState({selectedTheme: data.value});
            } 
          }
          
        })
        
        setTimeout(() => {
          this.setState({ isLoading: false });
        }, 2000);
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
    this.viewDidAppear();
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  //handle DropDown Changes
 onDropDownChanged = (value, index, data) => {
  this.setState({selectedTheme: value});
 }

async onFABPressed(){
    let {selectedTheme} = this.state;
    switch(selectedTheme){
      case "Gray Red":
        await localStorage.storeData('ColorTheme','#7C1E4E');
        this.setState({colorTheme:'#7C1E4E' });
        this.props.setTheme('#7C1E4E');
        break;
      case "Blue Orange":
        await localStorage.storeData('ColorTheme','#EFAC4E');
        this.setState({colorTheme:'#EFAC4E' });
        this.props.setTheme('#EFAC4E');
        break;
      case "Green Orange":
        await localStorage.storeData('ColorTheme','#EB6138');
        this.setState({colorTheme:'#EB6138' });
        this.props.setTheme('#EB6138');
        break;
    }
 }

  render() {
    let {isLoading, selectedTheme, colorTheme} = this.state;

    let ThemeStyle = {
      backgroundColor:colorTheme
    }

    let textStyle = {
      color: colorTheme
    }
    
    return (
        <View style={styles.Container}>
          <Spinner visible={isLoading}/>
            <View style={styles.lowerContainer}>
                <View style={styles.lowerInnerView}>
                  <Text style={[styles.contactText, textStyle]}>Settings</Text>
                  <View style={styles.upperPart}>
                    {!isLoading && this.userData != null && <Image source={{uri: this.userData.avatar_location}} style={styles.userImage} />}
                  </View>
                  <View style={styles.detailPart}>
                    {!isLoading && this.userData != null && <Text style={styles.detrailText}>First Name: {this.userData.first_name}</Text>}
                    {!isLoading && this.userData != null && <Text style={styles.detrailText}>Last Name: {this.userData.last_name}</Text>}
                    {!isLoading && this.userData != null && <Text style={styles.detrailText}>Email: {this.userData.email}</Text>}
                  </View>

                  {!isLoading && <DropDown
                        data={data}
                        AnimatedText="Theme"
                        onChangeText={(value, index, data) => this.onDropDownChanged(value, index, data)}
                        containerStyle={styles.containerStyle}
                        value={selectedTheme}
                        lineWidth={0}
                        valueExtractor={({ value }) => value}
                        />}
                  <FAB style={styles.fabStyle} menuStyle={ThemeStyle} icon={Correct} onPress={() => this.onFABPressed()}/>
                </View>
                
            </View>
            
    </View>
    )
  }
}

const mapStateToProps = state => {
    return {
      errors: state.SettingsMain.errors,
      data:state.SettingsMain.data,
      // isLoading:state.SettingsMain.isLoading,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      setTheme: (theme) => dispatch(setTheme(theme))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(SettingsMain);

const styles = StyleSheet.create({
    Container: {
        flex:1,
        width: Metrics.DEVICE_WIDTH,
        justifyContent: 'flex-start',
        alignItems: 'center',
        resizeMode: 'contain',
        backgroundColor: AppStyles.colorWhite,
      },
    lowerContainer:{
        flex:1,
        width: Metrics.DEVICE_WIDTH,
      },
    lowerInnerView:{
        flex:1,
        marginLeft:15,
        marginRight:15,
        marginTop:15,
        marginBottom:15,
        alignItems:'flex-start',
        // backgroundColor:'yellow'
      },
    contactText:{
        marginTop:10,
        marginBottom:10,
        fontSize: Metrics.DEVICE_WIDTH > 400 ? 18 : 16,
      },
    upperPart: {
        height: Metrics.DEVICE_HEIGHT / 7,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
    userImage: {
        height: Metrics.DEVICE_HEIGHT / 10,
        width: Metrics.DEVICE_HEIGHT / 10,
        resizeMode: 'contain',
        borderRadius: Metrics.DEVICE_HEIGHT / 14,
      },
    detailPart:{
        paddingBottom:10,
        paddingTop:10,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      },
    detrailText:{
        marginTop:10,
        marginBottom:10,
        color: AppStyles.colorBlack,
        fontSize: Metrics.DEVICE_WIDTH > 400 ? 18 : 16,
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
        bottom:Metrics.DEVICE_WIDTH/5,
        right:Metrics.DEVICE_WIDTH/8,
      }
});
