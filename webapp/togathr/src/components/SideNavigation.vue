<template>
    <aside class="menu">
        <p class="menu-label">Welcome!</p>
        <ul class="menu-list">
            <li class="is-size-5"><router-link to="/feed">Feed</router-link></li>
            <li class="is-size-5"><router-link to="/events">Events</router-link></li>
            <li><hr /></li>
            <li class="is-size-5"><router-link to="/settings">Settings</router-link></li>
        </ul>
    </aside>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
<style lang="scss"></style>
