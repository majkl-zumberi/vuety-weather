import "material-design-icons-iconfont/dist/material-design-icons.css";
import Vue from "vue";
// need instance of vuetify, for example
import VuetifyDialog from "vuetify-dialog";
import "vuetify-dialog/dist/vuetify-dialog.css";
import App from "./App.vue";
import http from "./http";
import vuetify from "./plugins/vuetify";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.prototype.$axios = http;

Vue.use(VuetifyDialog, {
  context: {
    vuetify
  }
});
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
