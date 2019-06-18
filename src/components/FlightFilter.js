import React, { Component } from 'react';
import { Platform, StyleSheet, View, ImageBackground, TouchableOpacity, DatePickerAndroid, Linking } from 'react-native';
import { Container, Content, Header, Segment, Button, Icon, Text, List, ListItem, Left, Body, Right, Thumbnail } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleFlightFilter, setDepFilterTime, setArrFilterTime, setPriceFilterValue } from '../actions/SearchAction';
import Slider from '@react-native-community/slider';

class FlightFilter extends Component {

    constructor(props) {
        super(props)
    }

    handleDepTimeChange = (val) =>{
        console.log(val)
        this.props.setDepFilterTime(val);
    }

    handleArrTimeChange = (val) =>{
        console.log(val)
        this.props.setArrFilterTime(val);
    }

    handlePriceChange = (val) =>{
        console.log(val)
        this.props.setPriceFilterValue(val);
    }

    fullHourToHalfHour(time){
        let t1 = ''
        let hour = Math.floor(time/60);
        let min = time - (hour * 60);

        if(hour == 0){
            t1 = 12 + ':0'+ min + ' AM'

        }else if(hour > 12){

            let h1 = (hour - 12);
            let m1 = min;


            if(h1.toString().length < 2){
                h1 = '0' + h1;
            }
            if (m1.toString().length < 2) {
                m1 = '0' + m1;
            }

            t1 = h1+ ':' + m1 +' PM'
        }else{

            let h1 = hour;
            let m1 = min;

            if (h1.toString().length < 2) {
                h1 = '0' + h1;
            }
            if (m1.toString().length < 2) {
                m1 = '0' + m1;
            }
            t1 = h1+ ':' + m1 + ' AM'
        }

        return t1;
    }
   
    render() {

        return (
            <Grid >
                <View style={styles.lineStyle} />
                <Row size={25}>
                    <Grid >
                        <Row size={25}>
                            <Text style={{ width:'100%',textAlign: 'center',color:'#4c4c4c' }}>Departure time</Text>
                        </Row >
                        <Row size={25}>
                            <Grid>
                                <Col size={25}>
                                    <Text style={{ width: '100%', textAlign: 'left', color: '#4c4c4c' }}>{this.fullHourToHalfHour(this.props.search.depTimeMin)}</Text>
                                </Col>
                                
                                <Col size={25}>
                                    <Text style={{ width: '100%', textAlign: 'right', color: '#4c4c4c' }}>{this.props.search.depTimeMax} PM</Text>
                                </Col>
                            </Grid>
                            
                        </Row>
                        <Row size={50}>
                            <Slider
                                style={{ width: '100%', height: 40 }}
                                minimumValue={0}
                                maximumValue={1440}
                                minimumTrackTintColor="#f4f4f4"
                                maximumTrackTintColor="#ef534a"
                                onSlidingComplete={(val) => this.handleDepTimeChange(val)}
                                thumbTintColor='#ef534a'
                                step={15}
                            />
                        </Row>
                    </Grid>
                </Row>
                <View style={styles.lineStyle} />
                <Row size={25}>
                    <Grid >
                        <Row size={25}>
                            <Text style={{ width:'100%',textAlign: 'center',color:'#4c4c4c' }}>Arrival time</Text>
                        </Row>
                        <Row size={25}>
                            <Grid>
                                <Col size={25}>
                                    <Text style={{ width:'100%',textAlign: 'left',color:'#4c4c4c' }}>{this.fullHourToHalfHour(this.props.search.arrTimeMin)}</Text>
                                </Col>
                                
                                <Col size={25}>
                                    <Text style={{ width:'100%',textAlign: 'right',color:'#4c4c4c' }}>{this.props.search.arrTimeMax} PM</Text>
                                </Col>
                            </Grid>
                            
                        </Row>
                        <Row size={50}>
                            <Slider
                                style={{ width: '100%', height: 40 }}
                                minimumValue={0}
                                maximumValue={1440}
                                minimumTrackTintColor="#f4f4f4"
                                maximumTrackTintColor="#ef534a"
                                onSlidingComplete={(val) => this.handleArrTimeChange(val)}
                                thumbTintColor='#ef534a'
                                step={15}
                            />
                        </Row>
                    </Grid>
                </Row>
                <View style={styles.lineStyle} />
                <Row size={25}>
                    <Grid >
                        <Row size={25}>
                            <Text style={{ width:'100%',textAlign: 'center',color:'#4c4c4c' }}>Price</Text>
                        </Row>
                        <Row size={25}>                            
                            <Grid>
                                <Col size={25}>
                                    <Text style={{ width: '100%', textAlign: 'left',color:'#4c4c4c' }}>${this.props.search.minPrice}</Text>
                                </Col>
                                
                                <Col size={25} >
                                    <Text style={{ width:'100%',textAlign: 'right',color:'#4c4c4c' }}>${this.props.search.maxPrice}</Text>
                                </Col>
                            </Grid>
                        </Row>
                        <Row size={50}>
                            <Slider
                                style={{ width: '100%', height: 40 }}
                                minimumValue={0}
                                maximumValue={this.props.search.maxPrice}
                                minimumTrackTintColor="#f4f4f4"
                                maximumTrackTintColor="#ef534a"
                                onSlidingComplete={(val) => this.handlePriceChange(val)}
                                thumbTintColor='#ef534a'
                                step={1}
                            />
                        </Row>
                    </Grid>
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
    airportText: {
        textAlign: 'center',
        fontSize: 10
    },
    fligtNumText: {
        textAlign: 'center',

    },
    priceText: {
        fontSize: 10,
        textAlign: 'center'
    },
    airportLeftText: {
        textAlign: 'left',
        fontSize: 20,
        fontWeight: '500',
        color: '#ef534a',
    },
    airportRightText: {
        textAlign: 'right',
        fontSize: 20,
        fontWeight: '500',
        color: '#ef534a',
    },
    timeLeftText: {
        textAlign: 'left',
        fontSize: 20,
        fontWeight: '500',
        color: '#808284',
    },
    timeRightText: {
        textAlign: 'right',
        fontSize: 20,
        fontWeight: '500',
        color: '#808284',
    },
    individualFlightContainer: {
        height: 240,
        borderWidth: 0.6,
        borderRadius: 10,
        borderColor: '#f4f4f4',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 20,

    },
    firstRowContainer: {
        flex: 1,
        textAlign: 'center',
        alignItems: 'center'
    },
    firstRowFromContainer: {
        flex: 2,
        textAlign: 'center',
        alignItems: 'center'
    },
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        toggleFlightFilter,
        setDepFilterTime,
        setArrFilterTime,
        setPriceFilterValue
    }, dispatch)
);

const mapStateToProps = (state) => {
    const { search } = state
    return { search }
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightFilter);
