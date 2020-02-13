<template>
  <div
    @click="$emit('click',$event)"
    class="fv-TreeView__checkbox"
    :class="[status]"
    role="checkbox"
  >
    <i class="ms-Icon" :class="icon()" />
  </div>
</template>

<script>
import "office-ui-fabric-core/dist/css/fabric.min.css";

export default {
  name: "FvTreeViewCheckbox",
  props: {
    status: {
      type: String,
      default: "Indeterminate"
    }
  },
  methods: {
    icon() {
      if (this.status == "checked") {
        return "ms-Icon--CheckMark";
      } else if (this.status == "Indeterminate") {
        return "ms-Icon--CheckboxIndeterminate";
      } else return null;
    }
  }
};
</script>