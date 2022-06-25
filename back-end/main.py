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
    questions = ['지난 달에 얼마 썼어?', '저번달 카드 실적 보여줘', '내가 가입되어있는 보험 내역 보여줘']
    columns = ['question', 'encoded', 'page', 'score']

    question_dataset = pd.DataFrame(columns=columns)
    encoded = []
    for each in questions:
        embeddings = encoder.encode(each)
        encoded.append(embeddings)

    page = range(len(questions))
    question_dataset['question'] = questions
    question_dataset['encoded'] = encoded
    question_dataset['page'] = page

    def cos_sim(A,B):
        return dot(A,B)/(norm(A)*norm(B))

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
