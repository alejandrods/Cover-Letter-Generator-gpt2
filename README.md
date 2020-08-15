# Cover Letter Generator using GPT2 - Service Deployed on Google Cloud

Using [GPT2 model](https://huggingface.co/jonasmue/cover-letter-gpt2) trained we can generate some realistic and awesome text.
The main objective of this project is to create a service for generating text using GPT2 model. We've built the application using flask and docker, the service is deployed on Cloud Run (GCP).

Try it [HERE](https://text-generator-gpt2-app-6q7gvhilqq-lz.a.run.app/) :computer::bowtie:

## Table of Contents  

[GPT-2](#gpt2)

[Running the App](#Deploy)  

[Examples](#Examples)  

<a name="gpt2"></a>
## GPT-2
GPT-2 is a large transformer-based language model with 1.5 billion parameters, trained on a dataset of 8 million web pages. GPT-2 is trained with a simple objective: predict the next word, given all of the previous words within some text. The diversity of the dataset causes this simple goal to contain naturally occurring demonstrations of many tasks across diverse domains. GPT-2 is a direct scale-up of GPT, with more than 10X the parameters and trained on more than 10X the amount of data.

- GPT-2 is a model with absolute position embeddings so it’s usually advised to pad the inputs on the right rather than the left.

- GPT-2 was trained with a causal language modeling (CLM) objective and is therefore powerful at predicting the next token in a sequence. Leveraging this feature allows GPT-2 to generate syntactically coherent text as it can be observed in the run_generation.py example script.

- The PyTorch models can take the past as input, which is the previously computed key/value attention pairs. Using this past value prevents the model from re-computing pre-computed values in the context of text generation. See reusing the past in generative models for more information on the usage of this argument.

<a name="Deploy"></a>
## Running the App

1- Clone the repository in your local machine:
```
git clone git@github.com:alejandrods/text-generation-gpt2.git
```

2- Download model using `get_model.py`

3- Set environment variables - Check `.env` file for env. variables required
```
HOST (i.e: http://localhost)
PORT (i.e: 8080)
ROUTE_GENERATE (Route for the application - i.e: generate)
N_TOKENS (Number of words to be generated - i.e: 20)
```

4- Build Image using Docker
```
docker build --tag text-generator-gpt2 .
```

5- Run Docker Image
```
docker run --name text-generator-gpt2 --env-file=.env -p 8080:8080 text-generator-gpt2
```

6- Visit `http://localhost:8080`


>If you are not enable to run `Docker`, you can run the application using:
>```
>python src/app.py
>```


<a name="Examples"></a>
## Examples
**INPUT:** Australia recorded its deadliest day of the coronavirus pandemic on Wednesday and the biggest daily rise in infections in three days, denting hopes that a second wave gripping the state of Victoria may be stabilising. 
**GENERATED:** More people died at the hospital than in any week at the time of the pandemic – up from just six in 2013.

**INPUT:** Australia recorded its deadliest day of the coronavirus pandemic on Wednesday and the biggest daily rise in infections in three days, denting hopes that a second wave gripping the state of Victoria may be stabilising. 
**GENERATED:** More people died at the hospital than in any week at the time of the pandemic – up from just six in 2013.
