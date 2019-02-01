<template>
    <div id="app">
        <router-view name="header"></router-view>
        <main>
            <fade-transition origin="center" mode="out-in" :duration="250">
                <router-view/>
            </fade-transition>
        </main>
        <router-view name="footer"></router-view>
    </div>
</template>
<script>
import { FadeTransition } from "vue2-transitions";

export default {
  components: {
    FadeTransition
  }
};
</script>

<style>
  @import "../node_modules/font-awesome/css/font-awesome.min.css";
  @import "./assets/vendor/nucleo/css/nucleo.css";
</style>

<style lang="scss">
@import "./assets/scss/argon";
</style>
