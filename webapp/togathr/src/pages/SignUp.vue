<template>
    <div class="columns mt-3 mx-3">
        <div class="column is-half is-offset-one-quarter box">
            <section class="section pb-4">
                <figure class="image is-2by1 mx-auto mb-4">
                    <img src="../assets/sign_up.svg" alt="" />
                </figure>
                <h1 class="title">Sign up</h1>
                <h2 class="subtitle mt-1">Sign up for free to get started planning together!</h2>
            </section>
            <section class="section pt-4">
                <div class="field is-grouped" id="alt-sign-up-options">
                    <p class="control">
                        <button class="button">
                            <span class="icon">
                                <img
                                    class="google-icon"
                                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                />
                            </span>
                            <span>Google</span>
                        </button>
                    </p>
                    <p class="control">
                        <button class="button">
                            <span class="icon">
                                <i class="fab fa-apple fa-lg"></i>
                            </span>
                            <span>Apple</span>
                        </button>
                    </p>
                </div>
                <hr />
                <p class="my-3 has-text-grey-light">Or with your email address</p>
                <sign-up-form />
                <p class="mt-2">Already have an account? <router-link to="/login">Login</router-link></p>
            </section>
        </div>
    </div>
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
