<template>
    <article class="media">
        <figure class="media-left">
            <p class="image is-64x64">
                <img :src="post.profiles.avatar_url" />
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <p>
                    <strong>{{ post.profiles.full_name }}</strong>
                    <br />
                    {{ post.content }}
                    <br />
                    <small><a>Like</a> · <a>Reply</a> · 3 hrs</small>
                </p>
            </div>
        </div>
    </article>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: ['post'],
    setup() {
        return {};
    },
});
</script>
<style lang="scss"></style>
