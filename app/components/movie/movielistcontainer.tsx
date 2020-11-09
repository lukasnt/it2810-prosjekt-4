import { search } from 'language-tags';
import React from 'react';
import { NativeScrollEvent, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import { connect } from 'react-redux';
import { setPage } from '../../redux/actions/searchparams';
import { AppState, store } from '../../redux/store';
import { executeSearch } from '../../utils/ajax';
import MovieList from './movielist';
import { testMovies } from './testmovies';

interface MovieListContainerProps {
    appState : AppState;
}

class MovieListContainer extends React.Component<MovieListContainerProps> {

    // executes search when component have mounted
    componentDidMount() : void {
        executeSearch(this.props.appState.searchParams);
    }

    // If SearchResult is unchanged and only SearchParams is changed, it should not rerender all the movies
    // The only exception is loading
    shouldComponentUpdate(prevProps : MovieListContainerProps) {
        let prevParams = prevProps.appState.searchParams;
        let currentParams = this.props.appState.searchParams;
        let prevResults = prevProps.appState.searchResult;
        let currentResults = this.props.appState.searchResult;
        if (prevResults !== currentResults || prevParams.loading !== currentParams.loading)
            return true
        else
            return false;
    }

    render(){    
        let searchParams = this.props.appState.searchParams;
        let searchResult = this.props.appState.searchResult;
        return (
            <View>
                <MovieList data={ searchParams.page == 1 && searchParams.loading ? 
                    [] : (searchResult?.movies != null ? searchResult.movies : [])}/>
                {searchParams.loading ? <ActivityIndicator size={250}/> : null}
            </View>
        );  
    } 
};

function mapStateToProps(state : AppState) : MovieListContainerProps {
    return { appState: state };
}

export default connect(mapStateToProps)(MovieListContainer);