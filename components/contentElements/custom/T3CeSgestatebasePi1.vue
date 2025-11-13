<template lang="">
  <div class="teaser">
    <div class="teaser__content">
      <!-- <h1 class="teaser__title">Jetzt Monteurzimmer finden</h1> -->
      <h1 class="teaser__title">{{$t("Jetzt Monteurzimmer finden")}}</h1>
      <p class="teaser__info">Egal wann, wo und wie viele: Ein Anruf genügt!</p>
      <span class="teaser__button button--primary" @click="this.openModal">
        <svg
          width="35"
          fill="#0000"
          height="30"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
          class="teaser__icon"
        >
          <use xlink:href="@/assets/images/icons/sprite.svg#phoneSolid"></use>
        </svg>
        <!-- {{ $t("direkt anrufen") }} <br/> -->
        direkt anrufen
      </span>
      <p class="teaser__info">oder</p>
      <div class="autocomplete">
        <TheAutocomplete @submit='submit'></TheAutocomplete>
        <NuxtLink :to="this.searchUrl" class="autocomplete__submit">
          Suchen
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import TheAutocomplete from "@/components/UI/TheAutocomplete.vue";
import { buildQueryString } from "~/service/helpers/strings";
import { replaceTranslit } from "~/service/helpers/helpers";

export default {
  components: { TheAutocomplete },
  data() {
    return {
      city: "",
      latitude: null,
      longitude: null,
      radius: this.$store.state.counter.search.radius,
      min_persons: this.$store.state.counter.search.max_persons,
      max_persons: this.$store.state.counter.search.min_persons,
    };
  },
  methods: {
    openModal() {
      this.$store.commit("counter/changePopupOpen", true);
    },
	submit() {
		
		this.$router.push(this.searchUrl);


	},
    updateSearchUrl() {
      const search = this.$store.state.counter.search;
      this.city = replaceTranslit(search.city).toLowerCase().includes('/') ? replaceTranslit(search.city).toLowerCase().replace('/', '-') : replaceTranslit(search.city).toLowerCase();
      this.latitude = search.latitude;
      this.longitude = search.longitude;
      this.radius = search.radius;
      this.min_persons = search.min_persons;
      this.max_persons = search.max_persons;
    },
  },
  watch: {
    "$store.state.counter.search": {
      handler: function (newValue, oldValue) {
        this.updateSearchUrl();
      },
      deep: true,
    },
  },
  mounted() {
    this.updateSearchUrl();
  },

  computed: {
    searchUrl() {
      const queryParams = {
        lat: this.latitude,
        lng: this.longitude,
        radius: this.radius,
        max_persons: this.max_persons,
        min_persons: this.min_persons,
      };
      return `/monteurzimmer/${this.city.toLowerCase()}/?${buildQueryString(
        queryParams
      )}`;
    },
  },
};
</script>
