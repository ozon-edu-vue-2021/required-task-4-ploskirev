<template>
  <div class="options-wrapper">
    <DropDownOption
      v-for="option in filteredOptions"
      :key="option[optKey]"
      :item="option"
      :optLabel="optLabel"
      :isSelected="isSelectedOption(option)"
      @click.native="selectOption(option)"
      @keypress.native.enter.prevent="selectOption(option)"
    >
      <template #optionItem="props">
        <slot name="optionItem" v-bind="props">
          {{ props[optLabel] }}
        </slot>
      </template>
    </DropDownOption>
  </div>
</template>

<script>
import DropDownOption from './DropDownOption.vue'

export default {
  name: 'DropdownList',
  components: {
    DropDownOption
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    optKey: {
      type: String
    },
    optLabel: {
      type: String
    },
    searchText: {
      type: String
    },
    selected: {
      type: [String, Number, Object]
    },
    searchFields: {
      type: Array
    }
  },
  computed: {
    searchTextLower() {
      return this.searchText.toLowerCase().trim()
    },
    filteredOptions() {
      if (!this.searchText) return this.options
      return this.options.filter(option =>
        this.searchFields.some(
          field =>
            option[field].toLowerCase().indexOf(this.searchTextLower) >= 0
        )
      )
    }
  },
  methods: {
    isSelectedOption(option) {
      return option[this.optKey] === this.selected[this.optKey]
    },
    selectOption(val) {
      this.$emit('optionSelected', val)
    }
  }
}
</script>

<style scoped>
.options-wrapper {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: calc(100% - 21px);
  max-height: 200px;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 5px;
  border: 2px solid rgb(221, 230, 240);
}
</style>
