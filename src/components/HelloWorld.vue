<template>
  <div class="row bg-grey-2" style="height:100vh">

    <!--Right Block -->
    <div class="col ">
      <div class="column justify-center" style="height:100vh">
        <div class="col-6 ">
          <div class="row justify-center full-height">
            <div class="col-7 " style="min-width:40vh">
              <div class="column full-height">
                <!----Form Header----->
                <div class="col-2 ">
                  <!-----Logo part----->
          
                  <!----Form Heading--->
                  <div class="text-center header q-mt-md">
                    <div class=" text-h4 text-bold">
                      Admin Login
                    </div>
                  </div>
                </div>
                <!----SignUp Form----->
                <div class="col-8 q-mt-lg  ">
                  <form
                    @submit="onSubmit"
                    class="text-grey-10 q-mt-lg q-px-md"
                  >
                    <div class="q-mt-xs">
                      <div class=" text-subtitle ">Email*</div>
                      <input
                        outlined
                        dense
                        lazy-rules
                        type="text"
                        class="q-mt-xs "
                        v-model="admin.email"
                        :rules="[
                          val => !!val || 'Email is Required',
                          isValidEmail
                        ]"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div class="q-mt-xs">
                      <div class=" text-subtitle">Password*</div>
                      <input
                        outlined
                        dense
                        lazy-rules
                        type="password"
                        class="q-mt-xs "
                        v-model="admin.password"
                        :rules="[val => !!val || 'Password is Required']"
                        placeholder="Enter password"
                      />
                    </div>
            
    <button @click="AuthProvider('facebook')"> Facebook</button>
    <button @click="AuthProvider('google')">Google</button>
         


                  </form>
                  <!-- Forgot Password -->
                  <!-- <div class="text-center q-mt-lg text-green-14 cursor-pointer">
                    <div>
                      Forgot Password ?
                    </div>
                  </div> -->
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Vue from "vue";
import VueAxios from "vue-axios";
import VueSocialauth from "vue-social-auth";
import axios from "axios";
import hello from "hellojs";


Vue.use(VueAxios, axios);
Vue.use(VueSocialauth, {
  providers: {
    facebook: {
      clientId: "659715154536727",
      redirectUri:
        "http://cryptic-bayou-98994.herokuapp.com/api/user/login/facebook"
    },
    google: {
      clientId:
        "851572370898-mbc7j99jvme4hvkea5326be433guiu0l.apps.googleusercontent.com",
      redirectUri:
        "https://lvkos.csb.app"
    }
  }
});
export default {
  name: 'HelloWorld',
  data() {
    return {
      admin: {
        email: '',
        password: ''
      }
    }
  },

  methods: {
    ...mapActions(['signIn']),
    isValidEmail(val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/

      return emailPattern.test(val) || 'Invalid email'
    },
    onSubmit() {
      const { signIn, admin } = this
      signIn(admin)
    },
    helogin() {
      hello("google").login()
    },
    AuthProvider(provider) {
      var self = this;

      this.$auth.authenticate(provider).then(response => {
        console.log(response);
        self.SocialLogin(provider,response)
          }).catch(err => {
            console.log({err:err})
        
      });
    },

    SocialLogin(provider, response) {
      this.$http
        .post("https://cryptic-bayou-98994.herokuapp.com/api/user/login/" + provider+'/callback', response)
        .then(response => {
          console.log(response.data);
        })
        .catch(err => {
          console.log({ err: err });
        });
    }
  }
}
</script>
<style lang="scss">

</style>
