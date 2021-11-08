<template>
  <div :class="optionClasses">
    <slot name="optionItem" v-bind="item">{{ item[optLabel] }}</slot>
  </div>
</template>

<script>
export default {
  name: 'DropDownOption',
  props: {
    item: {
      type: Object
    },
    optLabel: {
      type: String,
      defaul: 'label'
    },
    isSelected: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    optionClasses() {
      return {
        'option-wrapper': true,
        'selected-option': this.isSelected
      }
    }
  }
}
</script>

<style scoped>
.option-wrapper {
  cursor: pointer;
  padding: 5px;
  font-size: 14px;
}

.option-wrapper:hover {
  background: #f5f5fc;
}

.selected-option {
  color: rgb(86, 105, 209);
}
</style>
