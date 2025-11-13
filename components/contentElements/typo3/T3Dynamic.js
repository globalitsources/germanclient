// Component to render CE based on type
import { getBackendLayout } from '~typo3/lib/layouts'
export default {
  name: 'T3Dynamic',
  props: {
    layout: {
      type: Boolean,
      default: false
    },
    /**
     * Content elements data props
     */
    data: {
      type: [Object, Array],
      required: true
    },
    /**
     * type of content element
     */
    type: {
      type: String,
      default: 'text'
    },
    /**
     * index of content element
     */
    index: {
      type: Number,
      default: -1
    }
  },

  methods: {
    createContentElement () {
      // content element are registered in PascalCase or kebab-case like "CeMyComponent" or "ce-my-component"
    // but the type is coming as "my_component" so we have to transform the name and the tag
      const typeNameCamelCase = this.type.replace(/_([a-z])/g, (g) => {
        return g[1].toUpperCase()
      })

      let elementTag = `t3-ce-${this.type.replace(/_/g, '-')}`
      const componentName = `T3Ce${typeNameCamelCase[0].toUpperCase() +
      typeNameCamelCase.slice(1)}`

// console.log('########## componentName: ', componentName);

// console.log('########## type: ', this.type);



      // check if global component exist, if not display <t3-ce-default/>

// console.log('this.$root.$options.components[componentName]: ', this.$root.$options.components[componentName]);
	   

	    if (!(this.$root.$options.components[componentName] || this.$root.$options.components[elementTag])) {
        elementTag = 't3-ce-default'
      }


//console.log('elementTag: ', elementTag);

const retur = [elementTag, {
        props: {
          ...{
            id: this.data.id,
            type: this.data.type,
            appearance: this.data.appearance,
            index: this.index,
            ...((this.data.pi_flexform) && { pi_flexform: this.data.pi_flexform }),
            ...((componentName == 'T3CeBlogPosts' || componentName == 'T3CeBlogAuthorposts' || componentName == 'T3CeBlogCategory') && { blog_posts: this.data.blog_posts, }),
          },
          ...this.data.content
        }
      }]

//	    console.log('retur: ', retur);
	    return retur
/*
      return [elementTag, {
        props: {
          ...{
            id: this.data.id,
            type: this.data.type,
            appearance: this.data.appearance,
            index: this.index,
            ...((this.data.pi_flexform) && { pi_flexform: this.data.pi_flexform }),
            ...((componentName == 'T3CeBlogPosts' || componentName == 'T3CeBlogAuthorposts' || componentName == 'T3CeBlogCategory') && { blog_posts: this.data.blog_posts, }),
          },
          ...this.data.content
        }
      }]
*/

	},
    createBackendLayout () {
      const layout = getBackendLayout(this.type, this.$root.$options.components)

// console.log('layout: ', layout);

      return [layout, {
        props: {
          content: this.data
        }
      }]
    }
  },
  
  render (createElement) {

//console.log('this.layout: ', this.layout);

	  const [tag, data] = this.layout ? this.createBackendLayout() : this.createContentElement()
    const element = createElement(tag, data)

//console.log('element: ', element);


    if (this.$nuxt.$typo3.options.debug) {
      return createElement('t3-debug', { props: this.data }, [
        element
      ])
    }

    return element
  }
}
