import 'normalize.css';
import './app.pcss';
import AppVue from './app.vue';

Vue.config.devtools = true;

new Vue({
    el: '#app',
    render: h => h(AppVue)
});

