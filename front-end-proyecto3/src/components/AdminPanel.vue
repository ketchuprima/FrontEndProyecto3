<template>
    <div>
        <h1>Panel de administrador</h1>
        <ListaOfertas></ListaOfertas>
        
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