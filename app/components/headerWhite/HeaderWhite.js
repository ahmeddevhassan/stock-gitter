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
import { BUTTON_TEXT_COLOUR, BUTTON_LOGIN_COLOUR } from '../../utils/Consts'
import { images } from '../../../assets';
import { StyleSheet, Platform } from 'react-native';

//Make a component
class HeaderWhite extends Component {

    constructor(props) {
        super(props);

    }
    callLogOut() {
        // console.log(" this.props.navi ", this.props.navi);

        this.props.navi.navigate('Logout');
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
                        <FontAwesome name="angle-left" size={35} color={this.props.back == false ? '#fff' : BUTTON_LOGIN_COLOUR} style={styles.iconStyle} />
                    </TouchableOpacity>
                    <Text style={styles.TextStyle}>
                        {this.props.label}
                    </Text>

                    {this.props.label == "Profile" ? <Text style={styles.emptyGreenText}>.</Text>
                        // <TouchableOpacity onPress={() => this.callLogOut()}>
                        //     <View style={styles.CustomLogoutButton}>
                        //         <Text style={styles.emptyGreenText}>Logout</Text>
                        //     </View>
                        // </TouchableOpacity> 
                        : <Text style={styles.emptyGreenText}>.</Text>}
                </View>
            </SafeAreaView>
        );
    }
}
const styles = {
    safeBackground: {
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? 25 : 0

    },
    ViewHeader: {
        paddingTop: 10,
        backgroundColor: '#fff',
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
        color: '#666666',
        alignSelf: 'center',
        fontSize: 18,
        padding: 5,
        fontWeight: "600"
    },
    emptyGreenText: {
        color: '#fff',
        alignSelf: 'center',
        fontSize: 18,
        padding: 5,
        fontWeight: "600"
    },
    imageStyle: {
        resizeMode: 'contain',
    }, CustomLogoutButton: {
        backgroundColor: BUTTON_LOGIN_COLOUR,
        padding: 5,
        marginRight: 5,
        borderRadius: 10,

    }

};
export default HeaderWhite;