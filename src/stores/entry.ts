import { defineStore } from 'pinia'
import { useApiStudentStore, useApiCoachStore } from './api'

const apiStudent = useApiStudentStore()
const apiCoach = useApiCoachStore()


interface Entry {
    id: number,
    selectedTime: {
        id: number,
        weekday: number,
        time: string,
        month: string
    }
}

export interface EntryExtend {
    id: number,
    selectedTime: {
        id: number,
        weekday: number,
        time: string,
        month: string
    },
    user: {
        id: number,
        studentCard: number,
        firstname: string,
        secondname: string,
        surname: string
        group: string,
        role: string,
    }
}

interface EntryCreateResponse {
    selectedTime: number,
    error: boolean,
    text: string | null
}


export const useEntryStore = defineStore('entry', {
    state: () => ({
        myEntries: [] as Array<Entry>,
        registrateIsOpen: false
    }),

    actions: {
        async loadMyEntries(): Promise<void> {
            this.myEntries = await apiStudent.doRequest('/entry/get', 'GET')
        },
        async loadOpen() {
            this.registrateIsOpen = (await apiStudent.doRequest('/entry/check-open', 'GET')).status
        },
        async createEntries(idsSelectedAvTimes: Array<number>): Promise<Array<EntryCreateResponse>> {
            return await apiStudent.doRequest('/entry/create', 'POST', {selectedTimes: idsSelectedAvTimes})
        },
        async getForDay(weekday: number, month: string): Promise<Array<EntryExtend>> {
            return await apiCoach.doRequest('/entry/get-any', 'POST', { weekday: weekday, month: month })
        }
    }
})