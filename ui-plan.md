You are a senior product designer, UI/UX architect, design-system specialist, frontend engineer, accessibility specialist, and SaaS/admin dashboard UX expert.

You are working on the existing website:

https://www.omastrologyamc.com/

The goal is to perform a COMPLETE PROFESSIONAL UI/UX REDESIGN and UX architecture improvement of the entire OM Astrology AMC platform.

IMPORTANT:

This is NOT a request to simply change colors, fonts, spacing, or make the existing website "look prettier."

You must audit, restructure, simplify, redesign, and improve:

1. Every public-facing page
2. Every section on every page
3. Every navigation flow
4. Every form
5. Every calculator/tool
6. Every horoscope experience
7. Every service page
8. Every appointment flow
9. Every shop flow
10. Every customer flow
11. Every admin page
12. Every admin CRUD workflow
13. Tables
14. Dashboards
15. Loading states
16. Empty states
17. Error states
18. Confirmation states
19. Responsive/mobile behavior
20. Accessibility
21. Information architecture
22. Content hierarchy
23. Design consistency
24. Component consistency
25. User onboarding
26. Conversion journeys
27. Search and filtering
28. Notifications
29. Permissions
30. Content management
31. Reporting and analytics
32. Overall system architecture from a UX perspective

Do not create unnecessary new functionality merely for visual effect.

Preserve existing business logic, API integrations, database structure, authentication, payments, existing working features and data unless a UX-related change requires an adjustment.

Before modifying anything, inspect the existing codebase and understand how the application currently works.

==================================================
PHASE 1 — COMPLETE EXISTING PRODUCT AUDIT
==================================================

First inspect the entire application.

Do not assume that the pages visible from the main navigation are the only pages.

Discover:

- All routes
- All public routes
- All authenticated customer routes
- All admin routes
- All dynamic routes
- All calculator routes
- All horoscope routes
- All transit routes
- All numerology routes
- All service routes
- All appointment routes
- All shop routes
- All product/order routes
- All blog routes
- All content-management routes
- All authentication routes
- All profile/account routes
- All legal/system pages
- All modal/drawer interactions
- All reusable components
- All forms
- All tables
- All dashboards
- All APIs
- All loading/empty/error states

Create an internal route map before redesigning.

For every route, identify:

- Purpose
- Target user
- Primary task
- Primary CTA
- Secondary CTA
- Data displayed
- Data collected
- Dependencies
- Current UX problems
- Recommended UX structure

Do not delete existing routes without understanding their purpose.

==================================================
PHASE 2 — CORE INFORMATION ARCHITECTURE
==================================================

Redesign the information architecture around user intent rather than around the underlying database structure.

The website should have two distinct experiences:

A. PUBLIC/CUSTOMER EXPERIENCE
B. ADMIN/OPERATIONS EXPERIENCE

Do NOT use the public website navigation as the primary navigation for administrators.

--------------------------------------------------
PUBLIC NAVIGATION
--------------------------------------------------

Create a simplified primary navigation:

Logo

Services
Free Tools
Horoscopes
Learn
Shop
Book Consultation

Right side:

Account/Login
Notifications where applicable
Optional language/accessibility controls

Do not overcrowd the navigation.

Services should have a structured menu:

ASTROLOGY
NUMEROLOGY
TAROT
GRAPHOLOGY
INTEGRATED GUIDANCE / OCCULT SYNTHESIS

Free Tools should contain:

Kundli
Numerology
Lucky Number
Name Numerology
Marriage Match
Zodiac
Moon Sign
Ascendant
Nakshatra
Panchang
Daily Horoscope
Muhurat
Dasha
Lucky Color
Other existing tools discovered in the codebase

Horoscopes:

Daily
Weekly
Monthly
Yearly
2026 / current year

Learn:

Blog
FEAN Method
Astrology Guides
Numerology Guides
Transit Guides
Educational Resources

Primary CTA:

Book Consultation

Do not allow every section to introduce a new competing primary CTA.

==================================================
PHASE 3 — DESIGN SYSTEM
==================================================

Build or refactor the application around a reusable professional design system.

Do not style pages independently.

Create shared tokens/components for:

Colors
Typography
Spacing
Borders
Radius
Shadows
Buttons
Inputs
Selects
Dropdowns
Cards
Badges
Alerts
Modals
Drawers
Tabs
Tables
Pagination
Breadcrumbs
Tooltips
Toasts
Skeleton loaders
Empty states
Error states
Confirmation dialogs
Navigation
Sidebars
Headers
Footers

--------------------------------------------------
VISUAL DIRECTION
--------------------------------------------------

Brand direction:

Premium
Elegant
Calm
Trustworthy
Modern
Spiritual without looking outdated
Professional
Minimal
Editorial
Warm

Recommended visual language:

Deep navy as primary brand color
Warm gold as brand accent
Warm ivory/off-white page backgrounds
White content surfaces
Neutral gray typography/supporting UI

Do NOT assign random decorative colors to every card.

Use semantic colors consistently:

Green = success
Amber = pending/warning
Red = destructive/error
Blue = information

The current interface uses too many different pastel accent colors across cards.

Reduce decorative color usage.

--------------------------------------------------
TYPOGRAPHY
--------------------------------------------------

Use a refined display serif only where it adds brand identity:

Major hero headings
Important page headings
Brand/editorial sections

Use a clean modern sans-serif for:

Navigation
Forms
Tables
Buttons
Labels
Admin interface
Metadata
Utility information

Create a consistent type scale.

Avoid excessive font-size variation.

==================================================
PHASE 4 — PUBLIC HOMEPAGE REDESIGN
==================================================

Redesign the homepage from scratch while preserving relevant existing content.

Recommended structure:

1. HEADER

2. HERO

Headline should immediately explain what OM Astrology AMC provides.

Do NOT lead with vague messaging alone such as:

"Unlock the Mysteries of the Universe"

Instead communicate:

What the company does
Who it helps
What services are available

Primary CTA:

Book Consultation

Secondary CTA:

Explore Free Tools

Supporting trust information:

10+ Free Tools
Online Consultations
Personalized Reports
Existing factual trust indicators discovered from the current product

3. TRUST/CREDIBILITY STRIP

Use concise trust indicators.

4. CORE SERVICES

Show:

Astrology
Numerology
Tarot
Graphology

Each card should have:

Icon/image
Name
One-line explanation
Explore button

5. FREE TOOLS

Feature the most useful/free tools.

Show:

Tool icon
Tool name
One-line explanation
Approximate completion time where appropriate
"Free"

CTA:

Explore All Free Tools

6. FEATURED CONSULTATION

Clearly explain:

Who it is for
What is included
Duration
Price
Expert
CTA

7. HOW IT WORKS

Use:

Choose Service
Choose Expert
Choose Date/Time
Enter Details
Confirm

8. TESTIMONIALS

Keep only a concise selection.

Do NOT duplicate testimonials.

9. EXPERTS

Show consultant cards.

10. BLOG / KNOWLEDGE

Show a limited selection of recent articles.

11. FINAL CTA

Strong but clean CTA:

Book Consultation

12. FOOTER

Compact and logically categorized.

Do not make the homepage unnecessarily enormous.

Move deep educational material into dedicated pages.

==================================================
PHASE 5 — HOMEPAGE CONTENT / QUALITY CLEANUP
==================================================

Audit all homepage content for:

Duplicate sections
Repeated testimonials
Contradictory availability states
"Coming soon" sections for functionality that is already active
Repeated claims
Inconsistent terminology
Broken links
Incorrect links
Placeholder content
Empty sections
Excessive text
Unclear CTAs

Do not leave an inactive or empty section visible simply because it was part of the old design.

If functionality exists, do not label it "Coming Soon."

If content does not exist, either:

- create an appropriate empty state
OR
- hide the section until content is available

==================================================
PHASE 6 — ABOUT PAGE
==================================================

Redesign About page around trust and understanding.

Structure:

Hero
Our Story
Founder
Experts
Our Approach
Services/Methodology
Consultation Experience
Privacy & Confidentiality
FAQ
Book Consultation

Avoid generic promotional claims without useful supporting information.

Prioritize concrete information.

==================================================
PHASE 7 — SERVICE PAGE SYSTEM
==================================================

All service pages must share the same design system and page architecture.

Services include:

Astrology
Numerology
Tarot
Graphology
Occult Synthesis / Integrated Guidance
Any additional service discovered in the codebase

Create a standardized template:

Hero
What Is This Service?
Who Is It For?
What Questions Can It Help With?
What You Receive
Available Consultation Packages
Price
Duration
How It Works
Expert
FAQs
Related Free Tools
Related Articles
Primary CTA

The page should not behave like a long textbook.

Educational material should remain available but should be progressively disclosed.

Use:

Accordions
Tabs
Cards
Expandable content
Visual information hierarchy

Avoid enormous uninterrupted text blocks.

==================================================
PHASE 8 — ASTROLOGY PAGE
==================================================

The Astrology page currently contains extensive educational information.

Keep useful content but reorganize into:

Hero
What Astrology Consultation Provides
Consultation Packages
Astrology Fundamentals
12 Houses
9/12 relevant planetary concepts as appropriate
Nakshatras
Dashas
Yogas/Doshas
Remedies/Traditional Practices
FAQs
Related Tools
Related Articles
Book Consultation

Turn houses and other repeated concepts into cards.

Use expandable sections where content is long.

Add a persistent/visible:

Book Astrology Consultation

Do not bury the CTA.

==================================================
PHASE 9 — NUMEROLOGY PAGE
==================================================

Create:

Hero
What Numerology Is
Available Systems
Pythagorean
Chaldean
Calculator
Interpretation
Consultation Packages
FAQs
Related Tools
Book Consultation

Make the calculator feel like a real interactive product rather than simply embedding a form inside an article.

==================================================
PHASE 10 — TAROT PAGE
==================================================

Prioritize user intent.

Instead of beginning with a large educational wall of text, offer:

What would you like guidance on?

Love
Career
Finance
Relationships
General

Then show reading options:

1 Question
3 Card Reading
Other existing reading options discovered in the codebase

Then:

How Tarot Works
Major Arcana
Minor Arcana
FAQs
Book Reading

Education should remain available underneath.

==================================================
PHASE 11 — GRAPHOLOGY EXPERIENCE
==================================================

Redesign the signature analysis as a guided workflow.

Use:

STEP 1
Draw/upload signature

STEP 2
Review

STEP 3
Analyze

STEP 4
Results

Before analysis, explain:

What to provide
Recommended size
Expected result
Privacy/data handling
What is being analyzed

Result screen should organize findings visually.

Potential output categories:

Slant
Baseline
Size
Spacing
Pressure
Other metrics supported by the current product

Do not invent scientific claims.

Present interpretations as the site's methodology/traditional interpretation where appropriate.

==================================================
PHASE 12 — OCCULT SYNTHESIS
==================================================

Do not force users to understand technical methodology before choosing a service.

Start from user goals:

Career & Business
Relationships
Marriage
Personal Growth
Timing & Decisions
Name Correction
Business Branding
Other supported goals

Then explain which methodologies may be used.

Keep the existing methodology content but make it secondary.

==================================================
PHASE 13 — HOROSCOPE HUB
==================================================

Create one central horoscope discovery system.

Interface:

Today's Horoscope

Zodiac selector

Aries
Taurus
Gemini
Cancer
Leo
Virgo
Libra
Scorpio
Sagittarius
Capricorn
Aquarius
Pisces

Period selector:

Today
This Week
This Month
2026

Do not force users to navigate through separate pages just to switch zodiac signs or periods.

Maintain SEO-friendly routes where required, but give them a shared interface.

==================================================
PHASE 14 — HOROSCOPE DETAIL TEMPLATE
==================================================

Each horoscope detail page should follow:

Breadcrumb
Sign
Period selector
Quick Summary

Love
Career
Finance
Health
Other existing categories

Detailed Reading
Lucky information if supported
Important dates if supported
Related Horoscope
Related Articles
Book Consultation

Keep navigation between signs and periods visible.

==================================================
PHASE 15 — FREE TOOLS HUB
==================================================

Create a dedicated Free Tools landing page.

Features:

Search tools
Popular tools
Astrology tools
Numerology tools
Marriage/relationship tools
Daily tools
Other categories based on actual existing routes

Each tool card:

Icon
Tool name
One-line explanation
Free badge
Estimated time if useful
Open tool button

Do not overwhelm users with an unstructured list.

==================================================
PHASE 16 — CALCULATOR UX SYSTEM
==================================================

All calculators should use a consistent interaction model.

Examples:

Moon Sign Calculator
Ascendant Calculator
Nakshatra Calculator
Dasha Calculator
Marriage Compatibility
Lucky Number
Name Numerology
Zodiac
Panchang
Muhurat
Any additional tools discovered

Standard structure:

TOOL NAME

Short explanation

STEP 1
Your information

STEP 2
Calculation

STEP 3
Results

Use proper field labels.

Do NOT rely on placeholder text as labels.

Use:

Autocomplete for locations
Native date controls
Native time controls
Accessible selects
Input validation
Clear error messages

Use one time input rather than fragmented hour/minute/AM-PM controls unless business requirements specifically require otherwise.

==================================================
PHASE 17 — CALCULATOR RESULT EXPERIENCE
==================================================

Results must feel like an actual product.

Example:

Your Moon Sign

TAURUS

Summary

Love
Career
Personality
Relationships

Then actions:

Save Result
Share
Download PDF

Then:

Want a personalized interpretation?

Book Consultation

Do not simply dump text below the form.

Provide:

Loading state
Success state
Empty state where appropriate
Error state
Retry action

==================================================
PHASE 18 — PANCHANG UX
==================================================

Review the existing data requirements.

If the tool is intended to show current/day-based Panchang, prioritize:

Location
Date

Then present:

Tithi
Nakshatra
Yoga
Karana
Sunrise
Sunset
Rahu Kaal
Abhijit Muhurat
Other existing Panchang information

Do not force unnecessary personal birth information if it is not required for the actual result.

If personalized Panchang is a separate feature, provide it separately.

==================================================
PHASE 19 — MARRIAGE COMPATIBILITY
==================================================

Replace confusing Male/Female data collection with:

Person A
Person B

unless current business rules explicitly require gender-specific terminology.

Use:

Person A details
Person B details
Calculate
Results

Result structure:

Compatibility Overview
Score where currently supported
Important factors
Areas of compatibility
Areas requiring attention
Detailed interpretation

Do not invent calculations.

==================================================
PHASE 20 — FEAN PAGE
==================================================

Separate the FEAN landing experience from the ebook reading experience.

Landing page:

What is FEAN?
What you'll learn
Book Preview
Methodology
Author
Features
Read/Download

Then provide:

FEAN Ebook Reader

Reader features:

Table of contents
Chapter navigation
Reading progress
Search
Font size
Dark mode where appropriate
Bookmark where supported
Download where supported

Do not make users scroll through the entire ebook on a marketing page.

==================================================
PHASE 21 — TRANSIT SYSTEM
==================================================

Create a unified Transit hub.

Planet selector:

Sun
Moon
Mars
Mercury
Jupiter
Venus
Saturn
Rahu
Ketu
Other existing transit routes

Each transit page:

Hero
Transit dates
Overview
What changes
Zodiac-wise interpretation
Important dates
Traditional guidance/remedies where supported
FAQs
Related content

Avoid duplicated long-form sections across transit pages.

Create reusable data-driven components instead of manually duplicated markup.

==================================================
PHASE 22 — NUMEROLOGY 2026 SYSTEM
==================================================

There are root-number pages 1–9.

Create a reusable template.

Number X — 2026

Quick Overview
Career
Money
Love
Health
Family
Lucky Information
Lucky Dates
Lucky Colors
Traditional guidance/remedies where applicable
Monthly Timeline
FAQs
Related Numbers

Audit all nine pages for:

Duplicate sections
Duplicate paragraphs
Grammar problems
Repeated wording
Broken placeholders
Incorrect number references
Inconsistent formatting

Never display awkward text such as:

"Numerology Number Number 1"

Use:

"Numerology Number 1"

Use a single reusable component/template.

==================================================
PHASE 23 — BLOG / KNOWLEDGE HUB
==================================================

Redesign blog discovery.

Structure:

Knowledge Hub

Search

Featured Article

Categories:

Astrology
Numerology
Tarot
Graphology
FEAN
Transits
Guides

Latest Articles
Popular/Relevant Articles
Tools & Guides

Article cards must show:

Category
Title
Short summary
Date
Reading time if supported
Image

Article detail page:

Breadcrumb
Title
Author
Date
Reading time
Cover image
Table of contents
Article content
Related articles
Related tools
CTA

==================================================
PHASE 24 — EXPERT DIRECTORY
==================================================

Create an Experts section.

Each card:

Photo
Name
Specialties
Experience
Languages if available
Consultation types
Book button

Expert detail:

About
Specialties
Experience/credentials where documented
Consultation options
Availability
Reviews
Book Appointment

Do not invent qualifications.

==================================================
PHASE 25 — APPOINTMENT CUSTOMER FLOW
==================================================

Redesign the booking journey into a guided multi-step flow.

STEP 1
Choose Expert

STEP 2
Choose Consultation

STEP 3
Choose Date

STEP 4
Choose Time

STEP 5
Customer Details

STEP 6
Review

STEP 7
Payment/Confirmation where applicable

Show throughout:

Service
Expert
Date
Time
Duration
Price

Use progress indication.

Allow users to go back without losing entered data.

After booking:

Show confirmation page.

Provide relevant confirmation information through the existing supported channels such as email/WhatsApp if already implemented.

Do not implement unsupported third-party integrations without first understanding existing infrastructure.

==================================================
PHASE 26 — ADMIN ARCHITECTURE
==================================================

IMPORTANT:

The admin area is a separate product.

Do NOT reuse the public navigation as the primary admin navigation.

Use a dedicated admin shell.

Desktop:

LEFT SIDEBAR

Overview
Dashboard

Customers
Customers
Saved Kundlis
Reviews

Appointments
Appointments
Consultation Services
Availability & Slots

Shop
Products
Orders
Inventory
Offers
Categories

Batches
Courses
Students
Schedules

Content
Pages
Blogs
Horoscopes
Transit Content
Numerology Content
FEAN

Reports
Revenue
Consultations
Kundli Reports

Marketing
Notifications
Offers

Settings
Account
Team & Roles
Website Settings

TOP HEADER

Breadcrumb
Page title
Global admin search
Notifications
Profile

Sidebar should collapse on smaller screens.

==================================================
PHASE 27 — ADMIN DASHBOARD
==================================================

Redesign the dashboard from an "informational cards" dashboard into an "operations dashboard."

Top:

Good morning, [admin name]

Global search

Then:

ACTION REQUIRED

Pending appointments
Unprocessed orders
Low stock
New reviews
Other actionable alerts discovered in actual system data

Then:

TODAY'S APPOINTMENTS

Then:

REVENUE

Today
This month
Trend

Then:

RECENT ORDERS

Then:

RECENT CUSTOMERS

Then:

RECENT ACTIVITY

The dashboard should answer:

"What needs my attention right now?"

Do not use six generic shortcut cards as the main dashboard content.

==================================================
PHASE 28 — ADMIN DASHBOARD KPIs
==================================================

Standardize KPI cards.

Each KPI should show:

Label
Value
Period
Trend or comparison if actual data supports it

Examples:

Revenue
Orders
Appointments
Customers
Kundli Reports
Active Courses

Avoid unnecessary decorative colors.

==================================================
PHASE 29 — REVENUE / ACCOUNTING DASHBOARD
==================================================

Redesign:

Revenue Analytics & Accounting Reports

Top summary:

Total Revenue
Shop Revenue
Consultation Revenue
Batch Revenue
Kundli Revenue

Then:

Revenue Trend Chart

Period controls:

7D
30D
3M
6M
1Y

Then:

Revenue by source

Then:

Detailed accounting table

Add filters:

Date range
Source
Status
Product/service

Export should respect active filters.

Keep CSV export functionality working.

Do not call a table a "trend" unless it actually represents a trend visualization.

==================================================
PHASE 30 — ADMIN SHOP MANAGEMENT
==================================================

Separate product management from order management.

Shop sidebar:

Products
Orders
Inventory
Offers
Categories

--------------------------------------------------
PRODUCTS
--------------------------------------------------

Use a clean table.

Columns:

Product
Price
Stock
Status
Updated
Actions

Click product:

Open dedicated editor or detail drawer.

--------------------------------------------------
PRODUCT CREATION
--------------------------------------------------

Divide form into:

BASIC INFORMATION

Product name
Description
Category

PRICING

Price
Offer price
Offer title
Offer expiry

INVENTORY

Stock
SKU if supported
Availability

MEDIA

Product images
Preview

PUBLISH

Visibility
Preview
Publish

Avoid one giant uninterrupted form.

==================================================
PHASE 31 — ADMIN ORDERS
==================================================

Orders should not be embedded into product creation UI.

Use:

Order list

Columns:

Order ID
Customer
Items
Amount
Payment
Status
Date
Actions

Provide:

Search
Filters
Status filter
Date filter
Pagination
Bulk action where appropriate

Click order → detail drawer/page.

Order detail:

Customer
Contact information
Shipping
Items
Payment
Order status
Order timeline
Internal notes
Actions

==================================================
PHASE 32 — CUSTOMER DATA PRIVACY IN ADMIN
==================================================

Do not unnecessarily expose full customer PII in dense tables.

In list views, show concise information.

Reveal full:

Phone
Email
Full delivery address

inside the detail view where needed.

Follow least-necessary data exposure.

Do not alter security behavior incorrectly.

==================================================
PHASE 33 — INVENTORY
==================================================

Create a dedicated inventory experience.

Show:

Product
Available units
Low stock threshold where supported
Status
Last updated

Add:

Low-stock filter
Out-of-stock filter
Search
Stock adjustment flow

Use clear confirmations for inventory changes where appropriate.

==================================================
PHASE 34 — APPOINTMENT ADMIN
==================================================

Separate:

Consultation Services

from:

Availability & Slots

Do not call a page "Bookings & Slots Settings" if it only shows consultation types and appointment logs.

--------------------------------------------------
CONSULTATION SERVICES
--------------------------------------------------

Service list:

Name
Price
Duration
Category
Status
Actions

Create/edit service.

--------------------------------------------------
AVAILABILITY & SLOTS
--------------------------------------------------

Provide:

Weekly schedule
Working hours
Breaks
Blocked dates
Slot duration
Buffer time
Timezone

Calendar interface

Daily appointment view

Do not implement fake scheduling functionality. Connect to existing backend logic.

==================================================
PHASE 35 — ADMIN APPOINTMENT LIST
==================================================

Use:

Customer
Service
Expert
Date/time
Payment
Status

Click appointment to open details.

Actions:

Confirm
Cancel
Complete
Reschedule where supported

Do not rely exclusively on ambiguous icon-only controls.

Use text labels and accessible tooltips.

Destructive actions must have confirmation.

==================================================
PHASE 36 — BATCH / COURSE MANAGEMENT
==================================================

Create:

Courses
Batches
Students
Schedules

Separate course creation from batch scheduling.

Course:

Title
Description
Price
Instructor
Content
Status

Batch:

Course
Start date
End date
Schedule
Capacity
Students
Status

Do not put unrelated controls into a single huge form.

==================================================
PHASE 37 — CUSTOMER ACCOUNT
==================================================

Create a unified customer workspace if the application already supports authenticated users.

Structure:

My Dashboard

Upcoming Appointment
Past Appointments
Saved Kundlis
Reports
Orders
Downloads
Reviews
Profile

The customer should not need to remember separate tools/pages for information already belonging to them.

==================================================
PHASE 38 — NOTIFICATION SYSTEM
==================================================

Admin notification dropdown should show actionable notifications.

Examples based on real system events:

New appointment
Pending appointment
New order
Payment issue
Low inventory
New review
Content requiring action

Clicking a notification should take the admin to the relevant object.

==================================================
PHASE 39 — GLOBAL ADMIN SEARCH
==================================================

Add one admin search experience.

Search:

Customers
Orders
Appointments
Products
Kundlis
Articles
Courses
Other actual entities

Use grouped results.

Do not create fake search results.

==================================================
PHASE 40 — CONTENT MANAGEMENT
==================================================

Create a unified CMS area.

Content:

Pages
Blog posts
Horoscopes
Transits
Numerology content
FAQs
Testimonials
FEAN content
Media

Editors should support where relevant:

Title
Slug
SEO title
Meta description
Cover image
Author
Category
Content
Related content
Publish state
Preview
Save draft
Publish

Preserve existing data.

==================================================
PHASE 41 — ROLE & PERMISSIONS
==================================================

If the current backend supports roles or can safely be extended, structure admin access around roles.

Possible roles:

Owner
Admin
Content Manager
Appointment Manager
Shop Manager
Accountant

Never remove existing permissions accidentally.

Do not assume every role should have access to customer PII or financial information.

==================================================
PHASE 42 — SEARCH ENGINE / SEO CONSIDERATIONS
==================================================

The redesign must preserve SEO.

Do NOT blindly flatten routes.

Maintain relevant canonical URLs where practical.

Preserve:

Page titles
Meta descriptions
Structured content
Internal links
SEO-friendly dynamic routes
Indexable text
Semantic headings

When changing URLs is necessary:

Implement redirects.

Do not sacrifice SEO architecture for frontend aesthetics.

==================================================
PHASE 43 — RESPONSIVE DESIGN
==================================================

Do not simply shrink desktop layouts.

Design explicitly for:

Desktop
Tablet
Mobile

--------------------------------------------------
PUBLIC MOBILE
--------------------------------------------------

Compact header:

Logo
Menu

Persistent bottom CTA when appropriate:

Book Consultation

Horizontal scrolling selectors for:

Zodiac
Tools
Categories

Cards should stack naturally.

Forms must become mobile-friendly.

--------------------------------------------------
ADMIN MOBILE
--------------------------------------------------

Sidebar collapses.

Tables should become cards.

Do not force horizontally overflowing desktop tables unless there is a strong reason.

Example:

Order card:

Order ID
Customer
Items
Amount
Status
Date

View Order

==================================================
PHASE 44 — ACCESSIBILITY
==================================================

Implement accessibility throughout.

Requirements:

Semantic HTML
Correct heading hierarchy
Keyboard navigation
Visible focus states
Accessible modals
Accessible dropdowns
Accessible forms
Proper labels
Error association
ARIA only where needed
Adequate contrast
Touch-friendly controls
No color-only meaning
Accessible status badges
Accessible tables
Screen-reader-friendly icon buttons
Descriptive image alt text

==================================================
PHASE 45 — FORMS
==================================================

Standardize all form UX.

Pattern:

Label
Helper text if necessary
Input
Validation
Error
Success where applicable

Do not rely on placeholders as labels.

Validation should happen at sensible moments.

Error messages must explain:

What is wrong
How to fix it

Avoid generic:

"Invalid input"

Prefer:

"Enter a valid 10-digit phone number."

==================================================
PHASE 46 — LOADING STATES
==================================================

Every async feature needs:

Loading
Success
Empty
Error

Do not leave users staring at raw text such as:

"Loading packages..."

Use skeletons for content loading.

Example:

Appointment service card skeleton
Appointment slot skeleton
Table row skeleton
Dashboard KPI skeleton

==================================================
PHASE 47 — EMPTY STATES
==================================================

Create intentional empty states.

Examples:

No appointments
No orders
No products
No reviews
No saved Kundlis
No reports
No blog content
No batches

Each should include:

Clear explanation
Relevant icon/visual
Helpful CTA

Never show a blank screen or empty table with no explanation.

==================================================
PHASE 48 — ERROR STATES
==================================================

Create consistent error components.

Example:

"Something went wrong while loading appointments."

Actions:

Retry

If useful:

Contact support

Do not expose technical errors to normal users.

==================================================
PHASE 49 — CONFIRMATIONS
==================================================

Use confirmation dialogs for destructive actions:

Delete product
Delete appointment type
Cancel appointment
Delete batch
Delete article
Delete customer data
Other destructive operations

Dialog must clearly identify the object affected.

Buttons:

Cancel
Confirm Delete

Do not use vague buttons such as "Yes."

==================================================
PHASE 50 — TABLE UX
==================================================

All admin tables need:

Search
Filters
Sorting where useful
Pagination
Rows per page
Loading
Empty state
Error state
Hover/focus state
Responsive behavior

Use sticky headers for long tables where appropriate.

Do not show every possible field in the table.

Prioritize the information necessary for scanning.

==================================================
PHASE 51 — MODALS AND DRAWERS
==================================================

Use drawers for quick-detail operations such as:

Order details
Appointment details
Customer details

Use full pages for complex editing workflows.

Do not put massive forms inside tiny modal windows.

==================================================
PHASE 52 — CARD SYSTEM
==================================================

Reduce nested cards.

Avoid:

Page
→ Card
→ Inner Card
→ Colored Card
→ Content Card

Prefer:

Page
→ Section
→ Surface

Use borders/shadows intentionally.

==================================================
PHASE 53 — CTA SYSTEM
==================================================

Standardize CTA hierarchy.

Primary:

Book Consultation

Secondary:

Explore Free Tools

Tertiary:

Learn More →

Destructive:

Delete / Cancel

Do not style every link as an equally important button.

==================================================
PHASE 54 — CONTENT STRUCTURE
==================================================

Reduce extremely long paragraphs.

Use:

Short paragraphs
Bullets
Cards
Tables
Accordion sections
Tabs
Callout boxes

For long educational pages, add:

Sticky table of contents
Anchor links
Back-to-top
Related content

==================================================
PHASE 55 — TERMINOLOGY STANDARDIZATION
==================================================

Audit terminology across the entire app.

Normalize:

Book Consultation
Book Appointment

Choose one and use it consistently.

Normalize:

Shop
Our Shop
Occult Shop

Normalize:

Batches
Study Batches

Normalize:

Yearly Horoscope
Half Yearly Horoscope

Normalize other inconsistent terms discovered in the codebase.

Do not rename business concepts arbitrarily if database/API compatibility would be affected.

Use a UI label layer where necessary.

==================================================
PHASE 56 — DATA / CONTENT QUALITY AUDIT
==================================================

Search the entire project for:

Duplicate content
Repeated sections
Broken links
Placeholder text
"N/A"
"Unknown"
Incorrect grammar
Inconsistent names
Duplicate components
Unused routes
Empty pages
Incorrect status messages
Coming Soon labels on active features
Dead CTAs
Mismatched page titles
Incorrect metadata
Incorrect breadcrumb labels

Examples already observed in the current product include:

"Unknown"
"N/A"
in appointment/order displays

These should be handled intelligently in UI.

Do not display raw database null values.

Instead:

Customer information unavailable

or hide the field if appropriate.

==================================================
PHASE 57 — VISUAL CONSISTENCY AUDIT
==================================================

Audit every page for:

Spacing consistency
Heading consistency
Button consistency
Icon sizing
Border radius
Card styles
Typography
Color usage
Alignment
Container width
Section spacing
Image ratios
Form spacing
Table density

Create reusable components rather than duplicating CSS/markup.

==================================================
PHASE 58 — PERFORMANCE UX
==================================================

Do not add unnecessary animation.

Animations should be:

Fast
Subtle
Purposeful
Accessible

Prioritize:

Perceived loading speed
Lazy loading for appropriate images
Optimized images
Stable layouts
Avoid layout shifts
Efficient rendering
Skeleton states

Do not sacrifice performance for decorative animation.

==================================================
PHASE 59 — TRUST / PROFESSIONAL EXPERIENCE
==================================================

The site represents astrology/numerology/tarot/graphology services.

The UI should feel trustworthy and professional.

Avoid exaggerated visual patterns.

Avoid unsupported claims.

Where content describes traditional interpretations, distinguish those from empirically established scientific claims where relevant.

Do not invent credentials, testimonials, statistics, scientific validation, customer counts, reviews or business claims.

==================================================
PHASE 60 — USER JOURNEY PRIORITIES
==================================================

Primary customer journeys:

JOURNEY A:
Visitor → Understand business → Book consultation

JOURNEY B:
Visitor → Find free tool → Enter details → Get result → Save/share → Explore consultation

JOURNEY C:
Visitor → Find horoscope → Read → Explore related content

JOURNEY D:
Visitor → Read article → Explore tool → Book consultation

JOURNEY E:
Customer → Login → Manage appointments/reports/orders

Ensure all of these are easy to complete.

==================================================
PHASE 61 — ADMIN JOURNEY PRIORITIES
==================================================

Admin journeys:

Admin → Dashboard → See action items

Admin → Appointment → Confirm/cancel/manage

Admin → Availability → Modify slots

Admin → Product → Create/edit product

Admin → Order → Review/process

Admin → Inventory → Adjust stock

Admin → Customer → View history

Admin → Content → Publish/update content

Admin → Revenue → Analyze/export

The interface should optimize for speed and clarity.

==================================================
PHASE 62 — DESIGN PRIORITY
==================================================

Prioritize changes in this order:

P0 — Critical UX / architecture issues

1. Public navigation
2. Admin navigation
3. Appointment booking flow
4. Admin appointment management
5. Shop product/order separation
6. Admin dashboard action visibility
7. Duplicate content removal
8. Broken/inconsistent availability messaging
9. Naming consistency
10. Major mobile usability problems
11. Forms and loading/error/empty states

P1 — Major experience improvements

1. Free Tools hub
2. Horoscope hub
3. Calculator result UX
4. Service-page templates
5. Expert directory
6. Revenue analytics
7. Blog hub
8. Customer dashboard
9. Search
10. Notification UX
11. Design system

P2 — Refinement

1. Advanced accessibility
2. Advanced filters
3. Advanced permissions
4. Micro-interactions
5. Animation
6. Advanced analytics
7. Additional personalization

==================================================
PHASE 63 — DO NOT BREAK EXISTING FUNCTIONALITY
==================================================

CRITICAL:

Before making changes, inspect:

Routing
Authentication
Authorization
APIs
Database schemas
State management
Payment system
Appointment logic
Shop logic
File/image uploads
Form submissions
Email integrations
WhatsApp integrations
CSV exports
Dynamic content
SEO routes

Do not rewrite backend functionality unnecessarily.

Do not remove existing useful data.

Do not hardcode data that currently comes from the database/API.

Do not replace dynamic content with mock data.

Do not create fake functionality.

==================================================
PHASE 64 — COMPONENT ARCHITECTURE
==================================================

Refactor repeated UI into reusable components.

Possible shared components:

PublicHeader
AdminHeader
AdminSidebar
Footer
Breadcrumb
PageHeader
SectionHeader
PrimaryButton
SecondaryButton
StatusBadge
KpiCard
ServiceCard
ToolCard
ExpertCard
ArticleCard
TestimonialCard
FormField
DatePicker
TimePicker
SearchInput
FilterBar
DataTable
MobileDataCard
EmptyState
ErrorState
LoadingSkeleton
ConfirmDialog
DetailDrawer
Pagination
Toast
Modal
Tabs
Accordion
ZodiacSelector
CalculatorShell
ResultCard
BookingStepper

Use data-driven rendering whenever appropriate.

==================================================
PHASE 65 — CODE QUALITY
==================================================

Keep the implementation maintainable.

Avoid:

Huge monolithic components
Repeated markup
Repeated styles
Inline magic numbers
Hardcoded UI strings where localization might be needed
Duplicated pages
Duplicated calculator logic
Duplicated horoscope templates

Prefer:

Reusable components
Typed data models where applicable
Central design tokens
Central validation
Shared state where appropriate
Shared route metadata
Reusable page templates

==================================================
PHASE 66 — RESPONSIVE QA
==================================================

Test all redesigned pages at:

Desktop 1440px+
Laptop 1280px
Tablet 768px
Mobile 390px
Mobile 360px

Check:

No horizontal overflow
No clipped content
No inaccessible dropdowns
No tiny buttons
No unreadable tables
No overlapping elements
No broken grids
No excessive scroll traps

==================================================
PHASE 67 — ACCESSIBILITY QA
==================================================

Test:

Keyboard-only navigation
Tab order
Focus states
Screen-reader labels
Contrast
Forms
Modals
Dropdowns
Tables
Error states

Do not rely on visual inspection alone.

==================================================
PHASE 68 — FINAL PAGE-BY-PAGE QA
==================================================

After implementation, systematically visit every route.

For each route verify:

Page loads
Navigation works
Back navigation works
Breadcrumb works
Primary CTA works
Secondary CTA works
Forms submit
Validation works
Loading works
Empty state works
Error state works
Mobile works
Desktop works
Images load
Links work
Buttons work
No console errors
No runtime errors
No broken API calls
No duplicate sections
No placeholder data
No accidental regressions

==================================================
PHASE 69 — FINAL DELIVERABLE
==================================================

At the end of implementation, provide a detailed implementation report.

Report:

1. All routes audited
2. Routes changed
3. Components created
4. Components refactored
5. Navigation changes
6. Public UX improvements
7. Admin UX improvements
8. Appointment improvements
9. Shop improvements
10. Calculator improvements
11. Horoscope improvements
12. Content improvements
13. Accessibility improvements
14. Responsive improvements
15. Performance improvements
16. SEO considerations
17. Bugs discovered
18. Bugs fixed
19. Remaining issues
20. Testing performed

For every major change provide:

PROBLEM
CURRENT BEHAVIOR
NEW BEHAVIOR
WHY IT IS BETTER
FILES/COMPONENTS CHANGED

==================================================
FINAL IMPLEMENTATION PRINCIPLES
==================================================

Follow these principles throughout the redesign:

1. Simplify before adding.
2. User intent comes before database structure.
3. Public UX and admin UX are different products.
4. Every page needs a clear primary purpose.
5. Every page needs a clear primary CTA.
6. Do not overload users with information.
7. Use progressive disclosure for educational content.
8. Use consistent reusable components.
9. Keep the visual system restrained.
10. Treat mobile as a first-class experience.
11. Never expose raw null/placeholder data to customers.
12. Never show broken/empty sections without explanation.
13. Never use unclear icon-only destructive actions.
14. Do not duplicate content.
15. Do not break existing functionality.
16. Do not invent business data.
17. Do not invent credentials or testimonials.
18. Preserve SEO.
19. Preserve actual routes where practical.
20. Use real data from the existing backend.
21. Improve usability before decorative styling.
22. Keep animations subtle.
23. Make important tasks obvious.
24. Make admin workflows fast.
25. Make customer workflows simple.
26. Make the system feel like one cohesive product.

==================================================
MOST IMPORTANT END STATE
==================================================

The finished OM Astrology AMC product should feel like:

A premium, modern, trustworthy astrology/wellness platform on the customer side

AND

A clean, efficient, modern SaaS operations platform on the admin side.

The final result should NOT feel like:

- a collection of unrelated pages
- a generic template
- a dashboard made of random cards
- an oversized article website
- a desktop UI squeezed onto mobile
- a public website navigation reused for admin
- a collection of duplicated calculators

Instead it should feel like one intentional product with:

Clear navigation
Clear hierarchy
Clear journeys
Strong visual consistency
Fast workflows
Professional admin operations
Accessible forms
Excellent responsive behavior
Reusable architecture
Clean content organization
Strong conversion paths
Reliable states
Consistent terminology

DO NOT stop after redesigning the homepage.

The task is specifically to inspect and improve EVERY PAGE and EVERY SECTION of the existing application.

Work systematically through the entire application until the complete public and admin experience has been audited, redesigned, implemented, and tested.

First, DO NOT start coding.

Perform a complete codebase and route audit first.

Give me:

1. Complete route inventory
2. Current component architecture
3. Current navigation architecture
4. Database/API dependencies
5. All existing pages
6. All admin pages
7. All major UX problems found
8. Proposed new information architecture
9. Proposed component/design-system architecture
10. Migration plan ordered P0 → P1 → P2

Do not modify files during this audit phase.

After I approve the audit, implement the redesign incrementally without breaking existing functionality.