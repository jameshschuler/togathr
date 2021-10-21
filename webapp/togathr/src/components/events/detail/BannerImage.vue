<template>
    <section class="hero my-4">
        <figure id="banner-image" class="image is-3by1">
            <img v-if="!bannerImage" src="../../../assets/default_festivities.svg" alt="" />
        </figure>
    </section>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    props: ['imageName'],
    setup(props) {
        const bannerImage = ref(null);

        if (props.imageName) {
            console.log('getting image from bucket...');
        }

        return {
            bannerImage,
        };
    },
});
</script>
<style lang="scss" scoped>
#banner-image {
    padding-top: 25%;
}
</style>
