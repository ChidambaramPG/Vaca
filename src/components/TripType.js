import React, { Component } from 'react';
import { View, ImageBackground } from 'react-native';
import { Row } from 'react-native-easy-grid';
import SegmentControl from 'react-native-segment-controller';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectTravelType } from '../actions/SearchAction';

class TripType extends Component {
    
    render() {

        const flightType = <SegmentControl
            values={this.props.search.travelTypes}
            selectedIndex={this.props.search.selectedTravelType}
            height={40}
            borderRadius={20}
            onTabPress={this.props.selectTravelType}
            activeTabStyle={{ backgroundColor: '#ef534a', borderColor: '#ffffff' }}
            tabStyle={{ backgroundColor: '#ffffff', borderColor: '#ffffff' }}
            tabTextStyle={{ color: '#f27d76' }}

        />

        return (
            <Row style={{ backgroundColor: '#4c4c4c' }} size={25} >
                <ImageBackground source={require('../../assets/images/resized_flight_wing_03.png')} style={{ width: '100%', height: '100%' }}>
                    <View style={{ marginTop: 30, marginRight: 20, marginLeft: 20 }}>
                        {flightType}
                    </View>
                </ImageBackground>
            </Row>

        );
    }
}
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        selectTravelType
    }, dispatch)
);

const mapStateToProps = (state) => {
    const { search } = state
    return { search }
};

export default connect(mapStateToProps, mapDispatchToProps)(TripType);
