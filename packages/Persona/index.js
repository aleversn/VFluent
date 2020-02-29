import Persona from './src/index.vue'

Persona.install = function(Vue){
  Vue.component(Persona.name,Persona)
}

export default Persona;
