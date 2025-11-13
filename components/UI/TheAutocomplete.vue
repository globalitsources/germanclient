<template>
  <!-- @keydown.enter.prevent="onEnter" -->
  <div class="field">
    <input
      class="autocomplete__input"
      ref="adressInput"
      placeholder="Bitte eine Adresse eingeben"
      @focus="handleFocus"
      @keydown.enter.prevent="onEnter"
      type="text"
      v-model="inputValue"
    />
    <svg
      class="autocomplete__icon"
      width="40"
      height="35"
      viewBox="0 0 45 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <use xlink:href="@/assets/images/icons/sprite.svg#map"></use>
    </svg>
  </div>
</template>

<script>
import { GoogleMapsApiKey } from "~/service/helpers/strings";
import { googlePlaces } from "~/utils/api/googlePlaces.api";
import { replaceTranslit } from "~/service/helpers/helpers";

export default {
  name: "Autocomplete",
  data() {
    return {
      inputValue: this.$store.state.counter.searchedPlace,
      autocomplete: null,
      mapsLink: `https://maps.google.com/maps/api/js?key=${GoogleMapsApiKey}&libraries=places&language=de`,
    };
  },
  watch: {
    "$store.state.counter.searchedPlace": {
      handler: function (newPlace) {
        this.inputValue = newPlace;
      },
    },
  },
  methods: {
    setSearchedPlace(place) {
      this.inputValue = place;
      this.$store.commit("counter/changeSearchedPlace", place);
    },
    onEnter() {
      const enterEvent = new KeyboardEvent("keydown", {
        key: "ArrowDown",
        keyCode: 40,
        which: 40,
      });
      this.$refs.adressInput.dispatchEvent(enterEvent);
      setTimeout(async () => {
        await this.handlePlace();
        setTimeout(() => this.$emit("submit"), 500);
      }, 200);
    },
    async initializeAutocomplete() {
      const adressInput = this.$refs.adressInput;
      await googlePlaces(this.mapsLink);
      if (window.google) {
        const options = {
          componentRestrictions: { country: "de" },
        };
        this.autocomplete = new window.google.maps.places.Autocomplete(
          adressInput,
          options
        );
        this.autocomplete.addListener("place_changed", this.handlePlace);
      }
    },
    handleFocus() {
      this.initializeAutocomplete();
    },
    async handlePlace() {
      const place = await this.autocomplete.getPlace();

      if (!place) {
        return;
      }

      const placeLat = place.geometry.location.lat();
      const placeLng = place.geometry.location.lng();
      const cityName = await this.getCity(placeLat, placeLng);
      this.setSearchParams(cityName, place);
      this.setSearchedPlace(place.formatted_address);
    },
    async getCity(lat, lng) {
      return new Promise((resolve, reject) => {
        const geocoder = new google.maps.Geocoder();
        const latLng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({ location: latLng }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              const addressComponents = results[0].address_components;
              for (let i = 0; i < addressComponents.length; i++) {
                const types = addressComponents[i].types;
                if (types.includes("locality")) {
                  resolve(addressComponents[i].long_name);
                }
              }
            } else {
              console.error("No results.");
              resolve(null);
            }
          } else {
            console.error("Geocoding error:", status);
            resolve(null);
          }
        });
      });
    },
    setSearchParams(cityName, place) {
      let latitude = place.geometry.location.lat();
      let longitude = place.geometry.location.lng();
      let city = replaceTranslit(cityName);
      this.$store.commit("counter/increment", {
        city: city,
        latitude: latitude,
        longitude: longitude,
        radius: this.$store.state.counter.search.radius,
        max_persons: this.$store.state.counter.search.max_persons,
        min_persons: this.$store.state.counter.search.min_persons,
      });
    },
    removeMapsScript() {
      const mapsScripts = document.querySelectorAll(["script"]);
      if (mapsScripts.length > 0) {
        Array.from(mapsScripts).map(
          (script) => script.src.includes("maps.google") && script.remove()
        );
      }
    },
  },
  mounted() {
    this.removeMapsScript();
  },
};
</script>
