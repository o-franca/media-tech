---
title: "Why I Built Liveloop: The Social Feed Is About to Become Interactive"
slug: "why-i-built-liveloop"
description: "Why I built Liveloop, an open-source social network where every post is an interactive mini app you can play, save, send to friends, and build with AI."
date: "2026-05-18"
author: "Joao Franca"
tags: ["Liveloop", "social media", "open source", "AI", "interactive content", "product building", "no-code"]
category: "Product Building"
reading_time: 8
---

# Why I Built Liveloop: The Social Feed Is About to Become Interactive

Think about what you actually do when you open a social app. You scroll. You watch a video. You read a caption. You tap a heart, maybe leave a comment, maybe share. Then you scroll again. For all the technology sitting behind the feed, the experience has stayed remarkably passive -- content is something that happens *to* you.

I do not think it stays that way. I built a project called Liveloop because I believe the next era of social media is interactive, and I wanted to show what that actually looks like rather than just write about it. It is live now at [liveloop.space](https://liveloop.space), the code is fully open source, and this post explains why it exists and how you can help shape it.

## The feed we have today is passive

The modern feed is a brilliant piece of engineering aimed at a single goal: keep you watching. Images, video, and text are served to you in an endless stream, and your only real inputs are the small reactions at the edge of the screen -- like, comment, save, share.

That model has been enormously successful. But it has a ceiling. You cannot *do* anything inside a post. You cannot play with it, change it, or get a result back from it. The post is finished the moment it is published, and your role is to consume it and move on.

For years that was simply the limit of what the technology allowed. That limit is now gone.

## My thesis: social media is going interactive

Here is the bet I am making. As social platforms and AI tools keep advancing, people will stop posting only content you watch and start posting things you can *use*.

Not a video about a quiz -- the actual quiz. Not a screenshot of a tool -- the actual tool. Not a description of a game -- the game itself, running inside the feed, ready to play. The post stops being something you look at and becomes something you do.

Once that shift starts, it spreads quickly. Friends will build small interactive pieces for each other -- a countdown to a trip, a custom game, a little reminder tool. Parents will make simple activities for their kids. And businesses, which already pour enormous effort into the feed, will build mini apps instead of static ads.

We are entering an era where, with the help of AI, almost everyone can build software. The feed is the obvious place for that creativity to land.

## What Liveloop actually is

Liveloop is a social network where the **post format is the innovation**, not the social graph.

Every post is an interactive artifact -- a small game, an infographic, a chatbot, a mini tool -- that runs inline as you scroll. The experience is familiar on the surface: a vertical feed you scroll through with your thumb. The difference is that every card is alive.

You can:

- **Play with a post where it sits.** No tapping through to a separate page. The quiz, the game, the tool runs right there in the feed.
- **Save the ones you like to a board.** Think of it like Pinterest, except the things you save keep working -- a "drink more water" reminder you saved last week is still running when you come back to it.
- **Send artifacts to friends.** Share a specific interactive post directly, the same way you would send a video today.
- **Remix anything.** Fork a post you like, change the idea or the code, and publish your own version with the original creator credited automatically.

It is, deliberately, a simple idea. Most of the hard work is in making interactive posts safe and easy to create.

## You will not need to know how to code

This is the part that makes the whole thesis realistic rather than wishful.

You should not need to be a developer to make an interactive post, and on Liveloop you do not. You connect your own preferred AI account -- Claude, OpenAI, or Google Gemini -- and describe what you want in plain language. The AI builds the artifact; you publish it. You bring your own key, so the creativity is yours and the running costs stay with you, not locked behind someone else's paywall.

That is what "everyone programs" really means. It does not mean everyone learns to write code. It means the gap between *having an idea* and *shipping something interactive* collapses to a single conversation.

I genuinely believe people will make wonderful things this way -- a personalised birthday card that is actually a tiny game, a study tool for a class, a daily challenge for a group of friends. Templates and remixing are there so that the easiest way to start is to take something that already works and make it yours.

## Why this is a real opportunity for brands

I have spent most of my career in communications and marketing, so I look at this through that lens too -- and for brands, an interactive feed is a genuinely new channel.

Imagine a brand like Evian building a small app called "Drink Water" -- a friendly artifact that reminds you to stay hydrated through the day. It is not an ad you skip. It is something useful that people actually choose to save and keep. The brand stays present in a person's day by being helpful, not by interrupting.

Done properly, that is also a serious lead-generation channel. When someone wants to opt in -- to get a reminder, enter a competition, hear about something -- that interest can be captured, with clear and explicit consent, inside the artifact itself. Marketing that earns attention by being useful tends to outperform marketing that simply demands it.

## Images are not going away: they become part of the interaction

To be clear, I am not predicting the end of photos and video. They are not going anywhere. Visual content is powerful and people love it.

What changes is their role. Instead of being the *whole* post, images and video become *part* of the interaction -- the artwork inside a game, the visual in an infographic you can explore, the photo a tool lets you play with. The feed gets richer, not emptier.

## Safety is not optional

Interactive content is powerful, and anything powerful can be abused. A feed full of running code is also a feed where bad actors could try to ship scams, malware, or fake interfaces designed to trick people. I take that seriously, and any honest version of this idea has to.

Liveloop is built with defence in depth from the start. Every artifact runs inside a strict sandbox that cannot reach the wider page or send data to arbitrary servers. Submissions are scanned automatically for risky patterns. There is a community moderation system, a reports queue, and a public transparency log. Lead capture is handled by the platform with a mandatory, system-rendered consent step, so brands never need to wire up risky external forms.

This is also where sensible regulation has a role to play. As interactive feeds grow, the standards for what is allowed to run -- and what happens when something crosses the line -- will matter as much as the creativity itself. Building those guardrails in the open, early, is part of the point.

I want to be honest: Liveloop is early. It is a pre-alpha project, and the safety model will keep evolving. But the principle is fixed -- an interactive feed only works if people can trust it.

## Liveloop is open source: come build it with me

I did not build Liveloop to keep it. I built it to make an argument, and the best way to make an argument about the future of social media is to put a working version in front of people and let them push on it.

So Liveloop is fully open source under the MIT licence. The entire app -- the feed, the editor, the sandbox, the templates -- is yours to read, run, fork, and improve.

Here is how you can help:

- **Try it.** Go to [liveloop.space](https://liveloop.space), scroll the feed, play with a few artifacts, and create one of your own.
- **Break it.** It is early. If something is confusing or wrong, that is exactly what I need to know.
- **Improve it.** The code is on [GitHub](https://github.com/o-franca/liveloop). Open an issue, suggest an idea, contribute a new template, or translate the interface into your language.

We are at the very start of the interactive feed. Whether it ends up looking like Liveloop or like something else entirely, I am convinced the passive scroll is not the final form of social media. If that idea interests you, come build the next version of it with me.

## FAQ

### What is Liveloop?

Liveloop is an open-source social network where every post is an interactive artifact -- a small game, infographic, chatbot, or tool -- that runs inline as you scroll the feed. Instead of only watching content, you can play with each post, save the ones you like to a board, send artifacts to friends, and remix anything into your own version. It is live at liveloop.space and the full source code is available on GitHub under the MIT licence.

### Do I need coding skills to create an artifact on Liveloop?

No. You can connect your preferred AI account -- Claude, OpenAI, or Google Gemini -- and describe what you want to build in plain language, and the AI generates the interactive artifact for you. You can also start from an existing template or remix a post you like rather than building from scratch. The goal is to close the gap between having an idea and publishing something interactive, with no programming background required.

### Is it safe to run interactive posts from other people?

Safety is built in from the ground up. Every artifact runs inside a strict sandbox that cannot access the wider page or send data to arbitrary servers, submissions are automatically scanned for risky patterns, and there is a community moderation system, a reports queue, and a public transparency log. Lead capture uses a mandatory, system-rendered consent step. Liveloop is still an early pre-alpha project, so the safety model continues to evolve, but trust is treated as a core requirement rather than an afterthought.

### How can brands and businesses use Liveloop?

Brands can build genuinely useful mini apps instead of static ads -- for example, a hydration reminder, an interactive product configurator, or a small branded game. Because the artifact is something people choose to save and return to, it keeps a brand present in a helpful way rather than an interruptive one. With explicit, consent-based lead capture handled inside the artifact, it can also become a strong lead-generation channel for marketing that earns attention by being useful.

### Is Liveloop really free and open source?

Yes. Liveloop is released under the MIT licence, and the entire application -- the feed, the editor, the sandbox, and the templates -- is open source and available on GitHub. You can run it locally, deploy your own instance, fork it, or contribute improvements such as new templates, translations, or bug fixes. It is built to run on the free tier of every service it uses, so anyone can experiment with it.
