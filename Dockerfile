# Dockerfile
FROM python:3.6-slim-stretch

WORKDIR /usr/app

EXPOSE 8080

RUN apt-get -qq update
RUN apt-get install -y -q \
    build-essential \
    curl

# Install rust for tokenizer
RUN curl https://sh.rustup.rs -sSf | bash -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"
RUN rustup check

# Install requirements
COPY /src/requirements.txt /tmp/
RUN pip install -r /tmp/requirements.txt
ADD ./src ./
ADD ./src/coverletter2 ./coverletter2

CMD ["python", "-u", "app.py"]