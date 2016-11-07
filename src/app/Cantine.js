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