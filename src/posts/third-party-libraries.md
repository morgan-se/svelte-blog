---
title: Third-Party Libraries; A Discussion
description: A discussion on the use of third-party libraries
date: '2025-01-01'
categories:
  - Opinion
  - Libraries & Frameworks
published: true
---

## Reusing code
A common adage taught when programming (and many other disciples) is
> Don't reinvent the wheel

Software developers, in general, tend to take pride in the this concept. Often 'borrowing' code from source like Stack Overflow, GitHub, or more recently ChatGPT. Why work out the solution again if someone else has already done so? This even applies to more conceptual aspects like design patterns.

## Third party libraries, frameworks and APIs
However this concept is taken even further when we apply it to third party libraries, frameworks and APIs. Just like the abstraction of being able to code away in C or Java instead of needing to know machine language, there is no arguing that on the whole these tools greatly increase a developers efficiency. Even if we can write a REST web framework from scratch its unlikely your client will sign off a massive bill instead of using an existing framework. 

[Harvard Business School](https://www.library.hbs.edu/working-knowledge/open-source-software-the-nine-trillion-resource-companies-take-for-granted) calculates that the Open Source community has an impact of nearly 9 trillion dollars, yes trillion with a 't'.
> "... [if] every company that used it had to rewrite that software from scratch"

So we must thank those developers who contribute to and support open source projects, without them the software development sector would be a much different landscape.

### The benefits
Existing libraries and frameworks, at least the good ones, come with many benefits outside of just efficiency including:
- Its already getting used, that means
  - there's likely plenty of documentation about how to get it working
  - and other people have often ran into issues before you and fixes have been applied or work around found
- Its backed by a comprehensive test and review suite to ensure only good quality code makes it in
- Compatibility is kept up to date with other libraries
- Any security issues are found, recorded, and quickly fixed
- Helpful tools/plugins like IntelliSense, code and syntax highlighting already exist for common editors

### The drawbacks
Of course not all libraries are made equal, some can instead be a detriment to your project. Often this is the case when:
- Its no longer maintained, that means
  - Compatibility may be hit or miss
  - Security issues wont be fixed
  - Documentation may be out of date or minimal
- Its a 'one-off' solution with minimal real usage
- Its closed source and knowledge about how it works is kept hidden

### Why its all important
Its important to be able to 