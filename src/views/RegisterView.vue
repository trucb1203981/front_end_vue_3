<template>
    <v-sheet class="pa-12 bg-secondary" rounded>
        <v-img
            class="mx-auto my-6"
            max-width="228"
            src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
        ></v-img>
        <v-card
            class="mx-auto pa-12 pb-8"
            elevation="8"
            max-width="448"
            rounded="lg"
        >
            <v-form v-model="form" @submit.prevent="onSubmit">
                <v-text-field
                    v-model="nameField"
                    :readonly="isSubmitting"
                    :error-messages="errors.name"
                    label="Name"
                    variant="outlined"
                    density="compact"
                    :autofocus="true"
                    autocomplete="false"
                ></v-text-field>

                <v-text-field
                    v-model="emailField"
                    :readonly="isSubmitting"
                    :error-messages="errors.email"
                    label="E-mail"
                    variant="outlined"
                    density="compact"
                    autocomplete="false"
                ></v-text-field>

                <v-text-field
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'"
                    @click:append-inner="visible = !visible"
                    v-model="passwordField"
                    :readonly="isSubmitting"
                    :error-messages="errors.password"
                    clearable
                    label="Password"
                    placeholder="Enter your password"
                    variant="outlined"
                    density="compact"
                    autocomplete="false"
                ></v-text-field>

                <v-text-field
                    :type="visible ? 'text' : 'password'"
                    v-model="passwordConfirmationField"
                    :readonly="isSubmitting"
                    :error-messages="errors.password_confirmation"
                    clearable
                    label="Password Confirmation"
                    placeholder="Enter your password"
                    variant="outlined"
                    density="compact"
                ></v-text-field>

                <v-btn
                    block
                    class="mb-4"
                    color="blue"
                    size="large"
                    variant="tonal"
                    type="submit"
                    :loading="isSubmitting"
                >
                    Register
                </v-btn>

                <v-btn block @click="handleReset"> clear</v-btn>
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
import router from '@/router'
/* end import*/

/** 1. start define property */
/* end define property */

/** 2. start define validate */
const { errors, setFieldError, handleSubmit, isSubmitting, resetForm } = useForm({
        validationSchema: toTypedSchema(
            object({
                name: string().
                    required().
                    min(2),
                email: string().
                    required().
                    email(),
                password: string().
                    required().
                    min(8),
                password_confirmation: string().
                    required().
                    min(8).
                    test('passwords-match', 'Passwords must match', function (value) {
                        return this.parent.password === value
                    }),
            }),
        ),
    },
)
/* end define validate */

/** 3. start defined state */
const form = ref(null)
const { value: nameField } = useField<string>('name')
const { value: emailField } = useField<string>('email')
const { value: passwordField } = useField<string>('password')
const { value: passwordConfirmationField } = useField<string>('password_confirmation')
const visible = ref(false)
/* end defined state */

/** 4. start define watcher */
/* end define life watcher */

/** 5. start defined methods */
const onSubmit = handleSubmit(async (values) => {
    await AuthService.register(values).
        then((response) => {
            if (response.status === 201) {
                router.replace({ name: 'thanks' })
            }
        }).
        catch((error) => {
            if (error.response.status === 422) {
                error.response.data.errors.forEach((error: any) => {
                    const { field, message } = error
                    setFieldError(field, message)
                })
            }
        })
})
const handleReset = () => {
    resetForm()
}
/* end defined methods */

/** 6. start defined computed */
/* end defined computed */

/** 7. start define life cycle hook */
/* end define life cycle hook */
</script>
