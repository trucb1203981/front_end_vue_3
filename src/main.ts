// noinspection TypeScriptValidateTypes

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import { store } from './store'
import vuetify from './plugins/vuetify'
import { pinia } from './plugins/pinia'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

createApp(App).
    use(pinia). // use Pinia or use store Vuex
    use(router).
    // use(store).
    use(vuetify).
    mount('#app')
