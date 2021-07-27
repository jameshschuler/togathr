<template>
    <nav class="navbar" role="navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="https://bulma.io">
                <img
                    src="https://bulma.io/images/bulma-logo.png"
                    width="112"
                    height="28"
                />
            </a>

            <a
                role="button"
                class="navbar-burger"
                :class="{ 'is-active': isActive }"
                @click="toggleMobileMenu"
            >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div
            id="navbarBasicExample"
            class="navbar-menu"
            :class="{ 'is-active': isActive }"
        >
            <div class="navbar-start">
                <a class="navbar-item">About</a>
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
                        <a class="button is-primary">
                            <strong>Sign up</strong>
                        </a>
                        <a class="button is-light"> Log in </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
<script lang="ts">
import { defineComponent } from "vue";
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
