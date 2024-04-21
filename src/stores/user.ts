import { defineStore } from 'pinia'
import { useSnackbarStore } from './snackbar'

const snackbar = useSnackbarStore()


export interface UserData {
    studentCard: number,
    firstname: string,
    secondname: string,
    surname: string
    group: string,
    role: string,
}


export const useUserDataStore = defineStore('userData', {
    state: () => ({
        userData: null as UserData | null
    }),

    getters: {
        fullname(): string {
            return this.userData ? `${this.userData?.secondname} ${this.userData?.firstname} ${this.userData?.surname}` : 'No data'
        },
        role(): string {
            return this.userData?.role || 'No data'
        },
        group(): string {
            return this.userData?.group || 'No data'
        },
        studentCard(): number {
            return this.userData?.studentCard || -1
        }
    },

    actions: {
        set(data: UserData) {
            this.userData = data
        },

        invalidate() {
            this.userData = null
        },

        async update(newData: UserData, userRole: string) {
            const api = await import('./api')
            let userApi = userRole == 'STUDENT' ? api.useApiStudentStore() : api.useApiCoachStore()
            const response: UserData = await userApi.doRequest('/user/edit', 'PUT', newData)
            this.set(response)
            snackbar.showSuccess('Данные успешно сохранены')
        },

        async changePassword(oldPassword: string, newPassword: string, userRole: string) {
            const api = await import('./api')
            let userApi = userRole == 'STUDENT' ? api.useApiStudentStore() : api.useApiCoachStore()
            await userApi.doRequest('/user/edit-password', 'PUT', { oldPassword, newPassword })
            snackbar.showSuccess('Пароль успешно изменен')
        }
    }
})