<template>
  <div
    :class="{
      open: isPopupVisible,
    }"
    class="popup"
    @click="closePopup"
  >
    <Transition name="fade">
      <div class="popup__wrapper" @click.stop v-if="isPopupVisible">
        <slot />
        <svg
          class="popup__button"
          @click="closePopup"
          width="20"
          height="22"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <use xlink:href="@/assets/images/icons/sprite.svg#modalClose"></use>
        </svg>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: "ThePopup",
  computed: {
    isPopupVisible() {
      return this.$store.state.counter.popupOpen;
    },
  },

  methods: {
    closePopup() {
      this.$store.commit("counter/changePopupOpen", false);
    },
  },
};
</script>
