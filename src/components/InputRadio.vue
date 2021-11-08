<template>
  <div class="radio-wrapper">
    <label v-for="option in options" :key="option[optKey]" class="input-label">
      <input
        type="radio"
        class="input"
        :name="$attrs.name"
        :value="option[optKey]"
        @change="emitValue(option[optKey])"
      />
      <span>{{ option[optLabel] }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'InputRadio',
  props: {
    options: {
      type: Array,
      required: true
    },
    optKey: {
      type: String,
      default: 'key'
    },
    optLabel: {
      type: String,
      default: 'label'
    }
  },
  methods: {
    emitValue(val) {
      this.$emit('selectionUpdated', val)
    }
  }
}
</script>

<style scoped>
.radio-wrapper {
  display: flex;
  align-items: center;
}

.input-label {
  display: flex;
  align-items: center;
  margin: 0 10px 0 0;
  font-weight: 500;
  cursor: pointer;
}

.input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 50%;
  border: 1px solid #999;
  width: 18px;
  height: 18px;
  margin: 0 5px;
}

.input:checked {
  border: 4px solid rgb(31, 91, 202);
}
</style>
