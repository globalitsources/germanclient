<script>

import blogPostListBase from '@/components/mixins/blogPostListBase.vue'

export default {
    mixins: [blogPostListBase],
    name: 'T3CeBlogAuthorposts',
    created() {
		this.dataHeader = "Autor: "+this.blog.blog_settings.author.name;
		this.authorbio = this.blog.blog_settings.author.bio;
    },
}
</script>