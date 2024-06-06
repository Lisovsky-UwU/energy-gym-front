import { defineStore } from 'pinia'
import { useApiStudentStore, useApiCoachStore } from './api'

const apiStudent = useApiStudentStore()
const apiCoach = useApiCoachStore()


export interface Entry {
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

interface OpenEntryCheck {
    status: boolean,
    openingDay: number
}


export const useEntryStore = defineStore('entry', {
    state: () => ({
        myEntries: [] as Array<Entry>,
        openingDay: 0,
        registrateIsOpen: false
    }),

    getters: {
        forCallendarMapped(): any {
            var result = [] as any
            this.myEntries.map((e) => {
                result.push(
                    {
                        description: 'Занятие в ' + e.selectedTime.time,
                        isComplete: false,
                        dates: { repeat: { weekdays: e.selectedTime.weekday + 2 } },
                        color: 'red'
                    }
                )
            })
            return result
        }
    },

    actions: {
        async loadMyEntries(month: string): Promise<void> {
            this.myEntries = await apiStudent.doRequest('/entry/get', 'POST', { month: month })
        },
        async deleteMyEntry(id: number) {
            await apiStudent.doRequest('/entry/delete', 'DELETE', { id: id })
        },
        async loadOpen() {
            let openData: OpenEntryCheck = await apiStudent.doRequest('/entry/check-open', 'GET')
            this.openingDay = openData.openingDay
            this.registrateIsOpen = openData.status
        },
        async createEntries(idsSelectedAvTimes: Array<number>): Promise<Array<EntryCreateResponse>> {
            return await apiStudent.doRequest('/entry/create', 'POST', {selectedTimes: idsSelectedAvTimes})
        },
        async getForDay(weekday: number, month: string): Promise<Array<EntryExtend>> {
            return await apiCoach.doRequest('/entry/get-any', 'POST', { weekday: weekday, month: month })
        }
    }
})