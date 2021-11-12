<template>
  <div ref="inputWrapper" class="dropdown-wrapper">
    <span class="label-text">{{ label }}</span>
    <input
      :readonly="!useSearch"
      :value="dropDownDisplayValue"
      :class="inputClasses"
      @click="openDropDown"
      @keypress.enter.prevent="openDropDown"
      @input="debouncedUpdateSearch"
    />
    <DropDownList
      v-click-outside="closeDropDown"
      v-show="isDropdownOpened"
      :options="options"
      :searchText="searchText"
      :optLabel="optLabel"
      :optKey="optKey"
      :selected="selected"
      :searchFields="searchFields"
      @optionSelected="emitValue"
    >
      <template #optionItem="props">
        <slot name="optionItem" v-bind="props">
          {{ props[optLabel] }}
        </slot>
      </template>
    </DropDownList>
    <div :class="dropdownIconClasses" @click="toggleDropdownShow"></div>
  </div>
</template>

<script>
import DropDownList from './DropDownList.vue'
import ClickOutside from 'vue-click-outside'
import { debounce } from '@/core/helpers.js'

export default {
  name: 'DropDownInput',
  components: {
    DropDownList
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    selected: {
      type: [String, Number, Object],
      required: true
    },
    label: {
      type: String,
      required: true
    },
    useSearch: {
      type: Boolean,
      default: false
    },
    optKey: {
      type: String,
      default: 'id'
    },
    optLabel: {
      type: String,
      default: 'label'
    },
    searchFields: {
      type: Array,
      default: () => ['label']
    }
  },
  directives: {
    ClickOutside
  },
  data() {
    return {
      isDropdownOpened: false,
      searchText: '',
      debouncedUpdateSearch: debounce(this.updateSearch, 1000)
    }
  },
  computed: {
    dropDownDisplayValue() {
      if (this.useSearch) {
        return this.isDropdownOpened
          ? this.searchText
          : this.selected[this.optLabel]
      } else {
        return this.selected[this.optLabel]
      }
    },
    inputClasses() {
      return {
        'dropdown-input': true,
        'no-search': !this.useSearch
      }
    },
    dropdownIconClasses() {
      return {
        'dropdown-icon': true,
        rotated: this.isDropdownOpened
      }
    }
  },
  methods: {
    toggleDropdownShow() {
      this.isDropdownOpened ? this.closeDropDown() : this.openDropDown()
    },
    openDropDown() {
      this.searchText = ''
      this.isDropdownOpened = true
    },
    checkAbleToClose(event) {
      if (event) {
        const target = event.target
        const condition =
          target.closest('.dropdown-wrapper') == this.$refs.inputWrapper
        return !condition ? true : false
      } else {
        return true
      }
    },
    closeDropDown(event) {
      if (this.checkAbleToClose(event)) {
        this.searchText = ''
        this.isDropdownOpened = false
      }
    },
    emitValue(val) {
      this.$emit('selectionUpdated', val)
      this.closeDropDown()
    },
    updateSearch(val) {
      this.searchText = val.target.value
    }
  }
}
</script>

<style scoped>
.dropdown-wrapper {
  position: relative;
}

.dropdown-wrapper .label-text {
  font-size: 14px;
  font-weight: 700;
  color: rgb(137, 143, 150);
  cursor: pointer;
}

.dropdown-input {
  width: 100%;
  min-width: 150px;
  border: 2px solid rgb(212, 220, 230);
  border-radius: 3px;
  font-size: 14px;
  padding: 8px 10px;
  margin-bottom: 21px;
}

.dropdown-icon {
  border-left: 1px solid rgb(166, 180, 194);
  border-bottom: 1px solid rgb(166, 180, 194);
  transform: rotate(-45deg);
  width: 5px;
  height: 5px;
  position: absolute;
  z-index: 0;
  top: calc(50% - 3px);
  right: 10px;
  cursor: pointer;
  transition: transform 0.3s;
}

.dropdown-icon.rotated {
  transform: rotate(135deg);
}

.no-search {
  cursor: pointer;
}
</style>
