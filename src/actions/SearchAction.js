export const incrAdult = () => (
  {
    type: 'INCR_ADULT',
  }
);

export const decrAdult = () => (
  {
    type: 'DECR_ADULT',
  }
);

export const incrChild = () => (
  {
    type: 'INCR_CHILD',
  }
);

export const decrChild = () => (
  {
    type: 'DECR_CHILD',
  }
);

export const selectTravelType = (id) => (
  {
    type:'TRAVEL_TYPE_SELECT',
    payload:id
  }
);

export const selectTravelClass = (id) => (
  {
    type: 'TRAVEL_CLASS_SELECT',
    payload: id
  }
);

export const setDepartureDate = (date) => (
  {
    type: 'SET_DEPARTURE_DATE',
    payload: date
  }
);

export const setReturnDate = (date) => (
  {
    type: 'SET_RETURN_DATE',
    payload: date
  }
);

export const setAirportsList = (airport_list) => (
  {
    type: 'SET_AIRPORT_LIST',
    payload: airport_list
  }
);

export const showAirportSearch = (airport_loc) => (
  {
    type: 'SHOW_AIRPORT_SEARCH',
    payload: airport_loc
  }
);

export const setAirport = (airport_loc) => (
  {
    type: 'SET_AIRPORT',
    payload: airport_loc
  }
);

export const setFlightsList = (flight_list) => (
  {
    type: 'SET_FLIGHT_LIST',
    payload: flight_list
  }
);

export const setLoadingToggle = (status) => (
  {
    type: 'SET_LOADING_VIEW',
    payload: status
  }
);

export const incrPageNum = () => (
  {
    type: 'INCR_FLIGHT_LIST_PAGE',
  }
);

export const decrPageNum = () => (
  {
    type: 'DECR_FLIGHT_LIST_PAGE',
  }
);

export const toggleFlightFilter = (status) => (
  {
    type: 'TOGGLE_FILTER',
    payload: status
  }
);

export const setDepFilterTime = (value) => (
  {
    type: 'SET_DEPARTURE_FILTER',
    payload: value
  }
);

export const setArrFilterTime = (value) => (
  {
    type: 'SET_ARRIVAL_FILTER',
    payload: value
  }
);

export const setPriceFilterValue = (value) => (
  {
    type: 'SET_PRICE_FILTER',
    payload: value
  }
);





