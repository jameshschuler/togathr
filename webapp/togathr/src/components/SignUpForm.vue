<template>
    <form @submit.prevent="onSubmit">
        <div class="field">
            <label for="email" class="label">Email</label>
            <div class="control has-icons-left has-icons-right">
                <input
                    class="input is-danger"
                    type="email"
                    placeholder="hello@example.com"
                    id="email"
                    v-model="formData.email"
                />
                <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-small is-right">
                    <i class="fas fa-exclamation-triangle"></i>
                </span>
            </div>
            <p class="help is-danger">This email is invalid</p>
        </div>

        <div class="field">
            <label for="password" class="label">Password</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input is-danger" type="password" id="password" v-model="formData.email" />
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
                <span class="icon is-small is-right">
                    <i class="fas fa-exclamation-triangle"></i>
                </span>
            </div>
            <p class="help is-danger">This password is invalid</p>
        </div>
        <button :class="{ 'is-loading': loading }" type="submit" class="button is-primary">Sign up</button>
    </form>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { signupFormValidator, SignUp } from '../models/signup';

export default defineComponent({
    components: {},
    setup() {
        const loading = ref(false);
        const formData = ref<SignUp>({ email: '' });

        async function onSubmit() {
            console.log('hello!!');
            console.log(formData.value as SignUp);

            const result = await signupFormValidator.isValid(formData.value as SignUp);
            console.log(result);
        }

        return {
            formData,
            loading,
            onSubmit,
        };
    },
});
</script>
<style lang="scss"></style>
