<template>
<section>
  <div v-if="produto" class="produto">
    <div class="informacoes">
      <h1>{{produto.nome}}</h1>
      <p class="preco">{{produto.preco | numeroPreco}}</p>
      <p  class="descricao">{{produto.descricao}}</p>
      <button :disabled="$store.state.carrinho.length >= produto.estoque" @click="adicionarItem" class="btn" v-if="produto.vendido === 'false'">Adicionar ao carrinho</button>
      <button class="btn btn-esgotado" v-else>Produto Esgotado</button>
    </div>
    <div class="imgProdutos" v-if="url">
        <img  :src="url" :alt="produto.nome"/>
    </div>
     <div class="alerta" :class="{ativo : alertaAtivo}">
        <p class="alerta_mensagem">{{mensagemAlerta}}</p>
      </div>
      <div  v-if="$store.state.carrinho.length >= produto.estoque" class="alerta erro">
        <p class="alerta_erro">Produto esgotado</p>
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
      produto: null,
      mensagemAlerta: '',
      alertaAtivo: false,
      alertaErro: false
    }
  },
  computed: {
    url () {
      return require(`@/api/produtos/${this.id}.jpg`)
    }
  },
  methods: {
    adicionarItem () {
      if (this.produto.estoque) {
        const { id, nome, preco } = this.produto
        this.$store.state.carrinho.push({ id, nome, preco })
        this.alerta(`${this.produto.nome} adicionado ao carrinho!`)
      } if (this.$store.state.carrinho.length >= this.produto.estoque) {
        this.produto.vendido = 'true'
      }
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
  },
  watch: {
    adicionarItem () {
      this.adicionarItem()
    }
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
.informacoes{
  background: #fff;
  border-radius: 5%;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  grid-gap: 30px;
  max-width: 900px;
  padding: 40px 40px;
  margin: 0 auto
}
.imgProdutos{
  background: #fff;
  border-radius: 5%;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  grid-gap: 30px;
  max-width: 900px;
  padding: 40px 40px;
  margin: 0 auto
}
.imgProdutos img{
  max-width: 300px;
  max-height: 300px;
  margin: 20px;
}
.imgProdutos img:hover{
  cursor:pointer;
  transform: scale(1.1);
  position: relative;
  z-index: 1;
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
  margin: 60px;
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
 .alerta_erro {
  background: #ffffff;
  display: inline-block;
  padding: 20px 40px;
  border: 2px solid  darkred;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.2);
}
.alerta.erro {
  display: block;
  -moz-animation: timeErro 0s ease-in 1.5s forwards;
  -webkit-animation: timeErro 0s ease-in 1.5s forwards;
  -o-animation: timeErro 0s ease-in 1.5s forwards;
  animation: timeErro 0s ease-in 1.5s forwards;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}
.alerta.ativo {
  display: block;
  animation: fadeInDown 0.3s forwards;
}
.btn-esgotado{
  background: darkred;
}
.btn-esgotado:hover{
  background: darkred;
}
@keyframes timeErro {
    to {
        width:0;
        height:0;
        overflow:hidden;
    }
}
@-webkit-keyframes timeErro {
    to {
        width:0;
        height:0;
        visibility:hidden;
    }
}
</style>
