<template>
    <header class="header-global">
        <base-nav class="navbar-main" transparent type="" effect="light" expand>

            <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
                <li class="nav-item">
                    <a class="nav-link" href="#" data-toggle="tooltip" title="Star us on Github">

                        <span class="nav-link-inner--text">Home</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" data-toggle="tooltip" title="Star us on Github">

                        <span class="nav-link-inner--text">Feature</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" data-toggle="tooltip" title="Star us on Github">

                        <span class="nav-link-inner--text">Documentation</span>
                    </a>
                </li>
            </ul>
            <ul class="navbar-nav align-items-lg-center ml-lg-auto">
                <li class="nav-item">
                    <a class="nav-link nav-link-icon" href="https://www.facebook.com/" target="_blank"
                       data-toggle="tooltip" title="Like us on Facebook">
                        <i class="fa fa-facebook-square"></i>
                        <span class="nav-link-inner--text d-lg-none">Facebook</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-link-icon" href="https://www.instagram.com/"
                       target="_blank" data-toggle="tooltip" title="Follow us on Instagram">
                        <i class="fa fa-instagram"></i>
                        <span class="nav-link-inner--text d-lg-none">Instagram</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-link-icon" href="https://twitter.com/" target="_blank"
                       data-toggle="tooltip" title="Follow us on Twitter">
                        <i class="fa fa-twitter-square"></i>
                        <span class="nav-link-inner--text d-lg-none">Twitter</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-link-icon" href="https://github.com/intelligo-systems"
                       target="_blank" data-toggle="tooltip" title="Star us on Github">
                        <i class="fa fa-github"></i>
                        <span class="nav-link-inner--text d-lg-none">Github</span>
                    </a>
                </li>

            </ul>
        </base-nav>
    </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown
  }
};
</script>
<style>
</style>
