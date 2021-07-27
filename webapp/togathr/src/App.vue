<template>
    <navbar />
    <div class="columns is-gapless">
        <div class="column">
            <router-view></router-view>
        </div>
    </div>
    <!-- <bottom-actionbar /> TODO: only displayed when logged in-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BottomActionbar from "./components/BottomActionbar.vue";
import Navbar from "./components/Navbar.vue";

export default defineComponent({
    name: "App",
    components: {
        BottomActionbar,
        Navbar,
    },
});
</script>

<style lang="scss"></style>
