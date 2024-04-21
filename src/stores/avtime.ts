import { defineStore } from 'pinia'
import { useApiStudentStore } from './api'

const apiStudent = useApiStudentStore()


interface AvailableTime {
    id: number,
    weekday: number,
    time: string,
    month: string,
    available: boolean
}

interface WeekdayMap {
    id: number,
    weekday: number,
    times: Array<AvailableTime>
}


export const useAvailableTimeStore = defineStore('availableTime', {
    state: () => ({
        availableTimes: [] as Array<AvailableTime>
    }),

    getters: {
        mappedAvTimesAboutWeekdays(): Array<WeekdayMap> {
            const result = [] as Array<WeekdayMap>
            this.availableTimes.forEach((val) => {
                let weekday: WeekdayMap | undefined = result.find((el) => el.weekday == val.weekday)
                if (weekday === undefined) {
                    weekday = {
                        id: result.length,
                        weekday: val.weekday,
                        times: []
                    }
                    result.push(weekday)
                }
                weekday.times.push(val)
            })
            return result
        },
        mappedAvTimes(): any {
            const result = {} as any
            this.availableTimes.forEach((val) => {
                result[val.id] = val
            })
            return result
        }
    },

    actions: {
        async loadAvailableTimes() {
            this.availableTimes = await apiStudent.doRequest('/avtime/get', 'GET')
        }
    }
})