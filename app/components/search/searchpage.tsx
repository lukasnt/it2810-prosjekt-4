import React from 'react';
import tags, { Subtag } from "language-tags";
import { AppState } from '../../redux/store';
import { executeSearch } from '../../utils/ajax';
import { setPage } from '../../redux/actions/searchparams';
import { store } from "../../redux/store";
import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Button, Provider, ToggleButton } from 'react-native-paper';
import MovieList from '../movie/movielist';
import { testMovies } from '../movie/testmovies';
import { connect } from 'react-redux';
import SearchBar from './searchbar';
import OrderSelect from './order/orderselect';
import GenreList from './order/genrelist';
import OrderDirSelect from './order/orderdirselect';

interface SearchPageProps {
    appState : AppState;
}

// Have chosen to make this a Class-component since then we can take use of the componentDidUpdate method
class SearchPage extends React.Component<SearchPageProps, {showFilters : boolean}> {

    filterType : string  = "Genre";
    filterValues : Array<string>  =["Action", "Adventure", "Comedy", "Crime", "Documentary", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Thriller", "Western"];
    orderLabels : Array<string>  = ["Relevance", "Title", "Release Year", "Runtime Minutes", "Vote Average", "Vote Count"];
    orderValues : Array<string>  = ["relevance", "primaryTitle", "startYear", "runtimeMinutes", "voteAverage", "voteCount"]; 

    constructor(props : SearchPageProps) {
        super(props);
        this.state = {showFilters: false}

    }

    // executes search when component have mounted
    componentDidMount() : void {
        executeSearch(this.props.appState.searchParams);
    }

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
                executeSearch(currentParams);
        }
    }

    render() {
        let searchParams = this.props.appState.searchParams;
        let searchResult = this.props.appState.searchResult;
        return (
            <ScrollView>
                
                <View>
                    <Button mode="outlined"
                            onPress={() => {this.setState({showFilters : !this.state.showFilters})}}>
                        {this.state.showFilters ? "Hide filters" : "Show filters"}
                    </Button>
                    
                    {this.state.showFilters &&
                        <View>
                            <GenreList filtertype={this.filterType} filters={this.filterValues}/>
                        </View>
                    }
                    
                    <OrderSelect orderValues={this.orderValues} orderLabels={this.orderLabels} defaultValue="voteCount"/>
                    <OrderDirSelect orderDir={1}/>
                    
                    <SearchBar />

                    <MovieList data={testMovies} />
                    {searchParams.loading ? <ActivityIndicator size={250}/> : null}
                    {/*<MovieList data={ searchParams.loading ? [] : (searchResult?.movies != null ? searchResult.movies : [])}/> */}
                </View>
                
            </ScrollView>
        );
    }
}

function mapStateToProps(state : AppState) : SearchPageProps {
    return { appState: state };
}

export default connect(mapStateToProps)(SearchPage);
