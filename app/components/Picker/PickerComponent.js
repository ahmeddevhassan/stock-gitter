import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,

} from "react-native";
import { Container, Header, Content, Picker, Form } from "native-base";
import { country } from "../../utils/CountryConstants";
import { experienceArr, investmentArr, defaultBroke, defaultMarket } from "../../utils/experienceConstants";
import { HoursConstants, minutesConstants, investmentPreference, OrderType, OrderActionType, Market } from "../../utils/Consts";
//Make a component
const _ = require('lodash');
class PickerComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: "key1",
            arr: []
        };
        if (this.props.tag == "country") {
            this.state.arr = country
            this.state.selected = this.state.arr[0].code
        }
        if (this.props.tag == "experience") {
            this.state.arr = experienceArr
            this.state.selected = this.state.arr[0].code
        }
        if (this.props.tag == "investment") {
            this.state.arr = investmentArr
            this.state.selected = this.state.arr[0].code
        }
        if (this.props.tag == "defaultbroke") {
            this.state.arr = defaultBroke
            this.state.selected = this.state.arr[0].code
        }
        if (this.props.tag == "defaultmarket") {
            this.state.arr = defaultMarket
            this.state.selected = this.state.arr[0].code
        }
        if (this.props.tag == "hours") {
            this.state.arr = HoursConstants
            this.state.selected = this.state.arr[0].code
        }
        ///secondsConstants
        if (this.props.tag == "minute") {
            this.state.arr = minutesConstants
            this.state.selected = this.state.arr[0].code
        }
        //investmentPreference
        if (this.props.tag == "investmentPreference") {
            this.state.arr = investmentPreference
            this.state.selected = this.state.arr[0].code
            this.props.handleInput(this.state.selected)
        }
        if (this.props.tag == "market") {
            this.state.arr = Market
            this.state.selected = this.state.arr[0].code
            this.props.handleInput(this.state.selected)
        }
        if (this.props.tag == "orderType") {
            this.state.arr = OrderType
            this.state.selected = this.state.arr[0].code
            this.props.handleInput(this.state.selected)
        }
        if (this.props.tag == "OrderActionType") {
            this.state.arr = OrderActionType
            this.state.selected = this.state.arr[0].code
            this.props.handleInput(this.state.selected)
        }

        if (this.props.value) {
            this.state.selected = this.props.value.toString();
            console.log("this.state.selected");


        }
        //experienceArr
    }

    onValueChange(value) {
        this.setState({
            selected: value
        });
        if (value == "key1") {

        }
        else {
            if (this.props.code) {
                this.props.handleInput(value)
            } else {
                let countryValue = _.find(this.state.arr, { 'code': value });
                this.props.handleInput(countryValue.name)
            }
        }

    }
    renderPickerValue() {
        if (this.state.arr.length > 0) {
            return (
                this.state.arr.map((key, index) => {
                    return (
                        <Picker.Item key={"key" + index} label={key.name} value={key.code} />
                    )
                })
            );
        }
        else {
            return (

                <Picker.Item label={"No Selected"} value={"key1"} />

            );
        }


    }
    render() {
        return (
            <View style={styles.pickerContainer}>
                <Picker
                    note
                    mode="dropdown"
                    selectedValue={this.state.selected}
                    headerBackButtonText={""}
                    onValueChange={this.onValueChange.bind(this)}
                    textStyle={{ marginLeft: 0, paddingLeft: 0, color: "#000" }}
                    itemStyle={{
                        marginLeft: 0,
                        paddingLeft: 10
                    }}
                >
                    {this.renderPickerValue()}
                </Picker>
            </View>
        );
    }
}
const styles = {
    pickerContainer: {
        marginLeft: 20,
        marginRight: 20,
        width: "80%",
        alignSelf: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#c5c5c5'
    }

};
export default PickerComponent;