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
import Firebase from 'firebase';
import InvertibleScrollView from 'react-native-invertible-scroll-view';

class MainScene extends Component {

    constructor(props) {

        super(props);

        this.messages = [];
        this.firebaseMessagesRef = new Firebase('https://kuchat.firebaseio.com/messages/');
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            messsageText: '',
        };

        // Not: ES6'da bunu yapmadan sendMessage içerisinde "this" reference'ını kullanamıyorsunuz.
        this.sendMessage = this.sendMessage.bind(this);

    }

    componentDidMount() {

        // MainScene'in this'ini Firebase'in callback'lerine taşımak için bu reference değişkenini kullanıyoruz.
        var thisRef = this;

        // child_added Firebase'in messages child'ina her yeni child eklendiğinde çalışıyor. İlk açılışta da her
        // eklenmiş kayıt için de 1 kere çağrılıyor. Bu sayede listeyi ilk açtığımızda eski mesajlar ile dolduruyoruz.
        // Bunu optimize etmeli ve HTTP roundtrip sayısını azaltmalıyız! Ama nasıl?
        this.firebaseMessagesRef.limitToLast(20).once('value', function (snapshot) {

            var newMessages = snapshot.val();

            console.log(newMessages);

            if (newMessages) {

                var key = null;

                for (key in newMessages) {

                    if (newMessages.hasOwnProperty(key)) {
                        thisRef.messages.push(newMessages[key]);
                    }

                }

                var lastAddedKey = key;

                var messageArrayItemIDs = thisRef.messages.map((row, index) => index).reverse();

                // Burada yukarıda tanımladığımız thisRef yerine direkt this kullanmış olsaydık, Firebase'in
                // instance'ına ulaşacaktır.
                thisRef.setState({
                    messsageText: '',
                    dataSource: thisRef.state.dataSource.cloneWithRows(thisRef.messages, messageArrayItemIDs)
                }, function () {

                    this.firebaseMessagesRef.limitToLast(1).on('child_added', function (snapshot, prevChildKey) {

                        if (snapshot.key() == lastAddedKey) {
                            return;
                        }

                        var newMessage = snapshot.val();

                        if (newMessage) {
                            thisRef.messages.push(newMessage);
                        }

                        var messageArrayItemIDs = thisRef.messages.map((row, index) => index).reverse();

                        thisRef.setState({
                            messsageText: '',
                            dataSource: thisRef.state.dataSource.cloneWithRows(thisRef.messages, messageArrayItemIDs)
                        }, function () {
                            this.refs.messagesListView.scrollTo({ x: 0, y: 0, animated: false });
                        });

                    });

                });

            }

        });

        // StatusBarIOS sadece iOS'ta olan bir component. Bu yüzden StatusBarIOS'u kullanmadan
        // "if it's defined" check'i yapıyoruz! C/C++'taki NULL reference check'i gibi, 0'a karşı kontrol gibi...
        if (StatusBarIOS) {
            StatusBarIOS.setHidden(true, false);
        }

    }

    componentWillUnmount() {
        // Firebase connection'in sonlandırmamız uygulamanın reliability'si açısından önemli!
        this.state.firebaseMessagesRef.off();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.listViewContainer}>
                    <ListView
                        ref='messagesListView'
                        renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
                        style={styles.listView}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderMessage}
                    />
                </View>
                <View style={styles.messageInputContainer}>
                    <TextInput
                        ref='messageTextTextInput'
                        style={styles.messageTextTextInput}
                        onChangeText={(messsageText) => this.setState({messsageText})}
                        value={this.state.messsageText}
                        multiline={false}
                        placeholder='Mesajınız'
                        autoCorrection={false}
                    />
                    <TouchableHighlight style={styles.sendsendTouchableHighlight} onPress={this.sendMessage}>
                        <Text>
                            GÖNDER
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    renderMessage(rowData) {
        return (
            <View style={styles.message}>
                <Text>{rowData.username}: </Text>
                <Text>{rowData.text}</Text>
            </View>
        );
    }

    sendMessage() {

        this.firebaseMessagesRef.push({
            // username'i static yazıyoruz şimdilik. Önümüzdeki derslerde facebook'tan vs. çekerek dinamik hale
            // getireceğiz.
            username: "umit324324",
            text: this.state.messsageText
        });

    }

}

const styles = StyleSheet.create({

    container: {
        flex: 2,
        flexDirection: 'column',
    },

    listViewContainer: {
        flex: 1,
        backgroundColor: 'red',
    },

    messageInputContainer: {
        flexDirection: 'row',
        backgroundColor: 'blue',
    },

    listView: {
        flex: 1
    },

    message: {
        flex: 2,
        flexDirection: 'row'
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

module.exports = MainScene;
