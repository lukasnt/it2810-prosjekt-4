import React, { useState } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { SearchParams } from '../../../redux/reducers/searchparams';
import { AppState } from '../../../redux/store';
import { setOrderField } from '../../../redux/actions/searchparams';
import { Button, Menu, RadioButton, Text } from 'react-native-paper';
import { View, StyleSheet, Modal } from 'react-native';

interface OrderSelectProps {
    orderLabels: Array<string>;
    orderValues: Array<string>;
    defaultValue: string;
}

const OrderSelect : React.FunctionComponent<OrderSelectProps> = ({ orderLabels, orderValues, defaultValue }) => {
    
    const searchParams : SearchParams | null = useSelector((state : AppState) => state.searchParams);
    const dispatch : Dispatch<any> = useDispatch();

    // The inital value is the value in searchParams in global state
    const [value, setValue] = useState(searchParams.orderField);

    // State for the visibilty of the menu
    const [visible, setVisible] = useState(false);

    // When the Select changes, the local state value and global state value is updated
    function handleChange(value : string) : void {
        setValue(value);
    }

    return (
        <View>
             <Button mode="outlined"
                        onPress={() => {
                            if (visible) dispatch(setOrderField(value));
                            setVisible(!visible);
                        }}>
                    {visible ? "Apply Sort Order" : "Show Sort Orders"}
            </Button>

            {visible &&
            <RadioButton.Group onValueChange={value => handleChange(value)} value={value}>
                {orderValues.map((value : string) => {
                    const label : string = orderLabels[orderValues.indexOf(value)];
                    return (
                        <RadioButton.Item 
                            label={label} 
                            value={value}
                            key={label}
                        />
                    );
                })}
            </RadioButton.Group>
            }
        </View>
    );
};


export default OrderSelect;
