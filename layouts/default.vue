<!-- COMMIT COMMENT -->
<template>
  <div class="wrapper" v-if="this.$route.path !== '/404'">
    <div
      loading="lazy"
      :class="
        this.$route.path === '/'
          ? 'container container--bg'
          : isService(this.$route.path)
          ? 'container'
          : 'container  container--bg container--bg-small'
      "
    >
      <HeaderMain :rootPage="this.$route.path === '/'" />

      <!-- <Nuxt /> -->
      <Nuxt keep-alive :keep-alive="keepAlive" />
    </div>
    <Newsletter v-if="$route.path === '/'" />
    <ThePopup>
      <PopupPhone />
    </ThePopup>
    <div class="footer-image" style="position: relative">
      <img
        :src="backendUrl"
        alt="Teamfoto im Footer"
        class="img-fluid team-foto-footer"
        loading="lazy"
        width="100%"
        height="20"
      />
    </div>
    <Footer></Footer>

    <client-only placeholder="Loading...">
      <vue-cookie-toggler
        :cookies-groups="cookiesGroups"
        title="Warum verwenden wir Cookies und andere Tracking-Technologien?"
        settings-title="Warum verwenden wir Cookies und andere Tracking-Technologien?"
        settings-label=""
        accept-label=""
        save-label=""
        cancel-label=""
      >
        Unsere Website verwendet ein Skript (z. B. Cookies), das Informationen
        in Ihrem Browser und auf Ihrem Gerät lesen, speichern und schreiben
        kann. Die von diesem Skript verarbeiteten Informationen umfassen Daten,
        die sich auf Sie beziehen und persönliche Identifikatoren (z. B.
        IP-Adresse und Sitzungsdetails) sowie Ihre Browsing-Aktivitäten umfassen
        können. Wir verwenden diese Informationen zu verschiedenen Zwecken, z.
        B. zur Bereitstellung von Inhalten, zur Aufrechterhaltung der
        Sicherheit, zur Ermöglichung von Benutzerentscheidungen, zur
        Verbesserung unserer Websites und zu Marketingzwecken. Sie können alle
        nicht notwendigen Verarbeitungen ablehnen, indem Sie nur die notwendigen
        Cookies akzeptieren oder das Banner mit der X-Schaltfläche schließen.Um
        Ihre Wahl zu personalisieren und mehr zu erfahren, klicken Sie hier, um
        Ihre Einstellungen anzupassen.
        <template #settingsContent>
          Unsere Website verwendet ein Skript (z. B. Cookies), das Informationen
          in Ihrem Browser und auf Ihrem Gerät lesen, speichern und schreiben
          kann. Die von diesem Skript verarbeiteten Informationen umfassen
          Daten, die sich auf Sie beziehen und persönliche Identifikatoren (z.
          B. IP-Adresse und Sitzungsdetails) sowie Ihre Browsing-Aktivitäten
          umfassen können. Wir verwenden diese Informationen zu verschiedenen
          Zwecken, z. B. zur Bereitstellung von Inhalten, zur Aufrechterhaltung
          der Sicherheit, zur Ermöglichung von Benutzerentscheidungen, zur
          Verbesserung unserer Websites und zu Marketingzwecken. Sie können alle
          nicht notwendigen Verarbeitungen ablehnen, indem Sie nur die
          notwendigen Cookies akzeptieren oder das Banner mit der X-Schaltfläche
          schließen.Um Ihre Wahl zu personalisieren und mehr zu erfahren,
          klicken Sie hier, um Ihre Einstellungen anzupassen.
        </template>

        <template #mainButtons="{ accept, settings, save, cancel }">
          <button class="vct__btn vct__btn--default" @click="settings">
            Nur das Notwendige akzeptieren
          </button>
          <button class="vct__btn vct__btn--primary" @click="accept">
            Alle Cookies akzeptieren
          </button>
        </template>
        <template #settingsButtons="{ accept, settings, save, cancel }">
          <button class="vct__btn vct__btn--default" @click="accept">
            Alle Cookies akzeptieren
          </button>
          <button class="vct__btn vct__btn--primary" @click="save">
            Meine Einstellungen speichern
          </button>
        </template>
      </vue-cookie-toggler>
    </client-only>
  </div>

  <div class="wrapper" v-else>
    <Nuxt keep-alive :keep-alive="keepAlive" />
  </div>
</template>

<script>
import ThePopup from "~/components/UI/ThePopup.vue";
import HeaderMain from "~/components/HeaderMain.vue";
import PopupPhone from "~/components/PopupPhone.vue";
import Footer from "~/components/Footer.vue";
//import CookieLaw from "vue-cookie-law";
import ClientOnly from "vue-client-only";
//import VueCookieToggler from 'vue-cookie-toggler';
import { initializeGoogleAnalytics } from "~/utils/GoogleAnalytics";
import Newsletter from "~/components/Newsletter.vue";
export default {
  components: {
    ThePopup,
    HeaderMain,
    PopupPhone,
    Footer,
    ClientOnly,
    Newsletter,
    [process.client && "VueCookieToggler"]: () => import("vue-cookie-toggler"),
  },
  data() {
    return {
      popupVisible: false,
      keepAlive: this.$store.state.counter.keepAlive,
      backendUrl:
        "https://be.staging.zir.bogatyrev.de/typo3conf/ext/sg_sitepackage/Resources/Public/Assets/Images/team-footer.webp",
      //backendUrl: process.env.BACKEND_HOST+"typo3conf/ext/sg_sitepackage/Resources/Public/Assets/Images/team-footer.webp",
      cookiesGroups: [
        {
          category: "essential",
          name: "Unbedingt erforderliche Cookies",
          description:
            "Diese Cookies sind zur Funktion der Website erforderlich und können in Ihren Systemen nicht deaktiviert werden. In der Regel werden diese Cookies nur als Reaktion auf von Ihnen getätigte Aktionen gesetzt, die einer Dienstanforderung entsprechen, wie etwa dem Festlegen Ihrer Datenschutzeinstellungen, dem Anmelden oder dem Ausfüllen von Formularen. Sie können Ihren Browser so einstellen, dass diese Cookies blockiert oder Sie über diese Cookies benachrichtigt werden. Einige Bereiche der Website funktionieren dann aber nicht. Diese Cookies speichern keine personenbezogenen Daten.",
          active: true,
          required: true,
        },
        {
          category: "analytics",
          name: "Analytics and Leistungs-Cookies",
          description:
            "Diese Cookies ermöglichen es uns, Besuche und Verkehrsquellen zu zählen, damit wir die Leistung unserer Website messen und verbessern können. Sie unterstützen uns bei der Beantwortung der Fragen, welche Seiten am beliebtesten sind, welche am wenigsten genutzt werden und wie sich Besucher auf der Website bewegen. Alle von diesen Cookies erfassten Informationen werden aggregiert und sind deshalb anonym. Wenn Sie diese Cookies nicht zulassen, können wir nicht wissen, wann Sie unsere Website besucht haben.",
          active: false,
        },
      ],
    };
  },
  updated() {
    document.body.scrollTop = 0;
  },
  // mounted() {
  //   initializeGoogleAnalytics();
  // },
  async beforeMount() {
    initializeGoogleAnalytics();
  },
  // watch to reload Nuxt cache
  watch: {
    "$store.state.counter.keepAlive": function (newCity, oldCity) {
      this.keepAlive = newCity;
      setTimeout(() => {
        this.$store.commit("counter/changeKeepAlive", true);
      }, 0);
    },
  },
  methods: {
    isService(_url) {
      let res = _url.match(new RegExp("/monteurzimmer/([^/]+)"));
      return res !== null;
    },
  },
};
</script>
