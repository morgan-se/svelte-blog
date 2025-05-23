---
title: "Manual Testing Site Devlog #1"
description: An introduction to a new manual testing app that focusses on readability and visualization
date: '2025-01-12'
categories:
  - Manual Testing
  - Open-Source
published: true
priority: 3
---

## The 'sales-pitch'
Within the projects I oversee manual testing is an important aspect of delivering a working application, when managing a number of projects each with many stories and tests to keep track of simple solutions like using Google Sheets become difficult to maintain. Also such solutions often don't easily allow for someone to understand the state of tests at a glance.

Much like a CI pipeline can be setup to fail when the automated tests fail, having similar 'real-time' knowledge of the state of manual tests is important to ensure the features shipped actually work. The idea for this manual testing site came in part from the small workflow status badges you often see on GitHub READMEs that highlight if specific workflows or actions are passing or not. In this implementation though we are interested in both getting the overall status of the manual tests, as well as being able to better understand the entire suite at a glance.

## The goal
The app simply needs to be able to store a number of projects, each project is then composed of a number of stories (following agile). These stories then have any number of manual tests, each test can then have a 'run' recorded with the outcome of the test and any notes about the run (for example specific issues that arose that caused the test to fail).

With all this in place, the app can then create images through an api on the fly for each project or story. These images can then be easily, integrated into markdown files and automatically fetched when someone loads the readme of a project or pages on the wiki.

## The starting implementation
Through a simple React web app a user can add projects, stories, tests, and test runs as outlined above. The image below shows an example user story with 4 recorded tests, each with a test run from the available different types.

![Example user story page](../posts/manual-testing-site-intro/story_overview.png)

We then programatically create an image to represent the current state of the story in such a way that it is clearly readable and understandable at a glance, and that can be easily integrated into existing project documentation tools (such as markdown).

![Example generated overview image](../posts/manual-testing-site-intro/story_overview_example_img.png)

Adding to a markdown file is easy and just requires a simple image http request (example using local development server)

```
![U1 User Register image](http://localhost:3000/api/v1/img/projects/1/stories/1)
```

## Where to from here
The next step is to polish the current implementation and get a working MVP, though more likely a `v0.1`. From there a more detailed roadmap can be created from features elicited from actual use in some small projects. Some possible features already planned include:
- proper user account system
- editing capabilities
- bulk entry
- one click test run record additions
- dynamic image options based on passed url parameters