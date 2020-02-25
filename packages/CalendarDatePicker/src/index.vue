<template>
  <div :class="'fv-'+$theme+'-CalendarDatePicker'">
    CalendarDatePicker TEMPLATE 
  </div>
</template>

<script>
export default {
  name:'FvCalendarDatePicker',
  data(){
    return {}
  },
  props:{
    theme:{
      type:String,
      default:"system"
    }
  },
  computed:{
    $theme() {
      if (this.theme=='system')
        return this.$fvGlobal.state.theme;
      return this.theme;
    }
  }
}
</script>
