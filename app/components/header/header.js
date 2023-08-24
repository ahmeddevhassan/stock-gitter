import React, { Component } from "react";

import {
    View,
    Text,
    Dimensions,
    SafeAreaView,
    Image,
    ImageBackground,
    TouchableOpacity,
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Platform } from 'react-native';

import { BUTTON_TEXT_COLOUR, BUTTON_LOGIN_COLOUR } from '../../utils/Consts'
import { images } from '../../../assets';

//Make a component
class Header extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <SafeAreaView style={styles.safeBackground}>
                <View style={styles.ViewHeader}>
                    <TouchableOpacity onPress={() => {
                        if (this.props.back == false) {
                        }
                        else {
                            this.props.navi.navigate(this.props.back)
                        }
                    }
                    }>
                        <FontAwesome name="angle-left" size={35} color={this.props.back == false ? BUTTON_LOGIN_COLOUR : "#fff"} style={styles.iconStyle} />
                    </TouchableOpacity>
                    <Text style={styles.TextStyle}>
                        {this.props.label}
                    </Text>
                    <Text style={styles.emptyGreenText}>
                        .
                           </Text>
                </View>
            </SafeAreaView>
        );
    }
}
const styles = {
    safeBackground: {
        backgroundColor: BUTTON_LOGIN_COLOUR,
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    ViewHeader: {
        paddingTop: 10,
        backgroundColor: BUTTON_LOGIN_COLOUR,
        paddingBottom: 10,
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    iconStyle: {
        padding: 5,
        marginLeft: 5,

    },
    TextStyle: {
        color: BUTTON_TEXT_COLOUR,
        alignSelf: 'center',
        fontSize: 16,
        padding: 5,
        fontWeight: "600"
    },
    emptyGreenText: {
        color: BUTTON_LOGIN_COLOUR,
        alignSelf: 'center',
        fontSize: 18,
        padding: 5,
        fontWeight: "600"
    },
    imageStyle: {
        resizeMode: 'contain',
    }
};
export default Header;