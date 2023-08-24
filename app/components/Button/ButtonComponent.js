import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,

} from "react-native";
import { BUTTON_TEXT_COLOUR, BUTTON_LOGIN_COLOUR } from '.././../utils/Consts'
//Make a component
class ButtonComponent extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={this.props.red ? styles.RedStyle : styles.GreenStyle}>
                <Text style={styles.TextStyle}>
                    {this.props.label}
                </Text>

            </View>
        );
    }
}
const styles = {
    GreenStyle: {
        margin: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 30,
        backgroundColor: BUTTON_LOGIN_COLOUR,
        justifyContent: 'center',
        alignItem: 'center',
        width: Dimensions.get('window').width / 1.25,

        maxWidth: 300,
    },
    RedStyle: {
        margin: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 30,
        backgroundColor: "#CE4D4D",
        justifyContent: 'center',
        alignItem: 'center',
        width: Dimensions.get('window').width / 1.25,

        maxWidth: 300,
    },
    TextStyle: {
        color: BUTTON_TEXT_COLOUR,
        alignSelf: 'center',
        fontSize: 16,
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 6,
        paddingBottom: 6,

    },
};
export default ButtonComponent;