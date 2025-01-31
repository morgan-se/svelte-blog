---
title: Design by Contract
description: A look at the Design by Contract principle following Java standards
date: '2025-01-31'
categories:
  - Software Engineering
  - Principles
  - Java
published: true
priority: 3
---

## What is Design by Contract
Design by Contract is an approach to writing software that takes the idea of 'contracts' from law and applies that to the code we write. The generalized and simple case of this is simply a method that defines a contract about _how_ it works, broken up into two important sections
- Preconditions
  - These are the requirements that must be met before calling the method (the obligation of the caller)
- Postconditions
  - These are specifications about the output or result that the method will ensure are met after its execution

Lets think about a quick example. 
Say we have a plane and can take-off with up to 10,000kg of cargo and will have an airspeed greater than or equal to 200 knots. We can model this as saying the precondition for take-off is having `cargo <= 10,000kg`. For a postcondition we can consider that same plane after take-off must have an `airspeed >= 200knots`.

The code might look something like the following:
```java
public int takeoff(int cargo) {
    int airspeed = 200 + (100 - (cargo/100));
    return airspeed;
}
```


## Defining a contract
Its important to consider how we actually define the contracts our code meets. At the most fundamental level strongly-typed languages provide clear pre/post-conditions about the arguments passed to any method. For example specifying a function takes an integer and returns a string, which our language tools (generally) enforce.

However Design by Contract requires more than just validating types, instead we often want to validate values. For example as checking that numbers are over or less than a certain value. Sadly for us most programming languages don't support expressing these requirements within our method signatures and receiving valid static analysis on the code to ensure validity. We can get around some of these, especially simpler validation rules by modelling the domain. For example using Enums to represent valid input states gives us certainty that our function won't be called with other invalid states. Though generally, much like law practitioners, we fall back to written language (or documentation) as a means to explain requirements. 

There is no 'official' documentation standard for design by contract, however its generally a simple affair. Importantly we want to make it explicit the exact pre and post condition requirements with as little ambiguity as possible. The vast majority of languages support method level documentation like Javadoc where we can store this information.

```java
    /**
     * Calculate takeoff speed of plane based on cargo on-board
     * Preconditions: Cargo must be <= 10,000kg
     * Postconditions: Returned airspeed will be >= 200
     * @param cargo total weight of cargo on plane
     * @return calculated airspeed at take-off
     */
    public int takeoff(int cargo) {
        // code truncated
    }
```

## Breaking the contract

Much like how breaking a contract may land you in hot-water, when breaking a contract with code its important to 'fail hard'. We 'fail hard' since its important to know as soon as possible when something has gone wrong. Ideally we run into this during development where for some reason a function is called with an 'impossible' value, and failing hard highlights the underlying bug allowing it to be fixed. If we instead programmed to 'defensively' (a paradigm focussing on making it a functions responsibility to handle everything gracefully) then such bugs can easily slip through development and generally lack traceability causing unneeded stress and havoc in its wake.

We can see this most clearly with Java's development/debug feature of asserts, similar to JUnit's AssertTrue the `assert` keyword simply validates the following statement is true. Though in this case `assert`s are written in the actual code not the tests.

```java
class Plane {
    /** doc truncated */
    public int takeoff(int cargo) {
        assert cargo <= 10_000;
        int airspeed = 200 + (100 - (cargo/100));
        return airspeed;
    }
}
```

During development (as long as we pass the `-ea` flag) when our program fails an `assert` statement as seen in the example above it will terminate with an AssertionError exception specifying the exact line that failed.

```
Exception in thread "main" java.lang.AssertionError
	at Plane.takeoff(Plane.java:4)
	at Plane.main(Plane.java:11)
```


<!-- ## A complete example -->
<!-- Come up with a more fleshed out example that has good javadoc explaining the contract, assertions, ... encorporate some more edge case scenarios such as overflow -->
