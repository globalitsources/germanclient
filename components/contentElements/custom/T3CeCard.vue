<template>
  <div class="t3-ce-card">
        <t3-html-parser :content="tx_sg_sitepackage_content" />
        {{tx_sg_sitepackage_cta}}
  </div>
</template>
<script>
import baseCe from '~typo3/mixins/component/baseCe'
export default {
  name: 'T3CeCard',
  extends: baseCe,
  props: {
    tx_sg_sitepackage_images: {
      type: Object,
      required: true
    },
    tx_sg_sitepackage_content: {
      type: String,
      required: true
    },
    tx_sg_sitepackage_cta: {
      type: String,
      required: true
    },
  }
}
</script>
