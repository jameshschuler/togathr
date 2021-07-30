<template>
    <section class="section">
        <figure class="image is-128x128 mx-auto">
            <img src="../assets/confirmation_email_sent.svg" alt="" />
        </figure>
        <h1 class="title mt-2 has-text-centered">Welcome to Togathr!</h1>
        <p class="subtitle mt-1 has-text-centered">
            We have sent an email to <strong>{{ email }}</strong> in order to verify your account.
        </p>
    </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
    setup() {
        const route = useRoute();
        const email = route.query.email;

        if (!email) {
            // TODO: redirect to login page
            useRouter().push('login');
        }

        return {
            email,
        };
    },
});
</script>
<style lang="scss"></style>
