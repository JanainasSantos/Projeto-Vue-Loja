<template>
<section>
  <div v-if="produto" class="produto">
    <div class="informacoes">
      <h1>{{produto.nome}}</h1>
      <p class="preco">{{produto.preco | numeroPreco}}</p>
      <p  class="descricao">{{produto.descricao}}</p>
      <button @click="comprar" class="btn" v-if="produto.vendido === 'false'">Comprar</button>
      <button class="btn" v-else>Produto Vendido</button>
    </div>
     <div class="alerta" :class="{ativo : alertaAtivo}">
        <p class="alerta_mensagem">{{mensagemAlerta}}</p>
      </div>
  </div>
</section>

</template>
<script>
import { api } from '@/services.js'

export default {
  name: 'Produtos',
  props: ['id'],
  data () {
    return {
      carrinho: 0,
      produto: null,
      mensagemAlerta: '',
      alertaAtivo: false
    }
  },
  methods: {
    comprar () {
      this.alerta(`${this.id} comprado!`)
    },
    alerta (mensagem) {
      this.mensagemAlerta = mensagem
      this.alertaAtivo = true
      setTimeout(() => {
        this.alertaAtivo = false
      }, 1500)
    },
    getProduto () {
      this.produto = null
      api.get(`/produtos/${this.id}`).then((response) => {
        this.produto = response.data
      })
    }

  },
  created () {
    this.getProduto()
  }

}
</script>
<style scoped>
.produto{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  max-width: 900px;
  padding: 60px 20px;
  margin: 0 auto
}
.preco{
  color: #70a8cc;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 40px;
}
.descricao{
  font-size: 1.2rem;
}
.btn{
  margin-top: 60px;
  width: 200px;
}
.alerta_mensagem {
  background: #ffffff;
  display: inline-block;
  padding: 20px 40px;
  border: 2px solid  #70a8cc;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.2);
}
.alerta {
  position: absolute;
  top: 20px;
  left: 0px;
  z-index: 10;
  width: 100%;
  text-align: center;
  display: none;
}
.alerta.ativo {
  display: block;
  animation: fadeInDown 0.3s forwards;
}
</style>
