<template>
    <div>Welcome!</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { supabase } from '../supabase';

export default defineComponent({
    setup() {
        console.log(supabase.auth.user().email);
    },
});
</script>
<style lang="scss"></style>
