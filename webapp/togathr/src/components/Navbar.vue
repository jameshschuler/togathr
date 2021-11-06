<template>
    <nav
        class="px-2 py-1 has-background-info-light is-flex is-justify-content-space-between is-align-items-center"
        role="navigation"
    >
        <router-link class="navbar-item is-size-3" to="/">Togathr</router-link>
        <div>
            <nav-dropdown v-if="isLoggedIn" />
            <div class="buttons mr-2" v-if="!isLoggedIn">
                <router-link class="button is-white" to="/login">Log in</router-link>
                <router-link class="button is-info" to="/signup" style="color: white !important">Sign up</router-link>
            </div>
        </div>
    </nav>
</template>
<script lang="ts">
import { isNullOrUndefined } from '../utils/common';
import { defineComponent, ref, watch } from 'vue';
import { store } from '../store';
import NavDropdown from './NavDropdown.vue';

export default defineComponent({
    components: { NavDropdown },
    setup() {
        const isLoggedIn = ref(false);

        watch(
            () => store.user,
            (value, prevValue) => {
                isLoggedIn.value = !isNullOrUndefined(value);
            }
        );

        return {
            isLoggedIn,
        };
    },
});
</script>
<style lang="scss"></style>
