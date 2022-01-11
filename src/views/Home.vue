<template>
  <section>
    <h1>Compre</h1>
    <ProdutosLista />
  </section>
</template>
<script>

import ProdutosLista from '@/components/ProdutosLista.vue'

export default {
  name: 'Home',
  components: {
    ProdutosLista
  }
}
</script>
<style scoped>
h1{
  font-size: 2rem;
  color: #345;
  margin-top: 40px;
  text-align: center;
}
</style>
