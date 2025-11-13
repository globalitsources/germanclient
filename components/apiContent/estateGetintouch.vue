<template lang="">
  <div class="intouch frame">
    <div class="intouch__content">
      <h1 class="h3--red intouch__title">
        Monteurzimmer für Einzelpersonen und Montageteams 
        {{ this.city ? ' in ' + this.city.charAt(0).toUpperCase()+this.city.slice(1) : ''}}
      </h1>
      <p class="text--gray">
        Sie benötigen für ein umfangreicheres Bauprojekt mehrere Zimmer, ggf.
        über einen längeren Zeitraum? Rufen Sie an oder schreiben Sie uns:
        Gemeinsam finden wir eine passende Lösung für Sie!
      </p>

      <p></p>

      <div class="intouch__buttons">
        <a class="button--secondary intouch__button" @click="openModal">
          <svg
            class="intouch__button--icon"
            width="30"
            height="25"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <use xlink:href="@/assets/images/icons/sprite.svg#phoneSolid"></use>
          </svg>
          Anfrage per Telefon
        </a>
        <NuxtLink
          to="/buchungsanfrage/"
          class="button--secondary intouch__button"
        >
          <svg
            class="intouch__button--icon"
            width="30"
            height="25"
            viewBox="0 0 161 121"
            xmlns="http://www.w3.org/2000/svg"
          >
            <use xlink:href="@/assets/images/icons/sprite.svg#email"></use>
          </svg>
          Anfrage per Mail
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "EstateGetintouch",

  data() {
    return {
      city: this.$store.state.counter.search.city,
    };
  },
  methods: {
    openModal() {
      this.$store.commit("counter/changePopupOpen", true);
    },
  },
};
</script>
