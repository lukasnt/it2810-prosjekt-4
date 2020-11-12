import React, { useState } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../redux/store';
import { SearchParams } from '../../../redux/reducers/searchparams';
import { setGenres } from '../../../redux/actions/searchparams';
import { Button, Checkbox, Subheading } from 'react-native-paper';
import { View } from 'react-native';

export interface FilterProps {
    filtertype : string;
    filters : string[];
}

const GenreList : React.FunctionComponent<FilterProps> = ({filtertype, filters} ) => {
    
    const searchParams : SearchParams | null = useSelector((state : AppState) => state.searchParams);
    const dispatch : Dispatch<any> = useDispatch();

    // Array of which genres are enabled in the filter
    const [checked, setChecked] = useState(searchParams.genres.map(name => filters.indexOf(name)));
    
    // State if the genres are visible
    const [visible, setVisible] = useState(false);

    // Updates the checked-array when any of the checkboxes have changed value
    function handleToggle(value: number) {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    
    return (
        <View>
            <Button mode="outlined"
                    onPress={() => {
                        setVisible(!visible)
                        if (visible) dispatch(setGenres(checked.map(index => filters[index])));
                    }}>
                {visible ? "Apply filters" : "Show filters"}
            </Button>
            {visible &&
            <View>
                {filters.map((filter:string) => {
                    const index = filters.indexOf(filter);
                    return (
                            <Checkbox.Item
                                key={index}
                                label={filter}
                                status={checked.indexOf(index) !== -1 ? "checked" : "unchecked"}
                                onPress={() => handleToggle(index)}
                            />
                    );
                })}
            </View>
            }
        </View>
    );
};

export default GenreList;