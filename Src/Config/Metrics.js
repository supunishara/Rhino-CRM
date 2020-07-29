import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export default {
  DEVICE_HEIGHT: height,
  DEVICE_WIDTH: width,
  BTN_HEIGHT: height / 18,
  BORDER_RADIUS: 5,
  HEADER_HEIGHT: height / 10,
  COMMON_PADDING: height / 40,
  CARD_HEIGHT:height/12
};
