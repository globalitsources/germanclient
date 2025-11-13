<script>
import realtyListBase from "@/components/mixins/realtyListBase.vue";
import _city from "~/pages/monteurzimmer/_city/index.vue";
import {replaceTranslit} from "~/service/helpers/helpers";

export default {
  name: "T3CeZirestaterealtyCity",
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


    //this.city = this.pi_flexform.settings.filter.ort;
    if(this.$route.params.city) {
        this.city = replaceTranslit(this.$route.params.city).toLowerCase();
        this.$store.commit("counter/changeKeepAlive", true);

        this.$store.commit(
              "counter/changeCity",
              this.city
        );
        this.$store.commit(
            "counter/changeSearchedPlace",
              this.city
        );
    } else {
        this.city = null;
        this.$store.commit(
            "counter/changeCity",
            this.city
        );
        this.$store.commit(
            "counter/changeSearchedPlace",
            this.city
        );
    }
    if (Object.keys(this.routeQuery).length === 0) {
        if (typeof this.pi_flexform.settings !== 'undefined') {
            if (typeof this.pi_flexform.settings.filter !== 'undefined') {
                if (typeof this.pi_flexform.settings.filter.longitude !== 'undefined') {
                    this.$store.commit(
                    "counter/changeLatitude",
                          (this.latitude = this.pi_flexform.settings.filter.longitude)
                    );
                    this.$store.commit(
                    "counter/changeLatitude",
                          this.pi_flexform.settings.filter.latitude
                    );
                }
                if (typeof this.pi_flexform.settings.filter.ort !== 'undefined') {
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
        }
    }
  },
};
</script>
