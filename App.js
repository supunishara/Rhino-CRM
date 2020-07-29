import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './Src/Redux/Store/Store';
import Navigator from './Src/Config/Routes';

console.disableYellowBox = true;
export default class App extends Component {
  handleNavigationState = (previous, next, action) => {
    if (action.routeName === 'DrawerOpen') {
      alert('open');
    } else if (action.routeName === 'DrawerClose') {
      alert('close');
    }
  };

  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}

//
