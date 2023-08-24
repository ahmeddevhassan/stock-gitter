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
import { BUTTON_TEXT_COLOUR, BUTTON_LOGIN_COLOUR } from '../../utils/Consts'
import { images } from '../../../assets';
import { Left, Thumbnail, Body } from 'native-base';
import moment from 'moment'

//Make a component
class NotificationComponent extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <View style={styles.ViewHeader}>
                <View>
                    <Thumbnail source={images.notificationIcon} />
                </View>
                <View style={styles.bodyStyle}>
                    <View style={styles.rowViewText}>
                        <Text style={styles.TextBoldHeadingStyle}>stockgitterhelper </Text>
                        <Text style={styles.TextHeadingStyle}>{this.props.data.title} </Text>
                    </View>
                    <Text style={styles.TextSubHeadingStyle} numberOfLines={1}>{moment(this.props.data.created_at).format('LLLL')}</Text>
                </View>

            </View>
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
        flex: 1,
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
export default NotificationComponent;