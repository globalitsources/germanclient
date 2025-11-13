<script>
export default {
	methods: {
		selectImage: function (blog_post) {
			if (blog_post.processed_images && blog_post.processed_images[0]) {
				return blog_post.processed_images[0];
			} else if (blog_post.images && blog_post.images[0]) {
				return blog_post.images[0];
			} else {
				return '';
			}
		}
	}
}
</script>