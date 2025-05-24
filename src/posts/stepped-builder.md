---
title: Stepped Builder
description: Expanding the builder pattern
date: '2025-05-17'
categories:
  - Java
  - Design Patterns
published: true
priority: 2
---

## What is the builder pattern
The builder pattern is a creational pattern outlined by the Gang of Four in **Design Patterns: Elements of Reusable Object-Oriented Software** in the 90s (despite its age the ideas hold up well and are widely taught in computer science and software programmes around the world). The goal of the builder pattern specifically is to simplify the creation of objects through a new object that encapsulates the logic for complex object creation.

A much more detailed breakdown of the pattern (and all the others) can be found in the aforementioned [Design Patterns](https://wikipedia.org/wiki/Design_Patterns) book, or through the excellent online resource [Refactoring Guru](https://refactoring.guru/design-patterns).



## The 'problem'
The builder pattern allows for much of the object creation process to be simplified and more direct for a client, however in doing so it opens the possibility of invalid configurations. Some may argue that one of points of the builder pattern is to define creation logic with defaults such that an invalid state can not be achieved. However in some cases default values may not be desired, instead wanting to force the client to specify specific options or properties through the builder.

Since a builder simply defines a list of methods which set logic and a final `build()` function to create the object, any issues in configuration are found at runtime. As well as this, the building process is somewhat unclear, as the required methods are not clearly exposed or required through code alone.

One can likely reason their own way to the stepped builder pattern, specifically it has one core tenet. That being that we only want to provide the option to even use `build()` until the builder is properly configured. We may optionally extend this idea to any required configuration in the builder, for example only allow setting some configuration after one it depends on is defined.


## The 'stepped' builder 
As the name implies, the stepped builder separates the builder configuration into discrete steps. At each step different methods are exposed to the client for them to set and move to the next step, finally ending in the `build()` step itself. This way we can ensure any client has gone through the different steps and created a valid builder configuration before they attempt to create any object. This also provides much more guidance for the client, since at each step only specific methods are exposed for them. With IntelliSense this makes using a builder trivial for a developer, and may be especially relevant when considering third-party APIs where we can not reasonably expect the developer to have understanding of the underlying code (or even access to it).


The stepped builder is not without its drawbacks though, the most notable of this being a more complex implementation exposing numerous interfaces. Also in many cases having a strict flow for the client to follow may impact the versatility and reusability of a configured builder. A basic implementation also requires exposing the creation of the builder through a static method instead of object creation as clients may be used to.


## Seeing an example in code
Lets take the example of a `Player` class with some basic objects like a name and some stats. Such a class could be used to model the players in a tournament like 'game', in doing so it makes sense we may need numerous players with different stats so a builder pattern fits as a solution to encapsulate this creation logic in a reusable way.

```java
public class Player {
    private String name;
    private int speed;
    private int strength;
    private int stamina;

    public Player () {}
    
    @Override
    public String toString() {
        return "Player [name=" + name + ", speed=" + speed + ", strength=" + strength + ", stamina=" + stamina + "]";
    }

    // Getters truncated

    public void setName(String name) {
        this.name = name;
    }

    public void setSpeed(int speed) {
        this.speed = speed;
    }

    public void setStrength(int strength) {
        this.strength = strength;
    }

    public void setStamina(int stamina) {
        this.stamina = stamina;
    }
}
```

A basic builder that provides functionality to set a name and each stat individually or randomize them all.

```java
class PlayerBuilder {
    private String name;
    private int minSpeed, maxSpeed;
    private int minStrength, maxStrength;
    private int minStamina, maxStamina;
    final private Random random;

    public PlayerBuilder() {
        random = new Random();
    }

    public Player build() {
        Player player = new Player();
        player.setName(name);
        player.setSpeed(getStatBetween(minSpeed, maxSpeed));
        player.setStrength(getStatBetween(minStrength, maxStrength));
        player.setStamina(getStatBetween(minStamina, maxStamina));
        return player;
    }

    public PlayerBuilder withName(String name) {
        this.name = name;
        return this;
    }

    public PlayerBuilder withStatsBetween(int min, int max) {
        this.minSpeed = min;
        this.minStrength = min;
        this.minStamina = min;
        this.maxSpeed = max;
        this.maxStrength = max;
        this.maxStamina = max;
        return this;
    }

    public PlayerBuilder withSpeed(int speed) {
        this.minSpeed = speed;
        this.maxSpeed = speed;
        return this;
    }

    public PlayerBuilder withStrength(int strength) {
        this.minStrength = strength;
        this.maxStrength = strength;
        return this;
    }

    public PlayerBuilder withStamina(int stamina) {
        this.minStamina = stamina;
        this.maxStamina = stamina;
        return this;
    }

    private int getStatBetween(int min, int max) {
        return random.nextInt((max - min) + 1) + min;
    }
}
```

Lets see it in action

```java
Player player = new PlayerBuilder().withName("John").withStatsBetween(50, 60).build();
System.out.println(player);
```
Doing so we get a valid player following the configuration we provided.
```
Player [name=John, speed=57, strength=58, stamina=60]
```

But what happens if we forget to set a name?
```java
Player namelessPlayer = new PlayerBuilder().withStatsBetween(50, 60).build();
System.out.println(namelessPlayer);
```
```
Player [name=null, speed=56, strength=60, stamina=57]
```
Now we've got a `null` name which if the developer isn't careful may lead to null pointer exceptions and a broken application. In a trivial example like this providing a default name may be a more realistic solution. However instead with a stepped builder we can ensure a name is set to avoid such invalid configurations. Here we have an updated builder which breaks the configuration into steps.

```java
interface PlayerBuilder1 {
    PlayerBuilder2 withName(String name);
}
interface PlayerBuilder2 {
    PlayerBuilder3 withSpeed(int speed);
    PlayerBuilder5 withStatsBetween(int min, int max);
}
interface PlayerBuilder3 {
    PlayerBuilder4 withStrength(int strength);
}
interface PlayerBuilder4 {
    PlayerBuilder5 withStamina(int stamina);
}
interface PlayerBuilder5 {
    Player build();
}

class SteppedPlayerBuilder implements PlayerBuilder1, PlayerBuilder2, PlayerBuilder3, PlayerBuilder4, PlayerBuilder5 {
    private String name;
    private int minSpeed, maxSpeed;
    private int minStrength, maxStrength;
    private int minStamina, maxStamina;
    final private Random random;

    private SteppedPlayerBuilder() {
        random = new Random();
    }

    public static PlayerBuilder1 create() {
        return new SteppedPlayerBuilder();
    }

    public Player build() {
        Player player = new Player();
        player.setName(name);
        player.setSpeed(getStatBetween(minSpeed, maxSpeed));
        player.setStrength(getStatBetween(minStrength, maxStrength));
        player.setStamina(getStatBetween(minStamina, maxStamina));
        return player;
    }

    public PlayerBuilder2 withName(String name) {
        this.name = name;
        return this;
    }

    public PlayerBuilder5 withStatsBetween(int min, int max) {
        this.minSpeed = min;
        this.minStrength = min;
        this.minStamina = min;
        this.maxSpeed = max;
        this.maxStrength = max;
        this.maxStamina = max;
        return this;
    }

    public PlayerBuilder3 withSpeed(int speed) {
        this.minSpeed = speed;
        this.maxSpeed = speed;
        return this;
    }

    public PlayerBuilder4 withStrength(int strength) {
        this.minStrength = strength;
        this.maxStrength = strength;
        return this;
    }

    public PlayerBuilder5 withStamina(int stamina) {
        this.minStamina = stamina;
        this.maxStamina = stamina;
        return this;
    }

    private int getStatBetween(int min, int max) {
        return random.nextInt((max - min) + 1) + min;
    }
}
```

Importantly here we expose specific interfaces to represent steps in the building process. We can handle some more complex cases like the flow between setting all stats individually or setting them all to a range. However some complex cases with dependencies between configuration steps can be overly cumbersome or outright impossible to implement.

Now lets take a look at using this builder, note the use of a static method to get a new instance that implements the first step interface instead of a generic constructor call. However outside of that in the simple case its practically identical.

```
Player player = SteppedPlayerBuilder.create().withName("John").withStatsBetween(50, 60).build();
System.out.println(player);
```

Now creating a player without a name is impossible, instead the only method available to us (excluding those from the global `Object` class) is our `withName()`. And subsequently only `withStatsBetween()` and `withSpeed()` following the interfaces we expose at each step until finally the `build()` step is the only option left.

![Stepped builder intellisense completions](../posts/stepped-builder/stepped-intellisense.png)

As discussed above narrowing down the options and enforcing a sequence to configuring the builders helps developers more easily create a valid configuration for the builder. This is especially true in larger examples where there may be many different methods to call, or complex dependencies or interactions between.