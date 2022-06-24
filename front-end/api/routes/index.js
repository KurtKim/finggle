import { Router } from 'express'

import Search from './search'
import Expense from './expense'
import Card from './card'

const router = Router()

router.use('/search', Search)
router.use('/expense', Expense)
router.use('/card', Card)

export default router