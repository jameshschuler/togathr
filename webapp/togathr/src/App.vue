<template>
    <navbar />
    <main class="container is-fluid px-0">
        <div class="columns mb-3">
            <side-navigation class="column is-2 is-hidden-touch" v-if="isLoggedIn" />
            <router-view class="column" :class="isLoggedIn ? 'is-10' : 'is-12'"></router-view>
        </div>
    </main>
    <bottom-actionbar v-if="isLoggedIn" />
    <app-footer></app-footer>
</template>

<script lang="ts">
import { store } from './store';
import { defineComponent, watch, ref } from 'vue';
import AppFooter from './components/AppFooter.vue';
import BottomActionbar from './components/BottomActionbar.vue';
import Navbar from './components/Navbar.vue';
import SideNavigation from './components/SideNavigation.vue';
import { supabase } from './supabase';
import { AuthChangeEvent } from '@supabase/gotrue-js';
import { Session } from '@supabase/supabase-js';

export default defineComponent({
    name: 'App',
    components: {
        BottomActionbar,
        AppFooter,
        Navbar,
        SideNavigation,
    },
    setup() {
        const isLoggedIn = ref(false);

        store.user = supabase.auth.user();
        supabase.auth.onAuthStateChange((_: AuthChangeEvent, session: Session | null) => {
            store.user = session?.user || null;
        });

        watch(
            () => store.user,
            (value, prevValue) => {
                isLoggedIn.value = value !== null;
            }
        );

        return {
            isLoggedIn,
        };
    },
});
</script>

<style lang="scss">
* {
    box-sizing: border-box;
}

.columns,
.columns:last-child {
    margin: 0;
}

body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

#app {
    flex: 1;
    display: flex;
    flex-direction: column;
}
</style>
