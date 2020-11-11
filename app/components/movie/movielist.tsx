import React from 'react';
import { FlatList, Text } from 'react-native';
import { Movie } from '../../redux/reducers/searchresult';
import MovieCard from './moviecard';

interface MovieGridProps {
    data : Array<Movie>;
    onEndReached : () => void;
    ListHeaderComponent : JSX.Element | null;
    ListFooterComponent : JSX.Element | null;
}

const MovieList : React.FunctionComponent<MovieGridProps> = ({ data, onEndReached, ListHeaderComponent, ListFooterComponent }) => {

    // Takes the movie data and returns a MovieCard
    function renderMovieCard(data : any) : JSX.Element {
        return (
                <MovieCard
                    tconst={data.item.tconst}
                    title={data.item.primaryTitle}
                    imageUrl={data.item.posterPath}
                    description={data.item.overview}
                    rating={data.item.voteAverage}
                    voteCount={data.item.voteCount}
                 /> 
        );
    }

    return (
        <FlatList
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={ListFooterComponent}
            data={data}
            renderItem={renderMovieCard}
            keyExtractor={item => item.tconst}
            onEndReached={onEndReached}
            onEndReachedThreshold={1}
        />
    );
};

export default MovieList;