<template>
    <div class="mt-4">
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
                <p class="level-item pr-5">
                    <router-link to="/events/new" class="button is-success">New Event</router-link>
                </p>
            </div>
        </nav>
        <div>
            <h1 class="is-size-3 title">Upcoming Events</h1>
            <div class="columns" v-if="upcomingEvents.length !== 0">
                <event-card v-for="event in upcomingEvents"></event-card>
            </div>
            <notification
                class="is-info is-light my-3 w-75 is-size-5"
                :isShowing="upcomingEvents.length === 0"
                message="No upcoming events were found.  Get started planning an event!"
            />

            <h1 class="is-size-3 mt-6 title">Past Events</h1>
            <div class="columns" v-if="pastEvents.length !== 0">
                <event-card></event-card>
                <event-card></event-card>
            </div>
            <notification
                class="is-info is-light my-3 w-75 is-size-5"
                :isShowing="pastEvents.length === 0"
                message="No past events were found."
            />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import EventCard from '../components/EventCard.vue';
import Notification from '../components/Notification.vue';
import { getUpcomingEvents } from '../services/eventService';
import { store } from '../store';
import { Event } from '../models/event';

export default defineComponent({
    components: {
        EventCard,
        Notification,
    },
    setup() {
        const loading = ref(false);
        const upcomingEvents = ref<Event[]>([]);
        const pastEvents = ref([]);

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
            pastEvents,
            upcomingEvents,
        };
    },
});
</script>
<style
    lang="scs
EventCards"
></style>
