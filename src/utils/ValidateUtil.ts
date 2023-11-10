import { useForm } from 'vee-validate'

export function setErrorResponse(errors = []) {
    errors.forEach(error => {
        const { field, message } = error
        useForm().
            setFieldError(field, message)
    })
}