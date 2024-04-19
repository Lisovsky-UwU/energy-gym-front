import { defineStore } from 'pinia'
import { useSnackbarStore } from './snackbar'


interface ErrorResponse {
    error: boolean,
    errorMessage: string,
    errorType: string
}


interface BaseResponse {
    error: boolean,
    data: any
}


interface UserData {
    studentCard: number,
    firstname: string,
    secondname: string,
    surname: string
    group: string,
    role: string,
}


interface UserLoginResponse {
    token: string,
    userData: UserData
}


const snackbar = useSnackbarStore()


export const useApiStudentStore = defineStore('apiStudent', {
    state: () => ({
        studentToken: null as string | null,
        userData: null as UserData | null
    }),

    getters: {
        isLogin(): boolean {
            return this.studentToken != null
        },
        fullname(): string {
            return this.isLogin ? `${this.userData?.secondname} ${this.userData?.firstname} ${this.userData?.surname}` : 'No data'
        },
        role(): string {
            return this.userData?.role || 'No data'
        }
    },

    actions: {
        async checkLogin() {
            this.studentToken = localStorage.getItem('studentToken')
            if (this.studentToken != null) {
                const result: UserData = await this.doRequest('/auth/check-login', 'GET')
                this.userData = result
            }
        },

        async login(login: string, password: string) {
            const result: UserLoginResponse = await this.doRequest('/auth/login', 'POST', {'login': login, 'password': password})
            this.studentToken = result.token
            this.userData = result.userData
            localStorage.setItem('studentToken', this.studentToken)
        },

        logout() {
            this.studentToken = null
            this.userData = null
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
        userData: null as UserData | null,
    }),

    getters: {
        isLogin(): boolean {
            return this.coachToken != null
        }
    },

    actions: {
        async checkLogin() {
            this.coachToken = localStorage.getItem('coachToken')
            if (this.coachToken != null) {
                await this.doRequest('/auth/check-login', 'GET')
            }
        },

        async login(login: string, password: string) {
            const result: UserLoginResponse = await this.doRequest('/auth/login', 'POST', {'login': login, 'password': password})
            this.coachToken = result.token
            this.userData = result.userData
            localStorage.setItem('coachToken', this.coachToken)
        },

        logout() {
            this.coachToken = null
            this.userData = null
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
                const rJson: BaseResponse = await r.json()
                return rJson.data
            }
        }
    }
})