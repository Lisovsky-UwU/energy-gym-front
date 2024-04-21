import { defineStore } from 'pinia'
import { useApiStudentStore } from './api'

const apiStudent = useApiStudentStore()


interface Entry {
    id: number,
    selectedTime: {
        id: number,
        weekday: number,
        time: string,
        month: string
    }
}


export const useEntryStore = defineStore('entry', {
    state: () => ({
        myEntries: [] as Array<Entry>
    }),

    actions: {
        async loadMyEntries(): Promise<void> {
            this.myEntries = await apiStudent.doRequest('/entry/get', 'GET')
        }
    }
})