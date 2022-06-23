from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json


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
async def get_car_price(params: Params):

    keyword = params.keyword

    try: 
        return json.dumps({
            'state': 200,
            'data': {
                'url': keyword
            }
        })
    except Exception:
        return json.dumps({
            'state': 100,
            'message': 'Error'
        })
