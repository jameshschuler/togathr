<template>
    <div v-if="isShowing" class="notification is-danger">
        <button v-if="isDismissable" class="delete"></button>
        {{ message }}
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    props: ['message', 'isDismissable', 'isShowing'],
    setup(props) {},
});
</script>
<style lang="scss"></style>
