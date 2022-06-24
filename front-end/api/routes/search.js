import express from 'express'
import SearchController from '../controllers/search'

const router = express.Router()
const searchController = new SearchController()

router
    .post('/', async (req, res, next) => 
        await searchController.search(req, res, next))
    
export default router