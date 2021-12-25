# Dockerfile
FROM python:3.6-slim-stretch

# Allow statements and log messages to immediately appear in the Knative logs
ENV PYTHONUNBUFFERED True
ENV PORT=8080

WORKDIR /usr/app

EXPOSE $PORT

RUN apt-get -qq update
RUN apt-get install -y -q \
    build-essential \
    curl

# Install rust for tokenizer
RUN curl https://sh.rustup.rs -sSf | bash -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

# Install requirements
COPY /src/requirements.txt /tmp/
RUN pip install -r /tmp/requirements.txt
RUN pip install torch==1.10.1+cpu torchvision==0.11.2+cpu torchaudio==0.10.1+cpu -f https://download.pytorch.org/whl/cpu/torch_stable.html
ADD ./src ./
ADD ./src/coverletter2 ./coverletter2

#CMD ["python", "-u", "app.py"]
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 app:app
