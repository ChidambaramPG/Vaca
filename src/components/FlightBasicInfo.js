import React, { Component } from 'react';
import { Platform, StyleSheet, View, ImageBackground, TouchableOpacity, DatePickerAndroid } from 'react-native';
import { Container,Content, Header, Segment, Button, Icon, Text,List,ListItem,Left, Body, Right, Thumbnail } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFlightsList,setLoadingToggle } from '../actions/SearchAction';

class FlightBasicInfo extends Component {

    constructor(props){
        super(props)
    }

    render() {

        return (
            
            <Grid>
                <Col>
                    <Grid style={styles.firstRowFromContainer}>
                        <Col>
                            <Grid style={styles.firstRowFromContainer}>
                                <Row>
                                    <Thumbnail source={{ uri: 'https://daisycon.io/images/airline/?width=100&height=100&color=ffffff&iata=' + this.props.image }} />
                                </Row>
                            </Grid>
                            
                        </Col>
                        <Col>
                            <Text style={styles.fligtNumText}>Flignt No:{this.props.number}</Text>
                        </Col>
                    </Grid>                                                    
                </Col>
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

export default connect(mapStateToProps, mapDispatchToProps)(FlightBasicInfo);
