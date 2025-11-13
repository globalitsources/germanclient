<template>
  <div class="no-search">
    <div class="no-search__wrapper">
      <h4 v-html="title"></h4>
      <h5 v-html="text"></h5>
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
  computed: {
    isFormSubmited() {
      return this.$store.state.isFormSubmited;
    },
    title() {
      return this.persons > 0
        ? this.messages.manyPersons.title
        : this.messages.noApartments.title;
    },
    text() {
      return this.persons > 0
        ? this.messages.manyPersons.text
        : this.messages.noApartments.text;
    },
  },
  data() {
    return {
      persons: +this.$store.state.counter.search.min_persons,
      messages: {
        manyPersons: {
          title: "Sie brauchen mehr als eine Wohnung?",
          text: "Egal, ob 5 Wohnungen oder 3 Häuser - wir finden was für Sie. Wir freuen uns über Ihren Anruf oder ihre Mail!",
        },
        noApartments: {
          title: "Ups, hier haben wir noch keine Unterkünfte.",
          text: "Ganz in der Nähe aber sehr wohl, schauen Sie mal unten.<br/>Alternativ können Sie uns auch anrufen und wir helfen Ihnen gerne weiter.",
        },
      },
    };
  },
  name: "NoSearchResults",
  methods: {
    openModal() {
      this.$store.commit("counter/changePopupOpen", true);
    },
  },
  watch: {
    "$store.state.counter.isFormSubmited": {
      handler: function (newValue) {
        if (newValue) {
          this.persons = +this.$store.state.counter.search.min_persons;
        }
      },
      immediate: true,
    },
  },
};
</script>
