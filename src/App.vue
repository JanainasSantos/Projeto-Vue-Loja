<template>
  <div id="app">
    <TheHeader/>
    <main id="main">
      <router-view/>
    </main>
    <TheFooter/>
  </div>
</template>
<script>
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
export default {
  components: {
    TheHeader,
    TheFooter
  }
}
</script>
<style>
*{
 box-sizing:  border-box;
}
body, ul, li, h1, h2, p{
  padding: 0px;
  margin: 0px;
}
ul {
  list-style: none;
}
body{
  font-family: Helvetiva, Arial, sans-serif;
  color: #345;
  background: url("./assets/pattern.svg") repeat top;
}
a{
  color: #345;
  text-decoration: none;
}
img{
  max-width: 100%;
  display: block;
}

#app{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
#main{
  flex: 1;
}
.btn {
  display: block;
  padding: 10px 20px;
  background: #70a8cc;
  border-radius: 4px;
  color: #fff;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
  transition: all 0.3s;
  border: none;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  cursor: pointer;
}

.btn:hover {
  background: #79a6c3;
  transform: scale(1.1);
}
</style>
