<template>
  <t3-dynamic
    :data="t3page.content"
    :type="t3page.appearance.backendLayout"
    layout
  />
</template>
<script>
import axios from "axios";
import { replaceTranslit } from "~/service/helpers/helpers";
import getDictionary from "~/utils/getDictionary";
import getRealtyAll from "~/utils/getRealtyAll";

export default {
  name: "pageCity",
  data() {
    return {
      t3page: {
        appearance: {
          backendLayout: "default",
        },
        content: {
          colPos0: [],
        },
      },
      //
      routeQuery: this.$route.query,
      realtyAll: this.$store.state.counter.realtyList,
      city: this.$store.state.counter.search.city,
      latitude: this.$store.state.counter.search.latitude,
      longitude: this.$store.state.counter.search.longitude,
      radius: this.$store.state.counter.search.radius,
      min_persons: this.$store.state.counter.search.min_persons,
      max_persons: this.$store.state.counter.search.max_persons,
      //
      title: "",
      description: "",
      ogTitle: "",
      ogDescription: "",
      ogImageUrl: "",
      ogImageWidth: "",
      ogImageHeight: "",
      twitterTitle: "",
      twitterDescription: "",
      twitterCard: "",
      twitterImage: "",
      robots: {
        noIndex: "",
        noFollow: "",
      },
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.description ? this.description : "",
        },
        {
          hid: "robots",
          name: "robots",
          content:
            this.robots.noIndex && this.robots.noFollow
              ? `${this.robots.noFollow},${this.robots.noFollow}`
              : "index, follow",
        },
        {
          hid: "og:title",
          name: "og:title",
          content: this.ogTitle ? this.ogTitle : "",
        },
        {
          hid: "og:description",
          name: "og:description",
          content: this.ogDescription ? this.ogDescription : "",
        },
        {
          hid: "og:image",
          name: "og:image",
          content: this.ogImageUrl ? this.ogImageUrl : "",
        },
        {
          hid: "og:image:url",
          name: "og:image:url",
          content: this.ogImageUrl ? this.ogImageUrl : "",
        },
        {
          hid: "og:image:width",
          name: "og:image:width",
          content: this.ogImageWidth ? this.ogImageWidth : "",
        },
        {
          hid: "og:image:height",
          name: "og:image:height",
          content: this.ogImageHeight ? this.ogImageHeight : "",
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.twitterTitle ? this.twitterTitle : "",
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.twitterDescription ? this.twitterDescription : "",
        },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: this.twitterCard ? this.twitterCard : "",
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: this.twitterImage ? this.twitterImage : "",
        },
      ],
    };
  },
  async fetch() {
    //console.log(this.$route.params.city);

    let city = replaceTranslit(this.$route.params.city).toLowerCase();

    //console.log(city);

    await axios({
      method: "GET",
      url: `https://typo3.ddev.site/monteurzimmer/${city}`,
      withCredentials: false,
    })
      .then((res) => {
        if (res.data) {
          //console.log('res.data: ', res.data);

          this.setPage(res.data);

          //console.log('keys: ', Object.keys(this.routeQuery));

          if (Object.keys(this.routeQuery).length > 0) {
            this.updateSearchUrl();
          } else {
            const geoData =
              res.data.content.colPos0[0].content.pi_flexform.settings.filter;
            this.setDataFromTypo3(geoData);
          }

          //console.log('geoData:', geoData);
        }
      })
      .catch((e) => {
        this.setPage(e.response.data);
        if (Object.keys(this.routeQuery).length > 0) {
          this.updateSearchUrl();
        }
        console.log("error");
        this.$router.replace("/404");
      })
      .finally(async () => {
        this.setMetaData();
        const options = {
          lat: this.latitude,
          lng: this.longitude,
          radius: this.radius,
          max_persons: this.max_persons,
          min_persons: this.min_persons,
        };
        // load realty list
        await getRealtyAll(options).then((res) => {
          if (res.data.data && res.data.data.length > 0) {
            this.pagination(res.data.data.length);
          }
          this.$store.commit("counter/changeRealtyList", res.data.data);
          this.$store.commit("counter/changeLastUpdate", res.data.update);
        });
      });
  },
  methods: {
    setPage(pageData) {
      this.t3page = pageData;
      this.$store.commit("typo3custom/setPage", pageData);
    },
    updateSearchUrl() {
      const queryParams = new URLSearchParams(this.routeQuery);
      // console.log('queryParams: ', queryParams);
      // const cityFromUrl = this.$route.params.city.includes('/') ? this.$route.params.city.replace('/', '_')  : this.$route.params.city
      const cityFromUrl = replaceTranslit(
        this.$route.params.city
      ).toLowerCase();
      const latitude = queryParams.get("lat");
      const longitude = queryParams.get("lng");
      const city = cityFromUrl.includes("_")
        ? cityFromUrl
            .split("_")
            .map((item) => item[0].toUpperCase() + item.slice(1))
            .concat(" ")
        : cityFromUrl.charAt(0).toUpperCase() + cityFromUrl.slice(1);
      const radius = queryParams.get("radius") || "50";
      const min_persons = queryParams.get("min_persons") || "0";
      const max_persons = queryParams.get("max_persons") || "0";
      this.latitude = latitude;
      this.longitude = longitude;
      this.radius = radius;
      this.max_persons = max_persons;
      this.min_persons = min_persons;
      // console.log('this.latitude: ', this.latitude);
      this.setStore({
        city: city,
        latitude: latitude,
        longitude: longitude,
        radius: radius,
        max_persons: max_persons,
        min_persons: min_persons,
      });
    },
    setDataFromTypo3(cmsData) {
      this.city = cmsData.ort
        ? cmsData.ort
        : this.$store.state.counter.search.city;
      this.latitude = cmsData.latitude;
      this.longitude = cmsData.longitude;
      this.$store.commit("counter/changeSearchedPlace", cmsData.ort);
      this.setStore({
        city: this.city,
        latitude: this.latitude,
        longitude: this.longitude,
        radius: this.radius,
        max_persons: this.max_persons,
        min_persons: this.min_persons,
      });
    },
    setStore(data) {
      this.$store.commit("counter/increment", {
        city: data.city,
        latitude: data.latitude,
        longitude: data.longitude,
        radius: data.radius,
        min_persons: data.min_persons,
        max_persons: data.max_persons,
      });
    },
    setMetaData() {
      if (this.t3page) {
        this.title = this.t3page.meta.title;
        this.description = this.t3page.meta.description;
        this.robots.noIndex = this.robots.noIndex ? "noIndex" : "index";
        this.robots.noFollow = this.robots.noFollow ? "noFollow" : "follow";
        this.ogTitle = this.t3page.meta.ogTitle;
        this.ogDescription = this.t3page.meta.ogDescription;
        this.ogImageUrl = this.t3page.meta.ogImage?.publicUrl;
        this.ogImageWidth =
          this.t3page.meta.ogImage?.properties?.dimensions?.width;
        this.ogImageHeight =
          this.t3page.meta.ogImage?.properties?.dimensions?.height;
        this.twitterTitle = this.t3page.meta.twitterTitle;
        this.twitterDescription = this.t3page.meta.twitterDescription;
        this.twitterCard = this.t3page.meta.twitterCard;
        this.twitterImage = this.t3page.meta.twitterImage?.publicUrl;
      }
    },
    pagination(totalLenght) {
      if (totalLenght > 0) {
        const totalPagesCount = Math.ceil(totalLenght / 10);
        this.$store.commit("counter/changeTotalPages", totalPagesCount);
      } else {
        this.totalPages = 0;
      }
    },
  },
};
</script>
