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
    RCTUIManager
} from 'react-native';

class LoginScene extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        console.log('buyakasa');

        // StatusBarIOS sadece iOS'ta olan bir component. Bu yüzden StatusBarIOS'u kullanmadan
        // "if it's defined" check'i yapıyoruz! C/C++'taki NULL reference check'i gibi, 0'a karşı kontrol gibi...
        if (StatusBarIOS) {
            StatusBarIOS.setHidden(true, false);
        }

    }

    componentWillUnmount() {
    }

    render() {
        console.log('girdi');
        return (
            <View style={styles.container}>
                <Text>
                    Burada kullanicidan username alacagiz.
                </Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1
    },

});

module.exports = LoginScene;
