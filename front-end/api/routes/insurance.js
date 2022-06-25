import express from 'express'
import InsuranceController from '../controllers/insurance'

const router = express.Router()
const insuranceController = new InsuranceController()

router
    .get('/', async (req, res, next) => 
        await insuranceController.getInsurance(req, res, next))
    
export default router