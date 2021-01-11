import {DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';
import {DefaultTheme as PaperDefaultTheme} from 'react-native-paper';
import Colors from './Colors';

const Themes = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    background: Colors.White,
    text: Colors.DarkGray,
  },
};

export default Themes;
