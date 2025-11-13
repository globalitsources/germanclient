<script>
import AllCities from "~/components/mixins/allCities.vue";

export default {
  mixins: [AllCities],
  name: "T3CeCities",
  props: {
    cities: {
      type: Array,
      required: true,
    },
  },
  created() {
    this.cities = this.$store.state.typo3.page.sg_page.sg_meta.cities;
  },
};
</script>
