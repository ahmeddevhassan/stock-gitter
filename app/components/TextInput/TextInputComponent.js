import React, { Component } from "react";
import {
    View, Text, TextInput, TouchableNativeFeedbackBase
} from "react-native";
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
//Make a component
export default class TextInputComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            secure: false,
            keyboardType: 'default',
        }
        if (this.props.secure != undefined) {
            this.state.secure = true;
        }

        if (this.props.value != undefined) {
            this.state.text = this.props.value;
        }
        if (this.props.keyboardType) {
            this.state.keyboardType = 'numeric'
        }
    }
    setText(text) {
        this.setState({ text });
        this.props.handleInput(text, this.props.flag);
    }

    render() {
        return (
            <Item style={styles.viewStyle} floatingLabel>
                <Label style={{ color: '#000' }}>
                    {this.props.label}
                </Label>
                <Input
                    style={styles.textInputStyle}
                    onChangeText={(text) => this.setText(text)}
                    value={this.props.value}
                    secureTextEntry={this.state.secure}
                    keyboardType={this.state.keyboardType}
                />
            </Item>
        );
    }
}
const styles = {
    viewStyle: {
        margin: 10,
        marginLeft: 20,
        marginRight: 20,
        width: "80%",
        alignSelf: 'center',
    },
    textInputStyle: {
    },
    labelStyle: {
        fontSize: 18,
        margin: 5
    }
};
