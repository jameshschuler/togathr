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
            <label for="password" class="label">Password (Optional)</label>
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
            Log in
        </button>
    </form>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ValidationError } from 'yup';
import { loginFormValidator, Login } from '../models/login';
import { loginWithEmailPassword } from '../services/accountService';
import Notification from './Notification.vue';

export default defineComponent({
    components: {
        Notification,
    },
    setup() {
        const loading = ref(false);
        const formData = ref<Login>({ email: '' });
        const errors = ref({ email: '', password: '' });
        const validationError = ref<string | null>(null);
        const router = useRouter();

        async function onSubmit() {
            loading.value = true;

            try {
                const { email, password } = await loginFormValidator.validate(formData.value);

                let error = await loginWithEmailPassword(email, password);

                if (error) {
                    validationError.value = error.message;
                } else {
                    if (!password || password === '') {
                        router.push({ path: '/verifyMagicEmailLink' });
                    } else {
                        router.push({ path: '/feed' });
                    }
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
