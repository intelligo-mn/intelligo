<template>
    <section class="section section-shaped section-lg my-0">
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
                                <small>Or sign up with credentials</small>
                            </div>
                            <form role="form" @submit.prevent="register">
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Name"
                                            v-model="model.username"
                                            addon-left-icon="ni ni-hat-3">
                                </base-input>
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Email"
                                            type="email"
                                            v-model="model.email"
                                            addon-left-icon="ni ni-email-83">
                                </base-input>
                                <base-input alternative
                                            type="password"
                                            placeholder="Password"
                                            v-model="model.password"
                                            addon-left-icon="ni ni-lock-circle-open">
                                </base-input>
                                <base-input alternative
                                            type="password"
                                            placeholder="Comfirm password"
                                            v-model="model.repassword"
                                            addon-left-icon="ni ni-lock-circle-open">
                                </base-input>
                                <!-- <div class="text-muted font-italic">
                                    <small>password strength:
                                        <span class="text-success font-weight-700">strong</span>
                                    </small>
                                </div> -->
                                <base-checkbox>
                                    <span>I agree with the
                                        <a href="#">Privacy Policy</a>
                                    </span>
                                </base-checkbox>
                                <div class="text-center">
                                    <base-button type="primary" class="my-4" v-on:click="register">Create account</base-button>
                                </div>
                                {{ loading }}
                                {{ status }}
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </section>
</template>
<script>

import axios from "axios";
export default {
  name: "register",
  data() {
    return {
      model: {
        username: "",
        email: "",
        password: "",
        repassword: ""
      },
      loading: "",
      status: ""
    };
  },
  methods: {
    validate() {
      // checks all the form params are set and the passwords match
      if (this.model.password != this.model.repassword) {
        return false;
      }
      return true;
    },
    register() {
      let valid = this.validate();
      if (valid) {
        const formData = {username: this.model.username, email:this.model.email, password:this.model.password};
        console.log(this.model.username);
        this.loading = "Registering you, please wait";
        // Post to server
        axios.post("http://localhost:8080/api/console/register", formData).then(res => {
          // Post a status message
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
      } else {
        this.status = "Passwords do not match";
      }
    }
  }
};
</script>
<style>
</style>
