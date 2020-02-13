let id=1;
export default{
  data(){
    return {
      revealEffectName:"revealEffect"+(id++)
    }
  },
  computed:{
    revealEffectClass(){
      return this.revealEffect?[this.revealEffectName]:[]
    }
  }
}