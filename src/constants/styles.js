import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  WIDTH: width,
  HEIGHT: height,
  SPACING: {
    PADDING: 40,
  },
  COLORS: {
    WHITE: '#FFFFFF',
    BLACK: '#000000',
    GREY: '#303030',
    PRIMARY: '#F97352',
  },
}