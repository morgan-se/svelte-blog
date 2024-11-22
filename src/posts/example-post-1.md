---
title: Example Post
description: An example post, more coming soon...
date: '2024-11-21'
categories:
  - example
  - intro
published: true
---


## Some example features

Hello all

```ts
/**
 * Hello Doc
**/
function greet(name: string) {
    console.log(`hey ${name}!`);
}
```


<script>
  import Counter from './counter.svelte'
</script>


## Svelte

Media inside the **static** folder is served from root (`/`). Hmmm... this isn't true for me as seen by the `../` below I had to add.

![Alt text](../test.png)

## Counter

<Counter />