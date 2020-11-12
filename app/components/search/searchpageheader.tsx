import React from 'react';
import { AppState } from '../../redux/store';
import { executeSearch } from '../../utils/ajax';
import { setPage } from '../../redux/actions/searchparams';
import { store } from "../../redux/store";
import { View } from 'react-native';
import { connect } from 'react-redux';
import SearchBar from './searchbar';
import OrderSelect from './order/orderselect';
import GenreList from './filters/genrelist';
import OrderDirSelect from './order/orderdirselect';

interface SearchPageHeaderProps {
    appState : AppState;
}

// Have chosen to make this a Class-component since then we can take use of the componentDidUpdate method
class SearchPageHeader extends React.Component<SearchPageHeaderProps> {

    filterType : string  = "Genre";
    filterValues : Array<string>  =["Action", "Adventure", "Comedy", "Crime", "Documentary", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Thriller", "Western"];
    orderLabels : Array<string>  = ["Relevance", "Title", "Release Year", "Runtime Minutes", "Vote Average", "Vote Count"];
    orderValues : Array<string>  = ["relevance", "primaryTitle", "startYear", "runtimeMinutes", "voteAverage", "voteCount"]; 

    // Everytime the searchParams (in redux) have updated (besides loading) it should execute a search
    // This is done by checking if the previous params and current params are not equal to each other
    componentDidUpdate(prevProps : SearchPageHeaderProps) : void {
        let prevParams = prevProps.appState.searchParams;
        let currentParams = this.props.appState.searchParams;
        if (prevParams !== currentParams && prevParams.loading === currentParams.loading) {

            // If the page haven't been updated, that means it should be reset to 1.
            if (prevParams.page === currentParams.page && currentParams.page !== 1) 
                store.dispatch(setPage(1));
            else
                // Wait tiny bit of time so the UI can update before the search.
                setTimeout(() => executeSearch(currentParams), 1);
        }
    }

    /*
    isCloseToBottom({layoutMeasurement, contentOffset, contentSize} : NativeScrollEvent) {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
    };
    */

    render() {
        return (
            <View>
                <GenreList filtertype={this.filterType} filters={this.filterValues}/>
                <OrderSelect orderValues={this.orderValues} orderLabels={this.orderLabels} defaultValue="voteCount"/>
                <OrderDirSelect orderDir={1}/>
                <SearchBar />
            </View>
        );
    }
}


function mapStateToProps(state : AppState) : SearchPageHeaderProps {
    return { appState: state };
}


export default connect(mapStateToProps)(SearchPageHeader);
