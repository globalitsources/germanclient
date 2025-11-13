<template lang="">
  <div class="frame flat">
    <client-only placeholder="loading...">
	    <template lang="">
        <t3-dynamic
          :data="t3page.content"
          :type="t3page.appearance.backendLayout"
          layout
        />
      </template>
      <apartmentSingle />
	  </client-only>
  </div>
</template>

<script>
import axios from "axios";
import apartmentSingle from "~/components/apiContent/apartmentSingle.vue";

export default {
  	name: "pageApartment",
  	extends: [apartmentSingle],
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
    		};
  	},
  	async fetch() {
    		await axios({
      			method: "GET",
      			url: `https://be.staging.zir.bogatyrev.de/monteurzimmer/single`,
    		}).then((res) => {
			if (res.data) {
        			this.$store.commit("typo3custom/setPage", res.data);
        			this.t3page = res.data;
      			}
   		});
  	},
};
</script>
