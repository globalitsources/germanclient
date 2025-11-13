<template lang="">

    	<div v-if="contentpane.length > 0 && this.$route.path !== '/monteurzimmer/'" class="frame-space-before-large frame-space-after-medium">




        	<!-- T3CeRenderer -->
        	<div class="frame-inner">



<!--
<t3-ce-sg-sitepackage-accordion >
-->



            		<div class="t3-ce-accordion accordion sg-accordion">
				<header>
                    			<h2 class="">Häufig gestellte Fragen zu unseren Monteurzimmern (FAQs)</h2>
                		</header>
  


    <TheAccordion
      v-for="(text, index) in contentpane"
      :key="`collape${index}`"
      :title="updateContent(text.title)"
    >
      <!-- {{ console.log("text", text) }} -->
      <div class="card-body">
        <t3-html-parser :content="updateContent(text.content)" />
      </div>
    </TheAccordion>


<!--
              		<div class="card" v-for="(text, index) in contentpane" :key="index">
                    			<div class="card-header collapsed" :id="`header${index}`" data-toggle="collapse" :data-target="`#collapse${index}`">
                        			{{updateContent(text.title)}}
                    			</div>
             				<div class="collapse" :id="`collapse${index}`">
                        			<div class="card-body">
                        				<t3-html-parser :content="updateContent(text.content)" />
                        			</div>
                    			</div>
                		</div>
-->

<!-- 
               {{this._props.content[0].content}}
                {{this._props}}
                <t3-dynamic
                    :data="this._props.content[0].content"
                    type="default"
                    layout
                />
-->
            		</div>





        	</div>
<!--
        <t3-dynamic
            :data="content[0].content"
            :type="content[0].appearance.backendLayout"
            layout
        />
-->
    	</div>
</template>
<script>
// import T3Dynamic from "/node_modules/nuxt-typo3/lib/components/T3Dynamic/T3Dynamic"
import axios from "axios";

export default {
    	name: 'T3CeRenderer',
    	//components: {
        //	T3Dynamic,
    	//},
	data() {
		
		//console.log(' ------ renderer seaking ----------- ');
		//console.log('this.content: ', this.content);		

		var contentpane = [];
		if (
			this.content
			&& this.content[0]
			&& this.content[0].content
			&& this.content[0].content.tx_sg_sitepackage_relation_contentpane
		) {
			contentpane = this.content[0].content.tx_sg_sitepackage_relation_contentpane
		}
		// console.log('this.content[0].content: ', this.content[0].content);
		return {
			contentpane: contentpane
		}
	},
    	props: {
        	content: {
            		type: Array,
            		required: true
        	}
    	},
  	methods: {
		updateContent: function(title) {
			let ucFirst = function(string) {
				return string.charAt(0).toUpperCase() + string.slice(1);
			}
			let pathName = this.$route.path.split('/');


      if(pathName[1] === 'monteurzimmer' && pathName[2] === '') {
        //console.log('this: ', this);
        //console.dir(this.$root, { depth: 1 });

        // console.log(this.localePath);
        // console.log(this.localeRoute);
        // console.log(this.localeLocation);
       // console.log(this.$root.ssrContext);
        //console.log(this.$route.path);

      }


			if(pathName.length >= 3 && pathName[1] === 'monteurzimmer') {
				let city = this.$store.state.counter.search.city 
					? this.$store.state.counter.search.city
					: pathName[2];
				return (title.replace('###page_ph_1###', ucFirst(city)));
			}




			return (title);
	  	}
  	}
}
</script>
