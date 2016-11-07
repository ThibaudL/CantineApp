import React, { Component,PropTypes } from 'react';
import { Text, View, Image } from 'react-native';
import { Card, Button, COLOR, TYPO } from 'react-native-material-design';

export default class Menu extends Component {

    constructor(props) {
        super(props);
    }




    render() {
        var theme = 'paperTeal';
        const { date,menu } = this.props;

        var valueMenu = (type) => {
            return menu ? menu[type] : "";
        }

        return (
            <View>
                <Card style={{marginTop : 65}}>
                    <Card.Media
                        image={<Image source={require('./../img/welcome.jpg')} />}
                        overlay
                    >
                        <Text style={[TYPO.paperFontHeadline, COLOR.paperGrey50]}>{date.format('dddd Do MMMM')}</Text>
                    </Card.Media>
                    <Card.Body>
                        <Text>{valueMenu('entree')}</Text>
                        <Text>{valueMenu('plat')}</Text>
                        <Text>{valueMenu('fromage')}</Text>
                        <Text>{valueMenu('dessert')}</Text>
                    </Card.Body>
                </Card>
            </View>
     );
    }
}
