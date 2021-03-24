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
                  <v-form ref="loginForm" v-model="valid" lazy-validation>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="loginEmail"
                          :rules="loginEmailRules"
                          label="Correo Electronico"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="loginPassword"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, rules.min]"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          label="Contraseña"
                          hint="Como minimo 8 caracteres"
                          counter
                          @click:append="show1 = !show1"
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
                          <z class="textColorWhite"> Cancelar </z>
                        </v-btn>
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                        <v-btn
                          x-large
                          block
                          :disabled="!valid"
                          color="blue"
                          tile
                          @click="login"
                        >
                          <z class="textColorWhite"> Login </z>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-tab-item>
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
import AlertError from "./AlertError.vue";
import axios from "axios";
export default {
  name: "AuthenticationModal",
  components: {
    AlertError,
  },
  computed: {
    passwordMatch() {
      return () =>
        this.password === this.verify || "Las contraseñas deben coincidir";
    },
  },

  props: ["dialog"],
  data: () => ({
    tab: 0,
    tabs: [
      { name: "Login", icon: "mdi-account" },
      { name: "Register", icon: "mdi-account-outline" },
    ],
    valid: true,
    telefono: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verify: "",
    loginPassword: "",
    loginEmail: "",
    loginEmailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "El email tiene que ser valido",
    ],
    emailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "El email tiene que ser valido",
    ],

    show1: false,
    show2: false,
    show3: false,
    message: null,
    rules: {
      required: (value) => !!value || "Requerido.",
      min: (v) => (v && v.length >= 8) || "Minimo 8 caracteres",
    },
  }),

  methods: {
    cancelar() {
      (this.telefono = null),
        (this.firstName = null),
        (this.lastName = null),
        (this.email = null),
        (this.password = null),
        (this.verify = null),
        (this.loginPassword = null),
        (this.loginEmail = null),
        this.message =null;
        this.$emit("cerrarModal");
    },
    async signup() {
      if (this.$refs.registerForm.validate()) {
        let res = await axios.post("http://localhost:8080/auth/signup", {
          email: this.email,
          pass: this.password,
          nom: this.firstName,
          cognoms: this.lastName,
          telefon: this.telefono,
        });
        if (res.data.message == "El usuario ha sido registrado correctamente")
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
          this.message = res.data.message;
        }
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>