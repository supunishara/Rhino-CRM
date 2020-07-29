import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import Share from 'react-native-share';

//import device measurements
import Metrics from '../../Config/Metrics';

import LocalStorage from '../../Helpers/LocalStorage';
import {setTheme} from '../../Redux/Actions/SettingsMain.actions';


let localStorage = new LocalStorage();


class Splash extends Component {
  //making header null
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.colorTheme = {};
    this.state = {
      isDateTimePickerVisible: false
    };
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
 
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };
 
  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    // console.log(date.format("YYYY-MM-DD"));
    console.log(moment(date).format("YYYY-MM-DD"));
    this.hideDateTimePicker();
  };

  ////Navigate to Welcome page after 1 second
  async componentDidMount() {

    await this.Wait();
    this.colorTheme = await localStorage.getData("ColorTheme");
    console.log("this.colorTheme--Splash-Splash===Splash====Splash>",this.colorTheme);
    this.props.setTheme(this.colorTheme);
    let StaySignedInToken = await localStorage.getData("isStaySignedIn");
    if(StaySignedInToken){
      this.props.navigation.navigate('Dashboard');
    }else{
      this.props.navigation.navigate('SignIn');
    }
    
  }

  Wait= () => {
    return new Promise(res => setTimeout(res, 1000));
}

makeCall = () => {
  Linking.openURL('tel:119')
}

sendSMS = () =>{
  const url = (Platform.OS === 'android')? 'sms:919999999999?body=your message': 'sms:919999999999';

  Linking.canOpenURL(url).then(supported => {
    if (!supported) {
      console.log('Unsupported url: ' + url)
    } else {
      return Linking.openURL(url)
    }
  }).catch(err => console.error('An error occurred', err))
}

sendEmail = () => {
  Linking.openURL('mailto:example@gmail.com?subject=example&body=example')
}

share = () => {
  const url = 'https://awesome.contents.com/';
  const title = 'Awesome Contents';
  const message = 'Please check this out.';
  const options = Platform.select({
    ios: {
      activityItemSources: [
        { // For sharing url with custom title.
          placeholderItem: { type: 'url', content: url },
          item: {
            default: { type: 'url', content: url },
          },
          subject: {
            default: title,
          },
          linkMetadata: { originalUrl: url, url, title },
        },
        { // For sharing text.
          placeholderItem: { type: 'text', content: message },
          item: {
            default: { type: 'text', content: message },
            message: null, // Specify no text to share via Messages app.
          },
          linkMetadata: { // For showing app icon on share preview.
             title: message
          },
        },
        { // For using custom icon instead of default text icon at share preview when sharing with message.
          placeholderItem: {
            type: 'url',
            // content: icon
          },
          item: {
            default: {
              type: 'text',
              content: `${message} ${url}`
            },
          },
          linkMetadata: {
             title: message,
            //  icon: icon
          }
        },
      ],
    },
    default: {
      title,
      subject: title,
      message: `${message} ${url}`,
    },
  });

  Share.open(options);

}


  render() {
    return <View style={styles.Container}>
    {/* <TouchableOpacity onPress={this.showDateTimePicker}>
      <Text>CLICK ME</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={this.sendSMS}>
      <Text>Send SMS</Text>
    </TouchableOpacity>


    <TouchableOpacity onPress={this.makeCall}>
      <Text>Make Call</Text>
    </TouchableOpacity>


    <TouchableOpacity onPress={this.sendEmail}>
      <Text>send Email</Text>
    </TouchableOpacity>


    <TouchableOpacity onPress={this.share}>
      <Text>Share</Text>
    </TouchableOpacity>


      <DateTimePicker
            mode="date"
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
          /> */}
    </View>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setTheme: (theme) => dispatch(setTheme(theme))
  };
};

const mapStateToProps = state => {
  return {
    errors: state.SettingsMain.errors,
    data:state.SettingsMain.data,
    // isLoading:state.SettingsMain.isLoading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);

const styles = StyleSheet.create({
  Container: {
    height: Metrics.DEVICE_HEIGHT,
    width: Metrics.DEVICE_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
});
