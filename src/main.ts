// Libraries
import Vue from 'vue';
import Vuetify from 'vuetify'
import './registerServiceWorker';

// Helpers
import colors from 'vuetify/es5/util/colors'

// Components
import App from './app.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.use(Vuetify, {
  theme: {
    primary: colors.amber.lighten1,
    secondary: colors.blue,
  }
})

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
