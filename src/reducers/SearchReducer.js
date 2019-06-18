import { combineReducers } from 'redux';
import { 
    INCR_ADULT, 
    DECR_ADULT, 
    INCR_CHILD, 
    DECR_CHILD, 
    TRAVEL_TYPE_SELECT, 
    TRAVEL_CLASS_SELECT, 
    SET_DEPARTURE_DATE, 
    SET_RETURN_DATE,
    SET_AIRPORT_LIST,
    SHOW_AIRPORT_SEARCH,
    SET_AIRPORT,
    SET_FLIGHT_LIST,
    SET_LOADING_VIEW,
    INCR_FLIGHT_LIST_PAGE,
    DECR_FLIGHT_LIST_PAGE,
    TOGGLE_FILTER,
    SET_DEPARTURE_FILTER,
    SET_ARRIVAL_FILTER,
    SET_PRICE_FILTER
} from '../types/Types';


let INITIAL_STATE = {
    monthNames : ["JAN", "FEB", "MAR","APR", "MAY", "JUN","JUL", "AUG", "SEP","OCT", "NOV", "DEC"],
    travelTypes: ['One Way', 'Return', 'Multi City'],
    selectedTravelType:0,
    travelClasses: ['Economy', 'Business', 'First Class'],
    selectedTravelClass:0,
    adultCount:1,
    childCount:0,
    departureDate:'',
    depDateApi:'',
    returnDate: '',
    retDateApi:'',
    airports:'',
    airportSearch:'',
    depAirport:'DEL',
    depAirportName:'Indira \nGandi',
    arrAirport:'BOM',
    arrAirportName:'Chatrapati \nSivaji',
    flightList:'',
    loadingStat:false,
    listPage:0,
    totPages:0,
    filterDialogVisible:false,
    depTimeMin:'0',
    arrTimeMin:'0',
    depTimeMax:'1440',
    arrTimeMax:'1440',
    minPrice:0,
    maxPrice:100
};

const searchReducer = (state = INITIAL_STATE, action) => {

    let { 
        monthNames,
        adultCount, 
        childCount, 
        selectedTravelType, 
        selectedTravelClass, 
        departureDate, 
        returnDate,
        airports,
        depAirport,
        airportSearch,
        arrAirport,
        depAirportName,
        arrAirportName,
        depDateApi,
        retDateApi,
        flightList,
        loadingStat,
        listPage,
        totPages,
        filterDialogVisible,
            
        } = state;
    let tempState = state;

    switch (action.type) {

        case INCR_ADULT:
            
            adultCount = adultCount + 1;
            tempState = { ...state,adultCount };
            return tempState;

        case DECR_ADULT:
            
            if(adultCount>=1){
                if(adultCount == 1){
                    adultCount = adultCount;
                }else{
                    adultCount = adultCount - 1;
                }
            }
            
            tempState = { ...state, adultCount };

            return tempState;
           

        case INCR_CHILD:
            
            childCount = childCount + 1;
            tempState = { ...state, childCount };
            return tempState;

        case DECR_CHILD:
            
            if(childCount>=0){
                if(childCount == 0){
                    childCount = childCount;
                }else{
                    childCount = childCount - 1;
                }
            }
            tempState = { ...state, childCount };

            return tempState;
    
        case TRAVEL_TYPE_SELECT:

            selectedTravelType = action.payload;
            tempState = { ...state, selectedTravelType };
            return tempState;
        
        case TRAVEL_CLASS_SELECT:
            selectedTravelClass = action.payload;
            tempState = { ...state, selectedTravelClass };
            return tempState;

        case SET_DEPARTURE_DATE:
            departureDate = action.payload.dispDate;
            depDateApi = action.payload.apiDate;

            let depDate = depDateApi;
            let depDateArr = depDate.split('/');
            let retMinDate = new Date(depDateArr[2],depDateArr[1],depDateArr[0]);
            retMinDate.setDate(retMinDate.getDate()+1);

            let returnDate = retMinDate.getDate() + ' ' + monthNames[retMinDate.getMonth() ] + ' \n' + retMinDate.getFullYear();
            let formatedRetDate = retMinDate.getDate() + '/' + retMinDate.getMonth() + '/' + retMinDate.getFullYear();
            retDateApi = formatedRetDate;


            tempState = { ...state, departureDate,depDateApi,returnDate,retDateApi  };

            return tempState;

        case SET_RETURN_DATE:
            // returnDate = action.payload;
            returnDate = action.payload.dispDate;
            retDateApi = action.payload.apiDate;
            tempState = { ...state, returnDate,retDateApi };
            return tempState;

        case SET_AIRPORT_LIST:
            airports = action.payload;
            tempState = { ...state, airports };
            return tempState;

        case SHOW_AIRPORT_SEARCH:
            airportSearch = action.payload;
            tempState = { ...state, airportSearch };            
            return tempState;
        
        case SET_AIRPORT:
            if(airportSearch == 'departure'){
                depAirport = action.payload.code;
                let tempApt = action.payload.name;
                let aptArr = tempApt.split(' ');
                depAirportName = aptArr[0] + '\n' + aptArr[1];
                tempState = { ...state, depAirport,depAirportName };
            
            }else{
                arrAirport = action.payload.code;
                let tempApt = action.payload.name;
                let aptArr = tempApt.split(' ');
                arrAirportName = aptArr[0] + '\n' + aptArr[1];
                tempState = { ...state, arrAirport,arrAirportName };
            
            }
            return tempState;
        
        case SET_FLIGHT_LIST:
            flightList = action.payload;
            let flightNums = flightList.length;
            totPages = Math.ceil(flightNums/10);
            tempState = { ...state, flightList, totPages };
            return tempState;

        case SET_LOADING_VIEW:
            loadingStat = action.payload;
            tempState = { ...state, loadingStat };
            return tempState;

        case INCR_FLIGHT_LIST_PAGE:

            if (listPage + 1 <= totPages){
                listPage = listPage + 1;
            }else{
                listPage = listPage;
            }
            
            tempState = { ...state, listPage };
            return tempState;

        case DECR_FLIGHT_LIST_PAGE:
            if (listPage - 1 >= 0) {
                listPage = listPage - 1;
            } else {
                listPage = listPage;
            }
            tempState = { ...state, listPage };
            return tempState;

        case TOGGLE_FILTER:
            filterDialogVisible = action.payload;
            tempState = { ...state, filterDialogVisible };
            return tempState;

        case SET_DEPARTURE_FILTER:
            depTimeMin = action.payload;
            tempState = { ...state, depTimeMin };
            return tempState;

        case SET_ARRIVAL_FILTER:
            arrTimeMin = action.payload;
            tempState = { ...state, arrTimeMin };
            return tempState;

        case SET_PRICE_FILTER:
            minPrice = action.payload;
            tempState = { ...state, minPrice };
            return tempState;

        default:
            return state 
    }
};

export default combineReducers({
  search: searchReducer,
});