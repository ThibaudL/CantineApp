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
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

var storage = new Storage({
    // maximum capacity, default 1000
    size: 1000,

    // Use AsyncStorage for RN, or window.localStorage for web.
    // If not set, data would be lost after reload.
    storageBackend: AsyncStorage,

    // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: 1000 * 3600 * 24 *7,

    // cache data in the memory. default is true.
    enableCache: true,

    // if data was not found in storage or expired,
    // the corresponding sync method will be invoked and return
    // the latest data.
    sync : {
        // we'll talk about the details later.
    }
});

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
        this.date = moment(1470002400000).locale('fr');
        this.menus = [];
        this.loadDayData();
    }

    loadDayData(){
        storage.load({
            key: this.date.valueOf(),
            autoSync: true,
            syncInBackground: true
        }).then(ret => {
            this.menu = ret;
            this.forceUpdate();
        }).catch(err => {
            fetch("http://192.168.1.10:3000/menus/"+this.date.valueOf(), {method: "GET"})
            .then((response) => {
                return response.json().then((json) => {
                        this.menu = json[0];
                        storage.save({
                            key: this.date.valueOf(),   // Note: Do not use underscore("_") in key!
                            rawData: json[0]
                        });
                        this.forceUpdate();

                    });
            },error => console.log("ERROR : "+error));
        });
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