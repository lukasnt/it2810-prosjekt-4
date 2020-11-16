import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Card, Paragraph, ProgressBar, TouchableRipple } from 'react-native-paper';

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

    return (
        <Card 
            style={{margin: 10, paddingBottom: 15}}
        >
            <TouchableRipple
                onPress={() => {
                    navigation.navigate("Movie", {
                        tconst: tconst
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

// Function to get color of rating-number
export function getRatingColor(rating : number) : string {
    if (rating > 7.5)
        return "green";
    if (rating > 5)
        return "yellow";
    if (rating > 2.5)
        return "orange";
    else
        return "red";
}