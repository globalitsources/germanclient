<template functional>
  <div class="t3-ce-cardslider">
    <div v-for="(text, index) in tx_sg_sitepackage_relation_card" :key="index">
        {{text.title}}
        <t3-html-parser :content="text.content" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'T3CeCardslider',
  functional: true,
  props: {
    tx_sg_sitepackage_relation_card: {
      type: Object,
      required: true
    },
  }
}
</script>
