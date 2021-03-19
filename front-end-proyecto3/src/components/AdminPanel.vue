<template>
    <div>
        <h1 class="titleAdmin">Panel de administrador</h1>
        <div class="containerAdmin">
            <ListaOfertas></ListaOfertas>
        </div>
    </div>
</template>
<script>
import ListaOfertas from './ListaOfertas';
export default {
    name:"AdminPanel",
    components:{
        ListaOfertas,
    },
    data(){
        return{}
    }
}
</script>