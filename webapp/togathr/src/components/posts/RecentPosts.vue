<template>
    <div>
        <h3 class="subtitle is-3">Recent Posts</h3>
        <notification
            class="is-info is-light"
            :isShowing="posts.length === 0"
            message="No posts have been made on this event yet."
        />
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getTopLevelPosts } from '../../services/postService';
import Notification from '../Notification.vue';

export default defineComponent({
    components: { Notification },
    setup() {
        const posts = ref([]);
        const route = useRoute();

        async function loadPosts(eventId: number) {
            await getTopLevelPosts(eventId);
        }

        loadPosts(Number(route.params.id));

        return {
            posts,
        };
    },
});
</script>
<style lang="scss"></style>
