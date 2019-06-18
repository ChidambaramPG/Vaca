import React, { Component } from 'react';
import { View } from 'react-native';
import { Row } from 'react-native-easy-grid';
import SegmentControl from 'react-native-segment-controller';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectTravelClass } from '../actions/SearchAction';


class TripClass extends Component {

    render() {

        const flightClass = <SegmentControl
            values={this.props.search.travelClasses}
            selectedIndex={this.props.search.selectedTravelClass}
            height={40}
            borderRadius={20}
            onTabPress={this.props.selectTravelClass}
            activeTabStyle={{ backgroundColor: '#ef534a', borderColor: '#f4f4f4' }}
            tabStyle={{ backgroundColor: '#f4f4f4', borderColor: '#f4f4f4' }}
            tabTextStyle={{ color: '#f27d76' }}
        />

        return (
            <Row size={1}>
                <View style={{ width: '100%', paddingLeft: 10, paddingRight: 10 }}>
                    {flightClass}
                </View>
            </Row>   

        );
    }
}
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        selectTravelClass
    }, dispatch)
);

const mapStateToProps = (state) => {
    const { search } = state
    return { search }
};

export default connect(mapStateToProps, mapDispatchToProps)(TripClass);
