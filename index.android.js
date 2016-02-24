/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
} from 'react-native';

import MainScene from './main-scene';

class Kuchat extends Component {
  render() {
    return (
      <MainScene>
      </MainScene>
    );
  }
}

AppRegistry.registerComponent('Kuchat', () => Kuchat);
