<template>
    <section class="section is-small">
        <h2 class="title">Sign up</h2>
        <sign-up-form />
    </section>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import SignUpForm from "../components/SignUpForm.vue";

export default defineComponent({
    components: {
        SignUpForm,
    },
});
</script>

<style scoped></style>
