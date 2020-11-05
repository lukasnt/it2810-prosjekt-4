import { Dispatch } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery } from '../../redux/actions/searchparams';
import { SearchParams } from '../../redux/reducers/searchparams';
import { AppState } from '../../redux/store';

const SearchBar : React.FunctionComponent = () => {

    const searchParams : SearchParams | null = useSelector((state : AppState) => state.searchParams);
    const dispatch : Dispatch<any> = useDispatch();

    const [text, setText] = useState("");

    // When search is submitted the query in searchParams in global state is updated
    function searchMovies() {
        dispatch(setQuery(text));
        console.log("123");
    }

    return (
        <Searchbar
            placeholder="Search"
            onChangeText={query => setText(query)}
            onSubmitEditing={searchMovies}
            onIconPress={searchMovies}
            value={text}
        />        
    );
};
export default SearchBar;