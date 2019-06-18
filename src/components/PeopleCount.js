import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ImageBackground, TouchableOpacity, DatePickerAndroid } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Header, Segment, Button, Icon } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { incrAdult, decrAdult, incrChild, decrChild, } from '../actions/SearchAction';

class PeopleCount extends Component {

    render() {

        return (
            <Grid>
                <Col>
                    <Grid>
                        <Col size={3}>
                            <Grid style={styles.countType}>

                                <Row>
                                    <Text style={{ fontSize: 20 }}>Adult</Text>
                                </Row>

                            </Grid>

                        </Col>
                        <Col size={1}>
                            <Grid>
                                <Row>
                                    <Button style={styles.countButton} transparent onPress={this.props.incrAdult}>
                                        <Icon type="FontAwesome" name='chevron-up' style={styles.countIcon} />
                                    </Button>
                                </Row>
                                <Row>
                                    <Text style={styles.countText}>{this.props.search.adultCount}</Text>
                                </Row>
                                <Row>
                                    <Button style={styles.countButton} transparent onPress={this.props.decrAdult}>
                                        <Icon type="FontAwesome" name='chevron-down' style={styles.countIcon} />
                                    </Button>
                                </Row>
                            </Grid>
                        </Col>
                    </Grid>
                </Col>
                <Col>
                    <Grid>
                        <Col size={3}>
                            <Grid style={styles.countType}>

                                <Row>
                                    <Text style={{ fontSize: 20 }}>Children</Text>
                                </Row>

                            </Grid>

                        </Col>
                        <Col size={1}>
                            <Grid>
                                <Row>
                                    <Button style={styles.countButton} transparent>
                                        <Icon type="FontAwesome" name='chevron-up' style={styles.countIcon} onPress={this.props.incrChild} />
                                    </Button>
                                </Row>
                                <Row>
                                    <Text style={styles.countText}>{this.props.search.childCount}</Text>
                                </Row>
                                <Row>
                                    <Button style={styles.countButton} transparent>
                                        <Icon type="FontAwesome" name='chevron-down' style={styles.countIcon} onPress={this.props.decrChild} />
                                    </Button>
                                </Row>
                            </Grid>
                        </Col>
                    </Grid>

                </Col>
            </Grid>

        );
    }
}

const styles = StyleSheet.create({
   
    countButton: {
        alignSelf: 'flex-end',
        paddingTop: 0,
        paddingBottom: 0,
        height: 20,
        width: 20,
        justifyContent: "center"
    },
    countIcon: {
        marginLeft: 0,
        marginRight: 0,
        fontSize: 10,
        color: '#4c4c4c'
    },
    countText: {
        alignSelf: 'flex-end',
        paddingLeft: 5,
        paddingBottom: 3,
        height: 20,
        width: 20,
        justifyContent: "center",
        fontSize: 15
    },
    countType: {
        flex: 7,
        alignItems: 'center',
        marginTop: 10
    }
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        incrAdult, decrAdult, incrChild, decrChild,
    }, dispatch)
);

const mapStateToProps = (state) => {
    const { search } = state
    return { search }
};

export default connect(mapStateToProps, mapDispatchToProps)(PeopleCount);
