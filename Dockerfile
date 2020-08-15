# Dockerfile
FROM python:3.6-slim-stretch

WORKDIR /usr/app

EXPOSE 8080

COPY /src/requirements.txt /tmp/
RUN pip install -r /tmp/requirements.txt
RUN pip install torch==1.6.0+cpu torchvision==0.7.0+cpu -f https://download.pytorch.org/whl/torch_stable.html && rm -rf /var/lib/apt/lists/*
ADD ./src ./
ADD ./src/coverletter2 ./coverletter2

CMD ["python", "-u", "app.py"]

#docker tag cover-letter-generator-gpt2:latest eu.gcr.io/text-generator-gpt-2/cover-letter-generator-gpt2:latest
#docker push eu.gcr.io/text-generator-gpt-2/cover-letter-generator-gpt2:latest