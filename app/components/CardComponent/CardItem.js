import React, { Component } from "react";
import {
    View,
    Text
} from "react-native";
import { Left, Right, ListItem } from "native-base";//Make a component
class CardItem extends Component {
    render() {
        return (
            <ListItem numberOfLines={1} style={styles.viewStyle}>
                <View style={{}}>
                    <Text>
                        {this.props.title}
                    </Text>
                </View>
                <View style={{ width: "50%", marginLeft: 5, flexDirection: 'row', flexWrap: 'wrap' }}>
                    <Text>
                        {this.props.value}
                    </Text>
                </View>
            </ListItem >
        );
    }
}
const styles = {
    viewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 0,
        marginBottom: 0,
        borderWidth: 0,
        padding: 0,
        bottom: 0,
        // borderBottomWidth: 0,
    }
};
export default CardItem;