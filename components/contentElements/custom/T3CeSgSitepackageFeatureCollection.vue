<template>
  <div
    class="feature-list"
    v-if="tx_sg_sitepackage_layout == 'sg-feature-list'"
  >
    <div
      class="feature-list__item"
      v-for="(text, index) in tx_sg_sitepackage_relation_feature"
      :key="99 + index"
    >
      <div class="feature-list__icon">
        <i :class="tx_sg_sitepackage_relation_feature[index].icon"></i>
      </div>
      <div class="feature-list__content">
        <div class="feature-header h4--red">
          {{ text.title }}
        </div>
        <div class="feature-list__body text--gray">
          <t3-html-parser :content="text.content" />
        </div>
      </div>
    </div>
  </div>
  <div
    class="feature-checklist frame"
    v-else-if="tx_sg_sitepackage_layout == 'sg-feature-checklist'"
  >
    <div
      class="feature-checklist__item"
      v-for="(item, index) in tx_sg_sitepackage_relation_feature"
    >
    <div class="feature-checklist__icon">
      <i class="fas fa-check-circle"></i>
    </div>
      <div class="feature-list__content">
        <h2 class="h4--red">{{ item.title }}</h2>
        <t3-html-parser :content="item.content" class="text--gray" />
      </div>
    </div>
  </div>
  <div
    v-else-if="tx_sg_sitepackage_layout == 'sg-feature-buttonlist'"
    id="c{data.uid}"
    class="feature-list__buttons"
  >
    <NuxtLink
      :to="text.pagebyid[0].slug"
      v-for="(text, index) in tx_sg_sitepackage_relation_feature"
      :key="index"
      class="feature-list__button button--secondary"
    >
      {{ text.title }}
    </NuxtLink>
  </div>
</template>
<script>
import baseCe from "~typo3/mixins/component/baseCe";
export default {
  name: "T3CeSgSitepackageFeatureCollection",
  extends: baseCe,
  props: {
    tx_sg_sitepackage_layout: {
      type: String,
      required: true,
    },
    tx_sg_sitepackage_relation_feature: {
      type: Array,
      required: true,
    },
  },
  mounted() {},
};
</script>
