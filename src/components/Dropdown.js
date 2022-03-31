import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../assets/Colors';

export default class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { items, onSelect, selectedItemText } = this.props
        return (
            <ModalDropdown
                options={items}
                onSelect={ (index, value) => onSelect(index) }
                defaultIndex={0}
                style={[styles.input, { justifyContent: 'center' }]}
                dropdownStyle={{
                    marginTop: 10,
                    //backgroundColor: 'red',
                    padding: 5,
                    width: 150
                }}
                dropdownTextStyle={{
                    backgroundColor: 'transparent',
                    fontSize: hp('1.8%'),
                    fontFamily: 'futurastd-medium',
                }}
                dropdownTextHighlightStyle={{
                    backgroundColor: 'transparent',
                    fontSize: hp('1.8%'),
                    fontFamily: 'futurastd-medium',
                }}>
                <View style={styles.dropdownView}>
                    <Text style={{ fontSize: wp('3.8%') }}>
                        {selectedItemText}
                    </Text>
                    <Icon name="chevron-down" />
                </View>
            </ModalDropdown>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: colors.borderGrey,
        height: 40,
        padding: 5,
        borderRadius: 5,
    },
    dropdownView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})
