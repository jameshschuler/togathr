<template>
    <div>
        <h3 class="subtitle is-3">Recent Posts</h3>
        <notification
            class="is-info is-light"
            :isShowing="posts.length === 0"
            message="No posts have been made on this event yet."
        />
        <new-post />
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import Notification from '../Notification.vue';
import NewPost from './NewPost.vue';

export default defineComponent({
    components: { Notification, NewPost },
    setup() {
        const posts = ref([]);

        return {
            posts,
        };
    },
});
</script>
<style lang="scss"></style>
