import './assets/css/base.css'
//import 'material-design-icons-iconfont/dist/material-design-icons.css'


import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/dist/vuetify.min.css';
import { createPinia } from 'pinia'
import VueTheMask from 'vue-the-mask'

import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
    components,
    directives,
    ssr: true,
})

const app = createApp(App)
//const cookies = true;
//app.provide('cookies', cookies)
app.use(createPinia())
app.use(router)
app.use(VueTheMask)
app.use(vuetify)

app.mount('#app')
