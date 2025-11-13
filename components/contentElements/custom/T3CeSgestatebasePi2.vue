<script>
import realtyListBase from "@/components/mixins/realtyListBase.vue";
import _city from "~/pages/monteurzimmer/_city/index.vue";

export default {
  name: "T3CeSgestatebasePi2",
  mixins: [realtyListBase],
  data() {
    return {
      routeQuery: this.$route.query,
    };
  },
  props: {
    pi_flexform: {
      type: Object,
    },
  },
  beforeMount() {

if(this.pi_flexform.settings.filter && this.pi_flexform.settings.filter.ort) {
  this.city = this.pi_flexform.settings.filter.ort;
  this.$store.commit("counter/changeKeepAlive", true);

  if (Object.keys(this.routeQuery).length === 0) {
      this.$store.commit(
          "counter/changeLatitude",
          (this.latitude = this.pi_flexform.settings.filter.longitude)
      );
      this.$store.commit(
          "counter/changeLatitude",
          this.pi_flexform.settings.filter.latitude
      );
    }

    if (this.pi_flexform.settings.filter.ort) {
      this.$store.commit(
          "counter/changeCity",
          this.pi_flexform.settings.filter.ort
      );
      this.$store.commit(
          "counter/changeSearchedPlace",
          this.pi_flexform.settings.filter.ort
      );
    }
  }
  },
};
</script>
