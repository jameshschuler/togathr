<template>
    <nav class="navbar is-fixed-bottom is-hidden-desktop" role="navigation">
        <div id="bottom-navbar" class="navbar-menu is-active py-0">
            <div class="is-flex is-justify-content-space-evenly is-align-items-center">
                <router-link
                    to="/feed"
                    class="navbar-item is-flex is-flex-direction-column is-flex-grow-1 is-align-items-center"
                >
                    <i class="fas fa-lg fa-fw fa-stream my-2"></i>
                    <span>Feed</span>
                </router-link>
                <router-link
                    to="/events"
                    class="navbar-item is-flex is-flex-direction-column is-flex-grow-1 is-align-items-center"
                >
                    <i class="fas fa-lg fa-fw fa-user-friends my-2"></i>
                    <span>Events</span>
                </router-link>
                <router-link
                    to="/settings"
                    class="navbar-item is-flex is-flex-direction-column is-flex-grow-1 is-align-items-center"
                >
                    <i class="fas fa-lg fa-fw fa-cog my-2"></i>
                    <span>Settings</span>
                </router-link>
            </div>
        </div>
    </nav>
</template>
<script lang="ts">
export default {};
</script>
<style lang="scss">
.router-link-active {
    color: #3e8ed0 !important;
}
</style>
