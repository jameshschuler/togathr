<template>
    <div class="mb-6">
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
import { Post as EventPost } from '../../models/state/post';
import store from '../../store';

export default defineComponent({
    components: { Notification, Post },
    setup() {
        const posts = ref<EventPost[]>([]);
        const route = useRoute();

        async function loadPosts(eventId: number) {
            const response = await getTopLevelPosts(eventId);

            if (response.error) {
                console.log(response.error);
            } else {
                if (store.state.currentEvent?.posts) {
                    store.state.currentEvent.posts = response.payload;
                }
                posts.value = store.state.currentEvent?.posts ?? [];
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
