---
title: Unit testing privates
description: Some thoughts about unit testing in Java
date: '2024-12-03'
categories:
  - Java
  - Spring
  - Testing
published: false
priority: 2
---

Testing is an important part of writing *working* code, however in larger projects testing individual units of code can be complex especially when they are intertwined with third-party code. A pertinent example of this comes in when dealing with large projects scaffolded with dependency injection, in this case look directly at sprint but other examples exist.

Many argue that that you should never test private methods often coming back to a few key points:
- The important functionality your code (class) executes should be defined solely through its public interface (as in the public methods it exposes, not specifically implementing an interface, though doing so can be a good idea TODO tie in Liskov).
- If a method is private it can't easily be accessed (or tested) outside of the class

However to some extent I can't fully agree, there are many cases where a class may internally define important logical units of code that we want to test for assurance that oit will work. Take for example a component class in spring (i.e. annotated with `@Component`), that simple runs a background task every so often. Such a class need not expose any functionality outside of a simple initialisation method such as a `@PostConstruct` (something we don't even explicitly call). In such a case we may also want to be very careful about exposing any of the methods due to the side-effects they may cause if from outside our controlled environment. However clearly such a class requires testing, likely even more thorough testing than normal since the side-effects of the code may not be easily to manually confirm during development.

## Using reflection
Testing private methods is not ideal though, by definition they are not accessible outside of the class so we have to get creative. By using reflection we can directly access fields and methods of a class, manually setting their values or invoking them respectively.  However this does come with its drawbacks, most notably of which is terrible maintainability since we lose the direct reference between a method and its caller, meaning compile time checks may not catch issues and IntelliSense may not accurately inform a developer of issues that arise when changing the underlying implementation or its caller.

// todo: some example code