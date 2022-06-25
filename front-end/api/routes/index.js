import { Router } from 'express'

import Search from './search'
import Expense from './expense'
import Card from './card'
import Insurance from './insurance'

const router = Router()

router.use('/search', Search)
router.use('/expense', Expense)
router.use('/card', Card)
router.use('/insurance', Insurance)

export default router