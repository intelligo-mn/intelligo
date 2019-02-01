// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import Badge from "./components/Badge";
import BaseAlert from "./components/BaseAlert";
import BaseButton from "./components/BaseButton";
import BaseCheckbox from "./components/BaseCheckbox";
import BaseInput from "./components/BaseInput";
import BasePagination from "./components/BasePagination";
import BaseProgress from "./components/BaseProgress";
import BaseRadio from "./components/BaseRadio";
import BaseSlider from "./components/BaseSlider";
import BaseSwitch from "./components/BaseSwitch";
import Card from "./components/Card";
import Icon from "./components/Icon";
import clickOutside from "./directives/click-ouside.js";
import VueLazyload from "vue-lazyload";

Vue.use(BootstrapVue)
Vue.use(VueLazyload)

Vue.config.productionTip = false

Vue.component(Badge.name, Badge);
Vue.component(BaseAlert.name, BaseAlert);
Vue.component(BaseButton.name, BaseButton);
Vue.component(BaseInput.name, BaseInput);
Vue.component(BaseCheckbox.name, BaseCheckbox);
Vue.component(BasePagination.name, BasePagination);
Vue.component(BaseProgress.name, BaseProgress);
Vue.component(BaseRadio.name, BaseRadio);
Vue.component(BaseSlider.name, BaseSlider);
Vue.component(BaseSwitch.name, BaseSwitch);
Vue.component(Card.name, Card);
Vue.component(Icon.name, Icon);
Vue.directive("click-outside", clickOutside);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
