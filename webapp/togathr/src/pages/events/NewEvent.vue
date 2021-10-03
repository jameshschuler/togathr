<template>
    <div class="mt-3">
        <notification :isShowing="validationError !== null" :message="validationError"></notification>
        <h1 class="title">New Event</h1>
        <form @submit.prevent="onSubmit" class="column is-9">
            <div class="field">
                <label class="label">Name *</label>
                <div class="control">
                    <input class="input" type="text" placeholder="ex. Bob's 50th Birthday" v-model="formData.name" />
                </div>
                <p v-if="errors.name" class="help is-danger">{{ errors.name }}</p>
            </div>

            <div class="field-body mb-3">
                <div class="field">
                    <label class="label">Start Date *</label>
                    <div class="control has-icons-left">
                        <input class="input" type="date" v-model="formData.startDate" />
                        <span class="icon is-small is-left">
                            <i class="far fa-fw fa-calendar-alt"></i>
                        </span>
                    </div>
                    <p v-if="errors.startDate" class="help is-danger">{{ errors.startDate }}</p>
                </div>

                <div class="field">
                    <label class="label">End Date *</label>
                    <div class="control has-icons-left">
                        <input class="input" type="date" v-model="formData.endDate" />
                        <span class="icon is-small is-left">
                            <i class="far fa-fw fa-calendar-alt"></i>
                        </span>
                    </div>
                    <p v-if="errors.endDate" class="help is-danger">{{ errors.endDate }}</p>
                </div>
            </div>

            <div class="field-body mb-3">
                <div class="field">
                    <label class="label">Start Time *</label>
                    <div class="control has-icons-left">
                        <div class="select is-fullwidth">
                            <select v-model="formData.startTime">
                                <option disabled selected value="">Select Time</option>
                                <option v-for="option in selectTimeOptions" v-bind:value="option">
                                    {{ option }}
                                </option>
                            </select>
                        </div>
                        <div class="icon is-small is-left">
                            <i class="far fa-fw fa-clock"></i>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label class="label">End Time *</label>
                    <div class="control has-icons-left">
                        <div class="select is-fullwidth">
                            <select v-model="formData.endTime">
                                <option disabled selected value="">Select Time</option>
                                <option v-for="option in selectTimeOptions" v-bind:value="option">
                                    {{ option }}
                                </option>
                            </select>
                        </div>
                        <div class="icon is-small is-left">
                            <i class="far fa-fw fa-clock"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="field">
                <label class="label">Description</label>
                <div class="control">
                    <textarea class="textarea" v-model="formData.description"></textarea>
                </div>
            </div>

            <div class="field">
                <label class="label">Private event?</label>
                <div class="control">
                    <label class="radio">
                        <input type="radio" name="isPrivate" value="true" v-model="formData.isPrivate" />
                        Yes
                    </label>
                    <label class="radio">
                        <input type="radio" name="isPrivate" value="false" v-model="formData.isPrivate" />
                        No
                    </label>
                </div>
            </div>

            <button :class="{ 'is-loading': loading }" type="submit" class="button is-success is-outlined mt-5">
                Create Event
            </button>
        </form>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { NewEvent, newEventFormValidator } from '../../models/event';
import { createEvent, isEventNameUnique } from '../../services/eventService';
import { getSelectTimeOptions } from '../../services/dataService';
import { store } from '../../store';
import { ValidationError } from 'yup';
import { useRouter } from 'vue-router';
import Notification from '../../components/Notification.vue';

export default defineComponent({
    components: {
        Notification,
    },
    setup() {
        const errors = ref({});
        const formData = ref<NewEvent>({
            endDate: new Date().toISOString().slice(0, 10),
            endTime: '12:00 AM',
            name: '',
            isPrivate: true,
            startDate: new Date().toISOString().slice(0, 10),
            startTime: '12:00 AM',
        });
        const loading = ref(false);
        const selectTimeOptions = getSelectTimeOptions();
        const validationError = ref<string | null>(null);
        const router = useRouter();

        async function onSubmit() {
            loading.value = true;

            try {
                // TODO: validate that start time and end time make sense

                await newEventFormValidator.validate(formData.value, { abortEarly: false });

                const isUnique = await isEventNameUnique(store.user.id, formData.value.name);
                if (!isUnique) {
                    loading.value = false;
                    errors.value = {
                        name: 'Event Name must be unique',
                    };
                    return;
                }

                const response = await createEvent({
                    createdBy: store.user.id,
                    description: formData.value.description,
                    endDate: formData.value.endDate,
                    endTime: formData.value.endTime,
                    isPrivate: formData.value.isPrivate,
                    name: formData.value.name,
                    startDate: formData.value.startDate,
                    startTime: formData.value.startTime,
                });

                if (response.error) {
                    validationError.value = response.error.message;
                } else if (response.createdObjectId) {
                    router.push({ name: 'EventDetail', params: { id: response.createdObjectId } });
                }

                loading.value = false;
            } catch (err) {
                loading.value = false;

                const error = err as ValidationError;

                let errs = {};
                error.inner.forEach((e: ValidationError) => {
                    errs[e.path] = e.message;
                });

                errors.value = errs;
            }
        }

        return {
            errors,
            formData,
            loading,
            selectTimeOptions,
            onSubmit,
            validationError,
        };
    },
});
</script>
<style lang="scss"></style>
