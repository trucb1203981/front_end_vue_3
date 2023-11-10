<template>
    <v-navigation-drawer v-if="isAuthenticated" location="right">
        <v-list
            lines="one"
            density="compact"
        >
            <v-list-item
                v-for="(item, i) in items"
                :key="i"
                :value="item"
                color="primary"
                :prepend-avatar="item.prependAvatar"
            >
                <template v-slot:avatar>
                    <v-img src="item.prependAvatar"></v-img>
                </template>
                <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
/** 0. start import*/
import { computed } from 'vue'
import { useUserStore } from '@/piniaStore/user'
/* end import*/

/** 1. start define property */
/* end define property */

/** 2. start define validate */
/* end define validate */

/** 3. start defined state */
const userStore = useUserStore()
const items = [
    {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Brunch this weekend?',
    },
    {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Summer BBQ',
    },
    {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Oui oui',
    },
    {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: 'Birthday gift',
    },
    {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        title: 'Recipe to try',
    },
]

/* end defined state */

/** 4. start define watcher */
/* end define life watcher */

/** 5. start defined methods */
/* end defined methods */
/** 6. start defined computed */
const isAuthenticated = computed(() => userStore.isAuthenticated)
/* end defined computed */

/** 7. start define life cycle hook */
/* end define life cycle hook */
</script>