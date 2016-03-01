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

class LoginScene extends Component {

    constructor(props) {

        super(props);

        this.state = {
            username: ''
        };

        // Not: ES6'da bunu yapmadan sendMessage içerisinde "this" reference'ını kullanamıyorsunuz.
        this.setUsername = this.setUsername.bind(this);

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
            <View style={styles.container}>
                <TextInput
                    ref='messageTextTextInput'
                    style={styles.messageTextTextInput}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    multiline={false}
                    placeholder='Kullanıcı Adı'
                    autoCorrection={false}
                />
                <TouchableHighlight style={styles.sendsendTouchableHighlight} onPress={this.setUsername}>
                    <Text>
                        GÖNDER
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }

    setUsername() {

        var thisRef = this;

        AsyncStorage
            .setItem('ASYNCSTORAGE_KEY_USERNAME', this.state.username)
            .then((username) => {
                thisRef.props.navigator.replace({ id: 'mainRoute' });
            });

    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1
    },

    messageTextTextInput: {
        flex: 1,
        paddingLeft: 5,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    },

    sendsendTouchableHighlight: {
        padding: 5,
        margin: 5,
        backgroundColor: '#dedede',
    },

});

module.exports = LoginScene;
