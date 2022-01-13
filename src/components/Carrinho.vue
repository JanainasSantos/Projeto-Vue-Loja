<template>
    <div class="carrinho_geral">
      <div class="carrinho_menu" @click="carrinhoAtivo = true">
        <img src="@/assets/carrinho.svg" alt="carrinho"/>{{carrinhoTotal | numeroPreco}} | {{$store.state.carrinho.length}}
         </div>
      <section class="carrinho_modal" :class="{ativo: carrinhoAtivo}" @click="clickForaCarrinho">
        <div class="carrinho_container">
          <button class="carrinho_fechar" @click="carrinhoAtivo = false">X</button>
          <h2 class="carrinho_titulo">Carrinho</h2>
          <div v-if="$store.state.carrinho.length > 0">
            <ul class="carrinho_lista">
              <li v-for="(carrinho, index) in $store.state.carrinho" :key="index" class="carrinho_item">
                <p>{{carrinho.nome}} </p>

                <p class="carrinho_preco">{{carrinho.preco | numeroPreco}}</p>
                <button class="carrinho_remover" @click="removerItem(index)">X</button>
              </li>
            </ul>
            <p class="carrinho_total">{{carrinhoTotal | numeroPreco}}</p>
            <button class="carrinho_finalizar">Finalizar comprar</button>
          </div>
          <p v-else>O carrinho está vazio.</p>
        </div>
      </section>
    </div>
</template>
<script>

export default {
  name: 'Carrinho',
  data () {
    return {
      produto: null,
      produtos: null,
      carrinhoAtivo: false
    }
  },
  computed: {

    carrinhoTotal () {
      let total = 0
      if (this.$store.state.carrinho.length) {
        this.$store.state.carrinho.forEach(item => {
          total += Number(item.preco)
        })
      }
      return total
    }
  },
  methods: {
    clickForaCarrinho (event) {
      if (event.currentTarget === event.target) {
        this.carrinhoAtivo = false
      }
    },
    removerItem (index) {
      this.$store.state.carrinho.splice(index, 1)
    }

  }
}

</script>
<style  scoped>
.carrinho_menu::after {
  content: "";
  display: inline-block;
  width: 25px;
  height: 25px;
  margin-left: 10px;
}

.carrinho_menu {
  display: flex;
  align-items: center;
  cursor: pointer;
  float: right;
}
.carrinho_modal::before {
  content: "";
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}

.carrinho_modal {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0px;
  left: 0px;
  width: 100%;
  padding: 20px;
  display: none;
}

.carrinho_modal.ativo {
  display: block;
}

.carrinho_container {
  z-index: 1;
  position: relative;
  margin: 80px auto;
  background: #ffffff;
  padding: 40px;
  max-width: 800px;
  animation: fadeInDown forwards 0.3s;
}

.carrinho_item {
  display: grid;
  grid-template-columns: 1fr 1fr 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.carrinho_titulo {
  margin-bottom: 10px;
  border-bottom: 2px solid #70a8cc;
  color: #70a8cc;
  padding-bottom: 20px;
}

.carrinho_remover {
  border: none;
  font-size: 1rem;
  cursor: pointer;
  background: #ffffff;
  color: #70a8cc;
}
.carrinho_preco {
  text-align: right;
}

.carrinho_total {
  text-align: right;
  margin: 20px 50px;
  border-bottom: 2px solid #70a8cc;
}
.carrinho_fechar {
  border-radius: 50%;
  border: 2px solid #70a8cc;
  color: #70a8cc;
  width: 40px;
  height: 40px;
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 1rem;
  background: #ffffff;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
.carrinho_finalizar {
  display: block;
  margin-left: auto;
  background: #70a8cc;
  cursor: pointer;
  color: #ffffff;
  font-size: 1rem;
  padding: 10px 25px;
  border: none;
  font-family: "Noto Serif";
}
</style>
