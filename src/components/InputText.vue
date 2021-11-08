<template>
  <div class="input-wrapper">
    <label class="input-label-wrapper">
      <span class="label-text">{{ label }}</span>
      <input
        v-bind="$attrs"
        :class="inputClasses"
        :type="$attrs.type || 'text'"
        :value="text"
        @input="emitText"
        @blur="emitBlur"
      />
    </label>
    <div class="err-message">
      <span v-show="hasError">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputText',
  props: {
    label: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    errorMessage: {
      type: String,
      default: 'Error'
    },
    hasError: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    inputClasses() {
      return {
        input: true,
        'error-input': this.hasError
      }
    }
  },
  methods: {
    emitBlur() {
      this.$emit('blur')
    },
    emitText(event) {
      this.$emit('contentUpdated', event.target.value)
    }
  }
}
</script>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.input-label-wrapper {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: flex-start;
}

.input-label-wrapper .label-text {
  font-size: 14px;
  font-weight: 700;
  color: rgb(137, 143, 150);
  cursor: pointer;
}

.input {
  width: 100%;
  min-width: 150px;
  border: 2px solid rgb(212, 220, 230);
  border-radius: 3px;
  font-size: 14px;
  padding: 8px 10px;
}

.error-input {
  border-color: tomato;
}

.error-input:focus {
  outline-color: tomato;
}

.err-message {
  min-height: 18px;
  color: tomato;
  font-size: 12px;
}
</style>
