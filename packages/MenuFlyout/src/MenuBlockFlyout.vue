<template>
  <div :class="['fv-'+$theme+'-menuBlockFlyout']">
    <div class="fv-menuBlockFlyout__header">
      <slot name="header">
      </slot>
    </div>
    <slot>
    </slot>
  </div>
</template>

<script>
import item from './mixins/item.js'

export default {
  name:"FvMenuBlockFlyout",
  mixins:[item],
}
</script>