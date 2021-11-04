<template>
    <div class="mt-3">
        <notification class="is-danger" :isShowing="validationError !== null" :message="validationError"></notification>
        <h1 class="title">New Event</h1>
        <form @submit.prevent="onSubmit" class="column is-9">
            <div class="field">
                <label class="label">Name *</label>
                <div class="control">
                    <input class="input" type="text" placeholder="ex. Bob's 50th Birthday" v-model="formData.name" />
                </div>
                <p v-if="errors.name" class="help is-danger">{{ errors.name }}</p>
            </div>

            <div class="field">
                <label class="label">Description</label>
                <div class="control">
                    <textarea class="textarea" v-model="formData.description"></textarea>
                </div>
            </div>

            <hr />
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

            <!-- <div class="field">
                <label class="label">Virtual event?</label>
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
            </div> -->

            <hr />

            <div class="field">
                <label class="label">Location Name</label>
                <div class="control">
                    <input class="input" type="text" placeholder="ex. Pool House" v-model="formData.locationName" />
                </div>
            </div>
            <div class="field">
                <label class="label">Address</label>
                <div class="control">
                    <input class="input" type="text" placeholder="ex. 123 Happy Lane" v-model="formData.address1" />
                </div>
                <div class="control mt-2">
                    <input class="input" type="text" placeholder="" v-model="formData.address2" />
                </div>
            </div>

            <div class="field-body mb-3">
                <div class="field">
                    <label class="label">City</label>
                    <div class="control">
                        <input class="input" placeholder="ex. Rochester" type="text" v-model="formData.city" />
                    </div>
                </div>
                <div class="field">
                    <label class="label">State</label>
                    <div class="control">
                        <div class="select is-fullwidth">
                            <select v-model="formData.state">
                                <option selected value="">Select State</option>
                                <option v-for="option in stateOptions" v-bind:value="option.value">
                                    {{ option.text }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="field-body mb-3">
                <div class="field">
                    <label class="label">Country</label>
                    <div class="control">
                        <div class="select is-fullwidth">
                            <select v-model="formData.country">
                                <option selected value="">Select Country</option>
                                <option v-for="option in countryOptions" v-bind:value="option.value">
                                    {{ option.text }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Zip</label>
                    <div class="control">
                        <input class="input" placeholder="ex. 12345" type="text" v-model="formData.zip" />
                    </div>
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
import { NewEvent, NewEventErrors, newEventFormValidator } from '../../models/event';
import { createEvent, isEventNameUnique } from '../../services/eventService';
import { getCountryOptions, getSelectTimeOptions, getStateOptions } from '../../services/dataService';
import { store } from '../../store';
import { ValidationError } from 'yup';
import { useRouter } from 'vue-router';
import Notification from '../../components/Notification.vue';

export default defineComponent({
    components: {
        Notification,
    },
    setup() {
        const errors = ref<NewEventErrors>({});
        const formData = ref<NewEvent>({
            endDate: new Date().toISOString().slice(0, 10),
            endTime: '12:00 AM',
            name: '',
            isPrivate: true,
            startDate: new Date().toISOString().slice(0, 10),
            startTime: '12:00 AM',
            country: 'US',
            state: 'NY',
        });
        const loading = ref(false);
        const countryOptions = getCountryOptions();
        const selectTimeOptions = getSelectTimeOptions();
        const stateOptions = getStateOptions();
        const validationError = ref<string | null>(null);
        const router = useRouter();

        async function onSubmit() {
            loading.value = true;

            try {
                // TODO: validate that start time and end time make sense

                await newEventFormValidator.validate(formData.value, { abortEarly: false });

                const isUnique = await isEventNameUnique(store.user!.id, formData.value.name);
                if (!isUnique) {
                    loading.value = false;
                    errors.value = {
                        name: 'Event Name must be unique',
                    };
                    return;
                }

                const response = await createEvent({
                    createdBy: store.user!.id,
                    description: formData.value.description,
                    endDate: formData.value.endDate,
                    endTime: formData.value.endTime,
                    isPrivate: formData.value.isPrivate,
                    name: formData.value.name,
                    startDate: formData.value.startDate,
                    startTime: formData.value.startTime,

                    // address information
                    address1: formData.value.address1,
                    address2: formData.value.address2,
                    city: formData.value.city,
                    country: formData.value.country,
                    locationName: formData.value.locationName,
                    state: formData.value.state,
                    zip: formData.value.zip,
                });

                if (response.error) {
                    validationError.value = response.error.message;
                } else if (response.objectId) {
                    router.push({ name: 'EventDetail', params: { id: response.objectId } });
                }

                loading.value = false;
            } catch (err) {
                loading.value = false;

                const error = err as ValidationError;

                let errs: { [key: string]: any } = {};
                error.inner.forEach((e: ValidationError) => {
                    if (e.path) {
                        errs[e.path] = e.message;
                    }
                });

                errors.value = errs;
            }
        }

        return {
            countryOptions,
            errors,
            formData,
            loading,
            selectTimeOptions,
            stateOptions,
            onSubmit,
            validationError,
        };
    },
});
</script>
<style lang="scss"></style>
