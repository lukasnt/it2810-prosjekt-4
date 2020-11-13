import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect} from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Paragraph, ProgressBar, Subheading, Text, Title } from 'react-native-paper';
import { Movie } from '../../redux/reducers/searchresult';
import { backendURL } from '../../utils/ajax';
import { getRatingColor } from './moviecard';

const MoviePage : React.FunctionComponent = () => {

    // This is the parameters in the url, the movie-id (tconst) is used
    let route : any = useRoute();

    // Holds state of the movie that it gets from the backend
    const [movie, setMovie] = useState<Movie>({
        tconst: route.params.tconst,
        titleType: "",
        primaryTitle: "",
        originalTitle: "",
        isAdult: "",
        startYear: 0,
        endYear: "",
        runtimeMinutes: 0,
        genres: "",
        posterPath: "",
        voteAverage: 0,
        voteCount: 0,
        originalLanguage: "",
        overview: ""
    });

    // Other states that is more convinient to have in single values
    const [voteAverage, setVoteAverage] = useState('');
    const [voteCount, setVoteCount] = useState('');
    const [myRating, setMyRating] = useState('');

    // When the component is mounted, it takes the id (tconst) from the url 
    // and sends a request for that movie to the backend
    // Then updates the state of the movie that it gets
    useEffect(() => {
        fetch(backendURL + '/api/movie/single/' + route.params.tconst)
            .then(res => res.json())
            .then(data => {
                setMovie(data);
                setVoteCount(data.voteCount);
                setVoteAverage(data.voteAverage);
                setMyRating('');
            })
    }, [route.params.tconst]);

    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: movie.posterPath == "" ? "https://jooinn.com/images/black-screen-4.jpg" : movie.posterPath }} style={styles.image}>
                <View style={styles.content}>
                    <Text style={styles.headline}>{movie.primaryTitle}</Text>
                    <Subheading style={styles.white}>
                        {movie.genres + ' • ' + movie.startYear + ' • ' + ((+movie.runtimeMinutes-(+movie.runtimeMinutes % 60)) / 60) + ' h ' + (+movie.runtimeMinutes % 60) + ' m'}
                    </Subheading>      
                    <Subheading style={styles.white}>
                        {"Average Rating (" + movie.voteAverage + ")" + " • " + movie.voteCount + " ratings"}
                    </Subheading>
                    <ProgressBar 
                        progress={movie.voteAverage / 10} 
                        color={getRatingColor(movie.voteAverage)} 
                        style={{margin: 10}}/>
                    <Title style={styles.white}>Overview</Title>
                    <Paragraph style={styles.white}>{movie.overview}</Paragraph>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles : any = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        backgroundColor: "black",
        opacity: 1
    },
    content: {
        backgroundColor: "#000000a0",
        opacity: 1,
        flex: 1,
        justifyContent: "center",
        padding: 5
    },
    white: {
        color: "white",
    },
    headline: {
        color: "white",
        fontSize: 42,
    }
});

export default MoviePage;
