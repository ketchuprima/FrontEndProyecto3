<template>
    <div>
        <h1 class="titleAdmin">Panel de administrador</h1>
        <div class="containerAdmin">
            <ListaOfertas :ofertas="listaOfertas"></ListaOfertas>
        </div>
    </div>
</template>
<script>
import ListaOfertas from './ListaOfertas';
import axios from "axios";

export default {
    name:"AdminPanel",
    components:{
        ListaOfertas,
    },
    data(){
        return{
            listaOfertas: []
        }
    },
    methods:{
        async getOfertas(){
            let res = await axios.get("http://localhost:8080/ofertes/");

            console.log("hola");
            this.listaOfertas = res.data;
            console.log(this.listaOfertas);
        }
    },
    mounted(){
        this.getOfertas();
    }
}
</script>