import { defineStore } from 'pinia'


export const useSnackbarStore = defineStore('snackbar', {
    state: () => ({
        show: false,
        text: '',
        color: 'error'
    }),

    actions: {
        setTimeOut() {
            window.setTimeout(() => {this.show = false}, 5000)
        },

        showError(text: string, autoHide = true) {
            this.text = text
            this.color = 'error'
            this.show = true
            if (autoHide) this.setTimeOut()
        },
        showSuccess(text: string, autoHide = true) {
            this.text = text
            this.color = 'success'
            this.show = true
            if (autoHide) this.setTimeOut()
        },
        showWarning(text: string, autoHide = true) {
            this.text = text
            this.color = 'warning'
            this.show = true
            if (autoHide) this.setTimeOut()
        },

        hide() {
            this.show = false
        }
    }
})