FROM python:3.9-buster

RUN mkdir app
WORKDIR /app

ENV PATH="${PATH}:/root/.local/bin"
ENV PYTHONPATH=.

COPY requirements.txt .
RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

# for migrations
# COPY migrations .
# COPY aerich.ini .

COPY . .
# CMD ["uvicorn main:app --reload --host 0.0.0.0 --port 8000"]
CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]