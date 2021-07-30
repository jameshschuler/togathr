<template>
    <navbar />
    <div class="columns">
        <div class="column is-10 is-offset-1 is-12-mobile">
            <router-view></router-view>
        </div>
    </div>
    <!-- <bottom-actionbar /> TODO: only displayed when logged in-->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BottomActionbar from './components/BottomActionbar.vue';
import Navbar from './components/Navbar.vue';

export default defineComponent({
    name: 'App',
    components: {
        BottomActionbar,
        Navbar,
    },
});
</script>

<style lang="scss"></style>
