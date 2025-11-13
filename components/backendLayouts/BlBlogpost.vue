<template>
  <div class="marginTop">
    <div class="main-content frame blog-single">
      <div class="blog-single__wrapper">
        <div class="blog-single__content">
          <a href="/blog/" class="blog-single__breadscrumb"
            >« Zurück zum Blog</a
          >
          <header class="blog-single__header">
            <h1>
              {{ blog_title }}
            </h1>
            <div class="postheader__meta">
              <a
                class="blog-single__date"
                rel="bookmark"
                :href="`${$route.path}`"
                >{{ formatDate(publish_date) }}</a
              >
              <div class="blog-single__description" itemprop="description">
                <t3-html-parser :content="blog_abstract" />
              </div>
            </div>
          </header>

          <t3-renderer :content="content.colPos0" class="align--left" />
        </div>
        <aside class="blog-single__aside">
          <div v-if="showAuthor" class="blog-single__author">
            <div class="blog-single__author-photo">
              <img
                class="postauthor__avatarimage blogavatar"
                height="72"
                width="72"
                :src="this.author.processed_images[0]"
                itemprop="image"
              />
            </div>
            <div class="blog-single__author-content">
              <div class="blog-single__author-name">
                <a rel="author" :href="`/blog/autorin/author/${author.slug}/`"
                  ><span itemprop="name">{{ author.name }}</span></a
                >
              </div>
              <div class="postauthor__bio" itemprop="description">
                <p>
                  <t3-html-parser :content="author.bio" />
                </p>
              </div>
              <a
                class="blog-single__author-link"
                :href="`/blog/autorin/author/${author.slug}/`"
                >Weitere Beiträge dieses Autors</a
              >
            </div>
          </div>

          <aside class="blog-single__categories">
            <div class="blog-widget__title">
              <span>Kategorien</span>
            </div>
            <div class="blog-widget__categories">
              <a
                v-for="(category, index) in categories"
                :key="index"
                title="An- und Abreise"
                :href="`/blog/kategorie/${category.slug}/`"
                class="blog-widget__category"
              >
                {{ category.title }} ({{ category.posts }})
              </a>
            </div>
            <a href="/blog/" class="blog-widget__all">Alle Beiträge anzeigen</a>
          </aside>
        </aside>
      </div>
    </div>
    <TheSlider
      :dots="dots"
      :infinite="true"
      :navButtons="arrowNavigation"
      :slidesToShow="sliderCount"
      ref="blogs"
      class="relatives frame"
    >
      <div v-for="(blog_post, index) in relativePosts" :key="index">
        <div class="relatives__card">
          <div class="relatives__card-wrapper">
            <img
              draggable="false"
              :src="selectImage(blog_post)"
              class="blog-single__relatives-image"
              width="600"
              height="300"
              loading="lazy"
            />
            <div class="relatives__card-content">
              <NuxtLink class="postlist__featuredimage" :to="blog_post.slug">
                <p class="h4--red">{{ blog_post.title }}</p>
              </NuxtLink>
              <p class="relatives__card-text">
                {{ blog_post.abstract }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </TheSlider>
  </div>
</template>
<script>
import T3BlDefault from "~typo3/components/T3BlDefault/T3BlDefault.vue";

import dates from "@/components/mixins/dates.vue";
import blogSelectImage from "@/components/mixins/blogSelectImage.vue";
import TheSlider from "../UI/TheSlider.vue";

export default {
  extends: T3BlDefault,
  mixins: [dates, blogSelectImage],
  components: { TheSlider },
  data() {
    return {
      sliderCount: null,
      dots: null,
      arrowNavigation: null,
      blog_title: this.$store.state.typo3.page.meta.title,
      blog_abstract: this.$store.state.typo3.page.meta.abstract,
      publish_date:
        this.$store.state.typo3.page.sg_page.sg_meta.settings.page.publish_date,
      categories: this.$store.state.typo3.page.sg_page.sg_meta.categories,
      relativePosts: this.$store.state.typo3.page.sg_page.sg_meta.relativePosts,
      showAuthor: false,
      author: {},
    };
  },
  created() {
    if (
      !this.$store.state.typo3.page.sg_page.sg_meta.authors ||
      !this.$store.state.typo3.page.sg_page.sg_meta.authors[0]
    )
      return;
    this.showAuthor = true;
    this.author = this.$store.state.typo3.page.sg_page.sg_meta.authors[0];
  },
  methods: {
    handleSliderResize() {
      const sliderWidth = this.$refs.blogs.$refs.list.clientWidth;
      if (sliderWidth > 992) {
        this.sliderCount = 3;
        this.arrowNavigation = true;
        this.dots = false;
      }

      if (sliderWidth > 769 && sliderWidth < 991) {
        this.sliderCount = 2;
        this.arrowNavigation = true;
        this.dots = false;
      }
      if (sliderWidth < 767) {
        this.sliderCount = 1;
        this.arrowNavigation = false;
        this.dots = true;
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleSliderResize);
    this.handleSliderResize();
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.handleSliderResize);
  },
};
</script>
<style></style>
