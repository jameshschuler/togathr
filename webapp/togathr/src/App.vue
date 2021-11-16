<template>
    <navbar />
    <main class="container is-fluid px-0" id="main" :class="isLoggedIn && 'include-bottom-spacing'">
        <div class="columns mb-3">
            <side-navigation class="column is-2 is-hidden-touch" v-if="isLoggedIn" />
            <router-view class="column is-12-touch" :class="isLoggedIn ? 'is-10-desktop' : 'is-12'"></router-view>
        </div>
    </main>
    <bottom-actionbar v-if="isLoggedIn" />
    <app-footer></app-footer>
</template>

<script lang="ts">
import store from './store';
import { defineComponent, watch, ref, onMounted } from 'vue';
import AppFooter from './components/AppFooter.vue';
import BottomActionbar from './components/BottomActionbar.vue';
import Navbar from './components/Navbar.vue';
import SideNavigation from './components/SideNavigation.vue';
import { supabase } from './supabase';
import { AuthChangeEvent } from '@supabase/gotrue-js';
import { Session } from '@supabase/supabase-js';
import { AppUser } from './models/response/supabase';
import { getProfile, updateProfile } from './services/profileService';
import { isNullOrUndefined } from './utils/common';

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

        onMounted(() => {
            const user = supabase.auth.user();
            if (user) {
                store.methods.setUser({ ...user });
            } else {
                store.methods.setUser(null);
            }
        });

        // TODO: need to make sure a profile is loaded before rendering certain routes
        supabase.auth.onAuthStateChange(async (_: AuthChangeEvent, session: Session | null) => {
            const user = session?.user as AppUser;
            if (user) {
                const response = await getProfile(user.id);

                store.methods.setProfile(response.payload ?? null);
                store.methods.setUser(user);
            } else {
                store.methods.setUser(null);
            }
        });

        watch(
            () => store.state.user,
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

<style lang="scss">
@import 'bulma/sass/utilities/mixins.sass';

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

.include-bottom-spacing {
    @include touch {
        margin-bottom: 5rem;
    }
}

.w-50 {
    width: 50%;
}

.w-75 {
    width: 75%;
}

.w-100 {
    width: 100%;
}
</style>
