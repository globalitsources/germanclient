<script>
export default {
  	name: 'T3CeShortcut',
  	functional: true,
  	props: {
    		shortcut: {
      			type: Array,
      			required: true
    		}
  	},
  	render (createElement, ctx) {
		// console.log('ctx.props.shortcut: ', ctx.props.shortcut);
		// console.log('build element DIV as container');
    		return createElement('div', [
      			createElement('t3-renderer', {
        			props: {
          				content: ctx.props.shortcut
        			}
      			})
    		])
  	}
}
</script>
