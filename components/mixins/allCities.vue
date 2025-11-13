<template lang="">
  <div class="cities">
    <div class="frame cities__wrapper">
      <div class="cities__list">
        <NuxtLink
          v-for="(city, index) in cities"
          :to="city.slug.replace('-', ' ')+'/'"
          :key="index"
          class="cities__item"
          >{{ city.title }}</NuxtLink
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "T3CeCities",
  data() {
    return {
      cities: [],
    };
  },

  created() {
    if (
      this.$store.state.typo3.page.sg_page  &&
      this.$store.state.typo3.page.sg_page.sg_meta.cities
    ) {
      this.cities = this.$store.state.typo3.page.sg_page.sg_meta.cities;
    }
  },
};
</script>
