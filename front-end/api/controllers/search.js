import Controller from '.'
import axios from 'axios'

export default class SearchController extends Controller {
    constructor() {
        super()
    }

    async search (req, res) {
        const { keyword } = req.body
        const result = await axios.post(
            process.env.NODE_ENV === 'development'
                ? 'http://127.0.0.1:8000'
                : 'http://172.17.0.1:8000', 
            { keyword: keyword })
        const data = JSON.parse(result.data)
        console.log(data)
        return res.json(data)
    }
}