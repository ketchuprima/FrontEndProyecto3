<template>
  <v-simple-table style="width:100%;">
    <template v-slot:default>
      <thead>
        <tr>
          <th
            v-for="categoria in categorias"
            :key="categoria.nombre"
            class="text-center"
          >
            {{ categoria.nombre }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr >
          <td v-for="categoria in categorias" :key="categoria">{{ categoria.cantidad }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
export default {
  name: "tabla",
  data() {
    return {
      categorias: [
        { nombre: "DAW", cantidad: 50 },
        { nombre: "ASIX", cantidad: 20 },
        { nombre: "DAM", cantidad: 100 },
        { nombre: "SMX", cantidad: 4 },
      ],
    };
  },
};
</script>