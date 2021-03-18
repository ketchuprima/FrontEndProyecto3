<template>
  <v-app-bar app>
    <v-img
      max-height="60"
      max-width="60"
      src="https://cdn.pixabay.com/photo/2017/02/15/00/48/logo-2067396_960_720.png"
    ></v-img>
    <v-spacer></v-spacer>
    <v-btn class="ma-1" plain @click="login"> Log In </v-btn>
    <v-btn class="ma-1" plain @click="login"> Sign Up </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  name: "AppBar",
  data() {
    return {};
  },
};
</script>