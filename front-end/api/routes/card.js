import express from 'express'
import CardController from '../controllers/card'

const router = express.Router()
const cardController = new CardController()

router
    .get('/', async (req, res, next) => 
        await cardController.getCard(req, res, next))
    
export default router