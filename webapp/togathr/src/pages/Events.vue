<template>
    <div>
        <nav class="level">
            <div class="level-left">
                <div class="level-item">
                    <p class="subtitle is-5">Events</p>
                </div>
                <div class="level-item">
                    <div class="field has-addons">
                        <p class="control">
                            <input class="input" type="text" placeholder="Find an event" />
                        </p>
                        <p class="control">
                            <button class="button">Search</button>
                        </p>
                    </div>
                </div>
            </div>

            <div class="level-right">
                <p class="level-item">
                    <router-link to="/events/new" class="button is-success">New Event</router-link>
                </p>
            </div>
        </nav>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>
<style lang="scss"></style>
