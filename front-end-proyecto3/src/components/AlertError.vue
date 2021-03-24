<template>
    <v-alert prominent type="error">
          <v-row align="center">
            <v-col class="grow">
              {{message}}
            </v-col>
          </v-row>
        </v-alert>
</template>
<script>
export default {
    name:"AlertError",
   props:['message'],
   data () {
    return {
      type: null,
      elapse: null
    }
   },
   updated(){
     
      let timer = this.showAlert.timer
      if (timer) {
        clearTimeout(timer)
      }
      this.showAlert.timer = setTimeout(() => {
          this.type = null
      }, 3000)
      
      this.elapse = 1 
      let t = this.showAlert.t
      if (t) {
        clearInterval(t)
      }
      
      this.showAlert.t = setInterval(() => {
        if (this.elapse === 3) {
          this.elapse = 0
          clearInterval(this.showAlert.t)
        }
        else {
          this.elapse++
        }
      }, 1000)
   }
}
</script>