<template lang="">
  <div
    :title="'Monteurzimmer - Suche'"
    :titleClass="'monteurzimmer__title '"
    class="monteurzimmer frame" id="search"
  >
<form id="sform" method="get" @submit.prevent="getData()" action="/monteurzimmer">
      <div class="monteurzimmer__fields">
        <div class="monteurzimmer__field">
          <TheAutocomplete> </TheAutocomplete>
        </div>

        <div class="monteurzimmer__field">
          <TheSelect
            class="monteurzimmer__select"
            @option-select="setRadius"
            :selected="`${this.radius}km`"
            :icon="'radar'"
            :viewBox="'0 0 160 160'"
            :options="radiusOptions"
          >
          </TheSelect>
        </div>
        <div class="monteurzimmer__field">
          <TheSelect
            :icon="`persons`"
            class="monteurzimmer__select"
            @option-select="setPersons"
            :selected="findSelectedPersons()"
            :viewBox="'0 0 200 160'"
            :options="personsOptions"
          ></TheSelect>
        </div>
        <div class="monteurzimmer__field">
          <input
            type="submit"
            class="monteurzimmer__submit"
            value="Suchen"
            :dusabled="this.isFetch"
          />
        </div>
      </div>

      <div class="extra close-button">
        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg></a>
      </div>

    </form>
  </div>
</template>
<script>
import TheAccordion from "../UI/TheAccordion.vue";
import TheSelect from "../UI/TheSelect.vue";
import TheAutocomplete from "../UI/TheAutocomplete.vue";
import { replaceTranslit } from "~/service/helpers/helpers";
import { pythonApiUrl, buildQueryString } from "~/service/helpers/strings";

export default {
  name: "EstateOpenCard",
  components: { TheAccordion, TheSelect, TheAutocomplete },
  data() {
    return {
      isFetch: false,
      _path: '',
      city: this.$store.state.counter.search.city,
      latitude: this.$store.state.counter.search.latitude,
      longitude: this.$store.state.counter.search.longitude,
      radius: this.$store.state.counter.search.radius,
      min_persons: this.$store.state.counter.search.min_persons,
      max_persons: this.$store.state.counter.search.max_persons,
      personsOptions: [
        { value: "0-0", option: "auswählen" },
        { value: "1-1", option: "1 Person" },
        { value: "2-2", option: "2 Personen" },
        { value: "3-3", option: "3 Personen" },
        { value: "4-4", option: "4 Personen" },
        { value: "5-5", option: "5 Personen" },
        { value: "6-6", option: "6 Personen" },
        { value: "7-7", option: "7 Personen" },
        { value: "8-8", option: "8 Personen" },
        { value: "9-9", option: "9 Personen" },
        { value: "10-10", option: "10 Personen" },
        { value: "10-15", option: "10-15 Personen" },
        { value: "20-49", option: "über 25 Personen" },
        { value: "50-100", option: "über 50 Personen" },
      ],
      radiusOptions: [
        { value: "10", option: "10km" },
        { value: "20", option: "20km" },
        { value: "30", option: "30km" },
        { value: "40", option: "40km" },
        { value: "50", option: "50km" },
      ],
    };
  },
  watch: {
    "$store.state.counter.search": {
      handler: function (newValue, oldValue) {
        this.updateSearchUrl();
      },
      deep: true,
    },
  },
  methods: {
    setRadius(option) {
      this.radius = option.value;
      this.$store.commit("counter/changeRadius", this.radius);
    },
    setPersons(option) {
      this.personsValue = option.option;
      this.$store.commit("counter/changePersons", option.value);
      this.$store.commit("counter/changePersonsValue", option.option);
    },
    findSelectedPersons() {
      const queryValue = `${this.min_persons}-${this.max_persons}`;
      const selectedValue = this.personsOptions.find(
        (item) => item.value === queryValue
      );
      if(typeof selectedValue !== "undefined") {
        return selectedValue.option;
      }
      if(this.max_persons === 2) {
         return "2 Personen";
      }
      if(this.max_persons === 3) {
        return "3 Personen";
      }
      if(this.max_persons === 4) {
        return "4 Personen";
      }
      if(this.max_persons === 5) {
        return "5 Personen";
      }
      if(this.max_persons === 6) {
        return "6 Personen";
      }
      if(this.max_persons === 7) {
        return "7 Personen";
      }
      if(this.max_persons === 8) {
        return "8 Personen";
      }
      if(this.max_persons === 9) {
        return "9 Personen";
      }
      if(this.max_persons === 10) {
        return "10 Personen";
      }
      if(this.max_persons > 10 && this.max_persons < 16) {
        return "10-15 Personen";
      }
      if(this.max_persons > 15 && this.max_persons < 50) {
        return "über 25 Personen";
      }
      if(this.max_persons > 50) {
        return "über 50 Personen";
      }
      return "auswählen";
    },
    updateSearchUrl() {
      const search = this.$store.state.counter.search;
      this.city = search.city;
      this.latitude = search.latitude;
      this.longitude = search.longitude;
      this.radius = search.radius;
      this.min_persons = search.min_persons;
      this.max_persons = search.max_persons;
    },

    async getData() {
      this.$store.commit("counter/changeIsFormSubmited", true);
      setTimeout(() => {
        this.$store.commit("counter/changeIsFormSubmited", false);
      }, 1000);
      this.isFetch = true;
      const options = {
        lat: this.latitude,
        lng: this.longitude,
        radius: this.radius,
        max_persons: this.max_persons,
        min_persons: this.min_persons,
      };
      await this.$axios
        .$get(pythonApiUrl + buildQueryString(options))
        .then((res) => {
          this.$store.commit("counter/changeRealtyList", res.data);
          const cityQuery = this.city.includes("/")
            ? replaceTranslit(this.city).toLowerCase().replace("/", "-")
            : replaceTranslit(this.city).toLowerCase();
          this._path = `/monteurzimmer/${cityQuery}/?lat=${this.latitude}&lng=${this.longitude}&radius=${this.radius}&min_persons=${this.min_persons}&max_persons=${this.max_persons}`;
          this.$nuxt.$router.push({
            path: this._path,
          });
        })
        .catch((e) => console.log(e))
        .finally(() => {
            this.isFetch = false;
            window.location.href = this._path;
        });
    },
  },
};
</script>

