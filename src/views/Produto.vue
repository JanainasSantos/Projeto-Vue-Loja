<template>
<section>
  <div v-if="produto" class="produto">
    <div></div>
    <Carrinho  :carrinho="carrinho" />
    <div class="informacoes">
      <h1>{{produto.nome}}</h1>
      <p class="preco">{{produto.preco | numeroPreco}}</p>
      <p  class="descricao">{{produto.descricao}}</p>
      <button :disabled="carrinho.length >= this.produto.estoque" @click="adicionarItem(); comprar();" class="btn" v-if="produto.vendido === 'false'">Comprar</button>
      <button class="btn" v-else>Produto Vendido</button>
    </div>
    <div class="imgProdutos" v-if="url">
        <img  :src="url" :alt="produto.nome"/>
    </div>
     <div class="alerta" :class="{ativo : alertaAtivo}">
        <p class="alerta_mensagem">{{mensagemAlerta}}</p>
      </div>
      <div class="alerta" :class="{erro: alertaErro}">
        <p class="alerta_erro">{{mensagemAlerta}}</p>
      </div>

  </div>
</section>

</template>
<script>
import { api } from '@/services.js'
import Carrinho from '@/components/Carrinho.vue'

export default {
  name: 'Produtos',
  props: ['id'],
  components: {
    Carrinho
  },
  data () {
    return {
      carrinho: [],
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
      const { id, nome, preco } = this.produto
      this.carrinho.push({ id, nome, preco })
      this.alerta(`${nome} adicionado ao carrinho`)
    },
    comprar () {
      if (this.produto.estoque) {
        this.alerta(`${this.produto.nome} comprado!`)
      } else {
        this.erro('Produto esgotado')
      }
    },
    alerta (mensagem) {
      this.mensagemAlerta = mensagem
      this.alertaAtivo = true
      setTimeout(() => {
        this.alertaAtivo = false
      }, 1500)
    },
    erro (mensagem) {
      this.mensagemAlerta = mensagem
      this.alertaErro = true
      setTimeout(() => {
        this.alertaErro = false
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
  padding: 60px 20px;
  margin: 0 auto
}
.imgProdutos{
  background: #fff;
  border-radius: 5%;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  grid-gap: 30px;
  max-width: 900px;
  padding: 20px 20px;
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
  margin: 40px;
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
  border: 2px solid  red;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.2);
}
.alerta.erro {
  display: block;
  animation: fadeInDown 0.3s forwards;
}
.alerta.ativo {
  display: block;
  animation: fadeInDown 0.3s forwards;
}
</style>
