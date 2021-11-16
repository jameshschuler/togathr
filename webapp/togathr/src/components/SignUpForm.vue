<template>
    <notification class="is-danger" :isShowing="validationError !== null" :message="validationError"></notification>
    <form @submit.prevent="onSubmit">
        <div class="field mb-4">
            <label for="email" class="label">Email</label>
            <div class="control has-icons-left has-icons-right">
                <input
                    class="input"
                    :class="{ 'is-danger': errors.email }"
                    type="email"
                    placeholder="hello@example.com"
                    id="email"
                    v-model="formData.email"
                />
                <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                </span>
                <span v-if="errors.email" class="icon is-small is-right">
                    <i class="fas fa-exclamation-triangle"></i>
                </span>
            </div>
            <p v-if="errors.email" class="help is-danger">{{ errors.email }}</p>
        </div>

        <div class="field mb-4">
            <label for="firstName" class="label">First Name</label>
            <div class="control">
                <input class="input" type="text" id="firstName" v-model="formData.firstName" />
            </div>
        </div>

        <div class="field mb-4">
            <label for="lastName" class="label">Last Name</label>
            <div class="control">
                <input class="input" type="text" id="lastName" v-model="formData.lastName" />
            </div>
        </div>

        <div class="field mb-4">
            <label for="password" class="label">Password</label>
            <div class="control has-icons-left has-icons-right">
                <input
                    class="input"
                    type="password"
                    id="password"
                    v-model="formData.password"
                    :class="{ 'is-danger': errors.password }"
                />
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
                <span v-if="errors.password" class="icon is-small is-right">
                    <i class="fas fa-exclamation-triangle"></i>
                </span>
            </div>
            <p v-if="errors.password" class="help is-danger">{{ errors.password }}</p>
        </div>
        <button
            :class="{ 'is-loading': loading }"
            type="submit"
            class="button is-success is-outlined mt-5 is-fullwidth"
        >
            Sign up
        </button>
    </form>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ValidationError } from 'yup';
import { signupFormValidator, SignUp } from '../models/signup';
import { signUpWithEmailPassword } from '../services/accountService';
import Notification from './Notification.vue';

export default defineComponent({
    components: {
        Notification,
    },
    setup() {
        const loading = ref(false);
        const formData = ref<SignUp>({ email: '' });
        const errors = ref({ email: '', password: '' });
        const validationError = ref<string | null>(null);
        const router = useRouter();

        if (router.currentRoute.value.query.email) {
            formData.value.email = router.currentRoute.value.query.email as string;
        }

        async function onSubmit() {
            loading.value = true;

            try {
                const { email, password } = await signupFormValidator.validate(formData.value);

                const error = await signUpWithEmailPassword(
                    email,
                    password,
                    formData.value.firstName,
                    formData.value.lastName
                );
                if (error) {
                    validationError.value = error.message;
                } else {
                    router.push({ path: '/confirmationEmailSent', query: { email } });
                }

                loading.value = false;
            } catch (err) {
                const error = err as ValidationError;
                if (error.path === 'email') {
                    errors.value.email = error.message;
                } else if (error.path === 'password') {
                    errors.value.password = error.message;
                }
                loading.value = false;
            }
        }

        return {
            errors,
            formData,
            loading,
            onSubmit,
            validationError,
        };
    },
});
</script>
<style lang="scss"></style>
