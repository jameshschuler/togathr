<template>
    <div class="columns has-background-light" id="landing-page">
        <div class="column is-10 is-offset-1">
            <div class="columns">
                <div class="column is-half is-flex is-flex-direction-column is-justify-content-center">
                    <h1 class="title is-2">Togathr helps friends plan and get together.</h1>
                    <h3 class="subtitle">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.
                    </h3>
                    <form class="mt-5">
                        <div class="field is-horizontal">
                            <div class="field-body">
                                <div class="field">
                                    <div class="control">
                                        <input
                                            class="input is-medium is-hidden-mobile"
                                            type="email"
                                            placeholder="Email"
                                        />
                                    </div>
                                </div>
                            </div>
                            <button class="button ml-5 is-info is-medium">Sign up-it's free!</button>
                        </div>
                    </form>
                </div>
                <div class="column is-half">
                    <figure class="image is-square">
                        <img src="../assets/landing.svg" alt="" />
                    </figure>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
<style lang="scss">
#landing-page {
    min-height: 100vh;
}
</style>
