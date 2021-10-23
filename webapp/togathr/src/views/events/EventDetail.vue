<template>
    <loading-indicator v-if="loading" icon-size="fa-3x" />
    <div class="pr-5" v-if="eventDetail && !loading">
        <banner-image :imageName="eventDetail.bannerImageName" />
        <div class="is-flex is-justify-content-space-between is-align-items-center">
            <h1 class="title is-1 mb-0">{{ eventDetail.name }}</h1>
            <div class="actions">
                <button class="button" v-if="eventDetail.isOwner">
                    <i class="fas fa-fw fa-pencil-alt"></i>
                </button>
                <button class="button ml-2" v-if="eventDetail.isOwner">
                    <i class="fas fa-fw fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="content mt-4">
            <p>{{ eventDetail.description }}</p>
            <p><b>Where</b> {{ where }}</p>
            <p><b>Start</b> {{ eventDetail.startDate }} @ {{ eventDetail.startTime }}</p>
            <p><b>End</b> {{ eventDetail.endDate }} @ {{ eventDetail.endTime }}</p>
        </div>
        <hr />
        <h3 class="subtitle is-3">Recent Posts</h3>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BannerImage from '../../components/events/detail/BannerImage.vue';
import LoadingIndicator from '../../components/LoadingIndicator.vue';
import { EventDetail } from '../../models/event';
import { getEventDetail } from '../../services/eventService';
import { store } from '../../store';
import { formatDate, formatTime } from '../../utils/formatter';

export default defineComponent({
    components: {
        BannerImage,
        LoadingIndicator,
    },
    setup() {
        const route = useRoute();
        const router = useRouter();

        const eventDetail = ref<EventDetail>();
        const loading = ref<boolean>(true); // TODO: show spinner
        const where = ref<string>('');

        async function loadEventDetail(eventId: number, currentUserId: string) {
            const { data, error } = await getEventDetail(eventId, currentUserId);

            if (error) {
                // TODO: show error and redirect to 404 page?
                // either event doesn't exist or they don't have access to event
                console.log('redirecting to 404 page');
                router.push({ path: '/notfound' });
            } else {
                eventDetail.value = data;

                let { locationName, endDate, endTime, startDate, startTime } = eventDetail.value!;

                eventDetail.value.endDate = formatDate(endDate);
                eventDetail.value.endTime = formatTime(endTime);
                eventDetail.value.startDate = formatDate(startDate);
                eventDetail.value.startTime = formatTime(startTime);

                where.value = `${locationName}`;
            }

            loading.value = false;
        }

        loadEventDetail(Number(route.params.id), store.user!.id);

        return {
            eventDetail,
            loading,
            where,
        };
    },
});
</script>
<style lang="scss"></style>
