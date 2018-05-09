<template>
  <div id="home">
    <img src="../../assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style>
#home {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
