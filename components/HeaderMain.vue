<template>
  <header :class="isNavbarOpened ? 'header open' : 'header'">
    <div class="header__wrapper frame">
      <NuxtLink
        to="/"
        class="header__logo"
        alt="Zimmer im Revier"
        aria-label="Zimmer im Revier - Main"
        :class="rootPage ? 'logo--white' : 'logo--red'"
      >
      </NuxtLink>
      <div :class="rootPage ? 'header__icons root' : 'header__icons'">
        <svg
          class="header__phone"
          @click="openPopup"
          width="35"
          height="30"
          viewBox="0 0 48 48"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="https://www.w3.org/2000/svg "
        >
          <use xlink:href="@/assets/images/icons/sprite.svg#phone"></use>
        </svg>

        <div
          class="header__localization"
          @click="openTranslation"
          ref="translation"
        >
          <svg
            class="header__globe"
            width="35"
            height="30"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <use xlink:href="@/assets/images/icons/sprite.svg#globe"></use>
          </svg>
          <div class="header__flags" v-if="this.localization">
            <NuxtLink to="/">
              <img
                src="@/assets/images/flags/de.png"
                data-lang="de"
                @click="changeLanguage"
              />
            </NuxtLink>
            <NuxtLink to="/en">
              <img
                src="@/assets/images/flags/en.png"
                data-lang="en"
                @click="changeLanguage"
              />
            </NuxtLink>
            <NuxtLink to="/sk">
              <img
                src="@/assets/images/flags/sk.png"
                data-lang="sk"
                @click="changeLanguage"
              />
            </NuxtLink>
          </div>
        </div>

        <div
          :class="isNavbarOpened ? 'header__menu open' : 'header__menu'"
          @click="toggleNavbar()"
        >
          <div class="header__button"></div>
        </div>
      </div>
      <Transition name="fade">
        <nav
          class="navbar"
          v-if="isNavbarOpened"
          @click="handleNavbarClick($event)"
        >
          <ul class="navbar__list frame">
            <li class="navbar__logo"></li>
            <li class="navbar__item">
              <!--              <NuxtLink-->
              <!--                class="navbar__link"-->
              <!--                :to="navigation[this.language].findRoom"-->
              <!--              >-->
              <!--                {{ translation[this.language].findRoom }}-->
              <!--              </NuxtLink>-->
              <a href="/monteurzimmer/" class="navbar__link">{{
                translation[this.language].findRoom
              }}</a>
            </li>
            <li class="navbar__item">
              <NuxtLink
                class="navbar__link"
                :to="navigation[this.language].construction"
              >
                {{ translation[this.language].construction }}
              </NuxtLink>
            </li>
            <li class="navbar__item">
              <NuxtLink
                class="navbar__link"
                :to="navigation[this.language].team"
              >
                {{ translation[this.language].team }}
              </NuxtLink>
            </li>
            <li class="navbar__item">
              <NuxtLink
                class="navbar__link"
                :to="navigation[this.language].press"
              >
                {{ translation[this.language].press }}
              </NuxtLink>
            </li>
            <li class="navbar__item">
              <NuxtLink
                class="navbar__link"
                :to="navigation[this.language].hostsInfo"
              >
                {{ translation[this.language].hostsInfo }}
              </NuxtLink>
            </li>
            <li class="navbar__item">
              <NuxtLink
                class="navbar__link"
                :to="navigation[this.language].blog"
              >
                Blog
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </Transition>
      <div class="header__underline" v-if="!rootPage"></div>
    </div>
  </header>
</template>

<script>
import TheAccordion from "./UI/TheAccordion.vue";
import {
  i18nNavigationLinks,
  i18nNavigationTranslation,
} from "~/store/i18nNavigation";
export default {
  name: "HeaderMain",
  props: {
    rootPage: {
      type: Boolean,
    },
  },
  components: { TheAccordion },
  data() {
    return {
      isNavbarOpened: false,
      language: this.$store.state.counter.language,
      localization: false,
      navigation: i18nNavigationLinks,
      translation: i18nNavigationTranslation,
    };
  },
  methods: {
    changeLanguage(e) {
      const lang = e.target.getAttribute("data-lang");
      this.$store.commit("counter/changeLanguage", lang);
      this.language = lang;
    },
    handleNavbarClick(event) {
      if (this.$route.path === event.target.getAttribute("href")) {
        this.isNavbarOpened = false;
        document.body.style.overflow = "visible";
      }
    },
    toggleNavbar() {
      this.isNavbarOpened = !this.isNavbarOpened;
      document.body.style.overflow = this.isNavbarOpened
        ? "hidden "
        : "visible";
    },
    openPopup() {
      this.$store.commit("counter/changePopupOpen", true);
    },
    openTranslation() {
      this.localization = !this.localization;
    },
    handleClickOutTranslate(e) {
      if (
        e.target !== this.$refs.translation &&
        !this.$refs.translation.contains(e.target)
      ) {
        this.localization = false;
      }
    },
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        this.isNavbarOpened = false;
        document?.body ? (document.body.style.overflow = "visible") : null;
      }
    },
  },

  mounted() {
    const textPic = document
      ?.querySelector(".t3-ce-textpic")
      ?.querySelector("img");
    if (textPic) {
      textPic.setAttribute(
        "alt",
        "Deutschlandkarte mit Buchungsregionen unser"
      );
      textPic.setAttribute("loading", "lazy");
    }
    document.addEventListener("click", this.handleClickOutTranslate);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutTranslate);
  },
};
</script>
