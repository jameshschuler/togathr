<template>
    <router-link
        v-if="event"
        :to="{ path: `/events/${event.id}/detail` }"
        class="column is-one-third-desktop is-full-touch"
    >
        <div class="card is-relative">
            <div class="overlay has-text-centered">
                <div
                    class="
                        event-information
                        is-flex is-flex-direction-column is-justify-content-center is-align-items-center
                    "
                >
                    <div class="w-100">
                        <h3 class="title has-text-white is-size-2 mb-3">{{ event.name }}</h3>
                        <h4
                            class="subtitle is-size-3 has-text-white my-1 has-text-weight-bold"
                            v-if="event.locationName"
                        >
                            {{ event.locationName }}
                        </h4>
                    </div>
                    <div>
                        <h5 class="subtitle is-size-4 has-text-white has-text-weight-bold mt-3 mb-0">
                            {{ new Date(event.startDate).toLocaleDateString(undefined, options) }} -
                            {{ event.startTime }}
                        </h5>
                        <h5 class="subtitle is-size-4 has-text-white has-text-weight-bold my-1">to</h5>
                        <h5 class="subtitle is-size-4 has-text-white has-text-weight-bold my-0">
                            {{ new Date(event.endDate).toLocaleDateString(undefined, options) }} - {{ event.endTime }}
                        </h5>
                    </div>
                </div>
            </div>
            <div class="card-image">
                <figure class="image is-4by3">
                    <img src="../../assets/default_event_card.svg" alt="Placeholder image" />
                </figure>
            </div>
        </div>
    </router-link>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Event } from '../../models/event';

export default defineComponent({
    props: {
        event: Object,
    },
    setup(props) {
        const options = ref<Intl.DateTimeFormatOptions>({
            //weekday: 'long',
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

        // TODO: move this to the service? yes! will need this elsewhere!
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
    background-color: black;
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: 100%; /* Need a specific value to work */
    z-index: 2;
    height: 100%;

    .event-information {
        margin-top: 1rem;
        height: 100%;

        .title {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            max-width: 95%;
            margin-left: auto;
            margin-right: auto;
        }
    }
}
</style>
