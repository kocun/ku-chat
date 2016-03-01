/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
    AppRegistry,
    Component,
} from 'react-native';

import EntranceScene from './entrance-scene';

class Kuchat extends Component {
    render() {
        return (
            <EntranceScene>
            </EntranceScene>
        );
    }
}

AppRegistry.registerComponent('Kuchat', () => Kuchat);
