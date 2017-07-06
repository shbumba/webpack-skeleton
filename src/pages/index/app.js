import 'normalize.css';
import './app.pcss';

//import App from '../../app'

import App from '../../app'
import TestVue from './test.vue'

var app = new Vue({
    el: '#app',
    components:{
        testvue: TestVue
    },
    data: {
        message: 'Hello Vue!'
    }
});


var element = document.createElement('p');

element.innerText = 'test index';
document.body.appendChild(element);

