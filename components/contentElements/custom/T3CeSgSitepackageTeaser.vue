<template lang="">
  <div
    class="banner"
    v-if="$route.path !== '/'"
    :class="`banner__wrapper`"
    :style="`${teaser_background}`"
  >
    <div class="banner__content frame">
      <h2 class="banner__title" >{{ tx_sg_sitepackage_headline }}</h2>
    </div>
  </div>
</template>
<script>
export default {
  name: "T3CeSgSitepackageTeaser",
  props: {
    tx_sg_sitepackage_images: {},
    tx_sg_sitepackage_type: {},
    tx_sg_sitepackage_headline: {},
  },
  data() {
    return {
      teaser_background: "",
    };
  },
  beforeMount() {
    let teaser_background_toupdate = "";
    if (this.tx_sg_sitepackage_images) {
      if (this.tx_sg_sitepackage_images[0]) {
        teaser_background_toupdate +=
          "background-image:url(" +
          this.tx_sg_sitepackage_images[0].publicUrl +
          ")";
      }
      if (this.tx_sg_sitepackage_images[1]) {
        teaser_background_toupdate +=
          ", url(" + this.tx_sg_sitepackage_images[1].publicUrl + ")";
      }
      if (
        this.tx_sg_sitepackage_images[0] &&
        !this.tx_sg_sitepackage_images[1]
      ) {
        teaser_background_toupdate +=
          ", url(https://be.staging.zir.bogatyrev.de/typo3conf/ext/sg_sitepackage/Resources/Public/Assets/Images/mobile_bg.svg)";
      }
    }
    this.teaser_background = teaser_background_toupdate;
  },
  methods: {},
};
</script>
<style lang=""></style>
