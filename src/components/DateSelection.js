import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ImageBackground, TouchableOpacity, DatePickerAndroid } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setDepartureDate,setReturnDate } from '../actions/SearchAction';

class DateSelection extends Component {

    handleDepartureDatepickerOpen = async () => {

        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date(),
                minDate: new Date(),
            });
            if (action !== DatePickerAndroid.dismissedAction) {

                let displayDepDate = day + ' ' + this.props.search.monthNames[month] + ' \n' + year;
                let formatedDate = day + '/' +month + '/' + year;
                this.props.setDepartureDate({dispDate:displayDepDate,apiDate:formatedDate});
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }


    }

//      depDateApi
//      retDateApi

    handleReturnDatepickerOpen = async () => {
        let depDate = this.props.search.depDateApi;
        let depDateArr = depDate.split('/');
        let retMinDate = new Date(depDateArr[2],depDateArr[1],depDateArr[0]);
        retMinDate.setDate(retMinDate.getDate()+1);
        
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date(),
                minDate: retMinDate,
            });
            if (action !== DatePickerAndroid.dismissedAction) {

                // let retDate = day + ' ' + this.props.search.monthNames[month] + ' \n' + year;
                // this.props.setReturnDate(retDate);

                let retDate = day + ' ' + this.props.search.monthNames[month] + ' \n' + year;
                let formatedDate = day + '/' +month + '/' + year;
                this.props.setReturnDate({dispDate:retDate,apiDate:formatedDate});

            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }


    }

    componentDidMount() {

        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();

        let depDate = day + ' ' + this.props.search.monthNames[month] + ' \n' + year;

        let displayDepDate = day + ' ' + this.props.search.monthNames[month] + ' \n' + year;
        let formatedDepDate = day + '/' + month + '/' + year;


        let returnDate = date;
        returnDate.setDate(returnDate.getDate()+3);
        let displayRetDate = returnDate.getDate()+ ' ' + this.props.search.monthNames[returnDate.getMonth()]+' \n'+ returnDate.getFullYear();
        let formatedRetDate = returnDate.getDate()+ '/' + returnDate.getMonth()+'/'+ returnDate.getFullYear();


        this.props.setDepartureDate({dispDate:displayDepDate,apiDate:formatedDepDate});
        this.props.setReturnDate({dispDate:displayRetDate,apiDate:formatedRetDate});

    }

    render() {

        let retrunDateSelector = null;
        
        if(this.props.search.selectedTravelType != 0){
            retrunDateSelector = <Col style={{ flex: 3, alignItems: 'center', marginTop: 5, marginRight: 10 }} size={3} >

                                        <Text style={{ marginTop: 5, fontSize: 15 }}>Return</Text>
                                        <TouchableOpacity onPress={this.handleReturnDatepickerOpen}>
                                            <Text style={{ marginTop: 10, fontSize: 30, textAlign: 'center' }}>{this.props.search.returnDate}</Text>
                                        </TouchableOpacity>

                                    </Col>
        }
        

        return (
            <Row size={2}>
                <Col style={{ flex: 3, alignItems: 'center', marginTop: 5, marginLeft: 10 }} size={3}>

                    <Text style={{ marginTop: 5, fontSize: 15 }}>Departure</Text>

                    <TouchableOpacity onPress={this.handleDepartureDatepickerOpen} >
                        <Text style={{ marginTop: 10, fontSize: 30, textAlign: 'center' }}>{this.props.search.departureDate}</Text>
                    </TouchableOpacity>

                </Col>
                { retrunDateSelector }
                
            </Row>

        );
    }
}
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setDepartureDate, setReturnDate
    }, dispatch)
);

const mapStateToProps = (state) => {
    const { search } = state
    return { search }
};

export default connect(mapStateToProps, mapDispatchToProps)(DateSelection);
