import React from 'react';
import { FlatList } from 'react-native';
import { Movie } from '../../redux/reducers/searchresult';
import MovieCard from './moviecard';

interface MovieGridProps {
    data : Array<Movie>;
}

const MovieList : React.FunctionComponent<MovieGridProps> = ({ data }) => {

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
            data={data}
            renderItem={renderMovieCard}
            keyExtractor={item => item.tconst}
        />
    );
};

export default MovieList;