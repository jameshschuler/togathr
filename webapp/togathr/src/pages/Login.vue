<template>
    <div class="columns mt-3 mx-3">
        <div class="column is-half is-offset-one-quarter box">
            <section class="section pb-4">
                <figure class="image is-2by1 mx-auto mb-4">
                    <img src="../assets/login.svg" alt="" />
                </figure>
                <h1 class="title">Log in</h1>
                <h2 class="subtitle mt-1">Log in to start planning together!</h2>
            </section>
            <section class="section pt-4">
                <div class="field is-grouped" id="alt-log-in-options">
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
                <login-form />
                <p class="mt-2">Don't have an account? <router-link to="/signup">Sign up</router-link></p>
            </section>
        </div>
    </div>
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
