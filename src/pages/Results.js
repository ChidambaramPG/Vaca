import React, { Component } from 'react';
import { Platform, StyleSheet, View, ImageBackground, TouchableOpacity, DatePickerAndroid } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, Header, Segment, Button, Icon, Text, List, ListItem, Left, Body, Right, Thumbnail, Title } from 'native-base';
// import SegmentControl from 'react-native-segment-controller';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { incrPageNum, decrPageNum, toggleFlightFilter, setFlightsList } from '../actions/SearchAction';
import { FlatList } from 'react-native-gesture-handler';
import SingleFlight from  '../components/SingleFlight';
import SingleFlightReturn from  '../components/SingleFlightReturn';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import FlightFilter from './../components/FlightFilter';



class Results extends Component {

    constructor(props){
        super(props);
        
    }

    refreshList=()=>{
        console.log('refreshed');
    }

    handleFilterToggle = (stat) => {
        this.props.toggleFlightFilter(stat)
    }

    filterFlights = (flights) => {

        let minDepTime = this.props.search.depTimeMin;
        let minArrTime = this.props.search.arrTimeMin;
        let minPrice = this.props.search.minPrice;
        let passCount = 0;
        let failCount = 0;

        console.log('============ flight =============')
        console.log(flights.length);
        console.log('============ flight =============')

        let filtFlig = flights.filter((currentValue, index) => {
            console.log(passCount + failCount);
            if(currentValue.route.length > 1){

            }else{

                let flightDepDate = new Date(currentValue.route[0].dTime * 1000);
                let minDepHour = Math.floor(minDepTime / 60);
                let minDepMin = minDepTime - (minDepHour * 60);
                
                let minDepDate = new Date(flightDepDate.getFullYear(), flightDepDate.getMonth(), flightDepDate.getDate(), minDepHour, minDepMin,0,0);

                let flightArrDate = new Date(currentValue.route[0].aTime * 1000);
                let minArrHour = Math.floor(minArrTime / 60);
                let minArrMin = minArrTime - (minArrHour * 60);
                
                let minArrDate = new Date(flightArrDate.getFullYear(), flightArrDate.getMonth(), flightArrDate.getDate(), minArrHour, minArrMin, 0, 0);

                let flightPrice = currentValue.price;
                let minFPrice = minPrice;
                
                if (flightDepDate > minDepDate && flightArrDate > minArrDate && flightPrice > minFPrice){
                    passCount = passCount + 1;
                    return currentValue;
                }else{                    
                    failCount = failCount + 1;
                }
            }
           
        });

        this.props.setFlightsList(filtFlig);
        this.props.toggleFlightFilter(false)
    }

    render() {

        let flights = this.props.search.flightList;
        let pagedFlights = flights.slice(this.props.search.listPage * 10, (this.props.search.listPage * 10 ) + 10);
       
        return (
            <Container>

                <Header>
                    <Left>
                        <Button transparent onPress={ () => this.props.navigation.navigate('Search') }>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Results</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.handleFilterToggle(true)}>
                            <Icon name='menu' />
                        </Button>
                    </Right>
                    
                </Header>
                
                <Content>
                { this.props.search.selectedTravelType == 0 ? 
                    <FlatList
                        data={pagedFlights}
                        renderItem={
                            ({ item }) => (
                                <SingleFlight flight={item} />
                            )
                        }
                        onRefresh={this.refreshList}
                    /> 
                    : 
                    <FlatList
                        
                        data={pagedFlights}
                        renderItem={
                            ({ item }) => (
                                <SingleFlightReturn flight={item} key={item.id}/>
                            )
                        }
                    />

                }
                    <Grid style={{ marginTop: 20, marginBottom:20}}>
                        <Col>
                            <Button rounded style={{ width: '100%' }} danger onPress={this.props.decrPageNum}>
                                <Text style={{ width: '100%', textAlign: 'center', color: '#ffffff' }}>Prev</Text>
                            </Button>
                        </Col>
                        <Col>
                            <Text style={{ width: '100%', textAlign: 'center', color: '#4c4c4c', fontSize: 20 }}>{this.props.search.listPage}/{this.props.search.totPages}</Text>
                        </Col>
                        <Col>
                            <Button rounded style={{ width: '100%' }} danger onPress={this.props.incrPageNum}>
                                <Text style={{ width: '100%', textAlign: 'center', color: '#ffffff' }}>Next</Text>
                            </Button>
                        </Col>
                    </Grid>
                </Content>
                <ConfirmDialog
                    title="Filter Flights"
                    message="Are you sure about that?"
                    visible={this.props.search.filterDialogVisible}
                    onTouchOutside={ () => this.handleFilterToggle(false) }
                    positiveButton={
                        {
                            title: "APPLY",
                            onPress: () => this.filterFlights(this.props.search.flightList)
                        }
                    }
                    negativeButton={{
                        title: "CANCEL",
                        onPress: () => this.handleFilterToggle(false)
                    }} 
                >
                    <View style={{ height: 250 }}>
                        <FlightFilter />
                    </View>

                </ConfirmDialog>
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
  bindActionCreators(
    {

        incrPageNum,
        decrPageNum,
        toggleFlightFilter,
        setFlightsList

    }, 
  dispatch)
);

const mapStateToProps = (state) => {
  const { search } = state
  return { search }
};

export default connect(mapStateToProps,mapDispatchToProps)(Results);
