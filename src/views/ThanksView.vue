<template>
    <v-sheet class="pa-12 bg-secondary" rounded>
        <v-img class="mx-auto my-6" max-width="228"
               src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img>

        <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
            <v-card-text>
                <div class="text-h5 text--primary mb-2">Thank you for registering!</div>
                <p class="mb-4">Congratulations on completing the registration process. Let's start experiencing our application.</p>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    variant="text"
                    color="primary"
                    @click="redirectToHome"
                >
                    Back to Login
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-sheet>
</template>
<script lang="ts" setup>
/** 0. start import*/
import router from '@/router'
/* end import*/

/** 1. start define property */
/* end define property */

/** 2. start define validate */
/* end define validate */

/** 3. start defined state */
/* end defined state */

/** 4. start define watcher */
/* end define life watcher */

/** 5. start defined methods */
function redirectToHome() {
    router.replace({ name: 'login' })
}

/* end defined methods */

/** 6. start defined computed */
/* end defined computed */

/** 7. start define life cycle hook */
/* end define life cycle hook */
</script>
