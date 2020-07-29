import {FETCHING_DATA, RESET,SETTING_THEME} from './ActionTypes';
import {API, APIEndPoints} from '../../Helpers/URL';

export const resetReducer = () => {
    return {
      type: RESET
    }
  }

  export const setTheme = (color) => {
    console.log("color==color",color);
    return {
        type: SETTING_THEME,
        payload: {
            theme: color
        },
      };
}
