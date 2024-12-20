---
title: Third-Party Libraries; A Discussion
description: A discussion on the use of third-party libraries
date: '2024-12-20'
categories:
  - Opinion
  - Libraries & Frameworks
published: true
---

## Reusing code
A common adage taught when programming (and many other disciples) is
> Don't reinvent the wheel

Software developers, in general, tend to take pride in this concept. Often 'borrowing' code from source like Stack Overflow, GitHub, or more recently ChatGPT. Why work out the solution again if someone else has already done so? This even applies to more conceptual aspects like design patterns.

## Third-party libraries, frameworks and APIs
However, this concept is taken even further when we apply it to third-party libraries, frameworks and APIs. Just like the abstraction of being able to code away in C or Java instead of needing to know machine language, there is no arguing that on the whole these tools greatly increase a developer's efficiency. Even if we can write a REST web framework from scratch it's unlikely your client will sign off a massive bill instead of using an existing framework. 

[Harvard Business School](https://www.library.hbs.edu/working-knowledge/open-source-software-the-nine-trillion-resource-companies-take-for-granted) calculates that the Open Source community has an impact of nearly 9 trillion dollars, yes trillion with a 't'.
> "The $8.8 trillion number represents the demand-side value of OSS—if OSS did not exist at all, and every company that used it had to rewrite that software from scratch."

So we must thank those developers who contribute to and support open source projects, without them the software development sector would be a much different landscape.

### The benefits
Existing libraries and frameworks, at least the good ones, come with many benefits outside of just efficiency including:
- It's already getting used, which means
  - there's likely plenty of documentation about how to get it working
  - and other people have often ran into issues before you and fixes have been applied or work around found
- Its backed by a comprehensive test and review suite to ensure only good quality code makes it in
- Compatibility is kept up to date with other libraries
- Any security issues are found, recorded, and quickly fixed
- Helpful tools/plugins like IntelliSense, code and syntax highlighting already exist for common editors

### The drawbacks
Of course not all libraries are made equal, some can instead be a detriment to your project. Often this is the case when:
- It's no longer maintained, which means
  - Compatibility may be hit or miss
  - Security issues wont be fixed
  - Documentation may be out of date or minimal
- It's a 'one-off' solution with minimal real usage
- It's closed source and knowledge about how it works is kept hidden

### Why it's all important
Clearly, we can see from the $9 Trillion figure mentioned in the article above, using open-source solutions is practically essential to deliver software projects. The end user doesn't care about the implementation so libraries and frameworks that help you and your team deliver a product before the competition is a better alternative than being pure and pedantic about writing everything from scratch. Interestingly we anecdotally hear the same is true of investing too much time creating the perfect code base, even if in the long run technical debt may catch up with you sometimes getting something to market is just that important.

It can be hard to get started with choosing these libraries or frameworks, many larger options have ardent fans and haters online that can muddy the sentiment to an outsider. For example, if we consider front-end web libraries we have: React, Vue, Svelte, Angular, and more. Each of these are used by tens of thousands to millions of developers around the world and have great support for common features (whether first-party or not). So in this example how could you decide what framework to use? Well it's not the answer people want but it is all too common in software engineering 
>It Depends...

Such a choice depends on a lot of basic things:
- How many people are working on the project?
- Do they have any experience with the options?
- What is the size and complexity of the project?
- What support exists (at the relevant level i.e. community vs enterprise)?
- and more...

As well as more domain-specific things:
- Will it be server-side rendered?
- How much does the size and speed of the shipped app matter?
- So additional libraries exist to support your use case?
- and more...

Often the only way to make a good decision is with knowledge of and experience with each of the options. Specifically, hands-on experience with each of the options (possibly after narrowing them down based on questions like those above) can help highlight exactly how each works and matches the ideal. This is a core concept of Agile frameworks like Scrum, where a 'Spike' is undertaken to find possible solutions to a problem, whether this be looking at existing solutions or trying to figure something out from scratch.

### Spikes
Spikes are a great tool to time-box the understanding and research of a complex or unknown topic. A spike should end with some actionable output, ideally a potentially mergeable implementation but even just some documentation that outlines the outcome of the spike is a start.

A spike generally follows a simple process:
- Specify the question you want to answer
- Specify the duration you have to complete the spike (time-box)
- Implement some example solutions
- Evaluate and document the pros and cons of each solution and the outcome (or suggested outcome)

Importantly for implementing and evaluating solutions when dealing with third-party options there are a number of extra things to consider.
- The license and terms and conditions of the library
  - This can be a deal breaker in some cases, especially when creating a closed-source/commercial product
- Any existing security issues
  - Of course it's not ideal to pick something with known flaws, though at the bare minimum you should be aware of them and how to combat/eliminate them
- Price
  - This is more of an issue for APIs, but it's an important aspect to consider. Even if you are fine on a free tier now, it's good to make sure that you won't be stuck in an expensive plan when your project grows.
  - Though sometimes you can't escape it and companies will raise their price or completely change their offerings with little notice, so its always good to have some back-ups prepared and an implementation that can be easily substituted for another.

### Some reflections from time spent as an _acting_ CTO
I have acted as a CTO for SENG302, a full-year software engineering project course in teams of ~8 following Scrum. In this course we encourage students to complete their own research and spikes on third-party technologies when needed. As a CTO I then review the outcomes of these spikes and either approve or deny them.

Giving students the opportunity to research different solutions on their own is great as it allows them to explore open-source software that they otherwise may have ignored. It also gives the team more ownership of the product, an important principle of Scrum. The alternative of having every technical choice made by someone external with more experience is less ideal in Scrum, though often makes sense in more prescriptive development methodologies like Waterfall (and the right team/project). However doing so means those in the team get less experience understanding and making technical decisions, or sometimes even having any input at all.

From my experience there are a few aspects to highlight:
- Scope
  - Often people can start looking for solutions with a decision already made (whether consciously or unconsciously) which can mean a more practical solution is overlooked due to biases.
  - Sometimes not knowing enough about the domain of the problem can led to individuals only looking at a narrow slice of potential solutions, instead of spending the extra time to do exploratory research.
- Outcome
  - Having an outcome is the most important part of a spike and the associated research, even if the outcome isn't positive.
  - Doing research only to find no library or framework fits your use case is still an outcome, and maybe the issues you encountered, if documented well, can provide a great starting point for a bespoke solution.
- Going too deep
  - Ideally, an outcome is a mergeable implementation, however it's important to reflect along the way to ensure you are on the right track. Often the best way to do so is reaching out to others to validate what you have done so far. A few quick discussions during the process can save hours of work that gets undone at the end.
- Reading Terms and Conditions
  - No one likes it, but it's important to read the terms and conditions for technologies you use (most often relating to APIs). These are normally a little more specific than a license on an open-source project and may outline specific actions you must take to use the technology or certain things you are restricted from doing.


