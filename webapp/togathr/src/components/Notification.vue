<template>
    <div v-if="isShowing" class="notification" :class="class">
        <button v-if="isDismissable" class="delete"></button>
        {{ message }}
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    props: ['message', 'isDismissable', 'isShowing', 'class'],
    setup(props) {},
});
</script>
<style lang="scss"></style>
