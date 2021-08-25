<template>
    <navbar />
    <router-view></router-view>
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

<style lang="scss">
* {
    box-sizing: border-box;
}
.columns,
.columns:last-child {
    margin: 0;
}
</style>
