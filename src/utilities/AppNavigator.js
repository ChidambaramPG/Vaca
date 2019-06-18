import { createStackNavigator, createAppContainer } from 'react-navigation';
import Search from '../pages/Search';
import Results from './../pages/Results';
import SearchAirport from './../pages/SearchAirport';

const AppNavigator = createStackNavigator({
    Search: { 
        screen: Search 
    },
    Results: {
        screen: Results
    },
    Airports: {
        screen: SearchAirport
    }
},{
    initialRouteName: 'Search',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

export default createAppContainer(AppNavigator);