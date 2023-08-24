import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    SafeAreaView,
    Image,
    ImageBackground,
    TouchableOpacity,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Modal,
} from "react-native";
import { BUTTON_TEXT_COLOUR, BUTTON_LOGIN_COLOUR } from '../../utils/Consts'
import { images } from '../../../assets';
import { Left, Thumbnail, Body, Container, Content } from 'native-base'
import { Linking } from 'expo';

import { WebView } from 'react-native-webview'
import moment from 'moment';
//Make a component
class NotifiComponents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            url: '',
        }
    }

    openModal = () => {
        this.setState({ modal: !this.state.modal })
    }
    render() {
        let data = this.props.obj;

        return (
            <>

                <Modal
                    animationType="slide"
                    transparent={true}
                    style={{
                        flex: 1,
                        height: "100%",
                        width: "100%"
                    }}
                    visible={this.state.modal}
                    onRequestClose={() => {

                    }}>
                    <View style={{ flex: 1, width: "100%", height: "100%" }}>
                        <View style={{ backgroundColor: BUTTON_LOGIN_COLOUR }}>
                            <SafeAreaView style={{ justifyContent: 'center' }}>
                                <View style={{ paddingTop: 20, paddingBottom: 12, backgroundColor: BUTTON_LOGIN_COLOUR, justifyContent: 'space-between', alignContent: 'center', flexDirection: 'row' }}>

                                    <View style={{ alignSelf: 'center' }}>
                                        <Text style={{
                                            fontSize: 17,
                                            color: 'white',
                                            alignSelf: 'center',
                                            padding: 10,
                                        }} onPress={() => this.openModal(!this.state.modal)} > Close </Text>
                                    </View>
                                    <View style={{ alignSelf: 'center' }}>
                                        <Text style={{
                                            fontSize: 17,
                                            color: 'white',
                                            alignSelf: 'center',
                                        }}  >News </Text>
                                    </View>
                                    <View style={{ alignSelf: 'center' }}>
                                        <Text style={{ color: BUTTON_LOGIN_COLOUR }}>
                                            ......
                         </Text>
                                    </View>
                                </View>
                            </SafeAreaView>
                        </View>

                        <WebView
                            ref="webview"
                            style={{ flex: 1, width: "100%", height: "100%", borderWidth: 3, borderColor: 'red' }}
                            source={{ uri: this.state.url }}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            originWhitelist={["*"]}
                        />

                    </View>
                </Modal>


                <TouchableWithoutFeedback onPress={() => {
                    // Linking.openURL(data.url)
                    this.setState({ url: data.url })
                    this.openModal()
                }}>

                    <View style={styles.ViewHeader}>
                        <View>
                            <Thumbnail source={{ uri: data.urlToImage[0] == "h" ? data.urlToImage : 'http://api.stockgitter.com' + data.urlToImage }} />
                        </View>
                        <View style={styles.bodyStyle}>
                            <View style={styles.rowViewText}>
                                <Text style={styles.TextBoldHeadingStyle} numberOfLines={1}>{data.title} </Text>
                            </View>
                            <Text style={styles.TextSubHeadingStyle} numberOfLines={1}>{moment(data.publishedAt).format('LLLL')}</Text>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </>
        );
    }
}
const styles = {
    safeBackground: {
        backgroundColor: BUTTON_LOGIN_COLOUR
    },
    rowViewText: {
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5,

    },
    ViewHeader: {
        padding: 8,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 8,
        marginRight: 8,
        backgroundColor: '#EDF0F2',
        flexDirection: 'row',
        borderRadius: 10,
    },
    bodyStyle: {
        flexWrap: 'wrap',
        flex: 1,
        width: "70%",
        flexDirection: 'row'

    },
    TextBoldHeadingStyle: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        color: '#666666',
        flexShrink: 1,
        fontWeight: '600'
    },
    TextHeadingStyle: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        color: '#AAAAAA',
        flexShrink: 1,
        fontWeight: '400'
    },
    TextSubHeadingStyle: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        color: BUTTON_LOGIN_COLOUR,
        fontWeight: '400',
        flexShrink: 1,
        fontSize: 12,
    },
    imageStyle: {
        resizeMode: 'contain',
    }
};
export default NotifiComponents;