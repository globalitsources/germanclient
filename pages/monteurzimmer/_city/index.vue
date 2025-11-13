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
      link: [
        {
          rel: "canonical",
          href:
            "https://zimmer-im-revier.de/monteurzimmer/" +
            this.city.toLowerCase() +
            "/",
        },
      ],
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
    if (this.$route.params.city) {
      let city = replaceTranslit(this.$route.params.city).toLowerCase();
      //console.log(city);
      await axios({
        method: "GET",
        url: `https://be.staging.zir.bogatyrev.de/monteurzimmer/${city}`,
        withCredentials: false,
      })
        .then(async (res) => {
          let _obj = res.data;
          await axios({
            method: "GET",
            url: `https://api.slave.zimmer-im-revier.de/geo/?query=${city}`,
            withCredentials: false,
          }).then((d) => {
            let _data = {};

            if (d.data.data[0]) {
              _data["ort"] = d.data.data[0]["name"]
                ? d.data.data[0]["name"]
                : city;
              _data["latitude"] = d.data.data[0]["lat"];
              _data["longitude"] = d.data.data[0]["lon"];
            } else {
              this.$nuxt.error({ statusCode: 404 });

              // this.$router.replace("/404");
              //_data['latitude'] = 0;
              //_data['longitude'] = 0;
            }
            //   let __obj = {
            //       appearance: {
            //           layout: "default",
            //           frameClass: "default",
            //           spaceBefore: "",
            //           spaceAfter: ""
            //       },
            //       content: {
            //           pi_flexform: {
            //               settings: {
            //                   showFilter: "1",
            //                   showAllCitiesAndDistricts: "0",
            //                   showMap: "0",
            //                   filter: _data
            //               }
            //           }
            //       }
            //   }
            //   _obj['content']['colPos0'] = [];
            //   _obj['content']['colPos0'].push(__obj);
            //
            // this.setPage(_obj);

            // console.log('city: ', city);
            // if(city === '') {
            //  res.data.content.colPos0 = res.data.content.colPos0.filter(el => el.type !== 'shortcut');
            // }

            for (let i = 0; i < res.data.content.colPos0.length; i++) {
              //console.log('----------------');
              //console.log(res.data.content.colPos0[i].type);
              //console.log('----------------');

              if ("zirestaterealty_city" === res.data.content.colPos0[i].type) {
                res.data.content.colPos0[
                  i
                ].content.pi_flexform.settings.showFilter = "1";
                res.data.content.colPos0[
                  i
                ].content.pi_flexform.settings.showAllCitiesAndDistricts = "0";
                res.data.content.colPos0[
                  i
                ].content.pi_flexform.settings.showMap = "0";
                res.data.content.colPos0[
                  i
                ].content.pi_flexform.settings.filter = _data;
              }

              // if ('zirestaterealty_citytext' === res.data.content.colPos0[i].type) {
              //   res.data.content.colPos0[i].content.text = res.data.zirestaterealty_citytext.data.text;
              // }
            }
            //res.data.content.colPos0[0].content.pi_flexform.settings.filter = _data;

            this.setPage(res.data);

            if (Object.keys(this.routeQuery).length > 0) {
              this.updateSearchUrl();
            } else {
              // const geoData =
              // 		res.data.content.colPos0[0].content.pi_flexform.settings.filter;
              // this.setDataFromTypo3(geoData);
              this.setDataFromTypo3(_data);
            }
            //console.log('geoData:', geoData);
          });
          // .catch((e) => {
          //     this.setPage(e.response.data);
          //     if (Object.keys(this.routeQuery).length > 0) {
          //         this.updateSearchUrl();
          //     }
          //     console.log("error");
          //     this.$router.replace("/404");
          // })
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

          // console.log('options', options);
          // load realty list
          await getRealtyAll(options).then((res) => {
            if (res.data.data && res.data.data.length > 0) {
              //console.log('oooookkkkkk', res.data.data.length);
              this.pagination(res.data.data.length);
            }
            this.$store.commit("counter/changeRealtyList", res.data.data);
            this.$store.commit("counter/changeLastUpdate", res.data.update);
          });
        });
    }
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
      //console.log('this.$route.params.city: ', this.$route.params.city);
      if (this.$route.params.city) {
        const cityFromUrl = replaceTranslit(
          this.$route.params.city
        ).toLowerCase();
        const city =
          cityFromUrl !== null
            ? cityFromUrl.includes("_")
              ? cityFromUrl
                  .split("_")
                  .map((item) => item[0].toUpperCase() + item.slice(1))
                  .concat(" ")
              : cityFromUrl.charAt(0).toUpperCase() + cityFromUrl.slice(1)
            : "";

        if (queryParams.has("lat")) {
          this.latitude = queryParams.get("lat");
        }
        if (queryParams.has("lng")) {
          this.longitude = queryParams.get("lng");
        }

        this.radius = 20;
        if (queryParams.has("radius")) {
          this.radius = queryParams.get("radius") || "20";
        }

        this.max_persons = "0";
        if (queryParams.has("min_persons")) {
          this.max_persons = queryParams.get("min_persons") || "0";
        }
        this.min_persons = "0";
        if (queryParams.has("min_persons")) {
          this.min_persons = queryParams.get("max_persons") || "0";
        }

        if (!this.latitude && !this.longitude) {
          window.location = "/monteurzimmer/" + city.toLowerCase();
        }

        this.setStore({
          city: city,
          latitude: this.latitude,
          longitude: this.longitude,
          radius: this.radius,
          max_persons: this.max_persons,
          min_persons: this.min_persons,
        });
      }
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
