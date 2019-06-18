import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';
import { Col, Row,Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setAirportsList,setAirport } from '../actions/SearchAction';
import { FlatList } from 'react-native-gesture-handler';

class SearchAirport extends Component {

    
    constructor(props) {
        super(props)
        // let state = {
        //     airports : this.props.search.airports,
        //     filteredAirports:[]
        // }
        // this.handleAirportSearchText.bind(this);
    }

    handleAirportSearchText= (text)=>{

        if(text.length>2){

            let link = 'https://api.skypicker.com/locations?term=' + text + '&locale=en-US&location_types=airport&active_only=true&sort=name';

            fetch(link)
                .then((response) => {
                    return response.json()
                })
                .then((responseJson) => {
                    // alert(JSON.stringify(responseJson))
                    this.props.setAirportsList(responseJson);
                });

        }
        
    }

    handleAirportSelection = (obj)=> {
        this.props.setAirport(obj)
        this.props.navigation.navigate('Search')
    }

    render() {

        let airportList = [];

        if (this.props.search.airports!=''){
           
            Object.values(this.props.search.airports.locations).map((item,index) => {
                console.log(index+':'+item['name'])
                airportList = (
                    <List>
                        <ListItem key={index}>
                                <Text style={{ fontSize: 20, }}>{item['name'] + ',' + item['code']}</Text>
                        </ListItem>
                    </List>
                )
            })

        }
        

        return (
           
            <Grid>
                <Text style={{ marginTop: 10,marginBottom:20,fontSize: 30, textAlign: 'center', width: '100%' }}>Search Airport</Text>
                <Row size={10}>
                    <TextInput style={{ paddingLeft: 20, width: '100%', height: 40, marginLeft: 10, marginRight: 10,fontSize: 20,borderWidth: 0.5,borderColor: '#f4f4f4' }}
                        onChangeText={this.handleAirportSearchText}
                        placeholder={'Eg: Banglore, BLR'}
                        
                        />
                </Row>
                <Row size={90}>
                    
                    <FlatList
                        data={this.props.search.airports.locations}
                        renderItem={
                            ({ item }) => 
                                    <Text 
                                    style={{ marginLeft: 10, marginRight: 10,paddingTop: 10, paddingBottom:10,paddingLeft: 20, fontSize: 20,borderWidth: 0.5,borderColor: '#f4f4f4',}} 
                                    key={item.code}
                                    onPress={ () => this.handleAirportSelection({code:item.code,name:item.name}) }
                                        >{item.name + ' , ' + item.code}
                                    </Text> 
                        }
                    />

                </Row>
                
            </Grid>

        );

    }
}

const styles = StyleSheet.create({
    lineStyle: {
        borderWidth: 0.5,
        borderColor: '#f4f4f4',
        margin: 10,
    },
});


const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setAirportsList,setAirport
    }, dispatch)
);

const mapStateToProps = (state) => {
    const { search } = state
    return { search }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchAirport);
