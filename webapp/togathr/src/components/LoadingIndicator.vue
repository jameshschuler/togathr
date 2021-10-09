<template>
    <div class="is-flex is-align-items-center">
        <h3 class="is-size-4 mr-3" v-if="loadingText">{{ loadingText }}</h3>
        <span class="">
            <i class="fas fa-spinner fa-spin fa-fw fa-2x"></i>
        </span>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: ['loadingText'],
});
</script>
<style lang="scss"></style>
