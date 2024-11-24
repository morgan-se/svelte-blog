---
title: How have LLMs changed the game
description: A reflection on the state of LLMs and their impact software development and education.
date: '2024-11-23'
categories:
  - LLMs
  - ChatGPT
  - Education
  - Opinion
published: true
---

## What is an LLM
I'm not going to get into the nitty gritty details of how LLMs work, there are many resources out there that do a better job then I could ever do. However a base level of understanding is good.

Generally speaking LLMs are just fancy tools that predict the next word in a sequence, that means when we ask it a question it works out an answer word by word by 'guessing' based on all the data it has consumed in training. For large models this data is millions of times what a human could digest in their lifetime.

So we can ask an LLM any question and it will try formulate a response based on its 'knowledge'. Interestingly due to the breadth and depth of their training data LLMs can actually provide relevant responses about novel things, those not in their training data, often referred to as 'zero-shot'. However LLMs are not infallible, and they may 'hallucinate' or make-up parts of or an entire answer. This seems to be the primary area LLM providers are working on improving in recently, which makes sense since it makes their models look unreliable and can be frustrating for an end user.

## How can we use an LLM
The most common LLM used, at least at time of writing, is [ChatGPT](https://chatgpt.com/) which can be accessed online completely free and without an account (though there are some limits). Other options do exist but for the sake of brevity we will just be looking at ChatGPT.

### Example Problem
Lets tackle a common entry level challenge to solve, the [Tower of Hanoi puzzle](https://en.wikipedia.org/wiki/Tower_of_Hanoi). Here the puzzle is to move the disks from the left most rod to the right most rod, with the constraint that only one disk may be moved at a time and when moved a disk may only be placed on top of a disc that is smaller than itself.

Try have a go with the interactive example below to see if you can work it out.

<script>
  import TowerOfHanoi from './How-have-LLMs-changed-the-game/hanoi.svelte'
</script>

<TowerOfHanoi />


Writing the code to solve such a puzzle is often done in first year coding courses at university. In the case of the Tower of Hanoi puzzle its a good exercise to help learn recursion.

### How can ChatGPT 'help'
We can ask ChatGPT something as basic as

> ``Write me a Tower of Hanoi solver in python''

And it will give back working python code that solves the puzzle seen below.

```python
def tower_of_hanoi(n, source, auxiliary, target):
    # Base case: If there's only one disk, move it from source to target
    if n == 1:
        print(f"Move disk 1 from {source} to {target}")
        return
    
    # Move n-1 disks from source to auxiliary, so they are out of the way
    tower_of_hanoi(n-1, source, target, auxiliary)
    
    # Move the nth disk from source to target
    print(f"Move disk {n} from {source} to {target}")
    
    # Move the n-1 disks from auxiliary to target
    tower_of_hanoi(n-1, auxiliary, source, target)

# Example usage: solve the Tower of Hanoi for 3 disks
n = 3
tower_of_hanoi(n, 'A', 'B', 'C')
```

In this case we are asking about a common problem, meaning there are many (likely thousands) of example solutions in the data that ChatGPT was trained on. So of course we would expect it to do well at the task. Novel problems that require a unique solution can be more tricky, we'll look at such an example later.

### Is it really helping?
The use of LLMs especially in education is a hotly debated topic. Whilst there are arguments for both sides there is one point that sticks out especially for me, and that is ``Does it really help?''. A student going to ChatGPT and getting an answer they can copy-paste into their assignment or homework is bad on many fronts. Some may argue, though, that there have always been ways to cheat assignments whether it be copying a classmates work, or finding a solution online. However never has it been so available, practically any problem (at least that students are going to be expected to solve at university) can be solved in a seconds by just asking ChatGPT. Heck why even write the prompt yourself instead you can copy paste the question directly and get an answer.

The tailored nature of the solutions it provides lead to reduced understanding required from the end user, something that has disastrous consequences on learning. 

