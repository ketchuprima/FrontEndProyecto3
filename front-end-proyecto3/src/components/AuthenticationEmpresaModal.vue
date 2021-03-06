<template>
  <div id="app">
    <v-app>
      <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
        <AlertError v-if="message != null" :message="message"></AlertError>

        <div>
          <v-tabs
            v-model="tab"
            show-arrows
            background-color="#505050"
            icons-and-text
            dark
            grow
          >
            <v-tabs-slider color="blue"></v-tabs-slider>
            <v-tab v-for="i in tabs" :key="i">
              <v-icon large>{{ i.icon }}</v-icon>
              <div class="caption py-1">{{ i.name }}</div>
            </v-tab>

            <v-tab-item>
              <v-card class="px-4">
                <v-card-text>
                  <v-form ref="registerForm" v-model="valid" lazy-validation>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="firstName"
                          :rules="[rules.required]"
                          label="Nombre"
                          maxlength="20"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="lastName"
                          :rules="[rules.required]"
                          label="Apellidos"
                          maxlength="40"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="email"
                          :rules="emailRules"
                          label="Correo Electronico"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="nomEmpresa"
                          :rules="[rules.required]"
                          label="Nombre de la empresa"
                          maxlength="40"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="tipus"
                          :rules="[rules.required]"
                          label="Tipus de la empresa"
                          maxlength="40"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="emailContacto"
                          :rules="emailRules"
                          label="Correo Electronico Para el envio de CV"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="telefono"
                          :rules="[rules.required]"
                          label="Numero de telefono"
                          maxlength="12"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="password"
                          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, rules.min]"
                          :type="show2 ? 'text' : 'password'"
                          name="input-10-1"
                          label="Contraseña"
                          hint="At least 8 characters"
                          counter
                          @click:append="show2 = !show2"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          block
                          v-model="verify"
                          :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, passwordMatch]"
                          :type="show3 ? 'text' : 'password'"
                          name="input-10-1"
                          label="Confirmar Contraseña"
                          counter
                          @click:append="show3 = !show3"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="3" xsm="12" align-end>
                        <v-btn
                          x-large
                          block
                          color="blue"
                          tile
                          @click="cancelar"
                        >
                          <z class="textColorWhite">Cancelar</z>
                        </v-btn>
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                        <v-btn
                          x-large
                          block
                          :disabled="!valid"
                          color="blue"
                          tile
                          @click="signup"
                          ><z class="textColorWhite">Sign Up</z></v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </div>
      </v-dialog>
    </v-app>
  </div>
</template>
<script>
import axios from "axios";
import AlertError from "./AlertError.vue";

export default {
  name: "AuthenticationModal",
  computed: {
    passwordMatch() {
      return () =>
        this.password === this.verify || "Las contraseñas deben coincidir";
    },
  },
    components: {
    AlertError,
  },
  props: ["dialog"],
  methods: {
    async signup() {
      if (this.$refs.registerForm.validate()) {
        let res = await axios.post(
          "http://localhost:8080/auth/signup",
          {
            email: this.email,
            pass: this.password,
            nom: this.firstName,
            cognoms: this.lastName,
            telefon: this.telefono,
            nomEmpresa: this.nomEmpresa,
            tipus: this.tipus,
            logo: "logo.png",
            correu: this.emailContacto,
          },
          { params: { empresa: "empresa" } }
        );
        if (res.data.message == "El usuario ha sido registrado correctamente" || res.data.message == "Usuario y empresa creados correctamente")
          location.reload();
        else this.message = res.data.message;
      }
    },
    async login() {
      if (this.$refs.loginForm.validate()) {
        let res = await axios.post("http://localhost:8080/auth/signin", {
          email: this.loginEmail,
          pass: this.loginPassword,
        });
        if (res.data.accessToken != null) {
          localStorage.setItem("accessToken", res.data.accessToken);
          location.reload();
        } else {
          alert("El usuario o la contraseña son incorrectos");
        }
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    cancelar() {
      this.telefono = null;
      this.firstName = null;
      this.lastName = null;
      this.email = null;
      this.password = null;
      this.verify = null;
      this.nomEmpresa = null;
      this.tipus = null;
      this.emailContacto = null;
      this.message =null;
      this.$emit("cerrarModal");
    },
  },
  data: () => ({
    tab: 0,
    tabs: [{ name: "Register", icon: "mdi-account-outline" }],
    valid: true,

    firstName: "",
    nomEmpresa: "",
    tipus: "",
    emailContacto: "",
    lastName: "",
    email: "",
    password: "",
    telefon: "",
    verify: "",
    emailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],

    show1: false,
    show2: false,
    show3: false,
    message: null,

    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => (v && v.length >= 8) || "Min 8 characters",
    },
  }),
};
</script>