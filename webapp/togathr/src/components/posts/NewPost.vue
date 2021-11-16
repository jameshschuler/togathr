<template>
    <form @submit.prevent="onSubmit" class="mt-5">
        <article class="media">
            <figure class="media-left">
                <p class="image is-64x64">
                    <img class="is-rounded" :src="avatarUrl" />
                </p>
            </figure>
            <div class="media-content">
                <div class="field">
                    <div class="control">
                        <textarea class="textarea" v-model="formData.content" placeholder="Add a Post"></textarea>
                    </div>
                    <p v-if="errors.content" class="help is-danger">{{ errors.content }}</p>
                </div>
                <nav class="level">
                    <div class="level-left">
                        <div class="level-item">
                            <button
                                :class="{ 'is-loading': loading }"
                                type="submit"
                                class="button is-success is-outlined"
                            >
                                Create Post
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        </article>
    </form>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { NewPost, NewPostErrors } from '../../models/formModels/post';
import { newPostFormValidator } from '../../models/validators/postValidators';
import { createPost } from '../../services/postService';
import store from '../../store';
import { handleValidationErrors } from '../../utils/validation';

export default defineComponent({
    setup() {
        const errors = ref<NewPostErrors>({});
        const formData = ref<NewPost>({ content: '' });
        const loading = ref(false);
        const route = useRoute();

        console.log(store.state.profile);

        async function onSubmit() {
            loading.value = true;

            try {
                await newPostFormValidator.validate(formData.value, { abortEarly: false });

                const response = await createPost({
                    content: formData.value.content,
                    createdBy: store.state.user!.id,
                    eventId: Number(route.params.id),
                    profileId: store.state.profile!.id,
                });

                if (response.error) {
                    // TODO: show toaster
                } else {
                    const { content, id, createdAt, createdBy, profileId } = response.payload;
                    const { avatarUrl, fullName } = store.state.profile!;
                    store.state.currentEvent!.posts!.unshift({
                        content,
                        id,
                        createdAt,
                        createdBy,
                        profiles: {
                            id: profileId,
                            avatar_url: avatarUrl, // TODO: should be avatarUrl
                            full_name: fullName ?? '', // TODO: should be fullName
                        },
                    });

                    formData.value.content = '';
                }

                loading.value = false;
            } catch (err) {
                loading.value = false;
                errors.value = handleValidationErrors(err);
            }
        }

        return {
            avatarUrl: store.state.profile!.avatarUrl,
            errors,
            formData,
            loading,
            onSubmit,
        };
    },
});
</script>
<style lang="scss"></style>
