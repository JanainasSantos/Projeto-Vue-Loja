<template>
  <header>
    <nav>
      <router-link to="/" class="logo">
      <div class="nav">
        <div class="img">
         <img src="@/assets/logo.png" alt="techno" />
        </div>
        <Carrinho class="carrinho-header" />
      </div>
      </router-link>
    </nav>
  </header>
</template>
<script>
import Carrinho from '@/components/Carrinho.vue'
export default {
  name: 'TheHeader',
  components: {
    Carrinho
  }
}
</script>
<style scoped>
nav{
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  box-shadow: 0 2px 4px rgba(30, 60, 90, 0.1);
}
.logo{
  padding:  10px 0px;
}
.logo img{
  width: 150px;
}
.nav{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  width: 900px;
  margin: 0 auto
}
.img{
  grid-gap: 30px;
  max-width: 900px;
}
.carrinho-header{
  grid-gap: 30px;
  max-width: 900px;
  margin-top: 30px;
}
</style>
