<template>
  <div id="app">
    <Form />
    <notifications group="formSubmit" position="bottom right" />
  </div>
</template>

<script>
import Form from './components/Form.vue'

export default {
  name: 'App',
  components: {
    Form
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background-color: #fafafa;
  padding: 24px;
  box-sizing: border-box;
  width: 700px;
  margin: 0 auto;
}

html,
body {
  height: 100vh;
  overflow: hidden;
}

#app {
  height: 100%;
  overflow-y: auto;
}

* {
  box-sizing: border-box;
}
</style>
