import { defineStore } from 'pinia'
import { useApiCoachStore, useApiStudentStore } from './api'

const apiStudent = useApiStudentStore()
const apiCoach = useApiCoachStore()


interface GymNew {
    id: number,
    body: string,
    createTime: string
}


export const useNewsStore = defineStore('news', {
    state: () => ({
        gymNews: [] as Array<GymNew>
    }),

    actions: {
        async loadGymNews(role: string) {
            this.gymNews = await (role == 'STUDENT' ? apiStudent : apiCoach).doRequest('/gym-news/get', 'GET')
        }
    }
})