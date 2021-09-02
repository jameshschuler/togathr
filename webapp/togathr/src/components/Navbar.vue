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
                <div
                    class="navbar-item has-dropdown"
                    :class="{ 'is-active': isDropdownActive }"
                    v-if="isLoggedIn"
                    @click="toggleDropdown()"
                >
                    <a class="navbar-link is-arrowless">
                        <i class="far fa-fw fa-2x fa-user-circle"></i>
                    </a>

                    <div class="navbar-dropdown is-right">
                        <div
                            class="navbar-item is-size-5 is-flex is-justify-content-space-between is-align-items-center"
                        >
                            <span>Profile</span>
                            <span>
                                <i class="fas fa-fw fa-user-alt"></i>
                            </span>
                        </div>
                        <hr class="navbar-divider" />
                        <div
                            class="
                                navbar-item
                                is-clickable is-size-5 is-flex is-justify-content-space-between is-align-items-center
                            "
                            @click="signout"
                        >
                            <span>Sign out</span>
                            <span>
                                <i class="fas fa-fw fa-sign-out-alt"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { signOut } from '../services/accountService';
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
        const isDropdownActive = ref(false);

        watch(
            () => store.user,
            (value, prevValue) => {
                isLoggedIn.value = value !== null;
            }
        );

        async function signout() {
            let error = await signOut();
            if (error) {
                // TODO: show toaster with error message
            } else {
                router.push({ path: '/login' });
            }
        }

        function toggleDropdown() {
            isDropdownActive.value = !isDropdownActive.value;
        }

        return {
            isDropdownActive,
            isLoggedIn,
            signout,
            toggleDropdown,
        };
    },
});
</script>
<style lang="scss" scoped>
.navbar-dropdown {
    width: 200px;
}
</style>
