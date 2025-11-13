import { state, actions, mutations } from '~typo3/store/typo3.js'

export default ({ store }) => {
  let moduleOptions = {"baseURL":"https:\u002F\u002Fback.zimmer-im-revier.de\u002F","api":{"baseURL":"https:\u002F\u002Fback.zimmer-im-revier.de\u002F","endpoints":{"initialData":"\u002F?type=834"},"disable_ssl_verification":true},"layouts":{},"i18n":{"locales":["en"],"defaultLocale":"en"},"components":true,"forms":true,"headers":false,"store":{"nuxtServerInit":true},"debug":false,"ssr":true}

  store.registerModule('typo3', {
    namespaced: true,
    state,
    actions,
    mutations
  })

  if (moduleOptions?.store?.nuxtServerInit) {
    store.registerModule('typo3/nuxtServerInit', {
      actions: {
        async nuxtServerInit ({ dispatch }, context) {
          await dispatch('typo3/nuxtServerInit', context)
        }
      }
    })
  }
}
