import Metrics from '../Config/Metrics';

const AppStyles = {
    //Colors
    primaryColor: '#67ACB2',
    colorWhite: '#ffffff',
    colorBlack: '#000000',
    colorGray: '#E0E0E0',
    colorRed: '#FF6666',
    colorGreen:'#529472',
    HeaderColor:'#3A464E',
    DashboardIconColor:'#7C1E4E',
    //Fonts
    fontBold: 'Roboto-Bold',
    fontRegular: 'Roboto-Regular',
    fontMedium: 'Roboto-Medium',
    fontLight: 'Roboto-Light',

    alertErrorLowerTopStyle:{
      borderColor:'#DB615C', 
      backgroundColor: '#FAE2E2',
      top:5
    },
    alertErrorUpperTopStyle:{
      borderColor:'#DB615C', 
      backgroundColor: '#FAE2E2',
      top:Metrics.DEVICE_HEIGHT/2.5,
      zIndex:1
    },
    alertSuccessUpperTopStyle:{
      borderColor:'#84F1B1', 
      backgroundColor: '#E1FFEE',
      top:Metrics.DEVICE_HEIGHT/2.5
    },
    
  };
  
  export default AppStyles;