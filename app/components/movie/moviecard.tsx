import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Avatar, Button, Card, Paragraph, ProgressBar, Text, Title, TouchableRipple } from 'react-native-paper';

export interface MovieCardProps {
    tconst : string;
    title : string;
    imageUrl : string;
    description : string;
    rating : number;
    voteCount: number;
}

const MovieCard : React.FunctionComponent<MovieCardProps> = ({ tconst, title, imageUrl, description, rating, voteCount }) => {

    const navigation = useNavigation();

    function getRatingColor(rating : number) : string {
        if (rating > 7.5)
            return "green";
        if (rating > 5)
            return "yellow";
        if (rating > 2.5)
            return "orange";
        else
            return "red";
        /*
        const r : number = Math.floor(((10 - rating) / 10) * 255);
        const g : number = Math.floor((rating / 10) * 255);

        const red : string   = (r < 16 ? "0" : "") + r.toString(16);
        const green : string = (g < 16 ? "0" : "") + g.toString(16);
        
        return "#" + red + green + "00";
        */

    }

    return (
        <Card 
            style={{margin: 10, paddingBottom: 15}}
        >
            <TouchableRipple
                onPress={() => {
                    navigation.navigate("Movie", {
                        tconst: "123"
                    });
                }}
                rippleColor="rgba(0, 0, 0, .32)"
            >
                <View>
                    <Card.Title title={title} subtitle={voteCount + " Votes"} />
                    <ProgressBar 
                            progress={rating / 10}
                        color={getRatingColor(rating)} 
                        style={{marginTop: -5, marginLeft: 15, marginRight: 15, marginBottom: 15}} 
                    />
                    <Card.Cover source={{ uri: imageUrl }} />
                    <Card.Content>
                        <Paragraph numberOfLines={5}>{description} </Paragraph>
                    </Card.Content>
                </View>
            </TouchableRipple>
        </Card>
    );
};

export default MovieCard;