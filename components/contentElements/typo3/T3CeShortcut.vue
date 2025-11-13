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
        // console.log(' --->: ', ctx);
        // let iscity = false;
        // if(iscity) {
          //console.log('====----> ', ctx.props);
      //console.dir(ctx.props, { depth: 4 });

      //console.log(route);


          return createElement('div', [
              createElement('t3-ce-renderer', {
                props: {
                    content: ctx.props.shortcut
                }
              })
          ])
       // }
  	}
}
</script>
