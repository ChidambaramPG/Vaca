import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ImageBackground, TouchableOpacity, DatePickerAndroid } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Header, Segment, Button, Icon } from 'native-base';
import SegmentControl from 'react-native-segment-controller';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { incrAdult, decrAdult, incrChild, decrChild, selectTravelType, selectTravelClass, setAirportsList } from '../actions/SearchAction';
import TripType from './../components/TripType';
import TripClass from './../components/TripClass';
import AirportSelection from './../components/AirportSelection';
import DateSelection from './../components/DateSelection';
import PeopleCount from '../components/PeopleCount';
import SearchFlights from  '../components/SearchFlights';
import Spinner from 'react-native-loading-spinner-overlay';


class Search extends Component {

    constructor(props){
        super(props);
    }

    handleSearch = () =>{
        alert(JSON.stringify(this.props.search))
    }

    render() {
        
        return (
           <Container>
                <Grid>
                    <Spinner
                        visible={this.props.search.loadingStat}
                        textContent={'Loading...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                    <TripType/>

                    <Row style={{ backgroundColor: '#ffffff' }} size={75} >

                        <Grid style={{ marginLeft:20,marginRight:20,marginTop:-30,marginBottom:10,borderWidth:1,borderRadius:10,borderColor:'#dddddd',backgroundColor:'#ffffff' }}>
                            
                            <AirportSelection navigation={this.props.navigation}/>

                            <View style={styles.lineStyle} />

                            <DateSelection/>

                            <View style={styles.lineStyle} />

                            <Row size={1} > 

                                <PeopleCount />

                            </Row>
                            
                            <View style={styles.lineStyle} />

                            <TripClass/>   

                        </Grid>

                    </Row>
                    <Row style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 5 }} size={10}>
                        <SearchFlights navigation={this.props.navigation}/>
                    </Row>
                </Grid>
           </Container> 
        );
    }
}

const styles = StyleSheet.create({
    lineStyle: {
        borderWidth: 0.5,
        borderColor: '#f4f4f4',
        margin: 10,
    },
    redBackground:{
        backgroundColor: 'red',
        width:'100%'
    },
    countButton:{
        alignSelf: 'flex-end', 
        paddingTop: 0, 
        paddingBottom: 0, 
        height: 20, 
        width: 20, 
        justifyContent: "center"
    },
    countIcon: { 
        marginLeft: 0, 
        marginRight: 0, 
        fontSize: 10,
        color:'#4c4c4c'
    },
    countText:{
        alignSelf: 'flex-end',
        paddingLeft: 5,
        paddingBottom:3,
        height: 20,
        width: 20,
        justifyContent: "center",
        fontSize:15
    },
    countType:{
        flex: 7, 
        alignItems: 'center',
        marginTop:10
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
});

const mapDispatchToProps = dispatch => (
  bindActionCreators(
    {
        incrAdult, 
        decrAdult, 
        incrChild, 
        decrChild, 
        selectTravelType, 
        selectTravelClass, 
        setAirportsList
    }, 
  dispatch)
);

const mapStateToProps = (state) => {
  const { search } = state
  return { search }
};

export default connect(mapStateToProps,mapDispatchToProps)(Search);
