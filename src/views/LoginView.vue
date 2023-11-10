<template>
    <v-sheet class="pa-12 bg-secondary" rounded>
        <v-img class="mx-auto my-6" max-width="228"
               src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img>

        <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
            <v-alert
                v-model="alert"
                border="start"
                variant="tonal"
                type="error"
                class="mb-8"
            >
                {{ errorMessages }}
            </v-alert>
            <v-form v-model="form" @submit.prevent="onSubmit">
                <!-- Email -->
                <v-text-field v-model="email.value.value" density="compact" label="Email" placeholder="Email address"
                              prepend-inner-icon="mdi-email-outline" variant="outlined" :error-messages="email.errorMessage.value"
                              :autofocus="true"></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis text-right">
                    <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer" target="_blank">
                        Forgot login password?
                    </a>
                </div>
                <!-- Password -->
                <v-text-field v-model="password.value.value" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                              :type="visible ? 'text' : 'password'" density="compact" label="Password" placeholder="Enter your password"
                              prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible"
                              :error-messages="password.errorMessage.value"></v-text-field>

                <v-btn block class="mb-8" color="blue" size="large" variant="tonal" type="submit" :loading="isSubmitting">
                    Log In
                </v-btn>

                <v-card-text class="text-center">
                    <a class="text-blue text-decoration-none" href="/register" rel="noopener noreferrer" target="_blank">
                        Sign up now
                        <v-icon icon="mdi-chevron-right"></v-icon>
                    </a>
                </v-card-text>
            </v-form>
        </v-card>
    </v-sheet>
</template>
<script lang="ts" setup>
/** 0. start import*/
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { object, string } from 'yup'
import { toTypedSchema } from '@vee-validate/yup'
import AuthService from '@/services/AuthService'
import { useUserStore } from '@/piniaStore/user'
import { useAlertStore } from '@/piniaStore/alert'
import { useRouter } from 'vue-router'
import { HTTP_UNPROCESSABLE_ENTITY } from '@/constants/http'
/* end import*/

/** 1. start define property */
/* end define property */

/** 2. start define validate */
const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(
        object({
            email: string().required().email().default('trucnguyen.remvn031@gmail.com'),
            password: string().required().min(8).default('1234567890'),
        }),
    ),
})
/* end define validate */

/** 3. start defined state */
const userStore = useUserStore()
const alertStore = useAlertStore()
const router = useRouter()
const form = ref(null)
const email = useField('email')
const password = useField('password')
const visible = ref(false)
const errorMessages = ref(null)
const alert = ref(false)
/* end defined state */

/** 4. start define watcher */
/* end define life watcher */

/** 5. start defined methods */
const onSubmit = handleSubmit(async values => {
    // Simulates a 2 second delay
    try {
        const response = await AuthService.login(values)
        if (response) {
            await userStore.getAuthUser()
            router.replace({ name: 'home' })
        }
    } catch (error) {
        console.log(error)
        if (error.status === HTTP_UNPROCESSABLE_ENTITY) {
            errorMessages.value = error.data
            alert.value = true
        } else {
            let message = error.data.message
            let navigation = router.currentRoute.value.path
            alertStore.showAlert({navigation: navigation, type: 'error', message: message})
        }
    }
})
/* end defined methods */

/** 6. start defined computed */
/* end defined computed */

/** 7. start define life cycle hook */
/* end define life cycle hook */
</script>
  