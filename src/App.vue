<template>
  <div id="app">
    <main-page />
  </div>
</template>

<script>
import mainComponent from './components/main-page.vue'

export default {
  name: 'App',
  components: {
    'main-page': mainComponent,
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.d-flex {
  display: flex;
}

.flex-wrap {
  display: flex;
  flex-wrap: wrap;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
