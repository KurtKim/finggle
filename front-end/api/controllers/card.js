import Controller from '.'
// import FS from 'fs'

export default class CardController extends Controller {
    constructor() {
        super()
    }

    async getCard (req, res) {
        return res.json({
            list: [
                {
                  "cards": "우리카드",
                  "payAmount": 573200,
                  "target": 700000
                },
                {
                  "cards": "삼성카드",
                  "payAmount": 63400,
                  "target": 236600
                },
                {
                  "cards": "신한카드",
                  "payAmount": 302000,
                  "target": 198000
                }
            ]
        })
    }
}