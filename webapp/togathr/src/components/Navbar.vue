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
                <div class="navbar-item" v-if="!isLoggedIn">
                    <div class="buttons">
                        <router-link class="button is-light" to="/login">Log in</router-link>
                        <router-link class="button is-info" to="/signup">Sign up</router-link>
                    </div>
                </div>
                <div class="navbar-item has-dropdown is-hoverable" v-if="isLoggedIn">
                    <a class="navbar-link is-arrowless">
                        <i class="far fa-fw fa-2x fa-user-circle"></i>
                    </a>

                    <div class="navbar-dropdown is-right">
                        <a class="navbar-item">Profile</a>
                        <hr class="navbar-divider" />
                        <div class="navbar-item is-clickable" @click="signout">Sign out</div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
<script lang="ts">
import { defineComponent, ref, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { store } from '../store';
import { supabase } from '../supabase';

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
    setup() {
        const router = useRouter();
        const isLoggedIn = ref(false);

        watch(
            () => store.user,
            (value, prevValue) => {
                isLoggedIn.value = value !== null;
                console.log(isLoggedIn);
            }
        );

        async function signout() {
            console.log('signing out');
            try {
                let { error } = await supabase.auth.signOut();
                if (error) {
                    // TODO: show toaster with error message
                } else {
                    router.push({ path: '/login' });
                }
            } catch (error) {
                console.log(error);
                // TODO: show toaster with error message
            }
        }

        return {
            isLoggedIn,
            signout,
        };
    },
});
</script>
<style lang="scss"></style>
