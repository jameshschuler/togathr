<template>
    <form @submit.prevent="onSubmit" class="mt-5">
        <div class="field">
            <label class="label">Message *</label>
            <div class="control">
                <textarea class="textarea" v-model="formData.content" placeholder="Add a Post"></textarea>
            </div>
            <p v-if="errors.content" class="help is-danger">{{ errors.content }}</p>
        </div>
        <button :class="{ 'is-loading': loading }" type="submit" class="button is-success is-outlined mt-5">
            Create Post
        </button>
    </form>
</template>
<script lang="ts">
import { log } from 'util';
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { NewPost, NewPostErrors } from '../../models/formModels/post';
import { newPostFormValidator } from '../../models/validators/postValidators';
import { createPost } from '../../services/postService';
import { store } from '../../store';
import { handleValidationErrors } from '../../utils/validation';

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

                const profileId = 1; // TODO: get this value from store
                const response = await createPost({
                    content: formData.value.content,
                    createdBy: store.user.id,
                    eventId: Number(route.params.id),
                    profileId,
                });

                if (response.error) {
                    // TODO: show toaster
                } else {
                    console.log('need to get posts or append to posts array');
                    // TODO: update state
                }

                loading.value = false;
            } catch (err) {
                loading.value = false;
                errors.value = handleValidationErrors(err);
            }
        }

        return {
            errors,
            formData,
            loading,
            onSubmit,
        };
    },
});
</script>
<style lang="scss"></style>
