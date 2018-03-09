import axios from 'axios'
import {apiDomain} from '@/config'

const instance = axios.create({
    baseURL: apiDomain
})

export default instance
