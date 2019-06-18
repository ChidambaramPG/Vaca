import React, { Component } from 'react';
import { Platform, StyleSheet, View, ImageBackground, TouchableOpacity, DatePickerAndroid,Linking } from 'react-native';
import { Container,Content, Header, Segment, Button, Icon, Text,List,ListItem,Left, Body, Right, Thumbnail } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFlightsList,setLoadingToggle } from '../actions/SearchAction';
import FlightBasicInfo from './FlightBasicInfo';

class SingleFlight extends Component {

    constructor(props){
        super(props)
        console.log(props.flight.id)
    }

    handleBookingClick = (deep_link) =>{
        console.log('clicked');
         Linking.canOpenURL(deep_link).then(supported => {
             if (supported) {
                 Linking.openURL(deep_link);
             } else {
                 console.log("Don't know how to open this link ");
             }
         });
    }

    convertToTimeString = (timestamp) =>{
        let dt = new Date(timestamp*1000);
        return dt.getHours()+ ':' + dt.getMinutes();
    }

    render() {

        return (
            <Grid style={styles.individualFlightContainer} elevation={2} >
                <Row size={25}>
                    <FlightBasicInfo image={this.props.flight.airlines[0]} number={this.props.flight.route[0].flight_no} />
                </Row>
                <View style={styles.lineStyle} />
                <Row size={50}>
                    <Grid style={styles.firstRowContainer}>
                        <Col>
                            <Grid style={styles.firstRowFromContainer}>
                                
                                <Row>
                                    <Text style={styles.airportLeftText}>{this.props.flight.route[0].flyFrom}</Text>
                                </Row>
                                <Row>
                                    <Text style={styles.timeLeftText}>{this.convertToTimeString(this.props.flight.route[0].dTime)}</Text>
                                </Row>
                            </Grid>
                        </Col>
                        <Col>
                            <Grid style={styles.firstRowFromContainer}>
                                
                                <Row>
                                    <Text>{this.props.flight.fly_duration}</Text>
                                </Row>
                                <Row>
                                    <Text>non-stop</Text>
                                </Row>
                            </Grid>
                        </Col>
                        <Col>
                            <Grid style={styles.firstRowFromContainer}>
                                <Row>
                                    <Text style={styles.airportRightText}>{this.props.flight.route[0].flyTo}</Text>
                                </Row>
                                <Row>
                                    <Text style={styles.timeRightText}>{this.convertToTimeString(this.props.flight.route[0].aTime)}</Text>
                                </Row>
                            </Grid>
                        </Col>
                    </Grid>
                </Row>
                <View style={styles.lineStyle} />
                
                <Row size={25} style={{width:'100%',paddingLeft: 20, paddingRight: 20, paddingBottom: 5, }}>
                    <Button rounded style={{ width: '100%' }} danger onPress={ () => this.handleBookingClick(this.props.flight.deep_link) }>
                        <Text style={{ width: '100%', textAlign: 'center', color: '#ffffff' }}>BOOK NOW FOR EUR {this.props.flight.price}</Text>
                    </Button>
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
    airportText:{
        textAlign:'center',
        fontSize:10
    },
    fligtNumText:{
        textAlign:'center',

    },
    priceText:{        
        fontSize:10,
        textAlign:'center'
    },
     airportLeftText:{
        textAlign:'left',
        fontSize: 20, 
        fontWeight:'500',
        color: '#ef534a' ,
    },
    airportRightText:{
        textAlign:'right',
        fontSize: 20, 
        fontWeight:'500',
        color: '#ef534a' ,
    },
    timeLeftText:{
        textAlign:'left',
        fontSize: 20, 
        fontWeight:'500',
        color: '#808284' ,
    },
    timeRightText:{
        textAlign:'right',
        fontSize: 20, 
        fontWeight:'500',
        color: '#808284' ,
    },
    individualFlightContainer:{
        height:240,
        borderWidth: 0.6,
        borderRadius:10,
        borderColor: '#f4f4f4',
        marginLeft:10,
        marginRight:10,
        marginBottom:10,
        paddingTop:10,
        paddingLeft:10,
        paddingRight:10,        
        marginTop: 20,
    
    },
    firstRowContainer:{
        flex:1,
        textAlign:'center',
        alignItems:'center'
    },
    firstRowFromContainer:{
        flex:2,
        textAlign:'center',
        alignItems:'center'
    },
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setFlightsList,setLoadingToggle
    }, dispatch)
);

const mapStateToProps = (state) => {
    const { search } = state
    return { search }
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleFlight);
