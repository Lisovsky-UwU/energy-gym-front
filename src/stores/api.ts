import { defineStore } from 'pinia'
import { useSnackbarStore } from './snackbar'
import { useUserDataStore, type UserData } from './user'

const snackbar = useSnackbarStore()
const userData = useUserDataStore()


interface ErrorResponse {
    error: boolean,
    errorMessage: string,
    errorType: string
}

interface BaseResponse {
    error: boolean,
    data: any
}

interface UserLoginResponse {
    token: string,
    userData: UserData
}

interface CheckStudentCardResponse {
    alreadyExists: boolean
}

interface RegistrationRequest {
    studentCard: number,
    password: string,
    firstname: string,
    secondname: string,
    surname: string,
    group: string,
}


export const useApiStudentStore = defineStore('apiStudent', {
    state: () => ({
        studentToken: null as string | null,
    }),

    getters: {
        isLogin(): boolean {
            return this.studentToken != null
        },
        token(): string {
            return this.studentToken || ""
        }
    },

    actions: {
        async checkStudentCard(studentCard: number): Promise<boolean> {
            const result: CheckStudentCardResponse = await this.doRequest('/auth/check-studcard', 'POST', { studentCard })
            return result.alreadyExists
        },

        async checkLogin() {
            this.studentToken = localStorage.getItem('studentToken')
            if (this.studentToken != null) {
                const result: UserData = await this.doRequest('/auth/check-login', 'GET')
                userData.set(result)
            }
        },

        async login(login: string, password: string) {
            const result: UserLoginResponse = await this.doRequest('/auth/login', 'POST', {'login': login, 'password': password})
            this.studentToken = result.token
            userData.set(result.userData)
            localStorage.setItem('studentToken', this.studentToken)
        },

        async registrate(payload: RegistrationRequest) {
            const result: UserLoginResponse = await this.doRequest('/auth/signup', 'POST', payload)
            this.studentToken = result.token
            userData.set(result.userData)
            localStorage.setItem('studentToken', this.studentToken)
        },

        logout() {
            this.studentToken = null
            userData.invalidate()
            localStorage.removeItem('studentToken')
        },

        async doRequest(endpoint: string, method: string, data: any | null = null): Promise<any> {
            let fetchOptions = {
                method: method,
                headers: {} as any,
            } as any

            if (data != null) {
                fetchOptions.headers['content-type'] = 'application/json'
                fetchOptions.body = JSON.stringify(data)
            }
            if (this.studentToken != null) {
                fetchOptions.headers['Authorization'] = this.studentToken
            }
            
            try {
                var r = await fetch(`/api/v1${endpoint}`, fetchOptions)
            } catch (e) {
                snackbar.showError('Незвестная ошибка запроса к серверу')
                console.error(e)
                throw e
            }

            if (r.status != 200) {
                if (r.status == 401) {
                    this.logout()
                }
                const rJson: ErrorResponse = await r.json()
                snackbar.showError(rJson.errorMessage)
                console.error(rJson)

                let e = new Error(`(${rJson.errorType}) ${rJson.errorMessage}`)
                throw e
            } else {
                const rJson: BaseResponse = await r.json()
                return rJson.data
            }
        }
    }
})


export const useApiCoachStore = defineStore('apiCoach', {
    state: () => ({
        coachToken: null as string | null,
    }),

    getters: {
        isLogin(): boolean {
            return this.coachToken != null
        },
        token(): string {
            return this.coachToken || ""
        }
    },

    actions: {
        async checkLogin() {
            this.coachToken = localStorage.getItem('coachToken')
            if (this.coachToken != null) {
                const result: UserData = await this.doRequest('/auth/check-login', 'GET')
                console.log(result)
                userData.set(result)
            }
        },

        async login(login: string, password: string) {
            const result: UserLoginResponse = await this.doRequest('/auth/login/coach', 'POST', {'login': login, 'password': password})
            this.coachToken = result.token
            userData.set(result.userData)
            localStorage.setItem('coachToken', this.coachToken)
        },

        logout() {
            this.coachToken = null
            userData.invalidate()
            localStorage.removeItem('coachToken')
        },

        async doRequest(endpoint: string, method: string, data: any | null = null): Promise<any> {
            let fetchOptions = {
                method: method,
                headers: {} as any,
            } as any

            if (data != null) {
                fetchOptions.headers['content-type'] = 'application/json'
                fetchOptions.body = JSON.stringify(data)
            }
            if (this.coachToken != null) {
                fetchOptions.headers['Authorization'] = this.coachToken
            }
            
            try {
                var r = await fetch(`/api/v1${endpoint}`, fetchOptions)
            } catch (e) {
                snackbar.showError('Незвестная ошибка запроса к серверу')
                console.error(e)
                throw e
            }

            if (r.status != 200) {
                if (r.status == 401) {
                    this.logout()
                }
                const rJson: ErrorResponse = await r.json()
                snackbar.showError(rJson.errorMessage)
                console.error(rJson)

                let e = new Error(`(${rJson.errorType}) ${rJson.errorMessage}`)
                throw e
            } else {
                if (r.headers.get('Content-Type') == 'application/json') {
                    const rJson: BaseResponse = await r.json()
                    return rJson.data
                } else {
                    return await r.blob()
                }
            }
        }
    }
})