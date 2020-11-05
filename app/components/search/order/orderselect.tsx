import React, { useState } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { SearchParams } from '../../../redux/reducers/searchparams';
import { AppState } from '../../../redux/store';
import { setOrderField } from '../../../redux/actions/searchparams';
import { Button, Divider, Menu, Provider } from 'react-native-paper';
import { View } from 'react-native';

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

    
    // Takes the orderLabels and orderValues from props and generates JSX that is a list of MenuItems
    function generateMenuItems() : JSX.Element[] {
        let jsx : JSX.Element[] = []; 
        for (let i : number = 0; i < orderValues.length; i++) {
            jsx.push(<Menu.Item onPress={() => {}} title={orderValues[i]} key={i} />)
        }
        return jsx;
    }
    
    // When the Select changes, the local state value and global state value is updated
    function handleChange(event: React.ChangeEvent<{ value: any }>) : void {
        setValue(event.target.value as string);
        dispatch(setOrderField(event.target.value as string))
    }

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <Provider>
            <View
                style={{
                paddingTop: 50,
                flexDirection: 'row',
                justifyContent: 'center'
            }}
            >
            
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Button onPress={openMenu}>Show menu</Button>}
                >
                    <Menu.Item onPress={() => {}} title="Item 1" />
                    <Menu.Item onPress={() => {}} title="Item 2" />
                    <Divider />
                    <Menu.Item onPress={() => {}} title="Item 3" />
                </Menu>
            </View>
        </Provider>
    );
};

export default OrderSelect;
