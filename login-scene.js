/**
 * Created by umdemir on 23/02/16.
 */
'use strict';
import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    ListView,
    TextInput,
    StatusBarIOS,
    TouchableHighlight,
    RCTUIManager,
    AsyncStorage
} from 'react-native';

var FBLogin = require('react-native-facebook-login');
var FBLoginManager = React.FBLoginManager;

class LoginScene extends Component {

    constructor(props) {

        super(props);

        this.state = {
        };

    }

    componentDidMount() {

        // StatusBarIOS sadece iOS'ta olan bir component. Bu yüzden StatusBarIOS'u kullanmadan
        // "if it's defined" check'i yapıyoruz! C/C++'taki NULL reference check'i gibi, 0'a karşı kontrol gibi...
        if (StatusBarIOS) {
            StatusBarIOS.setHidden(true, false);
        }

    }

    componentWillUnmount() {
    }

    render() {
        return (
            <FBLogin
                onLogin={function(e){console.log(e)}}
                onLogout={function(e){console.log(e)}}
                onCancel={function(e){console.log(e)}}
                onPermissionsMissing={function(e){console.log(e)}}
            />
        );
    }

}

const styles = StyleSheet.create({

});

module.exports = LoginScene;
