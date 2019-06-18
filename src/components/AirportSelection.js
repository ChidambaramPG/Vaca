import React, { Component } from 'react';
import { Text } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showAirportSearch } from '../actions/SearchAction';

class AirportSelection extends Component {

    constructor(props) {
        super(props)
        this.handleDepartureLocClick.bind(this);
    }

    
    handleDepartureLocClick = () => {
        this.props.showAirportSearch('departure');
        this.props.navigation.navigate('Airports');
    }

    handleArrivalLocClick = () => {
        this.props.showAirportSearch('arrival');
        this.props.navigation.navigate('Airports');
    }

    render() {

        // const { navigate } = this.props.navigation;

        return (
            <Row size={2}>

                <Col style={{ flex: 2, alignItems: 'center' }} size={3}>

                    <Text style={{ marginTop: 10, fontSize: 15 }}>From</Text>
                    <Text style={{ marginTop: 5, fontSize: 30, color: '#ef534a' }} onPress={ this.handleDepartureLocClick }>{this.props.search.depAirport}</Text>
                    <Text style={{ marginTop: 5, fontSize: 15, textAlign:'center' }}>{this.props.search.depAirportName}</Text>

                </Col>

                <Col style={{ flex: 2, alignItems: 'center' }} size={3}>

                    <Text style={{ marginTop: 10, fontSize: 15 }}>To</Text>
                    <Text style={{ marginTop: 5, fontSize: 30, color: '#ef534a' }} onPress={ this.handleArrivalLocClick }>{this.props.search.arrAirport}</Text>
                    <Text style={{ marginTop: 5, fontSize: 15, textAlign:'center' }}>{this.props.search.arrAirportName}</Text>

                </Col>

            </Row>

        );

    }
}
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        showAirportSearch
    }, dispatch)
);

const mapStateToProps = (state) => {
    const { search } = state
    return { search }
};

export default connect(mapStateToProps, mapDispatchToProps)(AirportSelection);
