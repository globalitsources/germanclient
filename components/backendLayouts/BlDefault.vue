<template>
  <div class="main-content page">
    <!--div class="teaser"-->
    <!--TYPO3SEARCH_begin-->
    <t3-renderer :content="content?.colPos10" />
    <!--TYPO3SEARCH_end-->
    <div class="main-content">
      <!--TYPO3SEARCH_begin-->
      <t3-renderer :content="content?.colPos0" />
      <!--TYPO3SEARCH_end-->
    </div>
    <AllCities v-if="this.$route.path === '/cities'" />
  </div>
</template>
<script>
import T3BlDefault from "~typo3/components/T3BlDefault/T3BlDefault.vue";
import AllCities from "../mixins/allCities.vue";

export default {
  extends: T3BlDefault,
  mixins: [AllCities],
  head() {
    return {
      htmlAttrs: {
        lang: "de",
      },
    };
  },
  components: { AllCities },
};
</script>
