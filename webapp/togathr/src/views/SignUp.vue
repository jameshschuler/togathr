<template>
    <section class="section is-small">
        <h1 class="title">Sign up</h1>
        <h2 class="subtitle mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</h2>
    </section>
    <section class="section is-small">
        <sign-up-form />
    </section>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import SignUpForm from '../components/SignUpForm.vue';

export default defineComponent({
    components: {
        SignUpForm,
    },
});
</script>

<style scoped></style>
