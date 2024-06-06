import { defineStore } from 'pinia'
import { useApiCoachStore } from './api'

const api = useApiCoachStore()


export interface Visit {
    id: number,
    date: string,
    user: {
        id: number,
        studentCard: number,
        firstname: string,
        secondname: string,
        surname: string
        group: string,
        role: string,
    },
    mark: number
}


export const useVisitStore = defineStore('visit', {
    state: () => ({
        visits: [] as Array<Visit>
    }),

    actions: {
        async loadForDate(date: string, time: string) {
            this.visits = []
            this.visits = await api.doRequest('/visit/get', 'POST', { date: date, time: time })
        },

        async updateVisit(id: number, mark: number) {
            await api.doRequest('/visit/edit', 'PUT', { id: id, mark: mark })
        },

        async cancelLesson(date: string, time: string) {
            await api.doRequest('/visit/cancel-lesson', 'POST', { date: date, time: time })
        }
    }
})