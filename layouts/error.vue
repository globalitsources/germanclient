<template>
  <div>

<!--    eeeee-->
    <t3-dynamic
      v-if="t3page"
      :data="t3page.content"
      :type="t3page.appearance?.backendLayout"
      layout
    />

<!--    <template v-if="t3page">-->
<!--    <t3-dynamic-->
<!--        :data="t3page.content"-->
<!--        :type="t3page.appearance.backendLayout"-->
<!--        layout-->
<!--    />-->
<!--      </template>-->

  </div>
</template>

<script>
export default {
  name: "ErrorPage",
  props: {


    error: {
      type: Object,
      default: () => {

      },


    },
  },
  mounted() {
    //window.location.href = '/404';
    //this.$router.replace("/404");
  },
  computed: {
    t3page() {
      // console.log("err", this.error);
      //this.$router.replace("/404");




      //console.log("error");



      return this.error?.ssr?.t3page;
    },
  },
};
</script>
