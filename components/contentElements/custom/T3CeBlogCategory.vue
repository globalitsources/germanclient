<script>

import blogPostListBase from '@/components/mixins/blogPostListBase.vue'

export default {
    mixins: [blogPostListBase],
    name: 'T3CeBlogCategory',
    created() {
		this.dataHeader = "Kategorie: "+this.blog.blog_settings.category.title;
    },
}
</script>