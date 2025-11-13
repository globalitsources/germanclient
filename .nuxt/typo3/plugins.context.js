import { defu } from 'defu'
import Hookable from 'hable'
import api from '~typo3/plugins/api'
import i18n from '~typo3/plugins/i18n'
import domains from '~typo3/plugins/domains'
export default function (context, inject) {
  const runtimeConfig = context.$config && context.$config.typo3
  let moduleOptions = {"baseURL":"https:\u002F\u002Fback.zimmer-im-revier.de\u002F","api":{"baseURL":"https:\u002F\u002Fback.zimmer-im-revier.de\u002F","endpoints":{"initialData":"\u002F?type=834"},"disable_ssl_verification":true},"layouts":{},"i18n":{"locales":["en"],"defaultLocale":"en"},"components":true,"forms":true,"headers":false,"store":{"nuxtServerInit":true},"debug":false,"ssr":true}

  if (runtimeConfig) {
    moduleOptions = defu(runtimeConfig, moduleOptions)
  }

  const hooks = new Hookable()

  const _options = {
    api: api(context, moduleOptions),
    i18n: i18n(context, moduleOptions),
    domains: domains(context, moduleOptions),
    options: moduleOptions,
    ...hooks
  }
  inject('typo3', _options)
}
