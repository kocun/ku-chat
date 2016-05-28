/**
 * Created by umdemir on 23/02/16.
 */
'use strict';
import React, {
    AppRegistry,
    Component,
    StyleSheet,
    StatusBarIOS,
    Navigator,
    Text,
    TouchableOpacity,
    AsyncStorage,
    View
} from 'react-native';

class EntranceScene extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        var thisRef = this;

        // StatusBarIOS sadece iOS'ta olan bir component. Bu yüzden StatusBarIOS'u kullanmadan
        // "if it's defined" check'i yapıyoruz! C/C++'taki NULL reference check'i gibi, 0'a karşı kontrol gibi...
        if (StatusBarIOS) {
            StatusBarIOS.setHidden(true, false);
        }

        AsyncStorage
            .getItem('ASYNCSTORAGE_KEY_USERNAME')
            .then((username) => {

                if (username) {
                    thisRef.refs.navigator.replace({ id: 'mainRoute' });
                } else {
                    thisRef.refs.navigator.replace({ id: 'loginRoute' });
                }

            });

    }

    componentWillUnmount() {
    }

    render() {
        return (
            <Navigator
                ref='navigator'
                style={styles.container}
                initialRoute={{id: 'entranceRoute'}}
                renderScene={this.navigatorRenderScene}/>
        );
    }

    navigatorRenderScene(route, navigator) {

        var MainScene = require('./main-scene');
        return (<MainScene navigator={navigator} passProps={navigator} title="Main Scene"/>);

        switch (route.id) {

            case 'entranceRoute': {
                return (<View />);
            }

            case 'loginRoute': {
                var LoginScene = require('./login-scene');
                return (<LoginScene navigator={navigator} passProps={navigator} title="Login Scene"/>);
            }

            case 'mainRoute': {
                var MainScene = require('./main-scene');
                return (<MainScene navigator={navigator} passProps={navigator} title="Main Scene"/>);
            }

        }

    }

}

const styles = StyleSheet.create({

});

module.exports = EntranceScene;
