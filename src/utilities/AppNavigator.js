import { createStackNavigator, createAppContainer } from 'react-navigation';
import Search from '../pages/Search';
import Results from './../pages/Results';

const AppNavigator = createStackNavigator({
    Search: { 
        screen: Search 
    },
    Results: {
        screen: Results
    }
},{
    initialRouteName: 'Search',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

export default createAppContainer(AppNavigator);