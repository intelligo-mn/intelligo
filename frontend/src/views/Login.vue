<template>
    <section class="section section-shaped section-lg my-0" id="particles-js">
        <div class="shape shape-style-1 bg-gradient-default">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <card type="secondary" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <template>
                            <div class="text-muted text-center mb-3">
                                <small>Sign in with</small>
                            </div>
                            <div class="btn-wrapper text-center">
                                <base-button type="neutral">
                                    <img slot="icon" src="../assets/images/icons/common/github.svg">
                                    Github
                                </base-button>

                                <base-button type="neutral">
                                    <img slot="icon" src="../assets/images/icons/common/google.svg">
                                    Google
                                </base-button>
                            </div>
                        </template>
                        <template>
                            <div class="text-center text-muted mb-4">
                                <small>Or sign in with credentials</small>
                            </div>
                            <form role="form">
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Username"
                                            v-model="model.username"
                                            addon-left-icon="ni ni-email-83">
                                </base-input>
                                <base-input alternative
                                            type="password"
                                            placeholder="Password"
                                            v-model="model.password"
                                            addon-left-icon="ni ni-lock-circle-open">
                                </base-input>
                                <base-checkbox>
                                    Remember me
                                </base-checkbox>
                                <div class="text-center">
                                    <base-button type="primary" class="my-4" v-on:click="login">Sign In</base-button>
                                </div>
                                {{ loading }}
                                {{ status }}
                            </form>
                        </template>
                    </card>
                    <div class="row mt-3">
                        <div class="col-6">
                            <a href="#" class="text-light">
                                <small>Forgot password?</small>
                            </a>
                        </div>
                        <div class="col-6 text-right">
                            <a href="#" class="text-light">
                                <small>Create new account</small>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      model: {
        username: "",
        password: "",
      },
      loading: "",
      status: ""
    };
  },
  methods: {
    login() {

      const formData = {username: this.model.username, password:this.model.password};

      this.loading = "Signing in";
      // Post to server
      axios.post("http://localhost:8080/api/console/login", formData).then(res => {

        this.loading = "";
        if (res.data.status == true) {
          // store the data in localStorage
          localStorage.setItem("user", JSON.stringify(res.data.user));
          // now send the user to the next route
          this.$router.push({
            name: "admin"
          });
        } else {
          this.status = res.data.message;
        }
      });
    }
  }
};
</script>
<style>
</style>
