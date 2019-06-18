import React, { Component } from 'react';
// import { Text } from 'react-native';
import { Button,Text } from 'native-base';
import { Col, Row } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFlightsList,setLoadingToggle } from '../actions/SearchAction';

class SearchFlights extends Component {

    handleSearch = () =>{

        let depDateArr = this.props.search.depDateApi.split('/')
        let depDateFrom = new Date(depDateArr[2],depDateArr[1],depDateArr[0]);
        let depDateTo = new Date(depDateFrom);
        depDateTo.setDate(depDateTo.getDate()+10);
        let depDateToStr = depDateTo.getDate()+'/'+depDateTo.getMonth()+'/'+depDateTo.getFullYear();

        let retDateArr = this.props.search.retDateApi.split('/')
        let retDateFrom = new Date(retDateArr[2],retDateArr[1],retDateArr[0]);
        let retDateTo = new Date(retDateFrom);
        retDateTo.setDate(retDateTo.getDate()+10);
        let retDateToStr = retDateTo.getDate()+'/'+retDateTo.getMonth()+'/'+retDateTo.getFullYear();

        let apiUrlStart = 'https://api.skypicker.com/flights?';
        let apiUrlCommon = 'flyFrom='+ this.props.search.depAirport 
                    +'&to='+ this.props.search.arrAirport 
                    +'&dateFrom='+this.props.search.depDateApi
                    +'&dateTo='+depDateToStr
                    +'&partner=picky'
                    +'&adults='+this.props.search.adultCount
                    +'&children='+this.props.search.childCount
                    ;

        let apiUrl = '';


        if(this.props.search.selectedTravelType != 0){
            apiUrl = '&returnFrom='+this.props.search.retDateApi
                    +'&returnTo='+retDateToStr
        }


        console.log('-------------------------');
        console.log(apiUrlStart+apiUrlCommon+apiUrl);
        console.log('-------------------------');

        this.props.setLoadingToggle(true);
        fetch(apiUrlStart+apiUrlCommon+apiUrl)
        .then((response) => {
            return response.json()
        })
        .then((responseJson) => {
            this.props.setFlightsList(responseJson.data);
            this.props.navigation.navigate('Results');
            this.props.setLoadingToggle(false);
        });
        // alert(JSON.stringify(this.props.search))

    }

    render() {

        return (
            <Button rounded style={{ width: '100%' }} danger onPress={this.handleSearch}>
                <Text style={{ width: '100%', textAlign: 'center', color: '#ffffff' }}>Search</Text>
            </Button>

        );

    }
}
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setFlightsList,setLoadingToggle
    }, dispatch)
);

const mapStateToProps = (state) => {
    const { search } = state
    return { search }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchFlights);
