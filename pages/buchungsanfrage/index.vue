<template lang="">
  <div>


    <div
      class="banner"
      v-if="this.bannerImage"
      :style="`background: url(${this.bannerImage}) no-repeat; background-size: cover, 0 0;background-position: center, center`"
    ></div>


    <div class="frame">
      <div class="form__heading">
        <h1>Ihre Buchungsanfrage</h1>
        <p>
          Anfragen sind natürlich kostenlos und unverbindlich. Gerne
          unterstützen wir Sie bei der Suche nach Unterkünften.
        </p>
      </div>

      <form
        class="form"
        enctype="multipart/form-data"
        method="post"
        id="anfrage_221"
        action="/buchungsanfrage/?tx_form_formframework%5Baction%5D=perform&amp;tx_form_formframework%5Bcontroller%5D=FormFrontend&amp;cHash=e063152061c77dcdcc22b31007e65c9c#anfrage-221"
        @submit.prevent="clickForm()"
      >
        <!-- <h2 class="align--left">Ihre Buchungsanfrage</h2> -->
        <FormComponent
          v-for="(formItem, index) in data"
          :key="index"
          v-bind:formItem="formItem"
        />
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import getForm from "~/utils/getForm";
import postForm from "~/utils/postForm";
import FormComponent from "@/components/apiContent/formComponent.vue";

export default {
  	name: "Buchungsanfrage",
  	components: {
    		FormComponent,
  	},
  	data() {
        // console.log('this.$store.state.item.item: ', this.$store.state.item.item);
        // console.log('this.$store.state.item: ', this.$store.state.item);
    		return {
      			data: null,
      			bannerImage: null,
      			city: this.$store.state.counter.search.city,
            itemId: this.$store.state.item.itemId !== '' ? this.$store.state.item.itemId : '',
    		};
  	},
  	async mounted() {
    		await getForm("https://api.slave.zimmer-im-revier.de/form").then((res) => {
      			this.data = res.data.data[0].fields;
			      //console.log(this.data);
    		});
    		await axios({
      			method: "GET",
            // headers: {
            //   'Content-Type': 'application/json;charset=UTF-8',
            //   'Access-Control-Allow-Origin': '*' // Could work and fix the previous problem, but not in all APIs
            // },
      			url: `https://be.staging.zir.bogatyrev.de/buchungsanfrage/`,
    		}).then((res) => {
      			this.bannerImage =
        			res.data.content.colPos10[0].content.tx_sg_sitepackage_images[0].publicUrl;
    		});
  	},
  	async fetch() {
    		await axios({
      			method: "GET",
            // headers: {
            //   'Content-Type': 'application/json;charset=UTF-8',
            //   'Access-Control-Allow-Origin': '*' // Could work and fix the previous problem, but not in all APIs
            // },
      			url: `https://be.staging.zir.bogatyrev.de/buchungsanfrage/`,
    		})
      		.then((res) => {
        		if (res.data) {
         			this.$store.commit("typo3custom/setPage", res.data);
          			this.t3page = res.data;
        		}
      		})
      		.catch(() => {
        		console.log("error");
        		// this.$router.replace("/404");
      		});
  	},
  	methods: {
    		clickForm() {
            let formFieldsData = new FormData(anfrage_221);
      			formFieldsData.append("forms_id", "2");
            if(formFieldsData.has('date')) {
                formFieldsData.delete('date');
            }
            if(formFieldsData.has('f24')) {
                formFieldsData.set('f24', this.itemId);
            }
            // for (let key of formFieldsData.entries()) {
            //   console.log(key[0] + ', ' + key[1]);
            // }
            postForm("https://api.slave.zimmer-im-revier.de/form", formFieldsData).then(
        			(res) => {
          				if (res.data.msg === "ok") {
            					this.$router.push({
              						path: "/buchungsanfrage/vielen-dank-fuer-ihre-anfrage",
            					});
          				}
        			}
      			);
    		},
  	},
};
</script>
