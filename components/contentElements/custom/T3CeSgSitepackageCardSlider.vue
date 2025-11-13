<!-- Typo3 content -->
<template lang="">
  <div class="apartments">
    <div
      class="apartments__card"
      v-for="(item, index) in tx_sg_sitepackage_relation_card"
      :key="index"
    >
      <div
        class="apartments__content"
        :style="`background-image:url(${item.images[0].publicUrl})`"
      >
        <p class="apartments__title">{{ item.title }}</p>
        <t3-html-parser :content="item.content" class="apartments__text" />
      </div>
    </div>
  </div>
</template>


<!--

<script>
export default {
  name: "T3CeSgSitepackageCardSlider",
  props: {
    tx_sg_sitepackage_relation_card: {
      type: Array,
    },
  },
};
</script>



<style lang=""></style>

<template lang="">
  <div class="apartments">
    <div class="apartments__card">
      <div class="apartments__content apartments__content-appartements">
        <p class="apartments__title">Appartements</p>
        <p class="apartments__text">
          <t3-html-parser :content="tx_sg_sitepackage_relation_card[0].content" class="apartments__text" />
          < !-- pro Pers. / Nacht <strong>ab 18,50 €</strong> -- >
        </p>
      </div>
    </div>
    <div class="apartments__card">
      <div class="apartments__content apartments__content-langzeitbuchung">
        <p class="apartments__title">Langzeitbuchung</p>
        <p class="apartments__text">
          <t3-html-parser :content="tx_sg_sitepackage_relation_card[1].content" class="apartments__text" />
          < !-- pro Pers. / Nacht <strong>ab 18,50 €</strong> -- >
        </p>
      </div>
    </div>
    <div class="apartments__card">
      <div class="apartments__content apartments__content-einzelzimmer">
        <p class="apartments__title">Einzelzimmer</p>
        <p class="apartments__text">
          <t3-html-parser :content="tx_sg_sitepackage_relation_card[2].content" class="apartments__text" />
          < !-- pro Pers. / Nacht <strong>ab 18,50 €</strong> -- >
        </p>
      </div>
    </div>
  </div>
</template>
-->

<script>
export default {
  name: "T3CeSgSitepackageCardSlider",
  props: {
    tx_sg_sitepackage_relation_card: {
      type: Array,
    },
  },
};
</script>
<style lang=""></style>
