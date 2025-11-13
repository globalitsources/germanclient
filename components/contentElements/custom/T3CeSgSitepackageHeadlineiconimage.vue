<template lang="">
  <div class="headline">
    <div class="headline__content">
      <div class="headline__icon">
        <i :class="tx_sg_sitepackage_icon"></i>
      </div>
      <h3 class="headline__title h3--red">
        {{ tx_sg_sitepackage_headline }}
      </h3>
      <div class="headline__subtitle h4--red">
        {{ tx_sg_sitepackage_subheadline }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "T3CeSgSitepackageHeadlineiconimage",
  props: {
    tx_sg_sitepackage_icon: {
      type: String,
    },
    tx_sg_sitepackage_headline_layout: {
      type: String,
    },
    tx_sg_sitepackage_headline: {
      type: String,
    },
    tx_sg_sitepackage_subheadline: {
      type: String,
    },
  },
};
</script>
