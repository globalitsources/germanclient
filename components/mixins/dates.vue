<script>
export default {
	methods: {
		formatDate: function (date) {
			return new Date(date * 1000).toLocaleDateString("de-DE");
		},
		formatDateTime: function (date) {
			return new Date(date * 1000).toUTCString();
		},
	}
}
</script>