import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { connect } from 'react-redux';
import { setPage } from '../../redux/actions/searchparams';
import { AppState, store } from '../../redux/store';
import { executeSearch } from '../../utils/ajax';
import MovieList from '../movie/movielist';
import SearchPageHeader from "./searchpageheader";
import { SearchParams } from '../../redux/reducers/searchparams';

interface SearchPageProps {
    appState : AppState;
}

class SearchPage extends React.Component<SearchPageProps> {

    // executes search when component have mounted
    componentDidMount() : void {
        executeSearch(this.props.appState.searchParams);
    }

    // If SearchResult is unchanged and only SearchParams is changed, it should not rerender all the movies
    // The only exception is loading
    shouldComponentUpdate(prevProps : SearchPageProps) {
        let prevParams = prevProps.appState.searchParams;
        let currentParams = this.props.appState.searchParams;
        let prevResults = prevProps.appState.searchResult;
        let currentResults = this.props.appState.searchResult;
        return (prevResults !== currentResults || prevParams.loading !== currentParams.loading)
    }

    allowExpand : boolean = true;
    fetchAdditionalPage(searchParams : SearchParams) {
            if (this.allowExpand && !searchParams.loading){
                this.allowExpand = false;
                store.dispatch(setPage(searchParams.page + 1));
                // Don't want it to be possible to get addditional pages until 2.5 second
                setTimeout(() => { this.allowExpand = true; }, 2500);
            console.log("123");
        }
    }

    render(){    
        let searchParams = this.props.appState.searchParams;
        let searchResult = this.props.appState.searchResult;
        return (
            <View>
                <MovieList
                    data={ searchParams.page == 1 && searchParams.loading ? 
                        [] : (searchResult?.movies != null ? searchResult.movies : [])}
                    onEndReached={() => this.fetchAdditionalPage(searchParams)} 
                    ListHeaderComponent={<SearchPageHeader />}
                    ListFooterComponent={searchParams.loading ? <ActivityIndicator size={250}/> : null}
                />
            </View>
        );  
    } 
};

function mapStateToProps(state : AppState) : SearchPageProps {
    return { appState: state };
}

export default connect(mapStateToProps)(SearchPage);