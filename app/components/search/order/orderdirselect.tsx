
import React from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { SearchParams } from '../../../redux/reducers/searchparams';
import { AppState } from '../../../redux/store';
import { setOrderDir } from '../../../redux/actions/searchparams';
import { ToggleButton } from 'react-native-paper';

interface OrderDirSelectProps {
    orderDir : number;
}

const OrderDirSelect : React.FunctionComponent<OrderDirSelectProps> = ({ orderDir }) => {

    const searchParams : SearchParams = useSelector((state : AppState) => state.searchParams);
    const dispatch : Dispatch<any> = useDispatch();
    
    // Default value is the value in global state in searchParams
    const [alignment, setAlignment] = React.useState(searchParams.orderDir == 1 ? "up" : "down");

    // Sets the value selected from the toggle-buttons to the local state of alignment and global state of searchParams  
    const handleAlignment = (value : string) => {
        if (value !== null) {
          setAlignment(value);
          dispatch(setOrderDir(value == "up" ? 1 : -1));
        }
    };

    return (
        <ToggleButton.Row 
            value={alignment}
            onValueChange={(value : string) => handleAlignment(value)} 
        >
            <ToggleButton style={{flex: 1}} icon="arrow-up-thick" value={"up"} />
            <ToggleButton style={{flex: 1}} icon="arrow-down-thick" value={"down"} />
        </ToggleButton.Row>
    );
};

export default OrderDirSelect;