<template>
    <div>
        <h3 class="subtitle is-3">Recent Posts</h3>
        <div class="posts">
            <post v-for="post in posts" :post="post" />
        </div>
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
import Post from './Post.vue';
import { RecentPost } from '../../models/state/recentPost';

export default defineComponent({
    components: { Notification, Post },
    setup() {
        const posts = ref<RecentPost[]>([]);
        const route = useRoute();

        async function loadPosts(eventId: number) {
            const response = await getTopLevelPosts(eventId);

            if (response.error) {
                console.log(response.error);
            } else {
                posts.value = response.payload;
            }
        }

        loadPosts(Number(route.params.id));

        return {
            posts,
        };
    },
});
</script>
<style lang="scss"></style>
