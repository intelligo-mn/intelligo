FROM python:3-alpine

WORKDIR /usr/src/app

COPY requirements/requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["/usr/local/bin/gunicorn","-w","2","app:app"]
