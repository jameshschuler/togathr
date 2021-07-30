<template>
    <nav class="navbar is-success" role="navigation">
        <div class="navbar-brand is-align-items-center is-justify-content-space-between">
            <router-link class="navbar-item is-size-3" to="/">Togathr</router-link>
            <div class="is-flex is-align-items-center">
                <router-link class="button is-hidden-desktop" to="/signup">Sign up</router-link>
                <a role="button" class="navbar-burger" :class="{ 'is-active': isActive }" @click="toggleMobileMenu">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
        </div>

        <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': isActive }">
            <div class="navbar-start">
                <!-- <a class="navbar-item">About</a> -->
                <!-- <a class="navbar-item">
        Home
      </a>

      <a class="navbar-item">
        Documentation
      </a> -->
            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <router-link class="button is-light" to="/signup">Sign up</router-link>
                        <router-link class="button is-light" to="/login">Log in</router-link>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    data() {
        return {
            isActive: false,
        };
    },
    methods: {
        toggleMobileMenu() {
            this.isActive = !this.isActive;
        },
    },
});
</script>
<style lang="scss"></style>
