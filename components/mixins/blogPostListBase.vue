<template lang="">
  <div class="posts">
    <h1 class="posts__title h3--red">
      {{ dataHeader }}
    </h1>
    <div v-if="authorbio" class="blogarchiveheader__description">
    </div>
    <div class="posts__list">
      <article
        v-for="(blog_post, index) in blog.blog_posts"
        :key="index"
        class="posts__card"
      >
        <NuxtLink :to="blog_post.slug">
          <div
            class="posts__image"
            v-bind:style="{
              backgroundImage: 'url(' + selectImage(blog_post) + ')',
            }"
          ></div>
        </NuxtLink>
        <div class="posts__content">
          <div class="posts__metagroup">
            <a
              rel="bookmark"
              href="/blog/energiekrise-in-deutschland-was-tun-als-vermieter/"
            >
              <time
                :datetime="`{{formatDateTime(blog_post.publish_date)}}`"
                itemprop="datepublished"
                >{{ formatDate(blog_post.publish_date) }}</time
              >
            </a>
            <a
              rel="bookmark"
              href="/blog/energiekrise-in-deutschland-was-tun-als-vermieter/"
            >
              <svg
                class="posts__icon"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use xlink:href="@/assets/images/icons/sprite.svg#clock"></use>
              </svg>
              4 min</a
            >
          </div>
          <NuxtLink class="h4--red" :to="blog_post.slug">{{
            blog_post.title
          }}</NuxtLink>
          <p class=" " itemprop="description">
            {{ blog_post.description }}
          </p>
        </div>
      </article>
    </div>
  </div>
</template>
<script>
import dates from "@/components/mixins/dates.vue";
import blogSelectImage from "@/components/mixins/blogSelectImage.vue";

export default {
  mixins: [dates, blogSelectImage],
  props: {
    headerLayout: {
      type: Number,
    },
    header: {
      type: String,
    },
    blog: {
      type: Object,
    },
    pi_flexform: {
      type: Object,
    },
  },
  data() {
    return {
      dataHeader: this.header,
      authorbio: "",
    };
  },
};
</script>
