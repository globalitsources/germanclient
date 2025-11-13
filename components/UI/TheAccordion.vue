<template>
  <div
    @click.prevent="toggleAccordion"
    :class="collapse ? 'accordion open' : 'accordion'"
  >
    <div class="accordion__title h2" :class="titleClass">
      {{ title }}
      <svg
        class="accordion__title-icon"
        width="25"
        height="15"
        viewBox="0 0 135 73"
        xmlns="http://www.w3.org/2000/svg"
      >
        <use xlink:href="@/assets/images/icons/sprite.svg#accordion"></use>
      </svg>
    </div>
    <div
      class="accordion__content"
      @click.stop
      :class="collapse ? 'open' : ''"
      v-show="collapse"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapse: false,
    };
  },
  props: {
    title: {
      type: String,
    },
    titleClass: {
      type: String,
    },
    contentClass: {
      type: String,
    },
  },
  methods: {
    toggleAccordion() {
      this.collapse = !this.collapse;
    },
  },
};
</script>
