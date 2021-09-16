<template>
    <navbar />
    <div class="columns">
        <side-navigation class="column is-3 is-hidden-touch" v-if="isLoggedIn" />
        <router-view class="column is-9" :class="isLoggedIn ? 'is-9' : 'is-12'"></router-view>
    </div>
    <bottom-actionbar v-if="isLoggedIn" />
</template>

<script lang="ts">
import { store } from './store';
import { defineComponent, watch, ref } from 'vue';
import BottomActionbar from './components/BottomActionbar.vue';
import Navbar from './components/Navbar.vue';
import { supabase } from './supabase';
import { AuthChangeEvent } from '@supabase/gotrue-js';
import { Session } from '@supabase/supabase-js';
import SideNavigation from './components/SideNavigation.vue';

export default defineComponent({
    name: 'App',
    components: {
        BottomActionbar,
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
</style>
