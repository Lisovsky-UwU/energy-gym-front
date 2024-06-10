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
    image: string | null
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
        },
        image(): string | null {
            return this.userData?.image || null
        }
    },

    actions: {
        set(data: UserData) {
            this.userData = data
        },

        updateImage(imgName: string | undefined) {
            this.userData = {
                ...this.userData,
                image: imgName
            }
        },

        invalidate() {
            this.userData = null
        },

        async loadNewPhoto(event: any, userRole: string) {
            const file = event.target.files[0]
            if (!file.type.startsWith('image/')) {
                snackbar.showError('Загружаемый файл должен быть картинкой')
                return
            }

            const fd = new FormData()
            fd.append('image', file)
            
            try {
                const api = await import('./api')
                let userApi = userRole == 'STUDENT' ? api.useApiStudentStore() : api.useApiCoachStore()

                const resp = await fetch('/media/update-my-picture', {
                    method: 'POST',
                    headers: { 'Authorization': userApi.token } as any,
                    body: fd
                })

                if (resp.status == 200) {
                    snackbar.showSuccess('Новое изображение успешно загружено')
                    const json = await resp.json() as any
                    this.updateImage(json.imgName)
                } else {
                    snackbar.showError('Возникла ошибка при загрузке изображения')
                }
            } catch {
                snackbar.showError('Возникла ошибка при загрузке изображения')
            }
        },

        // async update(newData: UserData, userRole: string) {
        //     const api = await import('./api')
        //     let userApi = userRole == 'STUDENT' ? api.useApiStudentStore() : api.useApiCoachStore()
        //     const response: UserData = await userApi.doRequest('/user/edit', 'PUT', newData)
        //     this.set(response)
        //     snackbar.showSuccess('Данные успешно сохранены')
        // },

        async changePassword(oldPassword: string, newPassword: string, userRole: string) {
            const api = await import('./api')
            let userApi = userRole == 'STUDENT' ? api.useApiStudentStore() : api.useApiCoachStore()
            await userApi.doRequest('/user/edit-password', 'PUT', { oldPassword, newPassword })
            snackbar.showSuccess('Пароль успешно изменен')
        }
    }
})