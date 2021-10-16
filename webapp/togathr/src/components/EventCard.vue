<template>
    <router-link
        v-if="event"
        :to="{ path: `/events/${event.id}/detail` }"
        class="column is-one-third-desktop is-full-touch"
    >
        <div class="card is-relative">
            <div class="overlay has-text-centered">
                <h3 class="title">{{ event.name }}</h3>
                <h4 class="subtitle" v-if="event.locationName">{{ event.locationName }}</h4>
                <h5 class="subtitle">
                    {{ new Date(event.startDate).toLocaleDateString(undefined, options) }} -
                    {{ event.startTime }}
                </h5>
                <h5 class="subtitle">
                    {{ new Date(event.endDate).toLocaleDateString(undefined, options) }} - {{ event.endTime }}
                </h5>
            </div>
            <div class="card-image">
                <figure class="image is-4by3">
                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
                </figure>
            </div>
        </div>
    </router-link>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Event } from '../models/event';

export default defineComponent({
    props: {
        event: Object,
    },
    setup(props) {
        const options = ref({
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        const timeOptions = ref<Intl.DateTimeFormatOptions>({
            timeZone: 'UTC',
            hour12: true,
            hour: 'numeric',
            minute: 'numeric',
        });

        // TODO: move this to the service?
        if (props.event) {
            const startTime = props.event.startTime;
            const startTimeSubstring = props.event.startTime.substring(0, startTime.length - 3);
            const formattedStartTime = new Date('1970-01-01T' + startTimeSubstring + 'Z').toLocaleTimeString(
                'en-US',
                timeOptions.value
            );
            props.event.startTime = formattedStartTime;

            const endTime = props.event.endTime;
            const endTimeSubstring = props.event.endTime.substring(0, endTime.length - 3);
            const formattedEndTime = new Date('1970-01-01T' + endTimeSubstring + 'Z').toLocaleTimeString(
                'en-US',
                timeOptions.value
            );
            props.event.endTime = formattedEndTime;
        }

        return {
            options,
        };
    },
});
</script>
<style lang="scss">
.overlay {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: 100%; /* Need a specific value to work */
    z-index: 9999;
}
</style>
