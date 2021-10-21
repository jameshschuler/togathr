<template>
    <div>
        <h1 class="is-size-3 title">Upcoming Events</h1>
        <div class="columns" v-if="!loading && upcomingEvents.length !== 0">
            <event-card v-for="event in upcomingEvents" :event="event"></event-card>
        </div>
        <loading-indicator v-if="loading && upcomingEvents.length === 0" />
        <notification
            class="is-info is-light my-3 w-75 is-size-5"
            :isShowing="!loading && upcomingEvents.length === 0"
            message="No upcoming events were found.  Get started planning an event!"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Event } from '../../models/event';
import { getUpcomingEvents } from '../../services/eventService';
import { store } from '../../store';
import EventCard from './EventCard.vue';
import Notification from '../../components/Notification.vue';
import LoadingIndicator from '../../components/LoadingIndicator.vue';

export default defineComponent({
    components: {
        EventCard,
        LoadingIndicator,
        Notification,
    },
    setup() {
        const loading = ref(false);
        const upcomingEvents = ref<Event[]>([]);

        async function loadUpcomingEvents() {
            loading.value = true;
            const response = await getUpcomingEvents(store.user!.id);

            if (response.error) {
                // Pop a toast or something
            } else {
                upcomingEvents.value = response.data;
            }

            loading.value = false;
        }

        loadUpcomingEvents();

        return {
            loading,
            upcomingEvents,
        };
    },
});
</script>
<style lang="scss"></style>
