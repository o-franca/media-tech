---
title: "How to Launch an App in Ireland: From Development to the App Store"
slug: "launch-app-ireland-guide"
description: "A step-by-step guide to launching your app in Ireland. Covers development, beta testing, App Store and Google Play submission, and post-launch strategy."
date: "2026-04-29"
author: "Joao Franca"
tags: ["app launch", "App Store", "Google Play", "Ireland", "UK", "startups"]
category: "Product Building"
reading_time: 8
---

# How to Launch an App in Ireland: From Development to the App Store

You have built something. After months of development, testing, and iteration, your app is ready -- or at least you think it is. Now comes the part that nobody warns you about: the launch itself is a project of its own, and getting it wrong can bury a good product before anyone has a chance to use it.

I went through this entire process when launching [Dine With Me](https://dinewithme.org) on both the iOS App Store and Google Play. The app includes Stripe payments, real-time chat, push notifications, and a gamified dining experience -- not a simple app by any measure. This guide covers the exact steps I took and the lessons that would have saved me considerable time.

## Phase 1: Development Readiness

Before you think about app store submissions, your development needs to be genuinely finished. Not "mostly done" or "just a few bugs left." The app stores are not beta testing platforms, and submitting prematurely wastes time.

### Feature Freeze

Set a firm date where no new features are added. For Dine With Me, the feature freeze meant locking down the core experience: user registration, the dining game mechanic, Stripe integration, real-time chat, and push notifications. There were dozens of ideas on the backlog, but none mattered if the core features did not work reliably.

### Quality Assurance

Test your app on as many devices as possible. If you are using a cross-platform framework like Capacitor (which wraps a web app for iOS and Android), pay special attention to platform-specific behaviour.

Key areas to test:

- **Authentication flows.** Sign up, log in, password reset, and log out.
- **Payment processing.** Test every scenario including failed payments and cancelled transactions.
- **Push notifications.** Verify delivery on both platforms with correct deep-linking.
- **Offline behaviour.** Does the app handle connectivity loss gracefully?

### Security Audit

Both Apple and Google review apps for security vulnerabilities. Ensure API keys are not exposed in client-side code, authentication tokens are stored securely, and data is transmitted over HTTPS. If you are using Supabase, review your Row Level Security policies.

## Phase 2: Beta Testing

Beta testing is where you discover problems that internal testing missed. Real users interact with your app in unexpected ways.

### TestFlight for iOS

Apple's TestFlight requires an Apple Developer account (99 euros per year) and your app uploaded through Xcode.

1. **Build your app** in Xcode with the correct provisioning profile. If using Capacitor, open the resulting Xcode project.
2. **Archive and upload** to App Store Connect.
3. **Create a test group** and invite up to 10,000 external testers.
4. **Submit for beta review.** Apple reviews TestFlight builds before external distribution, typically taking one to two days.

When I submitted Dine With Me to TestFlight, the first build was rejected because the app required location permissions without adequately explaining why. A small oversight that cost two days of waiting for re-review.

### Google Play Console Internal Testing

Google offers internal, closed, and open testing tracks. Internal testing is fastest as it skips full review.

1. **Create your app** in Google Play Console (25 dollar one-time fee).
2. **Upload your AAB** file from Android Studio.
3. **Add testers** by email (up to 100 for internal testing).
4. **Distribute the install link.**

### Gathering Useful Feedback

Send testers a structured form rather than asking for general impressions. Ask specific questions: Did onboarding make sense? Were any screens confusing? Did you experience crashes? What would you change?

Run your beta for at least two weeks. You need time to collect feedback, fix issues, and verify that fixes work.

## Phase 3: App Store Submission

A rushed submission leads to rejections, and each rejection costs days in the review queue.

### Preparing Your Listing

Both Apple and Google require detailed metadata. Prepare everything in advance:

**App name and subtitle.** Include relevant keywords. For Dine With Me, the subtitle reinforced the social dining concept rather than using generic terms.

**Description.** Lead with the problem your app solves, not a feature list. Both stores allow 4,000 characters. Front-load the most important information.

**Keywords.** Apple provides a 100-character keyword field -- use all of it. Google indexes your full description instead.

**Screenshots.** Apple requires screenshots for at least 6.7-inch and 6.1-inch displays. Google requires a minimum of two but recommends eight. High-quality screenshots with clear captions dramatically improve conversion.

**Privacy policy.** Mandatory on both stores. Host it on your website and ensure it covers data collection, storage, and third-party services.

### Common Rejection Reasons

Apple and Google reject apps for similar issues: crashes during review, missing metadata, guideline violations, and failing to provide demo login credentials for apps requiring authentication. For payment-related apps, not properly disclosing in-app purchases is another common cause.

Apple reviews typically take one to three days. Google reviews take one to seven days for new apps.

## Phase 4: Launch Day

### Launch Day Checklist

**Technical preparation:**

- Verify backend infrastructure (Vercel, Supabase) can handle a traffic surge
- Set up error monitoring with Sentry or Crashlytics
- Confirm push notifications work on both platforms
- Test a live download on a fresh device

**Marketing preparation:**

- Schedule social media announcements
- Email your waiting list
- Have press materials ready
- Submit to Product Hunt and BetaList at least a week before launch

**Support preparation:**

- Set up a feedback and bug report system
- Draft template responses for common questions
- Clear your schedule for the first 48 hours

### Timing

Avoid launching on Fridays -- if something breaks, Apple and Google support is limited on weekends. Tuesday through Thursday works best. Avoid major platform events when your app would be buried in the noise.

## Phase 5: Post-Launch Monitoring

The first two weeks after launch are critical. Early users form opinions, write reviews, and decide whether to keep your app.

**Crash rate.** Keep below 1 percent. Nothing kills an app faster than instability.

**Retention.** Track Day 1, Day 7, and Day 30 rates. Day 1 retention above 25 percent is decent. Day 7 above 10 percent suggests you have something worth building on.

**User feedback.** Read and respond to every review, especially negative ones. Early reviews heavily influence rankings.

Plan to release an update within the first two weeks. For Dine With Me, the first post-launch update addressed a notification timing issue on Android, a Stripe payment edge case, and onboarding copy that confused users. Each was identified within 48 hours through feedback and error monitoring.

## Common Mistakes to Avoid

**Launching without a marketing plan.** If nobody knows your app exists, downloads will be near zero regardless of quality.

**Ignoring app store metadata.** Your listing is your storefront. Poor screenshots and missing keywords tank conversion.

**Launching on both platforms simultaneously with limited resources.** Consider launching on one platform first, learning from the experience, then applying those lessons to the second.

## FAQ

### How long does it take to launch an app in Ireland?

The timeline from feature-complete code to a live listing typically takes four to eight weeks: two to four weeks of beta testing, one to two weeks preparing store listings, and one to two weeks for review and approval.

### How much does an Apple Developer account cost?

Apple charges 99 euros per year (renewal required to keep your app listed). Google Play charges a one-time 25 dollar registration fee. Both are required before you can submit apps.

### What are the most common reasons for app store rejection?

Crashes during review, missing privacy policies, incomplete metadata, requesting unnecessary permissions, and failing to provide demo login credentials. For payment apps, not disclosing in-app purchases properly is another frequent cause.

### Can I launch in Ireland and the UK simultaneously?

Yes. Both stores let you select multiple territories. You can launch in Ireland and the UK specifically or go worldwide. Consider localising your listing with appropriate currency references and spelling conventions for each market.

*If you are preparing to launch an app and want guidance on the technical or marketing side, [get in touch](/index.html#contact). I help startups and small businesses in Ireland and the UK bring products to market.*
