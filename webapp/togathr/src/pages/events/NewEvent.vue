<template>
    <div class="mt-3">
        <h1 class="title">New Event</h1>
        <form @submit.prevent="onSubmit" class="column is-9">
            <div class="field">
                <label class="label">Name *</label>
                <div class="control">
                    <input class="input" type="text" v-model="formData.name" />
                </div>
            </div>

            <div class="field-body mb-3">
                <div class="field">
                    <label class="label">Start Date *</label>
                    <div class="control has-icons-left">
                        <input class="input" type="date" />
                        <span class="icon is-small is-left">
                            <i class="far fa-fw fa-calendar-alt"></i>
                        </span>
                    </div>
                </div>

                <div class="field">
                    <label class="label">End Date *</label>
                    <div class="control has-icons-left">
                        <input class="input" type="date" />
                        <span class="icon is-small is-left">
                            <i class="far fa-fw fa-calendar-alt"></i>
                        </span>
                    </div>
                </div>
            </div>

            <div class="field-body mb-3">
                <div class="field">
                    <label class="label">Start Time *</label>
                    <div class="control has-icons-left">
                        <div class="select is-fullwidth">
                            <select>
                                <option selected>Select Time</option>
                                <option>Select dropdown</option>
                                <option>With options</option>
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
                            <select>
                                <option selected>Select Time</option>
                                <option>Select dropdown</option>
                                <option>With options</option>
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
                    <textarea class="textarea"></textarea>
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
import { NewEvent } from '../../models/event';

export default defineComponent({
    setup() {
        const formData = ref<NewEvent>({ name: '', isPrivate: true });
        const loading = ref(false);

        async function onSubmit() {
            console.log('hello');
            console.log(formData.value);
        }

        return {
            formData,
            loading,
            onSubmit,
        };
    },
});
</script>
<style lang="scss"></style>
