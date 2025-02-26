import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import es from './locales/es.json'
import ja from './locales/ja.json'
import af from './locales/af.json'
import hr from './locales/hr.json'
import ca from './locales/ca.json'

function loadLocaleMessages() {
    const locales = [{ en: en }, { es: es }, { ja: ja }, { af: af }, { hr: hr } , { ca: ca }]
    const messages = {}
    locales.forEach((lang) => {
        const key = Object.keys(lang)
        messages[key] = lang[key]
    })
    return messages
}

export default createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    legacy: false,
    messages: loadLocaleMessages(),
})