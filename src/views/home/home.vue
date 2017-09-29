<template>
<div>
 {{msg}}
</div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'this is Two !',
      id: ''
    }
  },
  components: {
    chartPie
  },
  computed: {

  },
  beforeRouteEnter (to, from, next) {
        // console.log(to.params.id);
    next()
  },
  beforeRouteUpdate (to, from, next) {
        // console.log(to.params.id);
        // this.id = to.params.id;
    next()
  },
  beforeRouteLeave (to, from, next) {
        // alert('我要离开了');
    next()
  }
}
</script>

<style>

</style>
