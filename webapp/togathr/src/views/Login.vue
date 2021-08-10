<template>
    <section class="section">
        <h1 class="title">Log in</h1>
        <h2 class="subtitle mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</h2>
    </section>
    <section class="section">
        <login-form></login-form>
    </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import LoginForm from '../components/LoginForm.vue';

export default defineComponent({
    components: {
        LoginForm,
    },
});
</script>
<style lang="scss"></style>
