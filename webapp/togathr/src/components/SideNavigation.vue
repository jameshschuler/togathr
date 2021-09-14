<template>
    <aside class="menu">
        <p class="menu-label">Welcome!</p>
        <ul class="menu-list">
            <li><router-link to="/feed">Feed</router-link></li>
            <li><router-link to="/events">Events</router-link></li>
            <li><hr /></li>
            <li><router-link to="/settings">Settings</router-link></li>
        </ul>
    </aside>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
<style lang="scss"></style>
