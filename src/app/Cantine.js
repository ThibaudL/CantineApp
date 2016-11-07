//import React, { Component } from 'react';
//import {
//    Text,
//    AppRegistry
//} from 'react-native';
import { Button, Card } from 'react-native-material-design';
import  Toolbar from './components/Toolbar';
import Menu from './components/Menu';
import moment from 'moment';
import 'moment/locale/fr';

var React = require('react');
var ReactNative = require('react-native');
var {
    Component
} = React;
var {
    AppRegistry,
    Text,
    View
}= ReactNative;

class Cantine extends Component {

    constructor() {
        super();
        this.date = moment().locale('fr');
        this.menus = [];
        this.loadDayData();
        this.initSwipe();
    }

    initSwipe(){
        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchmove', handleTouchMove, false);

        var xDown = null;
        var yDown = null;

        function handleTouchStart(evt) {
            xDown = evt.touches[0].clientX;
            yDown = evt.touches[0].clientY;
        };

        function handleTouchMove(evt) {
            if ( ! xDown || ! yDown ) {
                return;
            }

            var xUp = evt.touches[0].clientX;
            var yUp = evt.touches[0].clientY;

            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;

            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
                if ( xDiff > 0 ) {
                    console.log("left")
                } else {
                    console.log("right")
                }
            } else {
                if ( yDiff > 0 ) {
                    /* up swipe */
                } else {
                    /* down swipe */
                }
            }
            /* reset values */
            xDown = null;
            yDown = null;
        };
    }

        loadDayData(){
            fetch("http://192.168.1.10:3000/menus/all", {method: "GET"})
            .then((response) => {
                return response.json().then((json) => {
                        this.menu = json[0];
                        this.forceUpdate();
                    });
            },error => console.log("ERROR : "+error));
        }


    render() {
        var test = () => {

        }

        var nextDay = () => {
            this.date = this.date.add(1, 'days');
            this.loadDayData();
        }

        var previousDay = () => {
            this.setState({date : this.date.subtract(1, 'days')});
            this.loadDayData();
        }

        return (
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start'}}>
                <Toolbar  onIconPress={test}></Toolbar>
                <Menu date={this.date} menu={this.menu}></Menu>
                <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-end'
                      }}>
                    <Button onPress={previousDay} text="Precédent"></Button>
                    <Button onPress={nextDay} text="Suivant"></Button>
                </View>
            </View>
        )
    }

}

AppRegistry.registerComponent('CantineApp', () => Cantine);