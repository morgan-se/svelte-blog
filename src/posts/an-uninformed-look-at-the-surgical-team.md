---
title: The Mythical Man-Month - A discussion against 'The surgical team'
description: A brief discussion about the proposed surgical team working model
date: '2025-02-09'
categories:
    - The Mythical Man Month
    - Opinion
    - Agile
published: true
priority: 2
---

Chapter three of The Mythical Man-Month by Frederick P. Brooks Jr describes the process of development analogous to a surgical team, where one experienced individual has sole control and authority with many others working in specific supporting roles. The described proposal by Harlan Mills outlines a team of 10:
1. The Surgeon
   - The chief programmer, and the one with complete authority over the team and the work they produce
2. The Copilot
   - The 'backup' programmer, there to work alongside the the 'surgeon' and to fill in if needed
3. The Administrator
   - In charge of administration tasks for the team, both internal and external
4. The Editor
   - Responsible for managing and updating and finalizing documentation written by the surgeon
5. The Program Clerk
   - A secretary in charge of managing team project files and artifacts and ensuring they are accessible for the team
6. The Toolsmith
   - In charge of constructing, maintaining, and updating tools and machines needed by the team
7. The tester
   - An 'adversary' to the surgeon creating test cases and managing test data
8. The Language Lawyer
   - Someone with a deep understanding of the chosen language with emphasis on ensuring nest practice is followed and finding obscure or tricky solutions
9. Two Secretaries
   - To help the administrator and the editor


## Updating for the modern world of programming
For those newer to the software field some of the roles above may not make sense, we'll look at a few roles I think have changed the most.

### The program clerk
In the internet connected world we live in there are countless tools that streamline or completely automate the main responsibilities of the program clerk. For example version control systems like GitLab provide excellent real-time visibility over all revisions of a product with many easily integrable CI/CD tools to further enhance it. While the position man not live on the ideas and outcomes can be considered an early and very rudimentary attempt at CI/CD.

### The toolsmith
Now days most software isn't written on punch cards for mechanical machines, nor does it require one big mainframe to be maintained so a 'toolsmith' in the true meaning of the word has long since been removed from software development. Yet it seems the role is now more important than ever with a clear translation to modern DevOps _(assuming roles within the team can focus externally)_. Instead of being responsible for a machine or two that can be fixed with real tools now 'toolsmiths' must maintain numerous CI/CD pipelines and the servers where the product is deployed and used. Such a role has ballooned in scope in recent years due to the pervasiveness of internet connected applications and the thousands of different tools that can be used to manage and optimize delivery.

### The language lawyer
While I don't think the role is completely obsolete, the modern paradigm of building 'off the backs of giants' _(i.e. using existing libraries)_ greatly impacts the need for such a role in more general development. Someone writing an application using SQLite, for example, is abstracted away from the complex lower level aspects of development such as optimization of object storage that benefit from extensive knowledge of the language (or even how it compiles to machine code). As well as this the advent of tools like IntelliSense (not to mention LLMs) make languages easier to work with than ever. In a more general team this role may not exist, but for specialized low-level development such a role is practically a necessity _if the programmer aren't honorary language lawyers already themselves_

## Comparing against modern methodologies
The surgical team idea goes against several of the core principles of agile development _(not that this is a blog discussing whether its a good, or even the best methodology, that will come in time)_.

Most notably of which is agile's cross-functional teams, where roles are more flexible and each team member is expected to contribute to all aspects of the project. This in itself leads to a difference in communication, where the surgical team largely has a single point of communication and collaboration between the surgeon (or chief programmer) and everyone else. Another important aspect is the difference in planning and co-ordination, where the surgical team prioritizes planning and strict coordination instead of the more responsive approach taken in agile.

Whilst I may be somewhat biased in favour of agile, its interesting to see a number of concepts are still as important as ever. Notably my favourite pillar of agile, Transparency, where the surgical team has a whole role (the program clerk) who is responsible for making software artifacts publicly available for the team. Of course this still falls a long way short of the transparency expected in agile across other aspects like communication. Though I would expect this to be intrinsically difficult and inefficient in strictly defined hierarchical teams.


## A 'mindset' of the time, and maybe the place
Personally the mindset of having 1 person have complete control and authority over the product, not just in how it is done but actually doing it, does not sound appealing. I expect this is in part coming from the 'tall poppy syndrome' present in NZ, with the opposite seemingly being true in the more tech-centered places in the world such as America where Frederick is from. Though I expect it is also in part a sign of the times, back then stricter and more linear hierarchies were common with employees being more loyal to their job. Nowadays relying on just one individual to have complete ownership of the code is unthinkable _(even if they do have an understudy)_, as soon as they win lotto, get poached by another company, or find another job _(now that we live in a world with completely different turn-over rates)_ everything is likely to fall into disarray.

Of course the need for a hierarchy still exists, however funnelling resources into just one or two people seems antithetical to the idea of growth. Instead those with more experience should help nurture the skills of others on the team to increase overall productivity in the long run and provide a sustainable continuation plan.
