<template>
    <form @submit.prevent="onSubmit">
        <div class="field">
            <label class="label">New Post *</label>
            <div class="control">
                <textarea class="textarea" v-model="formData.text" required></textarea>
            </div>
        </div>
        <button :class="{ 'is-loading': loading }" type="submit" class="button is-success is-outlined mt-5">
            Create Post
        </button>
    </form>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { NewPost } from '../../models/post';

export default defineComponent({
    setup() {
        const formData = ref<NewPost>({ text: '' });
        const loading = ref(false);

        async function onSubmit() {
            loading.value = true;
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
