import React from 'react';
import { AppState } from '../../redux/store';
import { executeSearch } from '../../utils/ajax';
import { setPage } from '../../redux/actions/searchparams';
import { store } from "../../redux/store";
import { NativeScrollEvent, ScrollView, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { connect } from 'react-redux';
import SearchBar from './searchbar';
import OrderSelect from './order/orderselect';
import GenreList from './order/genrelist';
import OrderDirSelect from './order/orderdirselect';
import MovieListContainer from '../movie/movielistcontainer';
import { search } from 'language-tags';
import { SearchParams } from '../../redux/reducers/searchparams';

interface SearchPageProps {
    appState : AppState;
}

// Have chosen to make this a Class-component since then we can take use of the componentDidUpdate method
class SearchPage extends React.Component<SearchPageProps> {

    filterType : string  = "Genre";
    filterValues : Array<string>  =["Action", "Adventure", "Comedy", "Crime", "Documentary", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Thriller", "Western"];
    orderLabels : Array<string>  = ["Relevance", "Title", "Release Year", "Runtime Minutes", "Vote Average", "Vote Count"];
    orderValues : Array<string>  = ["relevance", "primaryTitle", "startYear", "runtimeMinutes", "voteAverage", "voteCount"]; 

    // Everytime the searchParams (in redux) have updated (besides loading) it should execute a search
    // This is done by checking if the previous params and current params are not equal to each other
    componentDidUpdate(prevProps : SearchPageProps) : void {
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

    isCloseToBottom({layoutMeasurement, contentOffset, contentSize} : NativeScrollEvent) {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
    };

    allowExpand : boolean = true;
    fetchAdditionalPage(searchParams : SearchParams, nativeEvent : any) {
        if (this.isCloseToBottom(nativeEvent)) {
            if (this.allowExpand && !searchParams.loading){
                this.allowExpand = false;
                store.dispatch(setPage(searchParams.page + 1));
                // Don't want it to be possible to get addditional pages until 5 second
                setTimeout(() => { this.allowExpand = true; }, 5000);
            }
            console.log("123");
        }
    }
    
    render() {
        let searchResult = this.props.appState.searchResult;
        let searchParams = this.props.appState.searchParams;

        return (
            <ScrollView
                onScroll={({nativeEvent}) => { this.fetchAdditionalPage(searchParams,nativeEvent); }}
            >
                <GenreList filtertype={this.filterType} filters={this.filterValues}/>
                <OrderSelect orderValues={this.orderValues} orderLabels={this.orderLabels} defaultValue="voteCount"/>
                <OrderDirSelect orderDir={1}/>
                <SearchBar />
                <MovieListContainer />
            </ScrollView>
        );
    }
}


function mapStateToProps(state : AppState) : SearchPageProps {
    return { appState: state };
}


export default connect(mapStateToProps)(SearchPage);
