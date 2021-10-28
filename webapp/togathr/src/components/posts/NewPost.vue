<template>
    <form @submit.prevent="onSubmit">
        <div class="field">
            <label class="label">New Post *</label>
            <div class="control">
                <textarea class="textarea" v-model="formData.content" required></textarea>
            </div>
        </div>
        <button :class="{ 'is-loading': loading }" type="submit" class="button is-success is-outlined mt-5">
            Create Post
        </button>
    </form>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ValidationError } from 'yup';
import { NewPost, NewPostErrors, newPostFormValidator } from '../../models/post';
import { createPost } from '../../services/postService';
import { store } from '../../store';

export default defineComponent({
    setup() {
        const errors = ref<NewPostErrors>({});
        const formData = ref<NewPost>({ content: '' });
        const loading = ref(false);
        const route = useRoute();

        async function onSubmit() {
            loading.value = true;

            try {
                await newPostFormValidator.validate(formData.value, { abortEarly: false });

                await createPost({
                    content: formData.value.content,
                    createdBy: store.user.id,
                    eventId: Number(route.params.id),
                });

                // TODO: apppend new post

                loading.value = false;
            } catch (err) {
                loading.value = false;

                // TODO: move to utils
                const error = err as ValidationError;

                let errs: { [key: string]: any } = {};
                error.inner.forEach((e: ValidationError) => {
                    if (e.path) {
                        errs[e.path] = e.message;
                    }
                });

                errors.value = errs;
            }
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
