# -*- coding: utf-8 -*-

import torch
from transformers import GPT2Tokenizer, GPT2LMHeadModel
torch.set_grad_enabled(False)

# Check if gpu or cpu
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Load tokenizer and model
tokenizer = GPT2Tokenizer.from_pretrained("./coverletter2")
model = GPT2LMHeadModel.from_pretrained("./coverletter2", pad_token_id=tokenizer.eos_token_id)
model = model.to(device)


def generate(user_text, size=20):
    """
    Function to generate text

    :param user_text: User text
    :param size: Number of words to generate
    :return: string with user text + generated text
    """

    # Tokenizer user_text
    tokens = tokenizer.encode(user_text)

    # Send to cpu/gpu
    tokens = torch.tensor([tokens]).to(device)

    # Generate
    tokens = model.generate(tokens, max_length=size+tokens.shape[1], do_sample=True, top_k=50)
    tokens = tokens[0].tolist()
    return tokenizer.decode(tokens, skip_special_tokens=True)
