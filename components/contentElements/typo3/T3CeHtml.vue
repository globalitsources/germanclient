<template functional>
  <div class="t3-ce-html">
	  <!--h1>Testing..</h1-->
    <t3-html-parser :content="props.bodytext" />
  </div>
</template>
<script>
import baseCe from '~typo3/mixins/component/baseCe'
export default {
  name: 'T3CeHtml',
  functional: true,
  extends: baseCe,
  props: {
    bodytext: {
      type: String,
      default: ''
    }
  },
  created() {
	  // console.log('mounted');
  },
  beforeMount() {

	  // console.log('beforeMount');
	  // console.log(this.bodytext);
  },
  mounted() {
	  // console.log('mounted');
	  // console.log(this.bodytext);
  }
}
</script>