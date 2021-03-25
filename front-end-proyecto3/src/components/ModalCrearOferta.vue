<template>
  <div class="text-xs-center">
    <v-dialog persistent v-model="crearOferta" width="800">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Crear una oferta
        </v-card-title>

        <div class="contenerdorFormularioCrearOferta" style="margin: 3%">
          <v-row>
            <v-col cols="12"
              ><v-text-field label="Titulo de la oferta" v-model="titol"></v-text-field
            ></v-col>
            <v-col cols="12"
              ><v-textarea label="Descripción de la oferta" v-model="descripcio"></v-textarea
            ></v-col>
            <v-col cols="6">
              <v-text-field label="Ubicación" v-model="ubicacio"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select :items="categoriasSelect" label="Categoria" v-model="categoria"></v-select>
            </v-col>
          </v-row>
        </div>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            class="white--text"
            color="blue"
            tile
            x-large
            @click="clickCancelar()"
          >
            Cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            v-if="modo != 0"
            class="white--text"
            color="blue"
            tile
            x-large
            @click="clickCrear()"
          >
            Crear
          </v-btn>
          <v-btn
            v-else
            class="white--text"
            color="blue"
            tile
            x-large
            @click="clickActualizar()"
          >
            Actualizar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "ModalCrearOferta",
  props: ["crearOferta","modo","idOferta", "idUsuario", "empresa"],
  data() {
    return {
      categorias: [],
      categoriasSelect: [],
      titol:"",
      descripcio:"",
      ubicacio:"",
      categoria:"",
      idCategoria:0,
      empresaSinActualizar: null,
      modificado: false
    };
  },
  updated(){
    if(this.modo==2){
      this.getOfertaById();
      this.modo = 0;
    }
  },
  mounted(){
    console.log(this.modo);
    this.getCategorias();
  },
  methods: {
    clickCancelar() {
      this.titol = "";
      this.descripcio = "";
      this.ubicacio = "";
      this.categoria = null;
      this.$emit("crearOferta", false);
    },
    clickCrear() {
      this.createOferta();
      this.clickCancelar();
    },
    async createOferta(){
      for(let i = 0; i<this.categorias.length; i++){
        if(this.categoria == this.categorias[i].nom)
          this.idCategoria = this.categorias[i].id;
      }

      await axios.post("http://localhost:8080/ofertes/crear", 
        {
          titol : this.titol,
          descripcio : this.descripcio,
          ubicacio : this.ubicacio,
          categoria : {id : this.idCategoria, nombre : this.categoria},
          empresa : this.empresa
        }
      );

      this.titol = "";
      this.descripcio = "";
      this.ubicacio = "";
      this.categoria = null;
    },
    async getCategorias(){
      let res = await axios.get("http://localhost:8080/categories/");

      this.categorias = res.data;

      for(let i=0; i<res.data.length; i++)
        this.categoriasSelect.push(res.data[i].nom);
        console.log(this.categoriasSelect);
    },
    async getOfertaById(){
      let res = await axios.get("http://localhost:8080/ofertes/" + this.idOferta);

      if(res.data != null)
        this.titol = res.data.titol;
        this.descripcio = res.data.descripcio;
        this.ubicacio = res.data.ubicacio;
        this.empresaSinActualizar = res.data.empresa;
        this.categoria = res.data.categoria.nom;
    },
    async clickActualizar(){
      for(let i = 0; i<this.categorias.length; i++){
        if(this.categoria == this.categorias[i].nom)
          this.idCategoria = this.categorias[i].id;
      }

      let res = await axios.put("http://localhost:8080/ofertes/actualizar/" + this.idOferta, 
      {
        titol : this.titol,
        descripcio : this.descripcio,
        ubicacio : this.ubicacio,
        categoria : {id : this.idCategoria, nombre : this.categoria},
      }
      );

      console.log(res.data);
    },
  },
};
</script>