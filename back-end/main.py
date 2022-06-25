from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import pandas as pd
import numpy as np
from numpy import dot
from numpy.linalg import norm
from sentence_transformers import SentenceTransformer


class Params(BaseModel):
    keyword: str


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post('/')
async def check_keyword(params: Params):

    keyword = params.keyword
    print(keyword)

    encoder = SentenceTransformer('./models')
    questions = [
        '이번 달에 내가 사용한 금액이 얼마야?',
        '이번 달 나의 지출금액',
        '이번 달에 내가 돈을 얼마나 썼지?',
        '소비 내역',
        '이번 달에 내 카드 실적 보여줘',
        '신용카드 실적 충족내역',
        '카드',
        '내 보험 가입 내역',
        '내 보험',
        '내가 가입 되어있는 보험 내역 보여줘',
        '방금 결제 내역 더치페이 할게']
    columns = ['question', 'encoded', 'page', 'score']
    page = [0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 3]

    question_dataset = pd.DataFrame(columns=columns)
    encoded = []
    for each in questions:
        embeddings = encoder.encode(each)
        encoded.append(embeddings)

    question_dataset['question'] = questions
    question_dataset['encoded'] = encoded
    question_dataset['page'] = page

    def cos_sim(A, B):
        return dot(A, B)/(norm(A)*norm(B))

    try: 
        embedding = encoder.encode(keyword)
        question_dataset['score'] = question_dataset.apply(lambda x: cos_sim(x['encoded'], embedding), axis=1)
        print(question_dataset['score'])
        id = question_dataset.loc[question_dataset['score'].idxmax()]['page']
        print(id)

        return json.dumps({
            'state': 200,
            'id': int(id) + 1
        })
    except Exception as e:
        print(e)
        return json.dumps({
            'state': 100,
            'message': 'Error'
        })
