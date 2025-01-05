---
title: Testing practices
description: A reflection on testing practices
date: '2025-01-05'
categories:
    - Testing
    - Acceptance Testing
published: true
priority: 3
---

## Why do we test
Before going into detail about the different types of testing its important to reflect first on why testing is important in software development. Many developers don't enjoy testing and tend to put it off where possible, something even more common in those still learning. Generally there is a push or temptation to work on delivering features more then tests, sometimes by individuals who just don't want to test but sometimes from management who want features delivered ASAP without understanding the importance of tests.

Testing is an important part of the software development lifecycle and is the main way we can be confident the code we write has _less_ bugs. Importantly "_less_" because testing doesn't eliminate the possibility of bugs in our code, instead each bug we find in testing is one less that comes up in production. There are some software domains that need more thorough testing such as safety critical systems like those found in avionics, health devices, etc... whilst in these cases they may make use of similar underlying testing practices it becomes a more detailed exercise in compliance, meeting regulatory standards, and independent verification and review. However for most developers working on non-critical systems, testing that thoroughly doesn't make economical sense and can conflict with agile software methodologies.

Proper testing also helps in a few other ways, such as improving maintainability by highlighting where bugs are occurring, finding regressions through repeated automated testing, and being another source of 'documentation' about the code.


## The types of testing
Generally there are 3 common types of testing (at least in a web development context), these being unit, integration, and end-to-end.

### Unit testing
Unit testing is the most common form of testing you will learn about in any relevant software engineering course. As the name implies unit testing is the testing of individual units of code. Though what people consider a 'unit' is less concise. Often unit testing is taught as testing a single function, since generally this will be the smallest stand alone piece (or unit) of a codebase, and generally this is a good starting point if the underlying functions themselves follow coding best practices. Specifically functions should not be too long or too complex, and only do one thing. There are other paradigms like functional programming take this further and suggest that functions should simply take inputs and create outputs, without modifying external state or its own internal state that can affect the output.


### Integration
Integration testing is a step above unit testing, where instead of testing a single unit on its own we are testing how different units of code work or 'integrate' together. Doing so allows for explicitly testing for bugs that may occur when different units of code are used together even if each individual unit passes its own unit tests.

When doing integration testing it is wise not to go for the 'big-bang' approach where the entire application is put together and tested as a whole to validate that the individual units work together. While this may be okay in very small projects, it negatively impacts maintainability of both the test suite and codebase as any change can impact how the whole system is tested not to mention making integration bugs are hard to track down since everything is under test at once. Instead important unit interactions should be prioritized and tested on a smaller scale, such as only testing how one or two units interact at a time.

### End-to-end (E2E)
End-to-end testing is the final piece of the testing puzzle, and as the name suggests we are testing the application from 'end to end' much like how a user will actually use the application. Much like manual testing, emulating the entire flow of the application as though an actual user is using it is a great way to make sure the application as a whole actually works as expected while still having an automated and repeatable testing suite.

As alluded to above with integration testing, the more an individual test does the harder it is to maintain and the less information is gives about the exact cause of an issue. Importantly with E2E testing even if we are simulating a real user using the application, the test itself will only check exactly what we tell it to, this means that if we are just checking a value is entered and returned correctly any other bugs that exist in the UI may not cause the test to fail (and thus not be found).

When E2E testing it is also important to consider in what context the tests will be used, while simple E2E testing on a developers machine helps validate the application is working correctly we can also run the tests on a simulated deployed environment giving extra confidence that the application works in production as well. Testing in a simulated production environment comes with its own drawbacks with the main issues relating to complexity and cost (i.e. of running cloned production instance just for testing). Though options somewhere in the middle exist such as having the application and its configurations dockerized so 'production-like' clones can be easily spun up for testing.

## Testing paradigms
Alongside different types of testing there are also entire paradigms about how testing should be completed for a project, the most common one being 'Test Driven Development' (TDD), though other sibling paradigms have also been introduced such as 'Acceptance Test Driven Development'.


### Test Driven Development
TDD is the practice of developing software through writing tests, specifically one starts by writing a test then writes code to make that test pass and repeats the process until the system is complete. TDD often works best when paired with unit testing, since its easier to know what a small unit of code should do before writing it so tests can actually be written. Higher-level testing can be more complex if the application is not precisely defined, for example image trying to write an E2E test for a webpage when no part of it yet exists.

Generally TDD follows the given cycle:
1. Write a Test: Start by writing a test for a 'unit' of functionality you want to add.
2. Write the Code: Write the minimum implementation necessary to make the test pass.
3. Run Tests: Verify that the test passes and that no other tests are broken.
4. Refactor: Clean up the code while ensuring all tests still pass.
5. Repeat: Move on to the next piece of functionality.

TDD is often a polarizing software design paradigm. Many developers prefer to write code and testing is more of an afterthought or nuisance that they have to do to meet certain metrics. Though others swear by the efficiency and paradigm-shift TDD provides for shipping working code. How fitting each perception is depends on the project, an undefined, non-critical system with regular changes/updates generally needs less testing than a well defined, critical system that needs to stand the test of time. However, ignoring tests entirely or only doing them to meet metrics imposed by others will almost always end badly, not necessarily because writing tests first is better but because taking care with testing leads to better tests (much like any other aspect in life). 

### Acceptance Test Driven Development
ATDD build off of TDD, where instead of writing tests for individual units of code before writing the implementation we instead write the acceptance tests first. Acceptance tests are those tests that define whether a functionality is considered accepted, often forming a contract between a client and the developer for what is to be created, because of this it is important they are in non-technical terms. The difference between acceptance testing and other forms like those discussed above is often quoted 
> Acceptance testing is a good way to make sure you are building the right thing, where regular testing processes help make sure you are building the thing correctly.

I mentioned above for TDD that it can be difficult to write high level tests before the implementation, ATDD specifically looks at the functionality the app must have to be considered complete. Because of this the relevant tests should already be well-defined in non-technical language (such as the given-when-then format) and can be easily written before any actual code. The implementation details of the tests can be more difficult to create before hand, for example writing the step definitions when using tools like Cucumber.


## Final thoughts
When developing any software its important to consider how you will incorporate testing, often there is little excuse for no testing at all. Though much like other aspects of software engineering "it depends" and educated trade-offs should be made about the amount and types of testing (or paradigms to follow) that fits the project and team best.

Something I didn't touch on when discussing types of testing is the idea of a 'Testing Pyramid'. Much like the food pyramid many of us grew up with, it provides a loose idea of the relative amount of testing we should do of each type. Importantly we want more smaller tests (such as unit tests) to make up the base with fewer and fewer of other tests types as they increase in complexity, namely integration then E2E. There is quite a simple reason behind it that is discussed when covering the different testing types; bigger, more complex tests not only are more work to create but have a greater impact on the maintainability and modifiability of the code and test suite. Instead it makes sense to prefer having more of the smaller less complex tests.

Finally, and maybe this is just my experience in education but, remember that testing shouldn't be an afterthought or done as a chore just to meet metrics like line coverage. This only incentivizes writing poor tests, such as ones that test too much at once and become unmaintainable or ones that just aim for coverage and don't actually provide any real confidence in your code.