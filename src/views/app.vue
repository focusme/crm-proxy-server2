<template>
<div id="app">
    <router-view></router-view>
</div>
</template>
<script>

export default {
  name: 'app',
  data () {
    return {
      hidden: true
    }
  },
  mounted () {
  },
  methods: {

  }
}
</script>
<style scoped>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    /*background-color: #fff;*/
}
</style>
