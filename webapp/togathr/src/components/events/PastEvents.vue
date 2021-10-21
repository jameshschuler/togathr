<template>
    <div class="mt-6">
        <h1 class="is-size-3 title">Past Events</h1>
        <div class="columns is-mobile outer" v-if="!loading && pastEvents.length !== 0">
            <event-card v-for="event in pastEvents" :event="event"></event-card>
        </div>
        <loading-indicator v-if="loading && pastEvents.length === 0" />
        <notification
            class="is-info is-light my-3 w-75 is-size-5"
            :isShowing="!loading && pastEvents.length === 0"
            message="No past events were found."
        />
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Event } from '../../models/event';
import { getPastEvents } from '../../services/eventService';
import { store } from '../../store';
import EventCard from './EventCard.vue';
import Notification from '../Notification.vue';
import LoadingIndicator from '../LoadingIndicator.vue';

export default defineComponent({
    components: {
        EventCard,
        LoadingIndicator,
        Notification,
    },
    setup() {
        const loading = ref(false);
        const pastEvents = ref<Event[]>([]);

        async function loadPastEvents() {
            loading.value = true;
            const response = await getPastEvents(store.user!.id);

            if (response.error) {
                // Pop a toast or something
            } else {
                pastEvents.value = response.data;
            }

            loading.value = false;
        }

        loadPastEvents();

        return {
            loading,
            pastEvents,
        };
    },
});
</script>
<style lang="scss">
.outer {
    overflow-x: scroll;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
}
</style>
