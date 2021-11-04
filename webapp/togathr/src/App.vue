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
import { store } from './store';
import { defineComponent, watch, ref } from 'vue';
import AppFooter from './components/AppFooter.vue';
import BottomActionbar from './components/BottomActionbar.vue';
import Navbar from './components/Navbar.vue';
import SideNavigation from './components/SideNavigation.vue';
import { supabase } from './supabase';
import { AuthChangeEvent } from '@supabase/gotrue-js';
import { Session } from '@supabase/supabase-js';
import { SessionUser } from './models/response/supabase';
import { updateProfile } from './services/profileService';

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
        supabase.auth.onAuthStateChange(async (_: AuthChangeEvent, session: Session | null) => {
            const user = session?.user as SessionUser;
            if (user && user.identities) {
                const identity = user.identities.find((e) => e.provider === 'google');

                if (identity) {
                    const { avatar_url, full_name, picture } = identity.identity_data;
                    const [firstName, lastName] = full_name.split(' ');

                    const response = await updateProfile({
                        avatarUrl: avatar_url,
                        firstName: firstName,
                        fullName: full_name,
                        lastName: lastName,
                        picture: picture,
                        userId: session!.user!.id,
                    });
                }
            } else {
                // TODO: should still create row in profile table
                // TODO: add default avatar image to storage and use that for avatar_url
            }

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
