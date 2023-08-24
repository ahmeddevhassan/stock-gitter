import React, { Component } from "react";
import {
    View,
    Modal,
    ActivityIndicator
} from "react-native";
import { Activity_INDICATOR_COLOR, Activity_INDICATOR_SIZE } from '../../utils/Consts'
//Make a component
class LoadingComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                <Modal
                    transparent={true}
                    style={styles.modalStyle}
                    visible={this.props.show}
                    onRequestClose={() => {
                    }}>
                    <View style={styles.modalViewStyle}>
                        <ActivityIndicator size={Activity_INDICATOR_SIZE} color={Activity_INDICATOR_COLOR} />
                    </View>
                </Modal>
            </View>
        );
    }
}
const styles = {
    modalStyle: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalViewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
};
export default LoadingComponent;