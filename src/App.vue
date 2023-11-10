<template>
    <v-app>
        <v-main>
            <v-layout class="rounded rounded-md">
                <v-app-bar :order="-1" color="primary" title="Features"></v-app-bar>
                <!-- Left side bar components -->
                <left-side-bar></left-side-bar>
                <!-- Right side bar components -->
                <right-side-bar></right-side-bar>
                <v-main :style="deviceHeight">
                    <router-view />
                </v-main>
            </v-layout>
        </v-main>
        <ErrorSnackbar></ErrorSnackbar>
    </v-app>
</template>

<script lang="ts" setup>
/** 0. start import*/
import { computed, onMounted } from 'vue'
import LeftSideBar from './components/layouts/LeftSideBar.vue'
import RightSideBar from './components/layouts/RightSideBar.vue'
import ErrorSnackbar from './components/snackbars/ErrorSnackbar.vue'
import { useUserStore } from './piniaStore/user'
/* end import*/

/** 1. start define property */
/* end define property */

/** 2. start define validate */
/* end define validate */

/** 3. start defined state */
const userStore = useUserStore()
/* end defined state */

/** 4. start define watcher */
/* end define life watcher */

/** 5. start defined methods */
/* end defined methods */

/** 6. start defined computed */
const deviceHeight = computed(() => {
    return `min-height: ${document.documentElement.clientHeight}px;}`
})
/* end defined computed */

/** 7. start define life cycle hook */
onMounted(() => {
    if (userStore.isAuthenticated) {
        userStore.getAuthUser()
    }
})
/* end define life cycle hook */
</script>
