<template>
  <div class="footer">
    <div class="footer__logo">
      <img
        src="@/assets/images/logo-white.svg"
        alt="Logo von Zimmer im Revier"
        loading="lazy"
        width="140"
        height="130"
      />
    </div>

    <div class="footer-container">
      <img
        src="@/assets/images/footer-bg.webp"
        class="footer__background"
        loading="lazy"
        alt="Monteurzimmer mit Garantie – deutschlandweit"
      />
      <div class="footer-container__item">
        <div class="footer__navigation">
          <h6 class="footer-container__title">Unsere Inhalte</h6>
          <NuxtLink
            class="footer__link"
            to="/monteurzimmer/"
            title="Monteurzimmer finden"
            >Monteurzimmer finden</NuxtLink
          >
          <NuxtLink
            class="footer__link"
            to="/monteurzimmer-grossbaustellenservice/"
            title="Monteurzimmer für Großbaustellen"
            >Monteurzimmer für Großbaustellen</NuxtLink
          >
          <NuxtLink class="footer__link" to="/das-team/" title="Das Team"
            >Das Team</NuxtLink
          >
          <NuxtLink class="footer__link" to="/presse/" title="Presse"
            >Presse</NuxtLink
          >
          <NuxtLink
            class="footer__link"
            to="/vermieter-werden/"
            title="Vermieter werden"
            >Vermieter werden</NuxtLink
          >
          <NuxtLink class="footer__link" to="/blog/" target="" title="Blog"
            >Blog</NuxtLink
          >
        </div>
      </div>
      <div class="footer-container__item">
        <div class="rating">
          <h6 class="footer-container__title">Unsere Städteliste</h6>
          <br />
          <h6 class="footer-container__title">Gefällt Ihnen unser Service?</h6>
          <p>Bewerten Sie uns:</p>
          <a
            target="_blank"
            href="https://g.page/zimmerimrevier/review"
            rel="nofollow"
            aria-label="Google"
          >
            <svg
              width="20"
              height="25"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <use xlink:href="@/assets/images/icons/sprite.svg#google"></use>
            </svg>
          </a>
        </div>
      </div>
      <div class="footer-container__item">
        <div class="footer__contacts">
          <h6 class="footer-container__title">Kontakt</h6>
          <h6>Appartementvermittlung „Zimmer im Revier“</h6>
          <a href="tel:+49232313353">+49 2323 13353</a>
          <a href="tel:+49232313354">+49 2323 13354</a>
          <a href="mailto:info@zimmer-im-revier.de">info@zimmer-im-revier.de</a>
          <span class="footer__link" @click="scrollTop">
            Kartensuche starten
          </span>
        </div>
      </div>
    </div>

    <div class="footer-container">
      <div class="footer-container__item">
        <h6 class="footer-container__title">Unsere Unterkünfte</h6>
        <NuxtLink
          class="footer__link"
          to="/monteurzimmer/"
          title="Monteurzimmer finden"
          >Monteurzimmer</NuxtLink
        >
      </div>
      <div class="footer-container__item">
        <div class="social-media">
          <p>Begleiten Sie uns im Social Web</p>
          <a
            target="_blank"
            href="https://www.facebook.com/zimmerimrevier/"
            rel="nofollow"
            aria-label="facebook"
          >
            <svg
              width="20"
              height="25"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <use xlink:href="@/assets/images/icons/sprite.svg#facebook"></use>
            </svg>
          </a>
          <a
            target="_blank"
            href="https://www.instagram.com/zimmerimrevier/"
            rel="nofollow"
            aria-label="instagram"
          >
            <svg
              width="20"
              height="25"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <use
                xlink:href="@/assets/images/icons/sprite.svg#instagram"
              ></use>
            </svg>
          </a>
        </div>
      </div>
    </div>
    <div class="footer-container footer__cities">
      <NuxtLink to="/cities" class="footer-container__title footer__accordion">
        Stadtschnellauswahl
      </NuxtLink>
    </div>

    <div class="footer-container footer-container__cities">
      <NuxtLink
        class="footer-container__item"
        v-for="footer_city in footer_cities"
        :key="footer_city.uid"
        @click.native="handleLinkClick(footer_city.slug)"
        :to="footer_city.slug.replace('-', ' ') + '/'"
        :title="`Monteurzimmer in ${footer_city.title}`"
        >{{ footer_city.title }}</NuxtLink
      >
      <!-- <NuxtLink
        class="footer-container__item"
        v-for="footer_city in footer_cities"
        to="/monteurzimmer"
        @click.native="handleLinkClick(footer_city.slug)"
        :nuxt-child-key="footer_city.title"
        :key="footer_city.uid"
        :title="`Monteurzimmer in ${footer_city.title}`"
        no-prefetch
        >{{ footer_city.title }}</NuxtLink
      > -->
    </div>

    <div class="footer-container">
      <hr class="footer__divider" />
      <div class="footer__navigation--row">
        <span>© 1997 – 2025 „Zimmer im Revier“</span>
        <NuxtLink
          to="/impressum/"
          target=""
          title="Impressum"
          class="footer__util-link"
          >Impressum</NuxtLink
        >

        <NuxtLink
          to="/datenschutz/"
          target=""
          title="Datenschutz"
          class="footer__util-link"
          >Datenschutz</NuxtLink
        >

        <NuxtLink to="/agb/" target="" title="AGB" class="footer__util-link"
          >AGB</NuxtLink
        >

        <NuxtLink
          to="/newsletter/"
          target=""
          title="Newsletter"
          class="footer__util-link"
          >Newsletter</NuxtLink
        >

        <!--        <a class="footer__util-link js-cookieconsent-trigger" href="#"-->
        <!--          >Cookie-Einstellungen</a-->
        <!--        >-->

        <a
          href="#"
          class="footer__util-link js-cookieconsent-trigger"
          data-cookie-toggler="settings"
          >Cookie-Einstellungen</a
        >

        <!--        <NuxtLink -->
        <!--          to="/cities" -->
        <!--          target="" -->
        <!--          title="Newsletter"  -->
        <!--          class="footer__util-link"  -->
        <!--          >Städte</NuxtLink  -->
        <!--        > -->
      </div>
    </div>
  </div>
</template>
<script>
import getDictionary from "~/utils/getDictionary";

export default {
  name: "Footer",
  data() {
    return {
      footer_cities: {},
      isFirstLoad: true,
    };
  },
  methods: {
    scrollTop() {
      if (this.$nuxt.$route.path !== "/") {
        this.$nuxt.$router.push("/");
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    handleLinkClick() {
      this.$store.commit("counter/changeKeepAlive", false);
    },
  },
  watch: {
    $route(to) {
      if (to.path === "/" && !this.isFirstLoad) {
        this.$store.commit("counter/increment", {
          city: "",
          latitude: "",
          longitude: "",
          radius: "50",
          min_persons: "0",
          max_persons: "0",
        });
        this.$store.commit("counter/changeSearchedPlace", "");
        this.$store.commit("counter/changeKeepAlive", false);
      } else {
        this.isFirstLoad = false;
      }
    },
  },

  created() {
    if (this.$store.state.typo3.page && this.$store.state.typo3.page.sg_page) {
      this.footer_cities =
        this.$store.state.typo3.page.sg_page.sg_meta.menu_footer_cities;
    } else if (
      this.$store.state.typo3custom.page &&
      this.$store.state.typo3custom.page.sg_page
    ) {
      this.footer_cities =
        this.$store.state.typo3custom.page.sg_page.sg_meta.menu_footer_cities;
    }
  },
};
</script>
