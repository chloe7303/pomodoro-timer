import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#fff1e6',
        secondary: '#cb997e',
        accent: '#6b705c'
      }
    }
  }
})
