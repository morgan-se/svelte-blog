---
title: How have LLMs changed the game?
description: A small reflection on the state of LLMs and their impact software development and education.
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

> Write me a Tower of Hanoi solver in python

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
The use of LLMs especially in education is a hotly debated topic. Whilst there are arguments for both sides there is one point that sticks out especially for me, and that is ``Does it really help?''. A student going to ChatGPT and getting an answer they can copy-paste into their assignment or homework is bad on many fronts. Some may argue, though, that there have always been ways to cheat assignments whether it be copying a classmates work, or finding a solution online. However never has it been so available, practically any problem (at least that students are going to be expected to solve in their first year at university) can be solved in seconds by just asking ChatGPT. Heck, why even write the prompt yourself when you can just copy paste the question directly instead and still get the right answer? The tailored nature of the solutions it provides lead to reduced understanding required from the end user, something that has disastrous consequences on learning. 


### Is it just education?
Many in industry have adopted ChatGPT or other LLMs as tools to improve their efficiency, it may not be everyone's cup of tea but I believe there are certainly places it brings great value. Though one has to make sure they don't fall into the same traps as learners do, just because you can offload many problems to an LLM doesn't mean you don't need to understand the code. Doing so will only mean that when something doesn't work you are buried under undocumented and bloated code that you don't understand.

There are other issues with using LLMs in a professional context, some jobs have strict regulations on their code, meaning copy pasting things into ChatGPT just is not allowed. We've already seen a [high-profile case of this occur with Samsung](https://mashable.com/article/samsung-chatgpt-leak-details). Though the main issues I see are:
- Many problems are more nuanced and complex than something solved a million different times online that every 1st year university student is expected to complete
- ChatGPT doesn't have all the context, instead its more than happy to write everything from scratch even if your codebase already has many of the required functions
- Depending on the LLM you may also run into issues with more recent languages and frameworks as the training data may simply not contain the new information, or may be heavily skewed by previous versions


## How should we use an LLM
As I eluded to before, I think LLMs are useful in certain professional contexts. Those are:
- Picking up a new language (or remembering syntax you haven't used in a while). In this case you are not missing out on the learning aspect as the underlying fundamentals are there. Instead its like going to a to look up a translation in a dictionary.
- Basic one time use scripts. If all you need is something like a simple python script to read some data and change its format then we can largely ignore the issues that come with code smells or not having all the context. Though you still need to understand the code to validate it actually does what you are wanting.
- Non-critical dummy data. If all you need is a whole bunch of different dummy data ChatGPT is an easy choice, working well with csv files and SQL.

Though worry not learners, you can interact with LLMs in a way that promotes learning instead of getting it to do the work for you. With the proper prompting ChatGPT can become an excellent tutor to help learn programming contexts.

It could be as simple as saying
> Can you teach me step by step how to write a Tower of Hanoi solver in python? Don't give me any code let me work that out

And ChatGPT will give a thorough break down of the steps you should go through to write the code yourself (YMMV since ChatGPT is ever-evolving and not deterministic). In my case I received a detailed breakdown of the following points:
1. Understand the Problem — Learn the basic rules and objectives.
1. Break Down the Problem — Identify the steps needed for solving the puzzle for any number of disks.
1. Define the Function — Set up the recursive function with parameters for the number of disks and the pegs.
1. Base Case — Define what happens when there's only one disk to move.
1. Recursive Case — Think about how to break the problem into smaller sub-problems.
1. Track Moves — Ensure you log or output the moves as you go.
1. Test the Function — Start with small numbers of disks and verify correctness.
1. Optimize (Optional) — Consider any additional improvements once the basic function is working.

But the true beauty lies in the fact you can converse with it and it will maintain the context. You can share code snippets as you work to get feedback about why things aren't working, or ways you could better write something.
 