<template>
    <div class="dropdown is-right" :class="{ 'is-active': isDropdownActive }" @click="toggleDropdown()">
        <div class="dropdown-trigger">
            <button class="button is-ghost" aria-haspopup="true" aria-controls="dropdown-menu">
                <span><i class="far fa-fw fa-2x fa-user-circle"></i></span>
            </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
                <router-link to="/profile" class="dropdown-item">
                    <span class="icon-text">
                        <span class="icon">
                            <i class="fas fa-fw fa-user-alt"></i>
                        </span>
                        <span>Profile</span>
                    </span>
                </router-link>
                <hr class="dropdown-divider" />
                <a class="dropdown-item" @click="signout">
                    <span class="icon-text">
                        <span class="icon">
                            <i class="fas fa-fw fa-sign-out-alt"></i>
                        </span>
                        <span>Sign out</span>
                    </span>
                </a>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { signOut } from '../services/accountService';

export default defineComponent({
    setup() {
        const router = useRouter();
        const isDropdownActive = ref(false);

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
