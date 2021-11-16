<template>
    <article class="media mb-3">
        <figure class="media-left">
            <p class="image is-64x64">
                <img class="is-rounded" :src="post.profiles?.avatar_url" />
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <p>
                    <strong class="is-size-5">{{ post.profiles?.full_name }}</strong>
                    <small class="ml-3">{{ createdAt }}</small>
                    <br />
                    {{ post.content }}
                </p>
            </div>
            <nav class="level is-mobile">
                <div class="level-left">
                    <a class="level-item">
                        <span class="icon is-small"><i class="fas fa-reply"></i></span>
                    </a>
                    <a class="level-item">
                        <span class="icon is-small"><i class="fas fa-heart"></i></span>
                    </a>
                    <a class="level-item" v-if="isOwner">
                        <span class="icon is-small"><i class="fas fa-pencil-alt"></i></span>
                    </a>
                </div>
            </nav>
        </div>
        <div class="media-right" v-if="isOwner">
            <button class="delete" @click="handleDeletePost(post.id)"></button>
        </div>
    </article>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { deletePost } from '../../services/postService';
import { formatDateAndTime, formatRelativeTime } from '../../utils/formatter';
import store from '../../store';
import { Post } from '../../models/state/post';

export default defineComponent({
    props: ['post'],
    setup(props) {
        const createdAt = ref<string>(formatRelativeTime(props.post.createdAt));
        const isOwner = ref<boolean>(props.post.createdBy === store.state.user?.id);

        async function handleDeletePost(postId: number) {
            const { error, objectId } = await deletePost(postId);

            if (error) {
                // TODO:
            } else {
                const posts = store.state.currentEvent!.posts!;
                const postToDelete = posts.find((p: Post) => p.id === objectId);
                if (postToDelete) {
                    store.state.currentEvent!.posts!.splice(posts.indexOf(postToDelete), 1);
                } else {
                    // TODO:
                }
            }
        }

        return {
            createdAt,
            isOwner,
            handleDeletePost,
            formatDateAndTime,
        };
    },
});
</script>
<style lang="scss"></style>
