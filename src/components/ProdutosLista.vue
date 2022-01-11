<template>
  <section class="produtos-container">
    <transition mode="out-in">
    <div v-if="produtos && produtos.length" class="produtos" key="produtos">
       <div class="produto" v-for="produto in produtos" :key="produto.id">
         <router-link :to="{name: 'produto', params: {id: produto.id}}">
            <h2 class="titulo">{{ produto.nome }}</h2>
            <p class="preco">{{ produto.preco | numeroPreco }}</p>
            <p>{{ produto.descricao }}</p>
          </router-link>

       </div>
       <ProdutoPagina :produtosTotal="produtosTotal" :produtosPorPagina="produtosPorPagina"/>
    </div>
      <PaginaCarregando v-else key="carregando" />
    </transition>
  </section>
</template>
<script>
import ProdutoPagina from '@/components/ProdutoPagina.vue'
import { api } from '@/services.js'
import { serialize } from '@/helpers.js'

export default {
  name: 'ProdutosLista',
  components: {
    ProdutoPagina
  },
  data () {
    return {
      produtos: null,
      produtosPorPagina: 9,
      produtosTotal: 0
    }
  },
  computed: {
    url () {
      const query = serialize(this.$route.query)
      return `/produtos?_limit=${this.produtosPorPagina}${query}`
    }
  },
  methods: {
    getProdutos () {
      this.produtos = null

      api.get(this.url).then((response) => {
        console.log(response)
        this.produtosTotal = Number(response.headers['x-total-count'])
        this.produtos = response.data
      })
    }
  },

  created () {
    this.getProdutos()
  },
  watch: {
    url () {
      this.getProdutos()
    }
  }
}
</script>
<style scoped>
.produtos-container{
  max-width:  1000px;
  margin: 0 auto;
}
.produtos{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin: 30px;
}
.produto{
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  transition: all 0.2;
}
.produto:hover {
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  transform: scale(1.1);
  position: relative;
  z-index: 1;
}
.produto img{
  border-radius: 4px;
  margin-bottom: 20px;
}
.titulo{
  margin-bottom: 10px;
}

.preco{
  color: #70a8cc;
  font-weight: bold;
}

.v-enter,
.v-leave-to{
  opacity: 0;
}
.v-enter{
  transform: translate3d(0, -20px, 0);
}
.v-leave{
  transform: translate3d(0, 20px, 0);
}
.v-enter-active,
.v-leave-active{
  transition: all .3s;
}
</style>
