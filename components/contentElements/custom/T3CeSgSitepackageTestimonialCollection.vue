<!-- Images from typo3  -->
<!-- <template>
  <TheSlider
    :dots="false"
    :slidesToShow="3"
    :navButtons="false"
    :autoplay="true"
    :autoplaySpeed="2000"
    :pauseOnHover="true"
    class="logo-carousel"
  >
    <div
      class="slide logo-carousel__slide"
      v-for="slide in tx_sg_sitepackage_relation_testimonial"
    >
      <img
        class="slide__image logo-carousel__img"
        :src="slide.images[0].publicUrl"
        :alt="slide.images[0].properties.alternative"
        loading="lazy"
        draggable="false"
        width="140px"
        height="120"
      />
    </div>
  </TheSlider>
</template>
<script>
import TheSlider from "~/components/UI/TheSlider.vue";
export default {
  name: "T3CeSgSitepackageTestimonialCollection",
  props: {
    tx_sg_sitepackage_layout: {
      type: String,
    },
    tx_sg_sitepackage_relation_testimonial: {
      type: Array,
    },
  },
  components: { TheSlider },
};
</script> -->

<template>
  <TheSlider
    :dots="false"
    :slidesToShow="3"
    :navButtons="false"
    :autoplay="true"
    :autoplaySpeed="2000"
    :pauseOnHover="true"
    class="logo-carousel"
  >
    <div class="slide logo-carousel__slide">
      <img
        class="slide__image logo-carousel__img"
        src="@/assets/images/logos/crestgroup.jpg"
        alt="Partner crestgroup"
        loading="lazy"
        draggable="false"
        width="140px"
        height="120"
      />
    </div>
    <div class="slide logo-carousel__slide">
      <img
        class="slide__image logo-carousel__img"
        src="@/assets/images/logos/eiffage.jpg"
        alt="Partner eiffage"
        loading="lazy"
        draggable="false"
        width="140px"
        height="120"
      />
    </div>
    <div class="slide logo-carousel__slide">
      <img
        class="slide__image logo-carousel__img"
        src="@/assets/images/logos/himmelspach.jpg"
        alt="Partner himmelspach"
        loading="lazy"
        draggable="false"
        width="140px"
        height="120"
      />
    </div>
    <div class="slide logo-carousel__slide">
      <img
        class="slide__image logo-carousel__img"
        src="@/assets/images/logos/imgp.jpg"
        alt="Partner imgp"
        loading="lazy"
        draggable="false"
        width="140px"
        height="120"
      />
    </div>
    <div class="slide logo-carousel__slide">
      <img
        class="slide__image logo-carousel__img"
        src="@/assets/images/logos/mainka.jpg"
        alt="Partner mainka"
        loading="lazy"
        draggable="false"
        width="140px"
        height="120"
      />
    </div>
    <div class="slide logo-carousel__slide">
      <img
        class="slide__image logo-carousel__img"
        src="@/assets/images/logos/nuesse.jpg"
        alt="Partner nuesse"
        loading="lazy"
        draggable="false"
        width="140px"
        height="120"
      />
    </div>
    <div class="slide logo-carousel__slide">
      <img
        class="slide__image logo-carousel__img"
        src="@/assets/images/logos/roszak.jpg"
        alt="Partner roszak"
        loading="lazy"
        draggable="false"
        width="140px"
        height="120"
      />
    </div>
    <div class="slide logo-carousel__slide">
      <img
        class="slide__image logo-carousel__img"
        alt="Partner schulte"
        src="@/assets/images/logos/schulte.jpg"
        loading="lazy"
        draggable="false"
        width="140px"
        height="120"
      />
    </div>
    <div class="slide logo-carousel__slide">
      <img
        class="slide__image logo-carousel__img"
        alt="Partner smet"
        src="@/assets/images/logos/smet.jpg"
        loading="lazy"
        draggable="false"
        width="140px"
        height="120"
      />
    </div>
    <div class="slide logo-carousel__slide">
      <img
        class="slide__image logo-carousel__img"
        src="@/assets/images/logos/socotec.jpg"
        alt="Partner socotec"
        loading="lazy"
        draggable="false"
        width="140px"
        height="120"
      />
    </div>
    <div class="slide logo-carousel__slide">
      <img
        class="slide__image logo-carousel__img"
        src="@/assets/images/logos/ta.jpg"
        alt="Partner ta"
        loading="lazy"
        draggable="false"
        width="140px"
        height="120"
      />
    </div>
  </TheSlider>
</template>
<script>
import TheSlider from "~/components/UI/TheSlider.vue";
export default {
  name: "T3CeSgSitepackageTestimonialCollection",
  props: {
    tx_sg_sitepackage_layout: {
      type: String,
    },
    tx_sg_sitepackage_relation_testimonial: {
      type: Array,
    },
  },
  components: { TheSlider },
};
</script>
