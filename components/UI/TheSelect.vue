<template>
  <div
    class="select"
    @click="toggleSelect()"
    :class="optionsVisible ? 'select__input--focus' : ''"
  >
    <svg
      class="select__icon"
      v-if="this.icon"
      width="35"
      height="30"
      :viewBox="viewBox"
      xmlns="http://www.w3.org/2000/svg"
    >
      <use
        v-if="icon === 'persons'"
        xlink:href="@/assets/images/icons/sprite.svg#persons"
      ></use>
      <use
        v-if="icon === 'radar'"
        xlink:href="@/assets/images/icons/sprite.svg#radar"
      ></use>
    </svg>
    <svg
      class="select__accordion-icon"
      width="15"
      height="10"
      viewBox="0 0 135 74"
      xmlns="http://www.w3.org/2000/svg"
    >
      <use xlink:href="@/assets/images/icons/sprite.svg#accordion"></use>
    </svg>
    <p>{{ selected }}</p>
    <div class="options" v-if="optionsVisible">
      <span
        class="option"
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
      >
        {{ option.option }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      optionsVisible: false,
    };
  },
  props: {
    options: {
      type: Array,
    },
    selected: {
      type: String,
    },
    icon: {
      type: String,
    },
    viewBox: {
      type: String,
    },
  },
  methods: {
    toggleSelect() {
      this.optionsVisible = !this.optionsVisible;
    },
    selectOption(option) {
      this.$emit("option-select", option);
    },

    hideSelect() {
      this.optionsVisible = false;
    },

    handleClickOutside(event) {
      if (this.optionsVisible && !this.$el.contains(event.target)) {
        this.toggleSelect();
      }
    },
  },
  mounted() {
    this.$el.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>
