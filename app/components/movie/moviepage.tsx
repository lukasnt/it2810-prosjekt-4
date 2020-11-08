import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect} from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Headline, Paragraph, ProgressBar, Subheading, Text, Title } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import { Movie } from '../../redux/reducers/searchresult';

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
        fetch('http://localhost:8080/api/movie/single/' + route.params.tconst)
            .then(res => res.json())
            .then(data => {
                setMovie(data);
                setVoteCount(data.voteCount);
                setVoteAverage(data.voteAverage);
                setMyRating('');
            })
    }, [route.params.tconst]);

    const styles = StyleSheet.create({
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

    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: "https://image.tmdb.org/t/p/original/cKTqxeN8H8waDbPyHB0jZVskLxD.jpg" }} style={styles.image}>
                <View style={styles.content}>

                    <Text style={styles.headline}>Inside Out </Text>
                    <Subheading style={styles.white}>Adventure,Animation,Comedy • 1 h 35 m </Subheading>      
                    <Subheading style={styles.white}>(3.95) • 15506 ratings </Subheading>
                    <ProgressBar 
                        progress={3.95 / 5} 
                        color="#00ff00" 
                        style={{margin: 10}}/>
                    <Title style={styles.white}>Overview </Title>
                    <Paragraph style={styles.white}>Growing up can be a bumpy road, and it's no exception for Riley, who is uprooted from her Midwest life when her father starts a new job in San Francisco. Riley's guiding emotions— Joy, Fear, Anger, Disgust and Sadness—live in Headquarters, the control centre inside Riley's mind, where they help advise her through everyday life and tries to keep things positive, but the emotions conflict on how best to navigate a new city, house and school. </Paragraph>
                </View>
            </ImageBackground>
        </View>
    );
};

export default MoviePage;
