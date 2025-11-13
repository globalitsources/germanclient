export const state = () => ({
  search: {
    city: "",
    latitude: "",
    longitude: "",
    radius: "50",
    max_persons: "0",
    min_persons: "0",
    personsValue: "auswählen",
  },
  isFormSubmited: false,
  popupOpen: false,
  language: "de",
  realtyList: [],
  searchedPlace: "",
  lastUpdate: "",
  keepAlive: true,
});

export const mutations = {
  increment(state, newObject) {
    state.search = newObject;
  },
  changeCity(state, newCity) {
    state.search.city = newCity;
  },
  changeLastUpdate(state, newDate) {
    state.lastUpdate = newDate;
  },
  changeKeepAlive(state, newState) {
    state.keepAlive = newState;
  },
  changeLatitude(state, newValue) {
    state.search.latitude = newValue;
  },
  changeLongitude(state, newValue) {
    state.search.longitude = newValue;
  },
  changeRadius(state, newRadius) {
    state.search.radius = newRadius;
  },
  changeSearchedPlace(state, newPlace) {
    state.searchedPlace = newPlace;
  },
  changePersons(state, persons) {
    persons = persons?.split("-");
    if (persons.length == 1) {
      state.search.min_persons = persons[0];
      state.search.max_persons = "0";
    } else {
      state.search.min_persons = persons[0];
      state.search.max_persons = persons[1];
    }
  },
  changePersonsValue(state, newPersonsValue) {
    state.search.personsValue = newPersonsValue;
  },

  changeIsFormSubmited(state, newValue) {
    state.isFormSubmited = newValue;
  },
  
  changePopupOpen(state, newValue) {
    state.popupOpen = newValue;
  },
  changeRealtyList(state, newValue) {
    state.realtyList = newValue;
  },
  changePage(state, newValue) {
    state.page = newValue;
  },
  changeTotalPages(state, newValue) {
    state.totalPages = newValue;
  },
  changeLanguage(state, newValue) {
    state.language = newValue;
  },
};
