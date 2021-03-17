<template>
    <div>
        
        <ListaOfertas></ListaOfertas>
    </div>
</template>
<script>
import ListaOfertas from './ListaOfertas.vue';
export default {
    name:"Home",
    components:{
        ListaOfertas
    }
}
</script>
<style>
@import "../assets/css/home.css";
</style>