import axios from 'axios'

const url = `${process.env.NEXT_PUBLIC_GAMERSE_BACKEND_URL as string}`
export const AddStatAction = async (body: any) => {
    try {
        let res = await axios.post(`${url}/create-stat`, body)
        return { success: true }
    } catch (error) {
        console.log("error:", error)
        return { success: true }
    }
}


export const GetStatAction = async () => {
    try {
        let res = await axios.get(`${url}/stat`)
        return { success: true, data: res.data }
    } catch (error) {
        console.log("error:", error)
        return { success: true, data: [] }
    }
}