import express from 'express'
import ExpenseController from '../controllers/expense'

const router = express.Router()
const expenseController = new ExpenseController()

router
    .get('/', async (req, res, next) => 
        await expenseController.getExpense(req, res, next))
    
export default router