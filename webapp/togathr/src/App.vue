<template>
    <navbar />
    <router-view></router-view>
    <!-- <bottom-actionbar /> TODO: only displayed when logged in-->
</template>

<script lang="ts">
import { store } from './store';
import { defineComponent } from 'vue';
import BottomActionbar from './components/BottomActionbar.vue';
import Navbar from './components/Navbar.vue';
import { supabase } from './supabase';
import { AuthChangeEvent } from '@supabase/gotrue-js';
import { Session } from '@supabase/supabase-js';

export default defineComponent({
    name: 'App',
    components: {
        BottomActionbar,
        Navbar,
    },
    setup() {
        store.user = supabase.auth.user();
        supabase.auth.onAuthStateChange((_: AuthChangeEvent, session: Session) => {
            store.user = session?.user || null;
        });
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
