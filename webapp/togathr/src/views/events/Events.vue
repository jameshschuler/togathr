<template>
    <div class="mt-4">
        <nav class="level">
            <div class="level-left">
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
                <p class="level-item pr-5">
                    <router-link to="/events/new" class="button is-success">New Event</router-link>
                </p>
            </div>
        </nav>
        <div>
            <upcoming-events />
            <past-events />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import PastEvents from '../../components/events/PastEvents.vue';
import UpcomingEvents from '../../components/events/UpcomingEvents.vue';

export default defineComponent({
    components: {
        UpcomingEvents,
        PastEvents,
    },
    setup() {
        return {};
    },
});
</script>
<style lang="scss"></style>
