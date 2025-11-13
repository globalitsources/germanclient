<template>
  <div class="t3-ce-cta">
    <a :href="tx_sg_sitepackage_cta.href" class="button--primary">
      {{ tx_sg_sitepackage_cta_caption }}
    </a>
  </div>
</template>
<script>
import baseCe from "~typo3/mixins/component/baseCe";
export default {
  name: "T3CeSgSitepackageCta",
  extends: baseCe,
  props: {
    tx_sg_sitepackage_cta: {
      type: Object,
      required: true,
    },
    tx_sg_sitepackage_cta_caption: {
      type: String,
      required: true,
    },
  },
};
</script>
