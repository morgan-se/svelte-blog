---
title: On Understanding Quality Requirements
description: A deep dive into Quality Requirements (NFRs)
date: '2026-11-08'
categories:
  - Quality Requirements
  - Requirements Engineering
  - Usability
  - Maintainability
published: false
priority: 1
---

The most important part of planning a software product is understanding the requirements it must fulfill, otherwise you can spend all that time developing something that doesn't meet the needs of the users.
These requirements are commonly split into two distinct groups:

- **functional requirements** which specify what the product should do and,
- **quality requirements** _(also referred to as non-functional requirements)_ which specify '_how_' the product should do it.

During planning both types of requirements should be used to define and scope the software at a high level, after which we can more break these down into testable specifications through acceptance tests or criteria.
Often used to define a contract that specifies what a delivered product must achieve to be considered 'complete'.

## Common Quality Requirements

Below I break down a list of common quality requirements informed by my experience with desktop and web application development, other domains may have different prioritisation and understanding of them.

To better define quality requirements we can specify:

- The high-level question it asks of the product
- Why we should care about it
- What it looks like in practice
- How it can be achieved (and measured)

### Usability

Usability is the largest quality requirement when dealing with software targeted to the public. At a high level, usability considers how easy a product is to use, and has many sub-requirements.
A product that lacks usability is frustrating and difficult to use, leading to lower user satisfaction and retention - a death knell in domains with competent competitors.

#### Navigability

**<u>The Question(s):</u>**

- How easy is the product to navigate?
- Can the user find actions or information they want?

**<u>Why we should care about it:</u>**

Having a product that is easy to navigate reduces the cognitive load on the user, making it easier for them to complete their tasks. Such a product is more likely to be used and enjoyed by the user.

**<u>What it looks like:</u>**

In practice this is largely achieved in two different ways

- making navigation intuitive and consistent in both structure and terminology
  - any functionality should be in the first place the user would expect to find it
  - navigation should be done through a consistent interface, i.e. a navbar
- reducing the number of steps required to complete a task from some starting point, or closely related actions
  - support direct navigation for important functionality
  - keep related actions close together

**<u>How can we achieve and measure it:</u>**

Like many usability aspects there is some level of subjectiveness in the effectiveness of any implementation since end users all have different preferences and past experiences that inform how they expect navigation to work.
We can measure how navigable a product is by asking users to complete a task and measuring how many steps they take to complete it and how long it takes. This should be repeated multiple times with different users for better confidence and to highlight edge-cases.
We may specify a requirement that 80% of users can complete a task in 3 clicks or less, or 30 seconds or less.

On a more objective front we can measure the minimum number of clicks any functionality takes a starting point using the most efficient path, for example specifying the requirement that all actions must be achievable in 3 clicks or less from the home page.

#### Learnability

**<u>The Question(s):</u>**

- How easy is it for the user to learn and understand how to use the product efficiently?

**<u>Why we should care about it:</u>**

Especially important for complex products is the ability for users to be supported in learning the different features and functionality of the product.
This often includes a focus on efficiency by teaching the user (either explicitly or implicitly) the best way to achieve actions when there may be many different options.

**<u>What it looks like:</u>**

We can support users explicitly by showing them how to use the application, such as with onboarding tutorials and popups, tooltips, help documentation, etc...

**<u>How can we achieve and measure it:</u>**

There are two common approaches to measure learnability through end-users.

- We can give users the help documentation and then ask them to complete a task and record how easy they found it, however a simple enough application with good navigability and familiarity should pass such a test without needing help documentation.
- We can give users specific tasks to complete and repeat these several times, recording how much faster the latter repetitions take and the number of errors made
  - An application with good learnability should see a decrease in the number of errors and decrease in the time taken for each subsequent attempt. Specifically we may have the requirement that on average users complete the third repetition 20% faster and with fewer errors made than their first attempt.

We can also consider some basic requirements:

- each functionality (down to the use case or acceptance criteria) is explicitly mentioned in the help documentation,
- all non-obvious fields and buttons have tooltips
  - defining what is obvious may be non-trivial, however adding tooltips to everything is an anti-pattern (i.e., it is obvious when I am on the register page that clicking the "Register" button at the bottom will submit the form.)

#### Familiarity & Consistency

**<u>The Question(s):</u>**

- How consistent is the product with others (especially those of the same domain) and within itself?
- How can the user leverage knowledge they have of other systems to understand how to use this one?

**<u>Why we should care about it:</u>**

A familiar and consistent product increases overall usability and especially helps new users understand intuitively how to use the product and makes them more likely to continue using it.
An application that is not consistent with others in the domain will be confusing and frustrating for new users, while an application that is not consistent with itself is confusing and frustrating for continuing users.

**<u>What it looks like:</u>**

Being familiar and consistent requires sticking to accepted UX standards, flows, and iconography; especially those for the medium and domain.
For example web applications should make use of navigation bars, form buttons should be placed at the bottom, etc...
When considering the domain it is more specific, and holistic depending on what competitors actually exist. It may be as simple as using similar icons for actions, or adding support for known common keyboard shortcuts a user may expect to 'just work'.

**<u>How can we achieve and measure it:</u>**

We can measure familiarity using first-click testing where we show potential end users a screenshot of a specific screen and ask them where they would click to perform a specific action. We can then require that 80% of users pick the correct button within 3 seconds.

Outside of this measuring familiarity and consistency is difficult, if its done well it should be invisible. We can get general subjective impressions as part of a SUS questionnaire. TODO SEE X
In certain cases we can define explicit functional requirements that specify shortcuts that must work, i.e. All modals can be closed by pressing 'Esc'

#### Readability

**<u>The Question(s):</u>**

- How easy is it for the user to understand (read) the content and state of the application?

**<u>Why we should care about it:</u>**

Much like the other aspects of usability, readability helps to reduce cognitive load and plays a large part in the usefulness of other aspects mentioned - it's unlikely something will be navigable if the user can't read it.

**<u>What it looks like:</u>**

Readability considers both text, visual elements, layout, design, colour, and more as tools to help the user understand the content and state of the application.
Some important considerations include:

- using understandable, and consistent, icons to represent actions or information. I.e.
  - an 'X' for closing
  - a pencil to edit
  - a trash icon to delete
- using red highlights to draw attention, this can be
  - highlighting fields with errors red
  - red notification icons
- keeping related content and information close together and visually consistent

**<u>How can we achieve and measure it:</u>**

Readability alone can be hard to measure, instead it's outcomes are largely shown through use of the application and can ba hard to distinguish from other usability considerations.
As discussed before, the ability for a user to read and understand the content of the application is a requirement of being able to navigate it and makes learning the application easier.

Issues with readability are often shown through user frustration - as they try and use an app but can't understand what its doing or how to interact with it the way they want.
This can be measured be collecting user sentiment as part of user experience testing with surveys.
We can also ask these users to 'think-aloud' as they are going through specific tasks to understand better how they are perceiving the app.

#### Accessibility

**<u>The Question(s):</u>**

- How easy is it for the user to interact with the application?
- How can we support a wide range of individuals to interact with the application?

**<u>Why we should care about it:</u>**

Having an accessible application means more users can actually use your application in a supported way. As developers it is important to consider how others will use the software you create and meaningfully support them.
There are specific accessibility guidelines and standards WCAG (Web Content Accessibility Guidelines) we can follow.

**<u>What it looks like:</u>**

Common accommodations for web/desktop applications include keyboard navigation, screen reader compatibility, contrast, and colourblind support.
Some of these can be directly integrated into the design of the application, for example choosing colours that are colourblind friendly (or making use of different fill types where distinction is important).

**<u>How can we achieve and measure it:</u>**

Aspects like colour and contrast can be measured using tools like [Coloring for Colorblindness](https://davidmathlogic.com/colorblind) or [WebAIM Contrast Checker](http://webaim.org/resources/contrastchecker/) respectively.
For web development tools and linters exist that warn about accessibility issues like missing alt text, missing labels, etc... which can be used to help ensure that screen-reader support is provided.

#### Error Prevention & Recoverability

**<u>The Question(s):</u>**

- Is the user prevented from making erroneous or unwanted actions?
- Is the user able to recover from errors?

**<u>Why we should care about it:</u>**

Theres little more frustrating than using an application that doesn't tell you why you can't submit a form you just spent the last few minutes filling out (or even worse losing all of your progress just because one field was bad).
You can make your application as beautiful, accessible, and consistent as you want, but failing to help the user actually complete tasks can easily drive them away.

**<u>What it looks like:</u>**

Any irrecoverable actions on important data must require confirmation (or support undoing), this includes:

- Anything that takes a long time for the user to recreate
- Anything with history that a user simply can't recreate
- Anything that a user must spend significant time recreating

If a user is completing an action which has specific error condition (i.e. validation that must be met) these should be made clear to the user before submitting. This often includes:

- character type requirements for password fields
- expected format for date fields
- min and max length support - you may even consider limiting at the max so the user is unable to enter the error state where they have a field with too many characters
  When there are issues this must then be made clear to the user through highlighting, and where relevant explicitly stating what is wrong, so a user can quickly fix them.
  On components like forms, users will generally expect that their input is not cleared - the exception to this being passwords.

This may also include disabling fields dynamically that would be invalid due to other state.

**<u>How can we achieve and measure it:</u>**

We can include automatic ui tests that validate form fields are correctly highlighted on specific errors and that elements are disabled when they are not relevant.
As well as automated ui tests that validate deletion (or similar) requires confirmation.
Both of these are hard to test without incorporating the UI since they are directly related to the feedback a user sees for an action, and in the domain of web development may largely be implemented client-side only.
The fact that we are checking for specific styling or enabled fields can make UI tests even more fragile than normal, so the trade-off may be worth it.

Again we can gain insights from user testing to understand user sentiment about how well they understand error messages (or feedback more generally), or are supported against making them in the first place.
This is especially important in form-heavy applications where a user may be required to fill out many different forms with different validation requirements that are not easy to memorize.

### Maintainability

Maintainability is an important consideration for long-lived software, though in practice its good to consider it for any software we write.
I'm sure many developers like myself will be able remember a time they hacked together something quick thinking it wouldn't need to be maintained only to end-up drowning in a sea of bad decisions and technical debt.

Maintainability often isn't directly seen in the end product so users or clients may largely ignore its importance, as developers part of our job is explaining its importance.
Unlike other engineering disciplines there generally aren't that many exact requirements or standards for doing things 'properly' and being maintainable.
For example electrical codes specify required colours for wires (i.e. red for hot, black for neutral, etc...) so its clear to anyone even decades later what each does.
Yet developers can often neglect the basics of future-proofing their code (i.e. inconsistent variable names, magic numbers, etc...).

As much as I complain about the lack of standards, there is infact ISO/IEC 25010 which splits maintainability into 5 sub characteristics (though it lacks widespread adoption and is much harder to quantify and enforce than similar standards in other domains).
Lets take a deeper look at these characteristics, including:

- The ISO/IEC 25010 description
- Why we should care about it
- How it can be achieved (and measured)

#### Modularity

<u>ISO/IEC 25010 description</u>:

Degree to which a system or computer program is composed of discrete components such that a change to one component has minimal impact on other components.

**<u>Why we should care about it:</u>**

A modular codebase is important for continued modification and development, as high modularity means a change to one component should have minimal affect on others and be unlikely to cause regressions.
Personally, I find the other, more useful, aspect of modularity to be how easy it makes swapping individual components of a large system. Generally modularity is closely associated with better grouping of functionality and exposing limited and clear interfaces which helps other developers understand and write new code even when they may not have full knowledge of the other components the new code will interact with.

**<u>How can we achieve and measure it:</u>**

Many aspects of modularity are achieved through best-practice often influenced by the language, framework, or artchitecture the project uses.
Luckily like many things in the software development world - we don't have to reinvent the wheel.
If for example you are writing an API with dotnet then there are clear best practices relating to modularity including the use of interfaces and dependency injection.
Having the framework (and community) support these best practice allows greatly reduces the cognitive overhead for developers who have previous experience.

There are some specific static analysis measurements we can use to get an objective measure:

- Efferent Coupling (C<sub>e</sub>)
  - The number of other modules that depend on the module in question.
- Afferent Coupling (C<sub>a</sub>)
  - The number of modules that the module in question depends on.

C<sub>e</sub> and C<sub>a</sub> can be used to calculate the [Instability](https://en.wikipedia.org/wiki/Software_package_metrics) (I) - defined by Robert C, Martin - of a module as

<math display="block">
  <mi>I</mi>
  <mo>=</mo>
  <mfrac>
    <mrow>
      <msub>
        <mi>C</mi>
        <mi>e</mi>
      </msub>
    </mrow>
    <mrow>
      <msub>
        <mi>C</mi>
        <mi>e</mi>
      </msub>
      <mo>+</mo>
      <msub>
        <mi>C</mi>
        <mi>a</mi>
      </msub>
    </mrow>
  </mfrac>
</math>

A module with I=0 depends on nobody (C<sub>e</sub> = 0) but many other modules may depend on it (C<sub>a</sub> > 0), this means it may be an important foundation and any changes may affect many downstream modules so more care must be taken.

A module with I=1 depends on many other modules (C<sub>e</sub> > 0) but no other modules depends on it (C<sub>a</sub> = 0), this means it may be a utility or top-level module (i.e. UI entry points), changing it will have little to no impact on other modules.

#### Reusability

<u>ISO/IEC 25010 description</u>:

Degree to which a product can be used as an asset in more than one system, or in building other assets.

**<u>Why we should care about it:</u>**

...

**<u>How can we achieve and measure it:</u>**

By...

#### Analysability

<u>ISO/IEC 25010 description</u>:

Degree of effectiveness and efficiency with which it is possible to assess the impact on a product or system of an intended change to one or more of its parts, to diagnose a product for deficiencies or causes of failures, or to identify parts to be modified.

**<u>Why we should care about it:</u>**

...

**<u>How can we achieve and measure it:</u>**

By...

#### Modifiability

<u>ISO/IEC 25010 description</u>:

Degree to which a product or system can be effectively and efficiently modified without introducing defects or degrading existing product quality.

**<u>Why we should care about it:</u>**

Modifiability - much like modularity -

**<u>How can we achieve and measure it:</u>**

By...

#### Testability

<u>ISO/IEC 25010 description</u>:

Degree of effectiveness and efficiency with which test criteria can be established for a system, product or component and tests can be performed to determine whether those criteria have been met.

**<u>Why we should care about it:</u>**

An untestable system is much more likely to have defects and more prone to uncaught regressions, and many practitioners go so far as to consider code without tests to be 'bad code' or "legacy code" (Working Effectively with Legacy Code, Michael C. Feathers).
Tests give us confidence (not certainty) that our code works as expected, running these tests consistently gives us confidence that changes haven't broken things.

Whilst a testable codebase is important, we also don't want to ship test code (or test workarounds) in our actual codebase. Imagine the damage that could be done if an authentication bypass for easier testing was shipped in production... [Sadly some don't have to imagine](https://www.securityweek.com/cisco-warns-of-hardcoded-credentials-in-enterprise-software/), and there many similar cases stemming from code that was only ever meant to be used during development or testing.

**<u>How can we achieve and measure it:</u>**

By...

### Technical & Operational Requirements

intro

#### Performance

#### Efficiency

#### Availability

#### Robustness

#### Portability

#### Security

### Social, Legal & Ethical Requirements

intro

#### Responsibility

#### Licensing

#### Inclusivity & Biculturalism

## From here...

With an understanding of common quality requirements, the next step in any project is working out which ones are relevant to the project (and its stakeholders).
This is often done as part of a Key Driver analysis which I go into more detail [coming soon...](<>).
