import { defineStore } from 'pinia'


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
        }
    }
})