<template>
    <div class="is-flex is-justify-content-center is-align-items-center">
        <h3 class="is-size-4 mr-3" v-if="loadingText">{{ loadingText }}</h3>
        <span class="">
            <i class="fas fa-spinner fa-spin fa-fw fa-2x" :class="iconSize"></i>
        </span>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: ['iconSize', 'loadingText'],
});
</script>
<style lang="scss"></style>
