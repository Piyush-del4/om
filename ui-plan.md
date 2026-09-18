# OM ASTROLOGY AMC — COMPLETE WEBSITE REBUILD MASTER PROMPT

## ROLE

You are a senior product designer, UX architect, UI designer, frontend engineer, backend engineer, SEO engineer, accessibility specialist, conversion strategist, and CMS/admin-system architect.

You are rebuilding the entire OM Astrology AMC website into a premium, credible, calm, modern Indian astrology/wellness consultation platform.

This is NOT a simple visual redesign.

This is a complete:

* UX redesign
* UI redesign
* information architecture redesign
* navigation redesign
* content hierarchy redesign
* page-template redesign
* responsive redesign
* interaction/state redesign
* consultation-booking UX redesign
* admin UX redesign
* CMS redesign
* SEO architecture redesign
* accessibility improvement
* performance improvement
* trust/conversion improvement

You must inspect the existing application, routes, components, APIs, database models, CMS/data structures, existing functionality, forms, calculations, booking system, authentication, content, images and responsive behavior before changing anything.

Do not blindly replace functionality.

Preserve working business logic where appropriate, but rebuild poor presentation, UX, hierarchy and architecture.

The final product must feel like a **premium editorial consultation brand**, not a generic astrology template, SaaS dashboard, gaming interface, spiritual marketplace, or fantasy/cosmic website.

---

# 1. PRIMARY BUSINESS AND UX OBJECTIVE

The current website presents too many things at once.

The new website must answer the visitor's questions in this order:

1. What is OM Astrology AMC?
2. What problem can this help me understand?
3. Why should I trust this organisation?
4. What type of guidance is relevant to my situation?
5. Which method/service is appropriate?
6. Who will guide me?
7. What exactly happens during a consultation?
8. How much does it cost?
9. How do I book?
10. What can I explore for free before booking?

The new UX model is:

**QUESTION → UNDERSTANDING → METHOD → EXPERT → CONSULTATION → FOLLOW-UP**

NOT:

**ASTROLOGY → NUMEROLOGY → TAROT → GRAPHology → 20 CARDS → 30 LINKS → BOOK**

---

# 2. CORE BRAND POSITIONING

Position OM Astrology AMC as:

**A thoughtful, personal guidance platform rooted in traditional Indian occult practices and presented with modern clarity.**

The visual identity should communicate:

* calm
* intelligent
* mature
* trustworthy
* human
* premium
* editorial
* culturally rooted
* understated
* confidential
* professional

It should NOT communicate:

* cheap spiritual marketplace
* neon astrology app
* fantasy game
* dark magic
* excessive mysticism
* childish spirituality
* generic AI-generated cosmic imagery
* aggressive sales funnel
* overly luxurious gold-on-black template
* excessive gradients
* excessive glassmorphism
* excessive rounded cards

The experience should feel closer to:

**premium editorial publication + private consultation practice + modern Indian heritage**

than:

**fortune-telling landing page**

---

# 3. CURRENT WEBSITE PROBLEMS TO SOLVE

Treat the following as mandatory redesign issues.

## 3.1 Visual problems

Remove:

* excessive rounded corners
* excessive pill-shaped UI
* overly large cards
* excessive shadows
* overly bright accent colors
* excessive gradients
* unnecessary glow effects
* visual noise
* excessive icons
* random decorative illustrations
* inconsistent card shapes
* inconsistent border radii
* inconsistent spacing
* oversized section headings
* large unused padding
* repetitive colored backgrounds
* unnecessary animation
* generic cosmic imagery
* decorative elements that do not communicate meaning

The interface currently feels too “template-generated”.

The new interface must feel deliberately art-directed.

---

# 4. DESIGN SYSTEM

Create a central design-token system.

Never hard-code random colors, spacing, radii or shadows inside individual components.

Use CSS variables/design tokens/Tailwind tokens/theme tokens depending on the existing stack.

---

## 4.1 COLOR SYSTEM

Primary background:

`#F7F3EA`

Warm ivory / paper background.

Primary dark:

`#1D1C1A`

Deep charcoal.

Primary brand accent:

`#6F2935`

Muted deep burgundy.

Secondary accent:

`#A78652`

Antique gold.

Supporting neutral:

`#DED2BE`

Warm sand.

Secondary text:

`#77736D`

Warm grey.

White:

`#FFFFFF`

Very light border:

`#E7E0D4`

Dark border:

`#3A3732`

Success:

Use a restrained green only where semantically necessary.

Error:

Use a muted red, not bright emergency red.

Warning:

Use muted amber.

Do not introduce additional random colors.

---

## 4.2 COLOR RATIO

Approximately:

* 70% ivory/white/neutral backgrounds
* 20% dark charcoal/neutral text and structural elements
* 8% burgundy
* 2% antique gold

Gold is an accent.

Do NOT make gold the dominant visual language.

Do NOT use:

* gold gradients
* metallic gold everywhere
* glowing gold borders
* gold text on every heading

---

# 5. TYPOGRAPHY

Use exactly two primary font families:

### Display / editorial font

Elegant serif.

Use for:

* hero headings
* major page headings
* editorial section headings
* quotes
* selected brand statements

### UI/body font

Clean modern sans-serif.

Use for:

* navigation
* body copy
* forms
* buttons
* labels
* metadata
* tables
* dashboard

Do not use more than two major font families unless there is a specific functional reason.

---

## Typography scale

Desktop:

H1:
`clamp(3rem, 5vw, 5.25rem)`

H2:
`clamp(2.25rem, 3.5vw, 3.75rem)`

H3:
`clamp(1.5rem, 2vw, 2.25rem)`

H4:
`1.125rem–1.5rem`

Body large:
`1.125rem–1.25rem`

Body:
`1rem–1.0625rem`

Small:
`0.875rem`

Micro:
`0.75rem`

Body line-height:
`1.6–1.75`

Heading line-height:
`1.05–1.2`

Never create extremely wide text blocks.

Editorial paragraph max-width:

`650–750px`

---

# 6. BORDER RADIUS SYSTEM

This is a major redesign requirement.

Large visual sections:

`0px`

Editorial content:

`0–4px`

Images:

`0–8px`

Large cards:

`8–12px`

Buttons:

`6–8px`

Inputs:

`6px`

Small UI controls:

`6px`

Modals:

`10–12px`

Never use 20px, 24px, 32px, 9999px or huge pill corners unless the element specifically requires a status pill.

Pills are reserved for:

* status
* category
* metadata
* small tags

Not entire sections.

The website should have a strong rectangular/editorial structure.

---

# 7. SHADOW SYSTEM

Shadows must be subtle.

Use:

* minimal elevation
* soft low-opacity shadow
* no floating cards everywhere

Most sections should rely on:

* spacing
* typography
* borders
* contrast
* image placement

rather than shadows.

---

# 8. SPACING SYSTEM

Create a spacing scale.

Recommended base:

4px

Use:

4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96 / 120 / 144 / 160

Desktop:

Section spacing:

`120–160px`

Large section:

`144px`

Medium:

`96–120px`

Small:

`64–80px`

Heading → paragraph:

`20–24px`

Paragraph → button:

`28–32px`

Section heading → content:

`48–64px`

Cards:

`24–32px` padding

Grid gap:

`24–32px`

Mobile:

Section spacing:

`72–96px`

Card padding:

`20–24px`

Grid gap:

`16px`

Never add padding just to make a section “look bigger”.

Padding must support hierarchy.

---

# 9. PAGE WIDTH / GRID

Maximum content width:

`1200–1280px`

Wide editorial content:

`1320px maximum`

Text columns:

`600–750px`

Use a consistent grid.

Desktop:

12-column grid.

Tablet:

8-column grid.

Mobile:

4-column conceptual grid / single-column visual flow.

Never allow content to stretch edge-to-edge unnecessarily.

---

# 10. VISUAL LANGUAGE

Use:

* real people
* real expert portraits
* authentic handwriting
* actual tarot cards
* real printed charts
* subtle Indian architectural details
* manuscripts
* books
* paper
* natural textures
* subtle astronomical diagrams
* restrained planetary diagrams
* authentic consultation environments

Avoid generic:

* glowing planets
* giant purple galaxies
* floating zodiac circles everywhere
* excessive stars
* random moons
* AI-looking spiritual women
* fantasy crystals everywhere
* glowing mystical hands
* excessive mandala patterns

Use one subtle visual motif throughout the brand:

### Thin astronomical/orbit line

This can appear selectively:

* hero
* page dividers
* illustrations
* section labels
* loading states

Never cover the entire page with it.

---

# 11. GLOBAL STORYTELLING PRINCIPLE

Every major page must tell a story.

The user must never feel:

“Here are 20 cards. Choose something.”

Instead:

### Chapter 1 — I have a question

### Chapter 2 — There may be patterns behind it

### Chapter 3 — Here is how OM approaches it

### Chapter 4 — Here is the right method

### Chapter 5 — Here is the person who can help

### Chapter 6 — Here is what the process looks like

### Chapter 7 — Here is evidence/trust

### Chapter 8 — Here are free resources

### Chapter 9 — Here is the next step

---

# 12. GLOBAL NAVIGATION

Replace the current overloaded navigation with a clear primary navigation.

Desktop:

**Logo**

Home

Services

Free Tools

Horoscopes

Insights

About

**Book Consultation**

Do not put every content category into the top nav.

---

## Services dropdown

### Core disciplines

Astrology

Numerology

Tarot

Graphology

Occult Synthesis

### Life guidance

Love & Marriage

Career & Business

Name Correction

Mobile Number

Corporate Numerology

### View all services

---

## Free Tools dropdown

Group tools by user purpose.

### Discover Yourself

Zodiac Finder

Moon Sign

Ascendant

Nakshatra

### Numbers

Numerology Calculator

Life Path

Lucky Number

Name Numerology

Lucky Color

### Relationships

Marriage Match

### Timing

Panchang

Muhurat

Dasha Calculator

### Horoscopes

Daily

Weekly

Monthly

Yearly

Include:

**View all free tools**

---

## Horoscopes navigation

Daily Horoscope

Weekly Horoscope

Monthly Horoscope

Yearly Horoscope

12 Zodiac Signs

2026 Transits

Planetary Guides

---

## Insights

Blog

Astrology

Numerology

Tarot

Graphology

Transits

Guides

FAQs

---

# 13. HEADER UX

Desktop header:

Height approximately:

`72–84px`

Logo left.

Navigation center.

Book Consultation right.

Header initially transparent or ivory depending on hero.

When scrolling:

* solid ivory background
* subtle bottom border
* no giant shadow
* smooth transition

Sticky header.

---

## Mobile header

Logo left.

Hamburger right.

Open full-screen or large slide-down navigation.

Use grouped navigation.

Do not create a tiny unreadable mobile mega menu.

Include:

**Book Consultation**

prominently near the top.

At the bottom of the mobile viewport, use:

WhatsApp

Book Consultation

as a sticky action bar where appropriate.

---

# 14. BUTTON SYSTEM

Primary:

Dark charcoal background.

White text.

6–8px radius.

Secondary:

Transparent / ivory background.

Dark border.

Text action:

No container where not necessary.

Examples:

**Book a Consultation →**

**Explore Free Tools →**

**Meet the Experts →**

**Read the Guide →**

Buttons must not be oversized.

Desktop height:

`44–52px`

Mobile:

minimum touch target `44px`.

---

# 15. GLOBAL COMPONENT LIBRARY

Build reusable components instead of page-specific copies.

Required components:

* Header
* MobileHeader
* NavigationMenu
* MegaMenu
* Breadcrumbs
* SectionHeader
* EditorialHero
* SplitHero
* ServiceCard
* ServiceList
* ExpertCard
* ExpertProfile
* Testimonial
* TestimonialSlider
* ToolCard
* ToolGrid
* ZodiacCard
* ArticleCard
* ArticleGrid
* BlogHeader
* BlogFilters
* SearchInput
* FAQAccordion
* CTASection
* ConsultationCTA
* ConsultationWizard
* DatePicker
* TimeSlotPicker
* Calendar
* PricingCard
* ComparisonTable
* StatBlock
* QuoteBlock
* MethodologyBlock
* RelatedContent
* RelatedServices
* RelatedTools
* NewsletterForm
* WhatsAppCTA
* Footer
* CookieBanner
* Toast
* Modal
* Drawer
* EmptyState
* ErrorState
* LoadingState
* Skeleton
* Pagination
* SearchResults
* FormField
* Select
* Checkbox
* Radio
* FileUpload
* Notification
* StatusBadge

Every component must support:

* default state
* hover
* focus
* active
* disabled
* loading
* error
* success
* empty

---

# 16. HOMEPAGE — COMPLETE REBUILD

The homepage is the most important redesign.

Do not simply rearrange the existing sections.

Rebuild the story.

---

## HOME SECTION 1 — HERO

Remove the current generic:

“Unlock the Mysteries of the Universe”

style hero.

The hero must explain the value in human terms.

Recommended direction:

Eyebrow:

**PERSONAL GUIDANCE · ASTROLOGY · NUMEROLOGY · TAROT · GRAPHOLOGY**

H1:

**Some questions deserve more than a prediction.**

Supporting copy:

**Understand the patterns around your relationships, career, choices and next chapter through personal guidance rooted in traditional Indian practices.**

Primary:

**Book a Consultation →**

Secondary:

**Explore Free Tools →**

Hero visual:

real human / consultant / chart / consultation scene.

Use subtle astrology geometry rather than giant cosmic artwork.

Hero should immediately communicate:

human guidance + clarity + methodology.

---

# 17. HOMEPAGE — SECTION 2

## “What brings you here?”

This replaces generic service-card-first UX.

Question-driven options:

**Love & Marriage**

Understand relationship patterns and compatibility.

**Career & Business**

Explore professional direction, timing and business questions.

**Money & Growth**

Explore decisions around growth, timing and direction.

**Personal Direction**

For periods of uncertainty, transition or major choices.

**Name & Numerology**

Explore names, numbers and personal numerology.

**Future & Decisions**

When you need perspective before making an important decision.

Cards should be simple.

No excessive illustration.

---

# 18. HOMEPAGE — SECTION 3

## “Different questions need different perspectives.”

Explain the four disciplines.

Use an editorial layout.

Astrology:

Timing and long-term patterns.

Numerology:

Names and number-based interpretation.

Tarot:

Reflective guidance around current choices and situations.

Graphology:

Handwriting-based interpretive assessment.

Each gets:

* short description
* what it is useful for
* appropriate situations
* link

Do not claim these are scientifically proven methods.

---

# 19. HOMEPAGE — SECTION 4

## “One question. Multiple perspectives.”

This is the meaningful introduction to Occult Synthesis.

Show a visual framework:

Question

↓

Astrology

↓

Numerology

↓

Tarot

↓

Graphology

↓

Personal synthesis

↓

Practical discussion

Explain that the approach combines different traditional interpretive frameworks rather than claiming scientific validation.

This section should be highly visual but restrained.

---

# 20. HOMEPAGE — SECTION 5

## “What happens in a consultation?”

Three or four steps:

### 01 — Tell us what you are navigating

### 02 — We identify the right consultation

### 03 — Meet your consultant

### 04 — Leave with greater clarity

Avoid unrealistic claims such as:

“Your life will completely change.”

Focus on:

clarity

context

reflection

personal guidance

---

# 21. HOMEPAGE — SECTION 6

## Meet the people behind OM Astrology AMC

Display actual expert information.

Each expert card:

Photo

Name

Role

Primary practice

Languages

Experience

View profile

Book with expert

Do not use fabricated-looking portraits or unverifiable credentials.

---

# 22. HOMEPAGE — SECTION 7

## Why people choose OM

Use evidence-based trust signals.

Possible items:

Personalized sessions

Confidential consultation

Online video sessions

Clear booking process

Experienced practitioners

Traditional methodologies

Transparent service descriptions

Avoid exaggerated claims.

Do not say:

“100% accurate”

“scientifically guaranteed”

“always works”

“life-changing guaranteed”

---

# 23. HOMEPAGE — SECTION 8

## Client experiences

Use only genuine, approved testimonials.

Each testimonial should ideally include:

Quote

Name

City/country if consented

Consultation type

Verification marker if available

Do NOT invent clients.

Do NOT manufacture success statistics.

Do NOT repeat testimonials.

Do NOT use exaggerated financial, health, legal, relationship or employment claims without appropriate substantiation and context.

Provide a link to:

**Read more client experiences**

---

# 24. HOMEPAGE — SECTION 9

## Free guidance before you book

Introduce useful tools.

Show only 4–6 priority tools.

Examples:

Zodiac Finder

Moon Sign

Numerology Calculator

Marriage Match

Panchang

Daily Horoscope

Then:

**Explore all free tools →**

Do not display every single tool on the homepage.

---

# 25. HOMEPAGE — SECTION 10

## Explore the Knowledge Hub

Display 3 high-quality articles.

Each:

category

title

short description

reading time

author

date

updated date if applicable

Read Article →

Then:

**Explore all insights →**

---

# 26. HOMEPAGE — FINAL CTA

Use a calm conversion section.

Heading:

**You do not need every answer today. Start with the question that matters most.**

Primary:

**Book a Consultation →**

Secondary:

**WhatsApp Us**

Do not use aggressive sales language.

---

# 27. HOMEPAGE — FOOTER

Quiet, structured footer.

Column 1:

OM Astrology AMC

Short company statement.

Column 2:

Explore

Services

Free Tools

Horoscopes

Insights

About

Column 3:

Popular Services

Astrology

Numerology

Tarot

Graphology

Marriage

Career

Name Correction

Column 4:

Support

Contact

FAQs

Privacy

Terms

Disclaimer

Refund/Cancellation

Bottom:

Copyright

Social links

Legal links

Do not make the footer another giant sitemap.

---

# 28. SERVICES LANDING PAGE

Create a true Services page.

Hero:

**Find the right form of guidance for your question.**

Supporting text.

Then:

### Core disciplines

Astrology

Numerology

Tarot

Graphology

Occult Synthesis

Then:

### Life-focused consultations

Love & Marriage

Career

Business

Name Correction

Mobile Number

Corporate Numerology

Then:

### How to choose

Question → consultation type → expert → booking

Then:

FAQs

Final CTA

---

# 29. ASTROLOGY PAGE

Current astrology content is very long and educational, with many claims presented too definitively.

Rebuild the page into:

Hero

What astrology consultation is

What questions it can help explore

How a reading works

What information is needed

Birth chart / Jyotish concepts

Houses

Nakshatras

Dashas

Transits

Remedies

Expert

Consultation options

FAQs

Related tools

Related articles

Book consultation

Do NOT present unsupported scientific statements as scientific fact.

Use language such as:

“traditional Vedic astrology practice”

“within the Jyotish tradition”

“astrological interpretation”

“practitioners may interpret…”

Clearly separate traditional beliefs/practices from established scientific evidence.

The current page contains assertions around gravitational effects, health, mood, electromagnetic effects and endocrine responses that should not be presented as established scientific findings without authoritative evidence. Redesign the copy to preserve cultural context without misleading scientific framing.

---

# 30. NUMEROLOGY PAGE

Structure:

Hero

What numerology is

How OM uses it

Pythagorean vs Chaldean

Calculator

Life Path numbers

Master numbers

Name analysis

Practical consultation use cases

Expert

FAQs

Related articles

CTA

Ensure calculator UX is extremely clean.

---

# 31. TAROT PAGE

The current page begins by explaining tarot as a reflective tool, which is a useful trust direction. Continue this approach rather than presenting tarot as guaranteed supernatural prediction.

Structure:

Hero

What tarot is

What a consultation can explore

Major Arcana

Minor Arcana

Common spreads

Love questions

Career questions

Decision questions

What to expect

Expert

FAQs

Book consultation

Avoid certainty language.

---

# 32. GRAPHOLOGY PAGE

The current page includes an interactive signature scanner and makes strong neurological/psychological claims.

Rebuild around:

Hero

What handwriting analysis is

How the assessment works

What a sample should contain

Signature analysis

Writing slant

Pressure

Spacing

Baseline

Letter forms

Graphotherapy information

Important limitations/disclaimer

Interactive scanner

Results UX

Expert

FAQs

CTA

Do not state that handwriting analysis scientifically diagnoses personality, mental state, neurological conditions or medical conditions.

If the scanner is heuristic/experimental, label it clearly.

---

# 33. OCCULT SYNTHESIS PAGE

Create a premium flagship service page.

Hero:

**One question. More than one perspective.**

Show:

Astrology

*

Numerology

*

Tarot

*

Graphology

↓

Synthesis

Explain:

The user is not receiving four disconnected readings.

The consultant considers the relevant information across methodologies and decides which perspectives are useful.

Show sample workflow.

Show who this is suitable for.

Show who it is not suitable for.

Pricing.

Expert.

Booking.

FAQs.

---

# 34. SPECIALIZED SERVICE PAGE TEMPLATE

Create one reusable service template for:

* Career Guidance
* Marriage Matching
* Name Correction
* Lucky Mobile Number
* Corporate Numerology
* Business Guidance
* other specialized consultations

Template:

1. Breadcrumb
2. Hero
3. Problem statement
4. What this consultation is for
5. Who it is for
6. What is analysed
7. What the consultation includes
8. What users need to provide
9. Process
10. Expert
11. Testimonials
12. Related tools
13. FAQs
14. Disclaimer
15. Booking CTA

Do not create completely different visual designs for every service.

Use a consistent system.

---

# 35. CAREER PAGE

The current career page contains very detailed astrology-specific explanations.

Keep useful educational content but improve hierarchy.

Hero

Career questions

What is reviewed

10th house

1st house

2nd house

6th house

Dashas/transits

Consultation process

Deliverables

Expert

FAQs

CTA

Avoid promises about guaranteed professional or financial success.

---

# 36. MARRIAGE MATCH PAGE

Hero:

**Explore compatibility with context, not just a score.**

Input system:

Person 1:

Name

DOB

Birth time

Birth place

Person 2:

Name

DOB

Birth time

Birth place

Result:

Guna score

Categories

Potential areas of compatibility

Areas requiring discussion

Manglik analysis where applicable

Interpretation

Disclaimer

Do not present a compatibility score as a deterministic statement about whether a marriage will succeed.

The existing free Marriage Match page currently asks for both partners' details and presents automated calculation as highly accurate; rebuild the messaging and result architecture to be more transparent about automated calculations versus human interpretation.

---

# 37. NAME CORRECTION PAGE

Structure:

Problem

What name numerology evaluates

Current name

Suggested evaluation

What consultation includes

Process

Examples

Important limitations

Expert

FAQ

CTA

Never state:

“remove all life blocks”

“guaranteed prosperity”

“guaranteed wealth”

Use interpretive language.

---

# 38. LUCKY MOBILE NUMBER PAGE

Structure:

Why people seek number analysis

How numbers are interpreted

Input phone number

Driver number

Conductor/life-path relationship

Result

Interpretation

Consultation CTA

Privacy warning

Do not store sensitive phone numbers unnecessarily.

Allow deletion.

Mask phone numbers in result/history.

---

# 39. CORPORATE NUMEROLOGY PAGE

Hero:

**Bring brand decisions into one structured numerology framework.**

Sections:

Business name

Brand name

Founder numbers

Incorporation date

Logo/color analysis where relevant

Mobile/contact numbers if offered

Consultation process

Deliverables

Who it is for

Expert

CTA

Avoid guaranteed financial-return claims.

---

# 40. HOROSCOPE ARCHITECTURE

Do not put every horoscope variation into one giant page.

Create hierarchy:

`/horoscope`

Then:

`/horoscope/aries`

`/horoscope/taurus`

etc.

And temporal content:

`/horoscope/aries/daily`

`/horoscope/aries/weekly`

`/horoscope/aries/monthly`

`/horoscope/aries/yearly`

Make templates dynamic.

---

# 41. HOROSCOPE LANDING PAGE

Hero:

**Your horoscope, organized around the way you actually use it.**

Zodiac selector:

12 signs.

Then:

Daily

Weekly

Monthly

Yearly

2026

Related transit articles

Tools

FAQ

The current horoscope page repeats similar CTA groups under zodiac sections. Consolidate these to reduce duplication and visual clutter.

---

# 42. DAILY HOROSCOPE PAGE

Layout:

Breadcrumb

Zodiac + date

H1

Today overview

Love

Career

Money

Energy

Practical focus

Lucky details only where legitimately part of the content model

Methodology note

Previous/next day

Weekly link

Monthly link

Related article

CTA

Include:

Published date

Updated date if applicable

Author/astrologer

Content disclaimer

---

# 43. WEEKLY HOROSCOPE

Show:

Week range

Overview

Love

Career

Money

Wellbeing

Practical focus

Important dates

Next/previous week

Related transit

CTA

---

# 44. MONTHLY HOROSCOPE

Show:

Month

Overall theme

Love

Career

Money

Family

Practical guidance

Key dates

Planetary context

Related transit pages

---

# 45. YEARLY HOROSCOPE

Create a substantial editorial page.

Do not make it just 12 cards.

Structure:

Introduction

Annual theme

Major planetary movements

Career

Relationships

Money

Personal development

Important periods

Month-by-month summary

FAQ

Related guides

Expert CTA

---

# 46. PLANET TRANSIT ARCHITECTURE

Create reusable:

`/transits/[planet]`

with:

Planet introduction

Current transit

Date range

Zodiac impact

House-based explanation where appropriate

General interpretation

What practitioners look at

Related zodiac guides

Related tools

FAQs

Previous/current/future navigation

Avoid leaving old-year pages looking current.

Every time-sensitive page must clearly expose its relevant year/date.

---

# 47. FREE TOOLS LANDING PAGE

Create a beautiful tool directory.

Hero:

**Explore your chart, numbers and daily guidance — for free.**

Categories:

### Birth & Chart

Kundli Generator

Zodiac Finder

Moon Sign

Ascendant

Nakshatra

### Numerology

Numerology

Life Path

Lucky Number

Name Numerology

Lucky Color

### Marriage

Marriage Match

### Timing

Panchang

Muhurat

Dasha

Each tool card includes:

Name

Purpose

Input required

Expected result

Estimated completion time

Free label

Privacy note

Start tool

---

# 48. TOOL UX RULES

Every tool needs:

Intro

What this tool does

Why information is needed

Input form

Validation

Loading

Calculation

Result

Explanation

Related content

Consultation CTA

Disclaimer

Reset

Share/download if appropriate

Never make a tool feel like a naked form.

---

# 49. TOOL FORM STATES

Every form must implement:

Default

Focused

Filled

Validation error

Required missing

Invalid format

Calculating

Calculation success

API failure

Partial data

No result

Retry

Reset

Accessibility announcement

---

# 50. TOOL RESULT UX

Results should not dump raw data.

Use:

### Your result

Main result

### What it means

Clear explanation

### How this was calculated

Transparent methodology

### Explore deeper

Related guides

### Speak with an expert

Consultation CTA

Also provide:

Save result

Download report if supported

Share result if safe

Run again

---

# 51. PERSONAL DATA UX

Never collect more information than required.

For birth-data tools:

Explain why data is requested.

Do not expose personally identifiable information in URLs.

Do not place full DOB/birth details in analytics event payloads.

Do not expose customer data in page source unnecessarily.

Add consent/privacy language where required.

---

# 52. BLOG / KNOWLEDGE HUB

The current blog is too sparse as a content product and needs a real editorial system.

Create:

Hero

Search

Categories

Featured article

Latest articles

Popular guides

Topic clusters

Authors

Pagination

Related tools

Related services

Newsletter if appropriate

---

# 53. BLOG CATEGORY ARCHITECTURE

Use categories such as:

Astrology

Numerology

Tarot

Graphology

Relationships

Career

Business

Transits

Horoscopes

Guides

Tools

Do not create dozens of weak categories.

---

# 54. ARTICLE PAGE

Required structure:

Breadcrumb

Category

H1

Subtitle/deck

Author

Published date

Updated date

Reading time

Hero image

Article content

Table of contents for long articles

Inline internal links

Expert commentary where available

Related tool

Related service

FAQ where relevant

Author bio

Related articles

CTA

Disclaimer where applicable

References/sources where factual claims require them

---

# 55. ARTICLE AUTHOR TRUST

Every article should identify:

Author

Role

Relevant expertise

Profile link

Photo if appropriate

Do not create anonymous “Admin” authors for important educational content.

---

# 56. ABOUT PAGE

The current About page focuses heavily on generalized promises. Rebuild it as a genuine company story.

Structure:

Hero

Who we are

Why OM Astrology AMC exists

Our philosophy

Our approach

Our practices

Our experts

How consultations work

Privacy/confidentiality

Online consultation process

What we do / do not claim

Testimonials

Contact

CTA

Use real organizational information.

Do not invent history, credentials or years of experience.

---

# 57. EXPERT LISTING PAGE

Create:

`/experts`

Grid/list.

Each expert:

Photo

Name

Role

Specialty

Languages

Experience

Availability

Consultation types

Profile

Book

Filters:

Specialty

Language

Consultation type

Availability

---

# 58. EXPERT PROFILE PAGE

Required:

Large portrait

Name

Role

Bio

Approach

Areas of expertise

Methods

Languages

Experience

Education/certification only when verified

Consultation types

Session duration

Price

Availability

Testimonials

Articles by expert

Book consultation

---

# 59. CONSULTATION SYSTEM

This should become one of the best UX experiences on the entire website.

Do not use a giant single form.

Build a multi-step wizard.

---

# 60. CONSULTATION WIZARD

Step 1:

### What would you like help with?

Love

Marriage

Career

Business

Money

Personal Direction

Name/Numerology

General Guidance

Other

---

Step 2:

### Which type of consultation fits your question?

Dynamic options.

---

Step 3:

### Choose your consultant

Display:

Photo

Name

Specialties

Languages

Experience

Rating only if genuine

Availability

Price

---

Step 4:

### Choose date

Calendar.

Only available dates enabled.

---

Step 5:

### Choose time

Display local timezone.

Example:

India Standard Time (IST)

Allow timezone selector for international visitors.

---

Step 6:

### Tell us a little more

Optional message.

Only ask required information.

---

Step 7:

### Your details

Name

Email

Phone

Required consent

Privacy notice

---

Step 8:

### Review

Service

Consultant

Date

Time

Duration

Price

Customer details

Cancellation rules

---

Step 9:

### Payment

Payment provider.

Secure state.

---

Step 10:

### Confirmation

Confirmation number

Date/time

Meeting method

Email sent

WhatsApp option

Add calendar

Reschedule/cancel link

---

# 61. BOOKING STATES

Implement:

Loading

No consultant selected

No available slots

Calendar loading

Slot expired

Slot taken during checkout

Payment pending

Payment failed

Payment successful

Booking successful

Booking cancelled

Booking rescheduled

Network error

Session timeout

Duplicate booking

Invalid details

Refund requested

Refund processed

Use clear human language.

Never show raw backend/API errors.

---

# 62. BOOKING CONFIRMATION PAGE

Show:

### You're booked.

Consultation

Consultant

Date

Time

Timezone

Duration

Meeting method

Preparation instructions

Important information

Add to calendar

Open WhatsApp

View booking

Reschedule

Cancel

Support

---

# 63. ACCOUNT / CUSTOMER AREA

If authentication exists or is introduced, create:

Dashboard

Upcoming appointments

Past appointments

Saved reports

Tool history where appropriate

Profile

Communication preferences

Privacy settings

Delete account

---

# 64. USER DASHBOARD

Header:

Welcome back.

Main:

Upcoming session

Quick tools

Recent reports

Saved articles

Profile

Support

Use an editorial style, not an overly complex SaaS dashboard.

---

# 65. CONTACT PAGE

Include:

Simple hero

Contact methods

WhatsApp

Email

Phone if legitimate

Consultation support

Business hours if applicable

FAQ

Contact form

Map only if physical office information is actually provided

Do not add a fake address.

---

# 66. LEGAL PAGES

Create/update:

Privacy Policy

Terms & Conditions

Disclaimer

Refund/Cancellation Policy

Cookie Policy if applicable

Consultation Policy

Tool/Data Policy where useful

Important:

Explain that astrology, numerology, tarot and graphology are traditional/interpretive practices.

Do not claim medical, psychological, legal or financial certainty.

Do not replace professional medical/legal/financial advice with these practices.

---

# 67. 404 PAGE

Create a branded but simple 404.

Heading:

**This page seems to have taken a different path.**

Actions:

Go Home

Explore Services

Browse Free Tools

No flashy animation.

---

# 68. SEARCH PAGE

Create global search.

Search across:

Articles

Services

Tools

Horoscopes

Experts

Guides

Search states:

Idle

Typing

Results

No results

Error

Loading

Suggested searches

Filters

---

# 69. GLOBAL RESPONSIVE UX

Desktop:

1440+

Tablet:

768–1199

Mobile:

320–767

Test specifically:

320px

360px

375px

390px

414px

768px

1024px

1280px

1440px

1920px

Do not simply shrink desktop.

Reflow layouts intentionally.

---

# 70. MOBILE PRIORITIES

Mobile must prioritize:

1. Book Consultation
2. Services
3. Free Tools
4. Horoscope
5. WhatsApp
6. Search
7. Content

Avoid enormous mobile hero images.

Avoid horizontal overflow.

Avoid tiny cards.

Avoid huge paragraphs.

Use sticky CTA:

**WhatsApp | Book**

on relevant pages.

---

# 71. ACCESSIBILITY

Target WCAG 2.2 AA where practical.

Required:

Semantic HTML

Keyboard navigation

Visible focus

Accessible labels

ARIA only where necessary

Correct heading hierarchy

Alt text

Descriptive link text

Accessible form errors

Screen-reader friendly loading states

Keyboard accessible modals

Keyboard accessible dropdowns

Sufficient contrast

44px minimum touch targets

Reduced-motion support

No information conveyed by color alone

---

# 72. ANIMATION

Animation should communicate hierarchy, not decorate everything.

Use:

fade

slide

subtle reveal

menu transitions

accordion transitions

loading transitions

Do not use:

continuous floating objects

rotating planets

excessive parallax

large cinematic page transitions

scroll-jacking

bouncing cards

glowing animations

Motion duration:

roughly `150–400ms`

Respect:

`prefers-reduced-motion`

---

# 73. IMAGE SYSTEM

Use:

real people

high-quality authentic photography

natural colors

editorial crops

consistent aspect ratios

For expert cards:

4:5 or 3:4

For article cards:

16:9 or 3:2

For hero:

16:9 or controlled editorial composition

Lazy-load below-the-fold images.

Use responsive images.

Use modern formats:

WebP / AVIF where supported.

Specify width and height.

Prevent layout shift.

---

# 74. SEO ARCHITECTURE

This is a complete SEO rebuild.

Every indexable page requires:

Unique title

Unique meta description

Canonical URL

One primary H1

Logical H2/H3 hierarchy

Open Graph

Twitter/X card metadata

Structured data where appropriate

Breadcrumbs

Internal links

Optimized URL

Image alt text

Author where relevant

Published date where relevant

Updated date where relevant

Robots rules

Sitemap inclusion decision

404 handling

Redirect handling

---

# 75. TITLE TAG RULES

Do not use the same title template for every page.

Examples:

Astrology:

`Vedic Astrology Consultation | Birth Chart & Jyotish Guidance | OM Astrology AMC`

Numerology:

`Numerology Consultation & Name Analysis | OM Astrology AMC`

Tarot:

`Tarot Reading & Guidance Online | OM Astrology AMC`

Graphology:

`Graphology & Handwriting Analysis | OM Astrology AMC`

Marriage:

`Marriage Compatibility & Kundali Matching | OM Astrology AMC`

Career:

`Career Astrology Consultation | OM Astrology AMC`

Blog article:

`[Article Title] | OM Astrology AMC`

Do not keyword-stuff.

Do not repeatedly use:

“Best Astrologer”

unless objectively relevant and supported.

---

# 76. META DESCRIPTION

Write human-readable descriptions.

Do not stuff keywords.

Describe:

what the page offers

who it helps

what the user can do

Keep approximately within normal search-snippet length.

---

# 77. CANONICALS

Every indexable page should have a self-referencing canonical.

Handle:

query parameters

tracking parameters

pagination

filtered views

duplicate content

trailing slash consistency

HTTP→HTTPS

www/non-www consistency

---

# 78. URL ARCHITECTURE

Use short meaningful URLs.

Examples:

`/services`

`/astrology`

`/numerology`

`/tarot-card`

`/graphology`

`/occult-synthesis`

`/services/career`

`/services/marriage-matching`

`/services/name-correction`

`/free-tools`

`/free-tools/numerology`

`/free-tools/marriage-compatibility-checker`

`/horoscope`

`/horoscope/aries`

`/horoscope/aries/daily`

`/transits/jupiter`

`/blog`

`/blog/[slug]`

`/experts`

`/experts/[slug]`

Avoid meaningless URLs.

---

# 79. BREADCRUMBS

Every deep content page should have:

Home

Category

Current page

Example:

Home → Services → Astrology

Home → Insights → Astrology → Saturn Transit 2026

Home → Free Tools → Marriage Match

Use:

BreadcrumbList structured data.

---

# 80. INTERNAL LINKING

Every major page must link to related content.

Example:

Astrology page:

Astrology tool

Kundli

Moon Sign

Dasha

Transits

Career astrology

Marriage matching

Astrology articles

Expert

Consultation

Do not randomly link.

Links should help the user's next logical action.

---

# 81. TOPIC CLUSTERS

Build content architecture around:

### Astrology cluster

Birth chart

Houses

Planets

Nakshatras

Dashas

Transits

Doshas

Remedies

Horoscopes

Career

Marriage

### Numerology cluster

Life path

Name numbers

Chaldean

Pythagorean

Master numbers

Name correction

Mobile numbers

Business numerology

### Tarot cluster

Major Arcana

Minor Arcana

Spreads

Love

Career

Decision guidance

### Graphology cluster

Signature

Slant

Pressure

Spacing

Baseline

Letter analysis

Graphotherapy

---

# 82. STRUCTURED DATA

Implement schema only when supported by visible page content.

Potential types:

Organization

Person

Article

BreadcrumbList

FAQPage where eligible

WebSite

WebPage

Service

SoftwareApplication/WebApplication for genuine tools where appropriate

Offer where pricing is actually shown

Do NOT insert fake ratings/reviews into schema.

Do NOT create fake aggregate ratings.

Do NOT add schema claims not visible on the page.

---

# 83. SEO CONTENT QUALITY

Do not generate thin pages just for keywords.

Every important page should answer:

What?

Who?

Why?

How?

What information is needed?

What should users expect?

What are the limitations?

What is next?

Create genuinely useful educational content.

---

# 84. E-E-A-T / TRUST ARCHITECTURE

Every major service should expose:

Who provides it

Experience

Method

Process

What information is used

What the user receives

Limitations

Privacy

Contact information

Real testimonials where available

Real authors

Real dates

Transparent business information

Do not create fake authority signals.

---

# 85. SCIENTIFIC / CLAIM LANGUAGE

This is critical.

Do not rewrite traditional spiritual practices as established scientific facts.

Avoid statements such as:

“science proves astrology”

“planets directly determine personality”

“handwriting reveals neurological diagnosis”

“gemstones scientifically remove planetary imbalance”

“numerology guarantees wealth”

“tarot predicts the future with 100% accuracy”

Instead use accurate framing:

“Within the Jyotish tradition…”

“Practitioners of numerology interpret…”

“Tarot is often used as a reflective practice…”

“Graphology practitioners use handwriting characteristics as interpretive signals…”

“This is a traditional/interpretive practice, not a substitute for professional medical, legal, psychological or financial advice.”

This is a TRUST redesign, not merely a disclaimer exercise.

---

# 86. TESTIMONIAL / REVIEW SYSTEM

Create moderation.

Admin fields:

Name

Email

Review

Rating

Service

Expert

Verified purchase/session

Consent to publish

Status

Date

Source

Admin notes

Statuses:

Pending

Approved

Rejected

Hidden

Featured

Never automatically publish unmoderated reviews.

---

# 87. ADMIN PANEL — COMPLETE REBUILD

Do not treat the admin area as an afterthought.

Create a professional administrative product.

Primary sidebar:

Dashboard

Content

Services

Tools

Horoscopes

Transits

Experts

Appointments

Customers

Reviews

Media

SEO

Analytics

Notifications

Settings

---

# 88. ADMIN DASHBOARD

Top metrics:

Upcoming appointments

Today's appointments

Pending reviews

Draft content

Published content

Tool usage

Consultation revenue if available

Support messages

SEO warnings

Use data only if real.

No fabricated statistics.

---

# 89. ADMIN DASHBOARD ACTIONS

Quick actions:

Create article

Create horoscope

Add expert

Create service

Manage appointments

Review testimonials

Run SEO audit

Upload media

---

# 90. ADMIN APPOINTMENTS

Table:

Customer

Service

Expert

Date

Time

Timezone

Status

Payment

Source

Actions

Filters:

Today

Tomorrow

This week

Upcoming

Completed

Cancelled

Refunded

Search

---

# 91. APPOINTMENT DETAIL

Show:

Customer information

Booking ID

Service

Expert

Date

Time

Timezone

Payment

Meeting link

Notes

Customer message

Status history

Communication history

Reschedule

Cancel

Refund

Send reminder

Internal notes

Do not expose internal notes to users.

---

# 92. ADMIN CUSTOMER CRM

Customer profile:

Name

Email

Phone

Bookings

Past consultations

Saved reports

Reviews

Messages

Consent

Marketing preferences

Last activity

Tags

Notes

Privacy controls

Delete/anonymize option where appropriate

---

# 93. ADMIN CONTENT MANAGEMENT

Content list:

Title

Type

Author

Status

Published date

Updated date

SEO score/status

Actions

Filters:

Draft

Review

Scheduled

Published

Archived

Needs update

---

# 94. ARTICLE EDITOR

Fields:

Title

Slug

Excerpt

Body

Featured image

Author

Category

Tags

SEO title

Meta description

Canonical

OG image

Schema

Publish date

Updated date

Related services

Related tools

Related articles

Internal links

Preview

Save draft

Submit review

Publish

Archive

---

# 95. CONTENT WORKFLOW

Implement:

Draft

↓

Review

↓

SEO Check

↓

Scheduled

↓

Published

↓

Updated

No article should silently publish because a random field changed.

---

# 96. HOROSCOPE CMS

Admin should be able to:

select zodiac

select period

select date

write prediction

save draft

preview

schedule

publish

update

archive

duplicate from previous period

Manage metadata

Manage author

---

# 97. TRANSIT CMS

Fields:

Planet

Transit start date

Transit end date

Zodiac/sign

Year

Description

Interpretation

Related signs

Related services

Related articles

SEO data

Publishing state

Automatically mark outdated content when the date range ends.

---

# 98. EXPERT MANAGEMENT

Fields:

Name

Slug

Photo

Role

Bio

Specialties

Methods

Languages

Experience

Credentials

Availability

Price

Session duration

Booking calendar

Profile SEO

Social links

Testimonials

Published/unpublished

---

# 99. SERVICE CMS

Fields:

Service name

Slug

Category

Short description

Hero copy

Hero image

Benefits

Suitable for

Not suitable for

Methodology

Process

Deliverables

Pricing

Experts

FAQs

Related tools

Related articles

SEO

Disclaimer

---

# 100. TOOL MANAGEMENT

Admin can configure:

Tool title

Slug

Description

Inputs

Validation

Calculation logic

Result interpretation

FAQs

Related services

Related content

SEO

Version

Active/inactive

Do not allow content editors to accidentally modify calculation logic without permissions.

---

# 101. ADMIN MEDIA LIBRARY

Required:

Upload

Search

Filter

Folders

Alt text

Caption

Filename

File type

Dimensions

Size

Usage

Replace

Delete

Compress

Do not allow huge unoptimized images.

---

# 102. ADMIN SEO DASHBOARD

Show:

Pages missing titles

Duplicate titles

Missing descriptions

Duplicate descriptions

Missing H1

Multiple H1s

Missing canonical

Broken links

Missing alt text

Orphan pages

Indexability issues

Sitemap status

Schema issues

Redirect issues

Noindex pages

Outdated articles

---

# 103. ADMIN PERMISSIONS

Roles:

Super Admin

Content Manager

SEO Manager

Appointment Manager

Editor

Reviewer

Support

Each role gets appropriate permissions.

Do not give everyone full database access.

---

# 104. ADMIN AUDIT LOG

Record:

User

Action

Entity

Old value

New value

Timestamp

IP/device where legally appropriate

Useful actions:

Published article

Changed price

Changed expert

Cancelled appointment

Approved review

Changed SEO metadata

Deleted content

---

# 105. ADMIN DESIGN LANGUAGE

Admin must use:

* light background
* dark text
* compact tables
* clean spacing
* 8px radius max for most elements
* restrained burgundy accents
* clear status colors
* no decorative astrology art
* no giant dashboard cards
* no excessive gradients
* no meaningless charts

Admin is a productivity tool.

---

# 106. ADMIN RESPONSIVE EXPERIENCE

Admin must work at:

desktop

tablet

mobile where operationally useful

Tables need:

horizontal scroll or responsive card conversion.

Never let important appointment actions become inaccessible on smaller screens.

---

# 107. FORM UX

All forms need:

clear labels

supporting text

required indicators

validation

inline errors

success state

loading state

keyboard navigation

autocomplete where appropriate

input formatting

proper input types

accessible error announcements

Do not rely on placeholder text as labels.

---

# 108. ERROR UX

Never expose:

SQL errors

API stack traces

JSON errors

technical exception text

Use:

“Something went wrong while loading this page.”

Then:

Retry

Return home

Contact support

Log technical details silently.

---

# 109. LOADING UX

Use skeletons for:

Article lists

Expert lists

Tool results

Calendar

Availability

Search

Use spinners only for short operations.

---

# 110. EMPTY STATES

Examples:

No appointments:

**You have no upcoming consultations.**

Explore services

No search results:

**We couldn't find anything matching that search.**

Try another phrase.

No available slots:

**There are no available times for this consultant on this date.**

Choose another day

---

# 111. SEO + UX PAGE STATES

Make sure:

404 = noindex

Search pages = properly controlled

Account/private pages = noindex

Admin = noindex and authentication-protected

Temporary unavailable pages = handled properly

Expired yearly content = redirected or retained as archive according to strategy

Do not blindly noindex everything.

---

# 112. PERFORMANCE

Target excellent Core Web Vitals.

Optimize:

LCP

CLS

INP

Actions:

Compress images

Preload critical hero image only when necessary

Use responsive images

Lazy-load below fold

Reduce JavaScript

Code-split large tools

Avoid unnecessary client-side rendering

Avoid hydration-heavy UI where not needed

Use server rendering/static generation for SEO content where appropriate

Cache stable content

Optimize fonts

Avoid huge third-party libraries

---

# 113. JAVASCRIPT ARCHITECTURE

Keep client-side JavaScript purposeful.

Do not turn static content into unnecessarily complex client-rendered components.

Prefer:

server rendering for editorial/SEO pages

client interaction for tools/booking/forms

lazy-loaded expensive modules

shared components

---

# 114. ANALYTICS

Track meaningful actions.

Events:

view_service

start_booking

select_consultation_type

select_expert

select_date

select_time

begin_checkout

purchase

booking_completed

tool_started

tool_completed

article_view

search

whatsapp_click

contact_submit

Do not send sensitive birth details, private consultation notes or unnecessary personal data into analytics.

---

# 115. CONVERSION FUNNEL

Measure:

Landing page

↓

Service discovery

↓

Service detail

↓

Booking started

↓

Expert selected

↓

Time selected

↓

Checkout

↓

Booking complete

Also measure:

Free Tool

↓

Result

↓

Related Service

↓

Consultation

---

# 116. WHATSAPP UX

WhatsApp should be an intentional conversion/support path.

Use:

“Talk on WhatsApp”

not random floating icons everywhere.

Mobile:

sticky WhatsApp option.

Desktop:

small fixed or page-specific action only where useful.

Open WhatsApp with a clear contextual message where appropriate.

Do not create a huge distracting floating bubble.

---

# 117. CONTENT LENGTH

Do not solve weak design by adding more content.

Homepage:

reduce visible information by approximately 20–30%.

Long service pages:

progressively reveal educational content.

Use:

accordions

related guides

content sections

tabs only when they genuinely improve comprehension

Do not hide SEO-critical text solely because it looks long.

---

# 118. INFORMATION DENSITY

Every section needs one primary job.

Example:

Hero = understand the brand

Intent section = identify user need

Method section = explain approach

Expert section = trust

Process = reduce uncertainty

Tools = free value

Testimonials = evidence

CTA = conversion

Do not mix all these jobs into one component.

---

# 119. CARD RULE

A card must exist only if it helps grouping or comparison.

Do not put every paragraph into a card.

Prefer:

editorial sections

open grids

text + image

borders

whitespace

typography

over:

20 identical floating cards.

---

# 120. COPYWRITING STYLE

Tone:

calm

clear

human

respectful

professional

warm

not mystical-salesy

Avoid:

“Unlock infinite abundance”

“Manifest your destiny instantly”

“100% accurate prediction”

“Guaranteed success”

“Your life will change forever”

Prefer:

“Explore”

“Understand”

“Reflect”

“Discuss”

“Prepare”

“Consider”

“Gain perspective”

“Make a more informed decision”

---

# 121. TRUST LANGUAGE

Use specific evidence instead of adjectives.

Bad:

“The world's most powerful astrology platform.”

Better:

“Personal consultations across astrology, numerology, tarot and graphology.”

Bad:

“Unbelievably accurate.”

Better:

“Personalised interpretation based on the information you provide.”

---

# 122. CONTENT DISCLAIMER SYSTEM

Create reusable disclaimer component.

For relevant pages:

**Important note**

Astrology, numerology, tarot and graphology are traditional or interpretive practices. They are not substitutes for professional medical, mental-health, legal or financial advice.

Adjust wording based on the actual service.

Do not add an enormous legal block to every page.

---

# 123. FOOTER INFORMATION ARCHITECTURE

Use only useful links.

### Discover

Home

Services

Free Tools

Horoscopes

Insights

### Services

Astrology

Numerology

Tarot

Graphology

Occult Synthesis

Marriage

Career

### About

About

Experts

Contact

FAQs

### Legal

Privacy

Terms

Disclaimer

Refund/Cancellation

Do not expose every internal route.

---

# 124. SEO SITEMAP

Generate:

sitemap.xml

Separate or logically structured sitemaps where necessary:

pages

articles

horoscopes

experts

services

tools

transits

Ensure only canonical indexable URLs are included.

---

# 125. ROBOTS.TXT

Allow useful public content.

Block:

admin

account

private tools/results if not meant to be indexed

internal search parameters where applicable

development routes

API routes

---

# 126. REDIRECT PLAN

Before changing routes:

Create route inventory.

Map:

old URL

new URL

redirect status

reason

Do not break existing SEO.

Use permanent redirects for moved permanent pages.

---

# 127. CONTENT MIGRATION

Do NOT simply copy every old block into the new UI.

For every piece of existing content determine:

Keep

Rewrite

Condense

Move

Merge

Archive

Delete

Redirect

Prioritize:

accuracy

clarity

trust

SEO

user usefulness

---

# 128. DUPLICATION CLEANUP

Detect:

duplicated testimonials

repeated CTA blocks

repeated footer structures

duplicate service explanations

duplicate article summaries

duplicate zodiac text

duplicate metadata

duplicate H1s

Duplicate content should exist in one canonical location whenever practical.

---

# 129. CURRENT FOOTER / NAVIGATION CLEANUP

The current site exposes large collections of free tools, horoscopes, specialized areas, experts, transits and numerology links globally. Consolidate these into logical information architecture rather than presenting everything at equal priority.

---

# 130. CURRENT HOMEPAGE CONTENT CLEANUP

The current homepage contains premium product promotion, ebook promotion, Panchang, many specialist services, methodology, “science” content, long testimonials, FAQs, booking, experts and blog sections.

Do not preserve this exact order.

Rebuild the homepage as a narrative.

---

# 131. CONTENT PRIORITY

Priority 1:

Brand

Question

Trust

Services

Experts

Consultation

Priority 2:

Free tools

Horoscopes

Articles

Transits

Priority 3:

Products

Academy

Shop

Future features

“Coming soon” should not dominate navigation.

If a feature is genuinely unavailable, do not give it the same navigation prominence as functioning features.

---

# 132. “COMING SOON” UX

Do not present unfinished areas as major nav items.

Instead:

hide them from primary navigation

or

create a proper waitlist/preview page

with:

what it is

why it matters

expected availability only if known

notify-me CTA

---

# 133. ECOMMERCE / PRODUCTS

If products are active:

Create product architecture.

Product page:

Image

Name

Purpose

Description

Materials/details

How it is used

Price

Availability

Shipping

Returns

Reviews

FAQ

Related consultation

Do not visually mix product commerce with consultation content.

If shop is not active, do not make it a major primary navigation item.

---

# 134. ACADEMY / COURSES

If active:

Create separate academy architecture.

Course listing

Course detail

Instructor

Curriculum

Duration

Level

Price

Enrollment

FAQ

Do not place “Coming soon” course blocks throughout the homepage.

---

# 135. ADMIN CONTENT PREVIEW

Every content type needs a preview that matches the real front-end.

Preview:

desktop

tablet

mobile

SEO metadata

social share preview

---

# 136. ADMIN SEO VALIDATION

Before publishing:

Require or warn on:

H1

SEO title

Meta description

Canonical

Slug

Author

Featured image

Alt text

Category

Internal links

Schema eligibility

Do not prevent publishing for every minor issue, but clearly display severity:

Critical

Warning

Suggestion

---

# 137. DESIGN QA

Before considering redesign complete, inspect every page at:

Desktop

Tablet

Mobile

Slow network

No JavaScript where SEO content should still render

Keyboard only

Screen reader where practical

Zoom 200%

Large text

Dark mode only if intentionally supported

Do not accidentally introduce dark mode by browser preference unless designed.

---

# 138. VISUAL QA CHECKLIST

Check:

Are section widths consistent?

Are headings aligned?

Are cards unnecessarily rounded?

Is there excessive padding?

Is there excessive blank space?

Are sections repeating the same visual pattern?

Are buttons too large?

Are colors consistent?

Is gold overused?

Are images authentic?

Does every section have a purpose?

Does the page feel trustworthy?

Does the user know what to do next?

Does the page feel human?

---

# 139. UX QA CHECKLIST

For every major journey:

Can a new visitor understand the offer within 5 seconds?

Can they find the right service within 20–30 seconds?

Can they understand the process?

Can they identify an expert?

Can they book without confusion?

Can they recover from errors?

Can they find FAQs?

Can they contact support?

Can they use the website comfortably on mobile?

---

# 140. SEO QA CHECKLIST

Verify:

One primary H1

No accidental duplicate title tags

No duplicate descriptions

Canonical present

Breadcrumbs correct

Structured data valid

Sitemap valid

Robots valid

Internal links work

No broken links

No orphan pages

Image alt text

Author information

Published dates

Updated dates

Mobile friendly

Fast rendering

Correct redirects

Correct indexability

---

# 141. ROUTE INVENTORY

Before implementation, automatically generate a complete route inventory from the existing application.

Include every existing route.

Then classify:

Public

Private

Admin

API

Tool

Content

Service

Expert

Booking

Legal

Legacy

For each route define:

Keep

Redesign

Merge

Redirect

Remove

Never lose an important page simply because it was not manually remembered.

Known current content families include:

Astrology

Numerology

Tarot

Graphology

Occult Synthesis

Specialized service pages

Free tools

Horoscopes

Planetary transits

Numerology prediction pages

Experts

Appointments

Blog

About

Reviews

Ebook/product content

and additional routes discovered during crawling.

---

# 142. AUTOMATIC CRAWL / DISCOVERY REQUIREMENT

Before coding:

1. Crawl the existing internal route graph.
2. Inspect navigation links.
3. Inspect sitemap if available.
4. Inspect robots.txt.
5. Inspect route definitions.
6. Inspect API endpoints used by the frontend.
7. Inspect database models.
8. Inspect CMS models.
9. Inspect form submissions.
10. Inspect booking functionality.
11. Inspect authentication.
12. Inspect payment integration.
13. Inspect notification system.
14. Inspect analytics.
15. Inspect image/media assets.
16. Inspect SEO metadata.
17. Inspect existing schema.

Create a migration map before making destructive changes.

---

# 143. DO NOT BREAK FUNCTIONALITY

Do not redesign the frontend while accidentally breaking:

* login
* bookings
* calendars
* calculations
* payments
* email
* WhatsApp
* reports
* downloads
* admin content
* database relationships
* APIs
* SEO URLs
* analytics

After every major change run regression tests.

---

# 144. COMPONENT ARCHITECTURE

Build reusable primitives:

Layout

Container

Stack

Grid

Typography

Button

Input

Select

Card

Badge

Section

Modal

Drawer

Tabs

Accordion

Table

Form

Pagination

Then compose pages from them.

Avoid creating:

`AstrologyButton`

`TarotButton`

`BlogButton`

`MarriageButton`

when a shared `Button` component would work.

Use data-driven rendering wherever practical.

---

# 145. DATA-DRIVEN CONTENT

Services should be represented in structured data.

Experts structured data.

Tools structured data.

Zodiac signs structured data.

Planets structured data.

Articles structured data.

Do not hard-code repeated content into dozens of page files.

---

# 146. SEO-PRESERVING DYNAMIC ROUTES

Dynamic routes must still produce:

server-rendered title

meta description

canonical

H1

content

structured data

breadcrumbs

internal links

Do not create pages where the page initially renders only:

“Loading…”

and relies entirely on client-side JavaScript for SEO content.

---

# 147. CONTENT ARCHIVE

Do not delete valuable old content automatically.

For outdated content:

Update

Archive

Redirect

Merge

Canonicalize

depending on value.

Especially for:

yearly horoscopes

transits

seasonal astrology

old articles

---

# 148. DATE MANAGEMENT

All time-sensitive content must support:

published_at

updated_at

effective_from

effective_to

timezone

For horoscope and transit content, make year/date explicit.

---

# 149. TIMEZONE

Bookings should clearly display timezone.

Default:

user/browser timezone

Allow switch to:

IST

other relevant timezone.

Store actual booking time reliably.

---

# 150. INTERNATIONAL USERS

The site currently supports online consultations, so design for users outside India as well.

Support:

IST display

local timezone

country-aware phone input

international dialing codes

currency configuration

international meeting times

clear online consultation explanation

Do not force all users into India-only assumptions.

---

# 151. SECURITY

Implement standard security best practices.

Protect:

admin routes

customer data

birth information

phone numbers

email

booking records

reports

payments

uploaded handwriting images

Use:

authentication

authorization

validation

rate limiting

CSRF protection where relevant

secure cookies

server-side validation

file type restrictions

upload size restrictions

sanitization

---

# 152. HANDWRITING / IMAGE UPLOAD PRIVACY

Graphology users may upload handwritten material.

Explain:

why it is needed

where it is stored

who can access it

retention policy

how users can request deletion

Do not publicly expose uploads.

Do not place uploaded images in predictable public URLs if they contain personal information.

---

# 153. PRIVACY-FIRST TOOL UX

For tools:

Do not automatically save everything.

Tell users when a result is saved.

Provide:

Delete result

Clear history

Do not retain unnecessary personal information indefinitely.

---

# 154. ADMIN NOTIFICATIONS

Admin notification center:

New appointment

Cancelled appointment

Payment failed

New review

New customer inquiry

Article requires update

SEO critical issue

System error

Allow:

read

unread

archive

priority

---

# 155. CUSTOMER NOTIFICATIONS

Where supported:

Booking confirmation

Reminder

Payment confirmation

Reschedule

Cancellation

Refund

Follow-up

Review request

Use consistent templates.

---

# 156. DESIGN FOR TRUST

Trust should visually come from:

white space

human faces

clear prices

clear process

visible policies

real profiles

authentic testimonials

clear contact paths

professional typography

careful copy

not from:

gold

glow

stars

magic symbols

badges everywhere

fake ratings

huge claims

---

# 157. INFORMATION HIERARCHY RULE

On every screen there must be:

ONE primary headline

ONE primary user action

ONE clear next action

Secondary actions must visually recede.

Do not make:

Book

WhatsApp

Learn More

Shop

Download

Join

Contact

Explore

all equally prominent.

---

# 158. PAGE CTA RULE

Each page can have several contextual CTAs but one primary conversion.

Examples:

Service page:

Book Consultation

Tool:

Calculate Result

Then:

Talk to an Expert

Article:

Read related guide

Then:

Explore consultation

Expert:

Book with this Expert

---

# 159. SCROLL EXPERIENCE

The user should encounter meaningful changes in:

layout

typography

image

content structure

background

without random color changes.

Use section transitions intentionally.

---

# 160. BACKGROUND STRATEGY

Do NOT put every section in a different colored background.

Suggested:

Hero — warm ivory

Question section — white

Method — warm sand/light neutral

Process — ivory

Experts — white

Testimonials — subtle warm background

Knowledge hub — ivory

CTA — deep charcoal

Footer — deep charcoal

Use contrast strategically.

---

# 161. MICROCOPY

Use useful microcopy.

Example:

Instead of:

“Submit”

Use:

“Continue”

Instead of:

“Generate Report”

Use:

“Calculate My Result”

Instead of:

“Select”

Use:

“Choose a consultation”

Instead of:

“Confirm”

Use:

“Confirm Appointment”

---

# 162. MOBILE FORMS

Forms must not become huge vertical walls.

Use:

step-by-step flow

progress indicator

sticky Continue button when appropriate

clear back button

preserve entered information

validate early

---

# 163. BOOKING PROGRESS INDICATOR

Example:

1 Question

2 Consultation

3 Expert

4 Time

5 Details

6 Payment

Use a minimal progress bar.

On mobile, use:

Step 2 of 6

---

# 164. TOOL PROGRESS

For multi-input tools:

1 Your details

2 Preferences

3 Calculation

4 Result

Never make users wonder how much remains.

---

# 165. ERROR COPY EXAMPLES

Bad:

`ERR_CALENDAR_SLOT_NULL`

Good:

**That time is no longer available. Please choose another slot.**

Bad:

`Invalid DOB`

Good:

**Please enter a valid date of birth.**

Bad:

`Network Error`

Good:

**We couldn't load the available times. Please try again.**

---

# 166. SUCCESS COPY

After tool:

**Your result is ready.**

After booking:

**Your consultation is confirmed.**

After review:

**Thank you. Your review has been submitted for approval.**

Do not overdo celebratory animations.

---

# 167. ADMIN TABLE UX

Tables should include:

sorting

filtering

search

pagination

column visibility where useful

bulk actions only where safe

responsive behavior

clear status labels

confirmation for destructive actions

---

# 168. DESTRUCTIVE ACTION UX

For:

delete

cancel

refund

archive

remove expert

remove content

require confirmation.

Show exact consequences.

Example:

**Delete this article?**

This will permanently remove the draft and cannot be undone.

---

# 169. AUTOSAVE

For long admin forms:

implement autosave where practical.

Show:

Saved

Saving

Unsaved changes

Error saving

Do not silently lose content.

---

# 170. PREVIEW SYSTEM

Admins should be able to preview:

Homepage

Service pages

Articles

Horoscopes

Transit pages

Experts

Tools

without publishing.

---

# 171. CONTENT VERSIONING

Where practical:

Keep revisions.

Show:

current version

previous version

changed date

changed by

restore

This is especially important for SEO/editorial pages.

---

# 172. SEO CONTENT EDITOR

Allow editors to see:

SEO title

character guidance

meta description

preview

canonical

indexability

internal link suggestions

structured data status

No fake numerical “SEO score” should override editorial judgment.

---

# 173. BROKEN LINK MANAGEMENT

Implement crawler or reporting for:

404 links

broken internal links

broken external links where feasible

redirect chains

orphan pages

---

# 174. DESIGN TOKENS

All colors, typography, radii, spacing, shadows and breakpoints must live in one central theme.

Do not scatter:

`#6F2935`

through dozens of files.

Use:

`--color-brand`

etc.

---

# 175. CODE QUALITY

Requirements:

Type safety where supported

Reusable hooks/utilities

No duplicated business logic

No unnecessary dependencies

No dead components

No unused imports

No hardcoded secrets

No exposed API keys

No console errors

No accessibility warnings that can reasonably be fixed

No hydration mismatch

No broken links

---

# 176. DOCUMENTATION

Create developer documentation for:

Design system

Routing

CMS

Booking flow

Tool architecture

SEO architecture

Admin permissions

Database impact

Environment variables

Deployment

Testing

Content publishing

---

# 177. TESTING

Implement/run tests for:

Authentication

Navigation

Booking

Payment

Forms

Tool calculations

Result rendering

CMS publishing

Permissions

SEO metadata

Sitemap

Redirects

Responsive layout

Accessibility

Error states

---

# 178. VISUAL REGRESSION

Capture screenshots of all major templates:

Home

Services

Astrology

Numerology

Tarot

Graphology

Occult Synthesis

Specialized service

Tool

Tool result

Horoscope index

Zodiac horoscope

Article index

Article detail

Expert index

Expert detail

Booking

Confirmation

Contact

About

Legal

404

Admin dashboard

Admin table

Admin editor

Compare against design requirements.

---

# 179. FINAL ACCEPTANCE TEST

The rebuild is NOT complete if:

* the site still looks like a generic template
* cards are excessively rounded
* spacing is inconsistent
* homepage has no narrative
* hero is vague
* every section looks identical
* colors are too bright
* gold is overused
* content is crammed
* the navigation is overwhelming
* users cannot understand services
* booking is confusing
* tools feel like raw forms
* expert information is weak
* testimonials feel fake
* unsupported scientific claims remain
* mobile UX is poor
* admin is cluttered
* SEO metadata is missing
* dynamic pages are not indexable correctly
* redirects are broken
* performance is poor
* errors expose technical information

---

# 180. FINAL DESIGN TEST

Open the homepage for the first time.

Ask:

### Within 5 seconds:

Do I understand:

Who this is?

What they do?

Who it is for?

What I can do next?

If not, redesign the hero.

---

# 181. FINAL TRUST TEST

A new user should be able to answer:

Who will consult me?

What will happen?

What does it cost?

What information do I provide?

How private is my information?

Can I contact someone?

Can I cancel/reschedule?

What exactly are these practices?

Are claims presented honestly?

If not, improve the page.

---

# 182. FINAL STORY TEST

The homepage should read visually as:

### I have a question.

↓

### My situation may have patterns worth exploring.

↓

### OM uses different traditional frameworks.

↓

### The right consultation depends on my question.

↓

### I can meet a real expert.

↓

### Here is how the process works.

↓

### Other clients have shared their experience.

↓

### I can explore useful free resources first.

↓

### I know how to book.

If the page instead feels like:

“Here are many colorful boxes of astrology features,”

the redesign has failed.

---

# 183. FINAL INFORMATION ARCHITECTURE

The finished product should broadly follow:

HOME

SERVICES

* Astrology
* Numerology
* Tarot
* Graphology
* Occult Synthesis
* Career
* Marriage
* Name Correction
* Mobile Number
* Corporate Numerology

FREE TOOLS

* Kundli
* Numerology
* Zodiac
* Moon Sign
* Ascendant
* Nakshatra
* Marriage Match
* Panchang
* Muhurat
* Dasha
* Lucky Number
* Lucky Color
* Name Numerology

HOROSCOPES

* Daily
* Weekly
* Monthly
* Yearly
* 12 Signs
* Transits

INSIGHTS

* Astrology
* Numerology
* Tarot
* Graphology
* Relationships
* Career
* Business
* Transits
* Guides

EXPERTS

* Expert Directory
* Expert Profiles

ABOUT

* About
* Methodology
* Contact
* FAQs

BOOK CONSULTATION

LEGAL

* Privacy
* Terms
* Disclaimer
* Refund/Cancellation

ADMIN

* Dashboard
* Content
* Services
* Tools
* Horoscopes
* Transits
* Experts
* Appointments
* Customers
* Reviews
* Media
* SEO
* Notifications
* Settings

---

# 184. EXECUTION ORDER

Do not start by styling random pages.

Implement in this order:

### PHASE 1 — AUDIT

Crawl application.

Map routes.

Map components.

Map database.

Map APIs.

Map CMS.

Map SEO.

Map integrations.

---

### PHASE 2 — DESIGN SYSTEM

Build:

Colors

Typography

Spacing

Radii

Buttons

Inputs

Cards

Grid

Containers

Navigation

Footer

---

### PHASE 3 — GLOBAL UX

Build:

Header

Navigation

Mobile navigation

Footer

Breadcrumbs

Search

WhatsApp

CTA system

---

### PHASE 4 — INFORMATION ARCHITECTURE

Build:

Routes

Redirects

Templates

Content model

SEO model

---

### PHASE 5 — CORE PAGES

Build:

Home

Services

Astrology

Numerology

Tarot

Graphology

Occult Synthesis

---

### PHASE 6 — SPECIALIZED SERVICES

Build reusable template and migrate:

Career

Marriage

Name Correction

Mobile Number

Corporate

others

---

### PHASE 7 — TOOLS

Build tool directory.

Rebuild each tool.

Implement all states.

---

### PHASE 8 — HOROSCOPES / TRANSITS

Build reusable templates.

---

### PHASE 9 — CONTENT

Blog

Article

Author

Category

Internal linking

---

### PHASE 10 — EXPERTS

Directory

Profiles

Booking integration

---

### PHASE 11 — BOOKING

Complete consultation wizard.

Payment.

Notifications.

Confirmation.

Customer area.

---

### PHASE 12 — ADMIN

Dashboard

CMS

Appointments

Experts

Reviews

Customers

SEO

Media

Settings

Permissions

Audit logs

---

### PHASE 13 — SEO

Metadata

Canonical

Schema

Sitemap

Robots

Redirects

Internal linking

Structured content

---

### PHASE 14 — PERFORMANCE / ACCESSIBILITY

Optimize.

Test.

Fix.

---

### PHASE 15 — QA

Desktop.

Tablet.

Mobile.

Forms.

Booking.

Tools.

Admin.

SEO.

Accessibility.

Regression.

---

# 185. CRITICAL RULE

Do not “make the website prettier” without improving its information architecture.

Do not “add more sections” because a page looks empty.

Do not “add more cards” to communicate more information.

Do not “use more colors” to create visual interest.

Do not “use more animations” to make it feel modern.

Do not “round everything” to make it friendly.

Do not “add more mystical images” to make it feel like astrology.

Every design decision must answer:

**Does this make the user's question easier to understand, the brand easier to trust, or the next action easier to take?**

If not, remove it.

---

# 186. FINAL CREATIVE DIRECTION

The finished OM Astrology AMC website should look like:

**a modern, premium Indian consultation practice with editorial storytelling, real human experts, thoughtful typography, warm natural colors, disciplined spacing, subtle cultural references and extremely clear UX.**

It should NOT look like:

**a colorful astrology app with endless cards and decorative cosmic effects.**

The final impression should be:

**“This feels calm, professional, personal and considered.”**

not:

**“This looks like another generic astrology website.”**

---

# 187. DEFINITION OF DONE

Consider the rebuild complete only when:

1. Every existing route has been inventoried.
2. Every important route has been redesigned or intentionally redirected.
3. The homepage has a clear narrative.
4. Navigation is significantly simpler.
5. The design system is centralized.
6. Colors are restrained.
7. Border radii are controlled.
8. Spacing is consistent.
9. Cards are reduced.
10. Typography is premium and readable.
11. Service pages have clear hierarchy.
12. Experts are trustworthy and human.
13. Booking is multi-step and understandable.
14. Tools provide polished input/result experiences.
15. Horoscopes are structured and scalable.
16. Blog is a real knowledge hub.
17. Admin is a complete operational system.
18. Reviews are moderated.
19. Privacy is considered throughout.
20. Unsupported scientific claims are removed/reframed.
21. SEO metadata exists for all important indexable pages.
22. Structured data is implemented correctly.
23. Internal linking is intentional.
24. Sitemap and robots are correct.
25. Redirects preserve legacy SEO.
26. Performance is optimized.
27. Accessibility is tested.
28. Mobile UX is excellent.
29. Booking/payment/notifications work.
30. No console errors remain.
31. No broken routes remain.
32. No fake reviews, credentials, statistics or authority claims are introduced.
33. No placeholder content is left in production.
34. No “Coming Soon” feature is presented as fully operational.
35. The final website communicates trust before selling anything.

---

# 188. MOST IMPORTANT INSTRUCTION TO THE CODING AGENT

Do not interpret this prompt as a list of optional suggestions.

Treat it as the product specification.

First inspect the current codebase and live information architecture.

Then create a migration/rebuild plan.

Then implement the design system.

Then rebuild the site template-by-template.

Do not stop after redesigning the homepage.

The objective is the **complete product**:

**Public Website + Tools + Content Platform + Booking System + Customer Experience + Admin/CMS + SEO + Accessibility + Performance.**

Everything must feel like one coherent product.

The final system must be scalable so that adding:

* a new service
* a new expert
* a new article
* a new zodiac page
* a new transit
* a new tool
* a new consultation package

does not require manually rebuilding the UI from scratch.

Build the underlying architecture correctly, not just the visible pages.

# END OF MASTER PROMPT
