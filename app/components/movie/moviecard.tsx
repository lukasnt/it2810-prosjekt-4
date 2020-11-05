import React from 'react';
import { Avatar, Button, Card, Paragraph, Title, TouchableRipple } from 'react-native-paper';

export interface MovieCardProps {
    tconst : string;
    title : string;
    imageUrl : string;
    description : string;
    rating : number;
    voteCount: number;
}

const MovieCard : React.FunctionComponent<MovieCardProps> = ({ tconst, title, imageUrl, description, rating, voteCount }) => {

    return (
        <TouchableRipple
            onPress={() => console.log('Pressed')}
            rippleColor="rgba(0, 0, 0, .32)"
        >
            <Card>
                <Card.Title title={title} subtitle="Card Subtitle"/>
                <Card.Cover source={{ uri: imageUrl }} />
                <Card.Content>
                    <Paragraph> {description} </Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button> Se More </Button>
                </Card.Actions>
            </Card>
        </TouchableRipple>
    );
};

export default MovieCard;