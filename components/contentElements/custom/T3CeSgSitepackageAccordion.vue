<template>
  <div class="frame">
    <header v-if="header" style="margin: 1rem 0; text-align: center">
      <h2 class="">{{ header }}</h2>
    </header>
    <TheAccordion
      v-for="(text, index) in tx_sg_sitepackage_relation_contentpane"
      :key="`collape${index}`"
      :title="updateContent(text.title)"
    >
      <!-- {{ console.log("text", text) }} -->
      <div class="card-body">
        <t3-html-parser :content="updateContent(text.content)" />
      </div>
    </TheAccordion>
  </div>
</template>
<script>
import baseCe from "~typo3/mixins/component/baseCe";
export default {
  name: "T3CeSgSitepackageAccordion",
  extends: baseCe,
  data() {
    return {
      city: this.$store.state.counter.search.city,
    };
  },

  props: {
    tx_sg_sitepackage_relation_contentpane: {
      type: Array,
      required: true,
    },
    header: {
      type: String,
      default: "",
    },
  },
  methods: {
    updateContent: function (title) {
      if(this.city !== null && this.city !== undefined && this.city !== "") {
        return title.replace("###page_ph_1###", this.city.charAt(0).toUpperCase()+this.city.slice(1));
      }
      return title;
    },
  },
};
</script>
