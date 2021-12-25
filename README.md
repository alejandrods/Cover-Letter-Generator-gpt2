# Cover Letter Generator using GPT2 - Service Deployed on Google Cloud

Everyone knows that writing letters of recommendation is hard work and not everyone's cup of tea, but on the other hand 
it is essential to be able to apply for some jobs. Why not use artificial intelligence to do so?
I have created an application using the [GPT2 model](https://huggingface.co/jonasmue/cover-letter-gpt2) model trained to generate letters of recommendation. The application is built using flask and docker, the service is deployed on Cloud Run (GCP).

Try it [HERE](https://cover-letter-generator-gpt2-app-6q7gvhilqq-lz.a.run.app) :computer::bowtie:

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

More information about how GPT-2 was trained to generate Cover Letters: [Cover Letters GPT-2](https://jonasportfol.io/posts/cover-letters-gpt2)

<a name="Deploy"></a>
## Running the App

1- Clone the repository in your local machine:
```
https://github.com/alejandrods/cover-letter-generator-gpt2
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
docker build -t cover-letter-generator-gpt2 .
```

If you are using Apple M1 Chip:
```
docker buildx build --platform linux/amd64 -t cover-letter-generator-gpt2 .   
```

5- Run Docker Image
```
docker run --name cover-letter-generator-gpt2 --env-file=.env -p 8080:8080 cover-letter-generator-gpt2
```

6- Visit `http://localhost:8080`


>If you are not enable to run `Docker`, you can run the application using:
>```
>python src/app.py
>```


<a name="Examples"></a>
## Examples
**INPUT** 
```
Dear James,

I'm Alex Díaz, an experienced pilot, and I would like to express my  
```
**GENERATED** 
```
Dear James,

I'm Alex Díaz, a experienced pilot, and I would like to express my sincere interest in the Pilot position you have available with the Aviation School.
My education and my experience in flying students would make me a valuable asset to your school. As a proven and experienced Air Force
```
___

**INPUT** 
```
Dear Nick,

I am Alex and I am very interested in the Software Engineer role at your company.   
```
**GENERATED** 
```
Dear Nick,

I am Alex and I am very interested in the Software Engineer role at your company. As a technical engineer, I have developed a wide array of tools for software development, documentation, and analysis, and have been awarded several awards for my expertise in the IT/UX problem solving position at River Tech.
First, I was able to use my knowledge of Microsoft Exchange, Windows 9,
```