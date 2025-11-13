<template>
  <div class="t3-ce-teaser">
    {{tx_sg_sitepackage_headline}}
    {{tx_sg_sitepackage_images.publicUrl}}
  </div>
</template>
<script>
import baseCe from '~typo3/mixins/component/baseCe'
export default {
  name: 'T3CeTeaser',
  extends: baseCe,
  props: {
    tx_sg_sitepackage_images: {
      type: Object,
      required: true
    },
    tx_sg_sitepackage_headline: {
      type: String,
      required: true
    },
  }
}
</script>
