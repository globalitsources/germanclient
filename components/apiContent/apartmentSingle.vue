<template lang="">
    <div>


	<div class="hl"><a href="javascript: history.back();"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg></a></div>



        <div class="frame flat" v-if="this.realty">







            <div class="flat__images" style="float:left;width:100%;height:600px;">

<div v-if="isMobile" class="flat-item__image">
            <TheSwiper>
              <div class="swiper-slide" v-for="(img, index) in this.realty.images" :key="index" :id="`slide-${index}`">
                <img
                  draggable="false"
                  :src="`https://storage.slave.zimmer-im-revier.de/cwh/460x460${img}`"
                  :alt="`${realty.city} monteurzimmer: ${realty.title}`" loading="lazy"
                />
              </div>
            </TheSwiper>
          </div>
          <div v-else class="flat-item__image">


                 <ThePreSlider v-if="this.realty.images" :infinite="true">
                      <div
                          class="flat__slide fill"
                          v-for="(img, index) in this.realty.images"
                          :key="index"

                      >
                          <picture>
                            <source media="(max-width:650px)" :srcset="`https://storage.slave.zimmer-im-revier.de/cwh/460x460${img}`">
                            <img
                            draggable="false"
                            :src="`https://storage.slave.zimmer-im-revier.de/cwh/750x405${img}`"
                            :alt="`${realty.city} monteurzimmer: ${realty.Title}`"
                          />
                          </picture>
                      </div>
                  </ThePreSlider>

		</div>



            </div>






            <ul class="flat__breadscrumbs" style="clear:both;">
                <li class="flat__breadscrumb">
                  <NuxtLink to="/">Zimmer im Revier</NuxtLink>
                </li>
                <li class="flat__breadscrumb">
                  <NuxtLink to="/monteurzimmer/">Monteurzimmer</NuxtLink>
                </li>
                <li class="flat__breadscrumb">
                  <NuxtLink
                    :to="`/monteurzimmer/${this.getCityTranslation(realty.city)}`"
                    >{{ realty.city }}</NuxtLink
                  >
                </li>
            </ul>
            <div>
                <h1 class="flat__title">
                    Monteurzimmer in {{ realty.district_code }} {{ realty.city
                    }}<br />{{ realty.street_name }}
                </h1>

                <h2 class="h4--red flat__subtitle tr-title" v-if="realty.distance">
                    <span class="js-sg-estate-base-distance-value">{{parseFloat(realty.distance).toFixed(2)?.replace(".", ",")}} km</span> Entfernung zur Baustelle
                </h2>

            </div>
            <div class="flat__container">
                <div class="flat__map-wrapper">
                    <div class="flat__map" id="map"></div>
                    <div class="flat__map-info" data-show-info-window="true">
                        <div>
                            <template v-if="realty.Content">
                                <!-- p class="h2 text-left text-primary font-weight-bold" -->
		                            <p class="h3--red">
                                      In Kürze
                                </p>
                                <p v-html="realty.Content"></p>
		                            <br/>
                            </template>
                            <template v-if="realty.Objektbeschreibung">
                                <p class="h3--red">Objektbeschreibung</p>
		                            <p>{{realty.Objektbeschreibung | strippedContent}}</p>
                            </template>
                        </div>
                    </div>
                    <div class="flat__garanties">
                        <h4 class="h4--red">Hier gilt:</h4>
                        <div class="flat__garanties-wrapper">
                            <template v-if="realty.stabu == 0">
                                <h3>
                                  <NuxtLink to="/blog/oco-garantie-ein-anruf-reicht/"
                                    >OCO Garantie®</NuxtLink
                                  >
                                </h3>
                                <h3>
                                  <NuxtLink to="/blog/bleibegarantie-fuer-monteurzimmer/"
                                    >Bleibe Garantie®</NuxtLink
                                  >
                                </h3>
                                <h3>
                                  <NuxtLink
                                    to="/blog/flexibilitaetsgarantie-richtige-monteurzimmer/"
                                    >Flexibilitäts­garantie</NuxtLink
                                  >
                                </h3>
                            </template>
                            <template v-else>
                                <h3 class="h3">
                                    <NuxtLink to="/blog/oco-garantie-ein-anruf-reicht/">OCO Garantie®</NuxtLink>
                                </h3>
                            </template>
                        </div>
                    </div>
                    <template v-if="realty.YouTube">
                        <iframe
                            class="embed-video"
                            :src="`https://www.youtube-nocookie.com/embed/${realty.YouTube}`"
                        ></iframe>
                    </template>
                </div>
                <div class="flat__info">
                    <div class="flat__info-buttons">
                        <button
                          type="button"
                          class="btn btn-block btn-outline-secondary js-open-phone-modal mb-5"
                          @click="this.openModal"
                        >
                            <i class="fas fa-phone"></i>
                            Anfrage per Telefon
                        </button>
                        <NuxtLink
                            class="btn btn-block btn-outline-secondary"
                            to="/buchungsanfrage"
                        >
                            <i class="fas fa-envelope"></i>
                            Anfrage per Mail
                        </NuxtLink>
                    </div>
                    <p class="flat__info-highlight">
                        <template
                          v-if="
                            realty.people_from > 0 ||
                            realty.people_to > 0
                          "
                        >
                            <template v-if="realty.people_from == realty.people_to">
                              {{ realty.people_from }} Person
                            </template>
                            <template
                              v-else-if="
                                realty.people_from > 0 &&
                                realty.people_to > 0
                              "
                            >
                              {{ realty.people_from }} -
                              {{ realty.people_to }} Personen
                            </template>
                            <template v-else>
                                <template v-if="realty.people_from == 0">
                                  {{ realty.people_to }} Person
                                </template>
                                <template v-else>
                                  {{ realty.people_from }} Personen
                                </template>
                            </template>
                            <br />
                        </template>
                        <template v-if="realty.size > 0">
                          <template>{{ realty.size }}</template> m<sup>2</sup><br />
                        </template>
                        <template v-if="realty.rooms > 0">
                            {{ parseFloat(realty.rooms).toFixed(0) }} Zimmer
                            <br />
                        </template>
                        <template v-if="realty.beds_single > 0">
              	            {{ realty.beds_single }}
                             <template v-if="realty.people_from.lenght == 1">
                                Einzelbett
                             </template>
                            <template v-else>
                                Einzelbetten
                            </template>
                            <br />
                        </template>
                        <template v-if="realty.beds_double > 0">
                            {{ realty.beds_double }}
                             <template v-if="realty.beds_double.lenght == 1">
                                  Doppelbet
                             </template>
                            <template v-else>
                                  Doppelbeten
                            </template>
                            <br />
                        </template>
                        <template v-if="realty.beds_couch > 0">
             	              {{ realty.beds_couch }}
		                        <template v-if="realty.beds_couch.lenght == 1">
                                Sofa
                            </template>
                            <template v-else>
                                Sofas
                            </template>
                            <br />
                        </template>
                    </p>
                    <hr />
                    <template v-if="realty.Eigenschaften && realty.Eigenschaften.length > 0">
                        <div class="flat__detail">
                            <ul>
                                  <li
                                    :title="icon"
                                    class="services__icon"
                                    v-for="(title, index) in realty.Eigenschaften"
                                    :key="index"
                                  >
                                      {{title}}
                                  </li>
                            </ul>
                        </div>
                        <hr />
                    </template>
                    <div class="flat__price">
                        <h3 class="h3--red">Preise</h3>
                        <p v-show="realty.stabu == 0" class="flat__info-highlight">
                            ab
                            {{ parseFloat(realty.price_to).toFixed(2)?.replace(".", ",")
                            }}<span v-if="realty.price_from > 0"
                              >&nbsp;–&nbsp;{{
                                parseFloat(realty.price_from).toFixed(2)?.replace(".", ",")
                              }}</span
                        >
                            €
                        </p>
                        <p v-show="realty.stabu == 1" class="flat__info-highlight">
                            auf Anfrage
                        </p>
                    </div>
                    <div class="flat__info-conditions">
                        <strong>Unsere Preise sind abhängig von:</strong>
                        <ul>
                            <li>Personenanzahl + Buchungsdauer</li>
                            <li>Aufpreis für EZ/Messe/Kurzaufenthalt</li>
                        </ul>
                    </div>
                    <template v-if="realty.stabu == 0">
                        <div class="flat__info-conditions">
                            <strong>Im Preis enthalten:</strong>
                            <ul>
                              <li>Bettwäsche + Handtücher</li>
                              <li>Endreinigung + Nebenkosten</li>
                            </ul>
                        </div>
                    </template>
                    <hr />
                    <div class="flat__schedule">
                        <p class="h3--red">Bürozeiten</p>
                        <p class="flat__schedule-info">
                            Mo – Fr: 08:00 – 20:00<br />Sa + So: 10:00 – 18:00
                        </p>
                    </div>
                </div>
            </div>
            <template v-if="realty.related && realty.related.length > 0">
                <br/>
                <div>
                    <strong class="tr-title">Weitere Unterkünfte in der Nähe ({{ realty.related.length }})</strong>
                    <div class="q1 flat-list frame">
                        <item
                            v-for="(flat, index) in realty.related"
                            :key="index"
                            v-bind:flat="flat"
                        />
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import getRealtySingle from "@/utils/getRealtySingle.ts";
import { replaceTranslit, loadMapLibrary } from "~/service/helpers/helpers";
import TheSwiper from "~/components/UI/TheSwiper.vue";

function isMobileDevice() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

export default {
  	ssr: true,
  	name: "apartmentSingle",
	components: {TheSwiper},
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
      			realty: {},
      			loading: true,
      			latitude: this.$store.state.counter.search.latitude,
      			longitude: this.$store.state.counter.search.longitude,
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
			isMobile: isMobileDevice(),
    		};
  	},
  	props: {
    		lat: {
      			type: Number,
    		},
    		lng: {
      			type: Number,
    		},
  	},
  	async fetch() {
    		let responseData = await getRealtySingle(
      			"https://api.slave.zimmer-im-revier.de/realty/",
      			this.$route.params.id,
			      this.latitude,
			      this.longitude
    		);


        if(responseData.data.msg === 'ko') {
          //this.$router.replace("/404");

		this.$nuxt.error({statusCode: 404});

        }

    		this.realty = responseData.data.data;
        //console.log('this.realty.Artikel_Nr: ', this.realty.Artikel_Nr);
        // set for "Anfrage"
        this.$store.commit("item/changeItem", this.realty.Artikel_Nr);
    		this.title = `Monteurzimmer in ${this.realty.district_code} ${this.realty.city} (${this.realty.Title})`;
    		this.description = this.realty.Content;
    		this.ogTitle = `Monteurzimmer in ${this.realty.district_code} ${this.realty.city} (${this.realty.Title})`;
    		this.ogDescription = this.realty.Content;
    		this.ogImageUrl = this.realty?.images[0];
    		this.twitterTitle = `Monteurzimmer in ${this.realty.district_code} ${this.realty.city} (${this.realty.Title})`;
    		this.twitterDescription = this.realty.objektbeschreibung;
    		this.twitterImage = this.realty?.images[0];
    		this.loading = false;
  	},
  	watch: {
    		realty(newRealty) {
      			if (!this.loading) {
        			  loadMapLibrary().then(() => this.initMap());
      			}
    		},
  	},
	  filters: {
    		strippedContent: function(string) {
            let uni =  string.replace(/<\/?[^>]+>/ig, " ");
            return uni
                .replaceAll('&auml;', "ä")
                .replaceAll('&ouml;', "ö")
                .replaceAll('&uuml;', "ü")
                .replaceAll('&Auml;', "Ä")
                .replaceAll('&Ouml;', "Ö")
                .replaceAll('&Uuml;', "Ü")
                .replaceAll('&szlig;', "ß")
                .replaceAll('&ndash;', "-")
                .replaceAll('&mdash;', "-")
                .replaceAll('&nbsp;', " ")
                .replaceAll('&sup2;', "²")
                .replaceAll('&bdquo;', '"')
                .replaceAll('&ldquo;', '"');
    		 }
	  },
  	methods: {
    		initMap() {
      			const hoverMarkerImagePath =
        			  "https://be.staging.zir.bogatyrev.de/typo3conf/ext/sg_sitepackage/Resources/Public/Assets/Images/gmaps-marker-selected-big.png";
      			const centerMarkerImagePath =
        			  "https://be.staging.zir.bogatyrev.de/typo3conf/ext/sg_sitepackage/Resources/Public/Assets/Images/gmaps-marker-center.png";
      			let center = null;
      			const flatPosiion = new google.maps.LatLng(
        			  parseFloat(this.realty.latitude),
        			  parseFloat(this.realty.longitude)
      			);
            if (this.latitude && this.longitude) {
                    center = new google.maps.LatLng(
                        parseFloat(this.latitude),
                        parseFloat(this.longitude)
                    );
            }
            const bounds = new google.maps.LatLngBounds();
            bounds.extend(flatPosiion);
            if (flatPosiion && center) {
    				    bounds.extend(center);
                const markers = [
                    {
                        position: center,
                        url: centerMarkerImagePath,
                        size: new google.maps.Size(48, 48),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(0, 48),
                        infowindow: this.realty.objektbeschreibung,
                    },
                    {
                        position: flatPosiion,
                        url: hoverMarkerImagePath,
                        size: new google.maps.Size(48, 48),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(0, 48),
                        infowindow: this.realty.objekt_ort,
                    },
                ];
                const map = new google.maps.Map(document.getElementById("map"), {
                    center: center,
                    mapTypeControl: false,
                    fullscreenControl: false,
                    showInfoWindow: true,
                });
                markers.map((marker) => {
                    new google.maps.Marker({
                        position: marker.position,
                        icon: marker.url,
                        map: map,
                        infowindow: marker.infowindow,
                    });
                    map.fitBounds(bounds);
                });
      			} else {
        			  const map = new google.maps.Map(document.getElementById("map"), {
                    center: flatPosiion,
                    zoom: 14,
                    mapTypeControl: false,
                    fullscreenControl: false,
                    showInfoWindow: true,
                });
                const marker = {
                    position: flatPosiion,
                    url: hoverMarkerImagePath,
                    size: new google.maps.Size(48, 48),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(0, 48),
                    infowindow: this.realty.city,
                };
                new google.maps.Marker({
                    position: marker.position,
                    icon: marker.url,
                    map: map,
                    infowindow: marker.infowindow,
                });
        			// map.fitBounds(bounds);
            }
    		},
    		getCityTranslation(string) {
      			if (string) {
        			  return replaceTranslit(string).toLowerCase();
      			}
    		},
    		openModal() {
      			this.$store.commit("counter/changePopupOpen", true);
    		},
    		setHeadMeta() {},
  	},
  	head() {
    		return {
      			title: this.title,
			link: [
              			{
                			rel: 'canonical',
                			href: 'https://zimmer-im-revier.de/monteurzimmer/' + this.realty.city + '/' + this.realty.Artikel_Nr,
              			}
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
          				content: this.robots.noIndex && this.robots.noFollow
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
};
</script>
