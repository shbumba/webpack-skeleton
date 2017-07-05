import Components from './components/_index';

let plugin = (Vue) => {
    for (let component in Components) {
        if (!Components.hasOwnProperty(component)) {
            continue;
        }

        Vue.component(component, Components[component])
    }
};

export default plugin;