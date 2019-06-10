import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Header, Segment, Button, Icon, DatePicker } from 'native-base';
import SegmentControl from 'react-native-segment-controller';


export default class Search extends Component {

    constructor(props){
        super(props);
        this.hadleTabPressEvent.bind(this);
        this.state = {
            selectedIndex:0,
            todaysDate:new Date(),
        }
    }

    hadleTabPressEvent = (event) => {
        // alert(event)
        this.setState({
            selectedIndex:event
        })
    }

    render() {
        
        return (
           <Container>
                <Grid>
                    <Row style={{ backgroundColor:'#4c4c4c' }} size={1}>
                        <ImageBackground source={require('../../assets/images/resized_flight_wing_03.png')} style={{ width: '100%', height: '100%' }}>
                            <View style={{ marginTop:50,marginRight:20,marginLeft:20 }}>
                                <SegmentControl
                                    values={['One Way', 'Return', 'Multi City']}
                                    selectedIndex={ this.state.selectedIndex}
                                    height={40}                                
                                    borderRadius={10}
                                    onTabPress={ this.hadleTabPressEvent }
                                    activeTabStyle={{ backgroundColor: '#ef534a', borderColor: '#ffffff' }}
                                    tabStyle={{ backgroundColor: '#ffffff', borderColor: '#ffffff' }}
                                    tabTextStyle={{ color:'#f27d76' }}
                                    
                                />
                            </View>
                        </ImageBackground>
                    </Row>
                    <Row style={{ backgroundColor: '#ffffff' }} size={3}>

                        <Grid style={{ marginLeft:20,marginRight:20,marginTop:-30,marginBottom:10,borderWidth:1,borderRadius:10,borderColor:'#f4f4f4',backgroundColor:'#ffffff' }}>
                            <Row size={2}>
                                <Col style={{ flex: 2, alignItems: 'center', marginTop: 20, marginLeft: 10 }} size={3}>
                                    <Text style={{ marginTop:10,fontSize:15 }}>From</Text>
                                    <Text style={{ marginTop: 5, fontSize: 30 }}>DEL</Text>
                                    <Text style={{ marginTop: 5, fontSize: 15 }}>New Delhi</Text>
                                </Col>   
                                <Col style={{ flex: 2, alignItems: 'center', marginTop: 20,marginRight:10}} size={3}>
                                    <Text style={{ marginTop: 10, fontSize: 15 }}>To</Text>
                                    <Text style={{ marginTop: 5, fontSize: 30 }}>BOM</Text>
                                    <Text style={{ marginTop: 5, fontSize: 15 }}>Mumbai</Text>
                                </Col>  
                            
                            </Row>
                            <Row size={2}>
                                <Col style={{ flex: 2, alignItems: 'center', marginTop: 20, marginLeft: 10 }} size={3}>
                                    
                                    <Text style={{ marginTop: 5, fontSize: 20 }}>Departure</Text>
                                    <DatePicker
                                        defaultDate={new Date()}
                                        minimumDate={new Date()}
                                        locale={"en"}
                                        timeZoneOffsetInMinutes={undefined}
                                        modalTransparent={false}
                                        animationType={"fade"}
                                        androidMode={"default"}
                                        placeHolderText=''
                                        textStyle={{ color: "ef534a" }}
                                        placeHolderTextStyle={{ color: "#d3d3d3" }}
                                        onDateChange={this.setDate}
                                        disabled={false}
                                    />
                                    
                                </Col>                               
                                <Col style={{ flex: 2, alignItems: 'center', marginTop: 20, marginRight: 10 }} size={3}>
                                   
                                    <Text style={{ marginTop: 5, fontSize: 20 }}>Return</Text>
                                    <DatePicker
                                        defaultDate={new Date()}
                                        minimumDate={new Date()}
                                        locale={"en"}
                                        timeZoneOffsetInMinutes={undefined}
                                        modalTransparent={false}
                                        animationType={"fade"}
                                        androidMode={"default"}
                                        placeHolderText=''
                                        textStyle={{ color: "ef534a",textAlign:'center' }}
                                        placeHolderTextStyle={{ color: "#d3d3d3" }}
                                        onDateChange={this.setDate}
                                        disabled={false}
                                    />
                                    
                                </Col>  
                            </Row>
                            <Row size={1} style={{ width:'75%',marginLeft:50,marginRight:50,borderSize:2,borderColor:'#f4f4f4' }}>

                                

                            </Row>
                            <Row size={1} style={{ width:'75%',marginLeft:50,marginRight:50,borderSize:2,borderColor:'#f4f4f4' }}>



                            </Row>
                            <Row size={1}>

                                <Button rounded style={{ width:'75%',marginLeft:50,marginRight:50 }} danger>
                                    <Text style={{ width: '100%', textAlign: 'center', color: '#ffffff' }}>Search</Text>
                                </Button>
                            </Row>
                        </Grid>

                    </Row>
                </Grid>
           </Container> 
        );
    }
}

const styles = StyleSheet.create({
    container: {
        
    },
    
});
