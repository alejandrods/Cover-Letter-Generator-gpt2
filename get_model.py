# -*- coding: utf-8 -*-

# Downloads model(s)
from transformers import GPT2LMHeadModel, GPT2Tokenizer

GPT2LMHeadModel.from_pretrained('jonasmue/cover-letter-distilgpt2').save_pretrained('./src/coverletter2')
GPT2Tokenizer.from_pretrained('jonasmue/cover-letter-distilgpt2').save_pretrained('./src/coverletter2')
