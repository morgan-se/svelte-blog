---
title: Running LLMs on a Pi using Ollama
description: A short look at running different Ollama models on a Pi 5
date: '2025-02-03'
categories:
  - LLMs
  - Raspberry Pi
  - Generative AI
published: true
priority: 2
---

## LLMs at home
Large Language Models (LLMs) have risen to great popularity in recent years, however the common ones we know and use today like ChatGPT are trained on billions of dollars worth of hardware nearly 24/7. Thats not something your average hobbyist can compete with. However several large companies have provided pre trained models and weights for hobbyists like us to use and in recent times the accessability and ease of use of these models has improved dramatically.

In this example we'll explore [Ollama](https://ollama.com), named after Meta's open-source [Llama](https://www.llama.com) models that helped pioneer LLMs for the little guys. Though other great examples of open source AI models exist such as [Stable Diffusion](https://stability.ai) as well as developer platforms like [Hugging Face](https://huggingface.co)

## Raspberry Pi 5
In this example we'll be using a Raspberry Pi 5 8gb running ubuntu from an SD card as our 'test-bench'. Raspberry Pis are single board computers about the size of a credit card, and a common device for hobbyists to play around with. They may not be the strongest computers out there but with the most recent refresh they are becoming a great cheap alternative to a full home lab for those interested in software. Though Pi's have have a name for themselves as prototyping and project boards with many different peripherals on the market and a full array of 40 pins for interaction with other elements.
![Raspberry Pi 5](../posts/raspberry-pi-5.png)

## Ollama
As mentioned earlier we will be using Ollama to fetch and run our different LLMs. Ollama is a simple command line tool that can be installed on Mac, Linux, and Windows and allows for easily downloading and 'running' LLMs locally, making them available both through the command line or running in the background and accessible through a rest API.

Feel free to follow along with your own device, though note that model performance is greatly dependent on the device used.

### Finding some models
In our case we are just playing around with a few different models to get an understanding of the underlying process and gain an appreciation for how far the open-source LLM community has come. However for those looking to apply an LLM to an actual use case finding the right model is a crucial part of getting the best results. Those with the knowledge and hardware may even look to take an existing open-source model and specialize it for their domain with extra training.

In our case though we'll just stick to the basics, but do note a few important things to think about when looking for models on their website:
- Finding one that works on your hardware
  - LLM model sizes are recorded as millions or billions of parameters. Generally for a simpler computing device like a Pi you'll want to stick in the 1-3 billion parameter range. If you've got a bit more horse power though you might want to try 7-13 billion parameter models.
- Finding one that was released or updated recently
  - The field of open source LLMs for home use is still moving quickly, and often models you find that are even a few months old are completely irrelevant with a newer flashier option
- Finding one that does what you want
  - There are such a wide range of models available with some focussing their limited parameters on specific tasks like coding, or designed to reason about images

I've picked out a few models listed below to show a wide range of performance, though feel free to pick your own.
<!-- - old llama -->
- llama3.1 (8b)
- llama3.2 (3b)
- deepseek-r1 (3b)
<!-- - tinyllama (1.1b) -->
<!-- - qwen2.5-coder (3b) -->

### Installing
Assuming you are running Linux an Ollama install is easy and done with just one command

```
curl -fsSL https://ollama.com/install.sh | sh
```

Then we can simply run it as a program in our terminal
<!-- Size of code box is kind of weird, maybe a min size somewhere messing with things. Check on PC sometime -->
```
ollama
```

and it should print out some help info

```
Usage:
  ollama [flags]
  ollama [command]

Available Commands:
  serve       Start ollama
  create      Create a model from a Modelfile
  show        Show information for a model
  run         Run a model
  stop        Stop a running model
  pull        Pull a model from a registry
  push        Push a model to a registry
  list        List models
  ps          List running models
  cp          Copy a model
  rm          Remove a model
  help        Help about any command

Flags:
  -h, --help      help for ollama
  -v, --version   Show version information

Use "ollama [command] --help" for more information about a command.
```

### Running a model
Running models is super easy with Ollama, we simply call the `ollama run` command with the name of the model we want. Though make sure you don't forget to specify the parameter count you want if its not the default.

To get started lets run the most recent 8B parameter Llama model, at the time of writing thats Llama 3.1. Luckily for us the 8B parameter is the default model so we can simply run:
```
ollama run llama3.1
```
The first time you run the command it will take a long time _(depending on your internet speed)_ as it needs to download the ~5gb model.

But once its ready you will see a `>>> Send a message (/? for help)` prompt, now you can go ahead and ask it anything. I suggest having a little play around trying to explore what it knows or taking a look at the help info. Though some important commands to know are
  - `\bye` to end the chat
  - `\clear` to clear the session context (all the previous questions and answers), good if you want to start fresh with the model.

## Trying out some different models

For each of the models we'll ask a few questions to get an idea of the quality of their answers, as well as run a simple [benchmark](https://github.com/tabletuser-blogspot/ollama-benchmark) by tabletuser-blogspot on GitHub.

### Llama 3.1 8B
#### Questions
The llama 3.1 8 billion parameter model works on the Pi, but its clearly struggling. Asking the question
> What is 9+10?

It takes almost 10 seconds to think and produces a correct answer at a speed of about 1 words (or tokens) per minute.

When asked a slightly more complex question
> What was the first spacecraft to land on the moon?

We get a detailed, and importantly correct, answer about Apollo 11 (with some extra information about the astronauts and Neil's famous quote) and Luna 2 being the first spacecraft to 'impact' the moon.

> Write a python script which prints all numbers from 1-100

Whilst it takes a while to generate the complete response such a coding task is trivial for the model, however it also provides extra information about the code provided and how to save and run it as a `.py` file.

#### Benchmark results and thoughts
Results from our benchmark show a prompt evaluation rate of 0.98 tokens/s and a evaluation rate of 1.77 tokens/s

Whist a larger 8 billion model generally means better results, the delay in getting a response and only being able to generate one word a second on the Pi makes llama 3.1 a little less than ideal for real-time interaction.


### Llama 3.2 3B
The llama 3.2 3 billion parameter model is a better fit for the pi and other less powerful hardware.

#### Questions
> What is 9+10?

We get a very quick and to the point answer `The answer to 9 + 10 is 19.`. Nothing to complain about there.

> What was the first spacecraft to land on the moon?

Again the model gives a short response compared to others, with simple information about Apollo 11 including only the date and naming of Neil Armstrong and Buzz Aldrin

> Write a python script which prints all numbers from 1-100

Yet again we get a response that is correct and too the point, with minimal introduction and discussion of the code snippet

#### Benchmark results and thoughts
Results from our benchmark show a prompt evaluation rate of 16.00 tokens/s and a evaluation rate of 4.07 tokens/s

llama 3.2 performs great in these basic questions, likely in part to sticking with short and succinct answers instead of succumbing to adding extra information and hallucinating something that fits

### Deepseek R1 1.5B
Deepseek has shaken up the AI sector lately releasing the full 671B R1 model, with several smaller parameter models including existing. As mentioned above, smaller models around 3 billion parameters are better suited to use on devices like the Pi 5 when we want reasonably fast output.
#### Questions
> What is 9+10?

We get a detailed step by step response of how to calculate 9+10 with special formatting for equations (though its not very useful in the terminal). As R1 is a 'reasoning' model, we also first get to see how the model thinks before it actually tackles the problem including the 'reasoning' section of the models response (shown between the `<think>` tags)

```
>>> what is 9+10?
<think>
I need to calculate the sum of 9 and 10.

First, I'll identify the two numbers: 9 and 10.

Next, I'll add them together: 9 + 10 = 19.

Therefore, the final answer is 19.
</think>

To find the sum of **9** and **10**, follow these simple
steps:

1. **Identify the Numbers:**
- First number: \\( 9 \\)
- Second number: \\( 10 \\)

1. **Add the Two Numbers Together:**

\\[
9 + 10 = 19
\\]

3. **Final Answer:**

\\[
\\boxed{19}
\\]
```

> What was the first spacecraft to land on the moon?

Here we get a short answer solely focussing on the Apollo 11 mission mentioning the correct date. However also mentioning they landed "... near the Cheyenne Tower..." which from cursory research online seems to be irrelevant/incorrect knowledge.

> Write a python script which prints all numbers from 1-100

Deepseek handles the simple coding prompt well, providing a simple `for num in range()` loop, however interesting to note it came with a sizeable thinking component including the code and checking what it thinks it would output.

#### Benchmark results and thoughts
Results from our benchmark show a prompt evaluation rate of 13.05 tokens/s and a evaluation rate of 8.38 tokens/s

Results from the much smaller 3 billion parameter sibling clearly can't compare to flagship R1 model that rivals ChatGPTs o1. However having access to a seemingly decent reasoning model in such a small package is great to see.


## Summing up
Its amazing to see how far Generative AI has come, from ChatGPT releasing only a few short years ago to now where the open-source community allows us to run more powerful than those early pioneers at home (though you're still going to need a bit more horsepower than a Pi).

In the end this wasn't really about finding the 'best model', though its clear that smaller models around the 3 billion parameter range work best on the Pi while still giving some good answers (most of the time). That said, from my experience Llama 3.2 looks to be the most balanced of the options and I appreciate the succinctness of the answers it provides, though more complex and thorough testing may highlight the benefits of reasoning models like R1.

Running an LLM on a Pi or your own computer may not come with a grandiose end goal, however I believe getting the exposure to open-source models and their capabilities even on low end hardware is a good way to better understand how such tools may fit into your next project. Though its important to remember that not everything needs to be AI, the latest craze has shown many instances where companies or projects go too deep into AI thinking it is a universal solution. We are also seeing some AI fatigue, where end-users are becoming more weary of products that push AI at the expense of the end users experience.
