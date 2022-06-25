import Controller from '.'
// import FS from 'fs'

export default class InsuranceController extends Controller {
    constructor() {
        super()
    }

    async getInsurance (req, res) {
        return res.json({
            list: [
                {
                    "user_seq_no": "U123456789",
                    "guarant_age": 37.3,
                    "num_pay": 100,
                    "remain_pay": 17,
                    "expire_date": "2030년 3월 29일",
                    "guarant_date": "2030년 3월 29일",
                    "insurance_name": "AIG튼튼한 New치아보험2111(2종)",
                    "month_paid": 9920,
                    "total_paid": 1190400,
                    "warrant_detail": "치과 보험"
                },
                {
                    "user_seq_no": "U123456789",
                    "guarant_age": 30,
                    "num_pay": 5,
                    "remain_pay": 7,
                    "expire_date": "2022년 12월 31일",
                    "guarant_date": "2022년 12월 31일",
                    "insurance_name": "삼성화재 애니카 다이렉트 자동차보험",
                    "month_paid": 27330,
                    "total_paid": 327960,
                    "warrant_detail": "자동차 사고 보험"
                },
                {
                    "user_seq_no": "U123456789",
                    "guarant_age": 109.5,
                    "num_pay": 30,
                    "remain_pay": 309,
                    "expire_date": "2062년 6월 15일",
                    "guarant_date": "2102년 6월 15일",
                    "insurance_name": "삼성 인터넷연금보험1.9",
                    "month_paid": 200000,
                    "total_paid": 96000000,
                    "warrant_detail": "연금 보험"
                }
               ]
        })
    }
}