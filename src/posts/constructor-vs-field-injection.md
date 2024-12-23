---
title: Constructor vs Field Injection
description: A short reflection on the difference between constructor and dependency injection.
date: '2024-12-21'
categories:
  - Java
  - Dependency Injection
  - Spring
published: true
priority: 2
---

## Dependency injection refresher
Dependency injection is a design pattern often implemented in Java and other object-oriented languages. The purpose of the pattern is to abstract the functionality relating to managing/creating dependencies out of the object itself. This is important to reduce coupling between classes, promote reusable code and more.

In the following examples we'll be looking at examples similar to Spring dependency injection, for a little more information about how this works you can refer to the [Understanding Spring](./understanding-spring) post.


## Field injection
Field injection is the process of injecting dependencies directly into class-level variables, within Spring we do this by simply annotating those fields with the `@Autowired` annotation. We can see a simple example in the code below, where the `Dependency` field will be automatically initialized by the dependency injection framework after creation of the object but before it is used.

```java
class MyObject {
    @Autowired
    private Dependency dependency;

    public MyObject(){
    }
}

class Dependency {}
```


## Constructor Injection
Constructor injection is a very similar process however instead of annotating specific fields we simply annotate the constructor. The underlying dependency injection framework then creates the object with the required dependencies through the constructor itself. We can see the example above adapted to constructor injection.

```java
class MyObject {
    
    private final Dependency dependency;

    @Autowired
    public MyObject(Dependency dependency){
      this.dependency = dependency;
    }
}

class Dependency {}
```

## A comparison
It may seem like a trivial difference, but constructor dependency injection comes with a number of advantages:
- The dependency fields are now final
- The constructor defines a 'contract' specifying the exact dependencies needed for the object, this means:
    - the code is self-documenting and easier for other devas to reason about
    - dependencies can more easily be passed in as mock for testing purposes completely separate from any existing dependency management system.
    - the class becomes more difficult to instantiate without the required dependencies
- Issues with dependencies are found earlier, at object creation instead of after when field dependencies are injected.


There is one main drawback to using constructor injection, that being bloated constructors where there are too many dependencies needing to be passed in through one point. However, this is a code smell in its own right and by highlighting classes with too many required dependencies we can appropriately address the issue creating cleaner code all around.
