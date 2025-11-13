<template>
  <div>
    <div class="blog-list frame">
      <div class="blog-lists__blogs">
        <t3-renderer :content="content.colPos0" />
      </div>

      <aside class="blog-widget frame">
        <div class="blog-widget__title">
          <span>Kategorien</span>
        </div>
        <div class="blog-widget__categories">
          <a
            v-for="(category, index) in categories"
            :key="index"
            class="blog-widget__category"
            title="An- und Abreise"
            :href="`/blog/kategorie/${category.slug}/`"
          >
            {{ category.title }} ({{ category.posts }})
          </a>
        </div>
        <a href="/blog/" class="blog-widget__all">Alle Beiträge anzeigen</a>
      </aside>
    </div>
  </div>
</template>
<script>
import T3BlDefault from "~typo3/components/T3BlDefault/T3BlDefault.vue";
export default {
  extends: T3BlDefault,
  data() {
    return {
      categories: this.$store.state.typo3.page.sg_page.sg_meta.categories,
    };
  },
};
</script>
<style></style>
