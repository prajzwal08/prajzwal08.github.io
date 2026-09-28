# Log

What changed, and why. Newest first. Named `LOG.md` to sit beside `README.md`
and `TODO.md`; `git log` has the same story in more detail.

## 28 September 2026 — Volunteering, freelance and lecturer dates, impact numbers

- **WUNDER** now reads "Prediction of field-scale soil moisture, water and carbon
  fluxes for vegetation monitoring in the Netherlands", on the CV and the site.
- **Scholarships**: Deutschlandstipendium dated 2021 – 2022 (was 2021/22). To make
  room for the longer WUNDER line, the IOE rank ("8th of 9048 in the entrance exam")
  moved from its own bullet onto the scholarship line.
- **Max Planck**: "Studied…" → "Published a study on…".
- **Jena-Geos**: the tool is now said to be for small-scale enterprises.
- **Freelance (ECEP)**: full name spelled out. Now **Apr 2020 – Dec 2020** (was
  Dec 2018 – Dec 2022). One bullet: drafted the business plan for the Khalanga Water
  Supply Project, about 1,500 households, for the Department of Water Supply and
  Sanitation. The Lumbini master-plan bullet is gone.
- **Cosmos assistant lecturer**: now **Apr 2020 – Dec 2020**, the same nine months.
- **New Volunteering section**: YHS-NL member since Nov 2023, and organiser of the
  2025 symposium at ITC (10 speakers, six universities). President of the Nepal
  Students' Union, Pulchowk Campus Unit, Dec 2017 – Nov 2018, and organiser of the
  2018 national civil engineering exhibition (about 10,000 visitors).
- **Keeping the CV to one page** (the spacing macros were left alone): the Cosmos
  bullets were merged, Modelling and Programming now share one line, "(GEE)",
  "Kathmandu, Nepal" after ECEP and "Preprint on SSRN" were dropped, and the Jena-Geos
  bullet lost its list of sectors. The site keeps the longer wording.

## 27 September 2026 — verb-first bullets, links, Skills, and a page paid for

### Every achievement now starts with a verb

Several bullets opened with a noun phrase — "Excel/VBA tool for…", "Business
plans for…", "Flood inundation maps for…" — which read as a list of nouns rather
than as things done. They now open with **Studied, Prepared, Developed,
Created**, on the CV and on the site both. Two of the freelance bullets on the
site already did, and were left alone.

### The PhD project description was wrong

WUNDER was described as "agricultural drought monitoring". It is **vegetation
monitoring in the Netherlands**, and both documents now say so.

### Two things that should have been clickable

**The MSc thesis.** It has been public on the Max Planck repository all along
and nothing linked to it. Now linked from the MSc entry in Education, on the CV
and on the site.

The link is the **permanent handle**,
`hdl.handle.net/21.11116/0000-000B-6895-8`, not the
`pure.mpg.de/rest/items/item_3473258_2/component/file_3473259/content` URL that
was to hand. That URL is a direct 12.6 MB PDF with an internal version
number and file number baked into the path; the handle is the item's `objectPid`
and survives MPG reorganising its storage. It 302s to the item's landing page.

The wording is the **registered** title, "Role of surface and sub-surface soil
moisture for vegetation functioning", rather than a paraphrase, so the text
matches the document a reader lands on. Confirmed against MPG's REST API:
`genre: THESIS`, `degree: MASTER`, Technical University of Munich, 29 October
2022, file `BGC22006.pdf`. The CV's version of the line dropped
"in *Biogeosciences*", because the paper is a separate linked entry under
Publications and the thesis and the paper are now two clickable things rather
than one sentence mentioning both. The site keeps "which became the 2024
*Biogeosciences* paper", because the site has room to say they are the same
work.

**The Max Planck internship.** Its bullet described the work that became the
2024 *Biogeosciences* paper without linking to it. It does now — wrapped around
the descriptive text on the CV, and around "published in *Biogeosciences*" on
the site.

The link is the **DOI**, `doi.org/10.5194/bg-21-1533-2024`, not the
`bg.copernicus.org/articles/21/1533/2024/` URL that was to hand. The DOI 302s
to exactly that URL, and it matches how the other nine papers on the page are
linked. One form of paper link on the document, not two.

### Skills is now a list you wrote

The `% CHECK THIS` comment at the top of the section is gone, and so is the
`TODO.md` item behind it. The Modelling and Programming lines had been inferred
from the work described elsewhere on the page; they are now what you dictated:

    Modelling:    HEC-RAS, SWAT, HEC-HMS, GIS
    Programming:  Python, R, HPC (SLURM)

`STEMMUS-SCOPE`, `land surface models`, `PyTorch` and `Excel/VBA` came out.
**That is worth a second look and it is in `TODO.md` as such**: you were told at
the point of choosing and chose it anyway, so it stands — but the page still
carries a STEMMUS-SCOPE paper, a deep-learning paper in review, a deep-learning
conference talk and a machine-learning hackathon placing, none of which Skills
now claims. Someone who skims Skills first will read you as a hydraulic
modeller. Excel/VBA is also still described in the Jena-Geos bullet directly
above it.

Two cosmetic drifts between the site and the CV died with those terms: the site
had written `STEMMUS–SCOPE` with an en-dash against the CV's hyphen, and
`Excel and VBA` against the CV's `Excel/VBA`.

### The WUNDER data viewer

Described as what it is rather than what it reads: "Created a small dashboard
for the food forest farmers to monitor their fields." The site keeps the loggers
and the drought clause after it; the CV does not have the room.

### The rewrite above cost nothing

Worth recording, because `cv/README.md` says the slack is spent and that the
next thing added has to be paid for by cutting something. For the rewrite
described so far, nothing had to be cut. Six `\detail` lines got longer and the
MSc line grew by sixteen characters, but Skills and the Software bullet both got
**shorter**, which paid for it. Still `Pages: 1`.

That held until the Cosmos College teaching line later the same day — see
*the one-page budget finally being paid*, below, which is where the 2019
conference abstract went.

### Two smaller corrections, same day

The BSc thesis line read "Thesis: flood inundation mapping of Babai River" with
a lowercase f, directly under an MSc line that now reads "Thesis: Role of
surface and sub-surface…". **Capitalised**, and the site's BSc bullet was
changed from "Thesis on flood inundation mapping…" to "Thesis: Flood inundation
mapping…" so the two degrees read the same way on both documents.

The hackathon bullet said "Quantization in foundation models". It was
**Quantization technique in geo foundation model** — a geo foundation model
specifically, which is the part that connects the placing to the rest of the
page. The site says "a quantization technique in a geo foundation model", with
the articles the CV has no room for.

### The Cosmos College teaching, and the one-page budget finally being paid

The Cosmos College entry said only "Elective: Python and GIS for water
resources". It is now two lines on both documents — **Assisted** students in
solving numerical problems in Fluid Mechanics and Hydraulics, and **Designed and
taught** a course on Python and GIS for water resource management. The designing
matters as much as the teaching, so both verbs are in the line. The site says
"an elective" rather than "a course", which is the more specific word and was
already there; the tutorials clause it used to carry is now a bullet of its own
rather than a trailing "and ran tutorials for…".

`Google Earth Engine (GEE)` was added to the Programming line, after the Skills
rewrite above. It cost nothing — that line is short now.

**This is where the one-page budget finally came due.** The second teaching line
pushed the CV to two pages, with exactly the `Languages:` line spilling over.
Paid for as `cv/README.md` said to: the **2019 conference abstract** —
"Flood inundation mapping: an inference on the outbreak of flood-borne
diseases" — is **cut from the CV**. It was the standing candidate and the
weakest entry on the page. It is untouched on the website and in
`data/publications.json`, so nothing is lost; it just means the CV's
publication list is now a subset of the site's rather than identical to it.
Back to `Pages: 1`.

`cv/README.md` has been updated, because it named that abstract as the thing to
cut and there was no longer anything to cut. It now names the next three
candidates in order.

## 11 September 2026 — the domain, one long page, and a LaTeX CV

### The domain

The site had been at `prajzwal08.github.io`. The plan was to rename the GitHub
account to `prajwalkhanal` and let the URL follow, but that name belongs to an
unrelated account, and GitHub does not release usernames for inactivity — the
only exceptions are trademark claims and ToS violations. So the fix was a
domain instead of a rename.

`prajwalkhanal.com` was taken (registered April 2026). `prajwalkhanal.earth`
was free, costs about the same as `.me`, and reads as deliberate for someone
doing land surface work rather than as a leftover after `.com`.

It is now registered at Porkbun and live. The GitHub **username is unchanged**:
links to `github.com/prajzwal08` and to the repositories under it still work,
and the repository is still `prajzwal08/prajzwal08.github.io`. Only the address
visitors see has changed.

Watch the renewal date. If the domain lapses the site goes down and the name is
free for anyone to take.

### Six pages became one

`education.html`, `publications.html`, `projects.html` and `contact.html` are
gone. Everything is in `index.html`, in reading order, and the nav scrolls the
page instead of loading a new one. `assets/site.js` marks the nav link for
whichever section is on screen.

Anyone still linking to the old page URLs gets a 404. They are recoverable from
git history if that turns out to matter.

### The layout went through several rounds

Wide two-column, then a narrow portrait column, then a full-width document with
a margin either side. It ended at **1.5 inches** of margin on a wide screen,
stepping down to one inch under about 1100px and to `1.35rem` on a phone.

Type went to American Typewriter, then Rockwell, then back to **Times New
Roman** — which is also what keeps the site and the CV looking like one thing.

An animation that faded the opening line in a word at a time was built, slowed
down, then removed entirely at your request. Both the script and the CSS came
out; nothing is left behind.

### A new CV, in LaTeX

`cv/cv.tex`, modelled on the plain-LaTeX academic one-pager you linked. It
replaces the `.docx` export completely: `Prajwal_Khanal_CV.pdf` is deleted, the
contact section links to `cv/cv.pdf`, and `Prajwal_Khanal_resume.docx` is now
an archive that changes nothing when edited.

It is **one page and completely full**. Margins are at 0.45in and
`\linespread` at 0.94, so there is nothing left to tighten — the next thing
added has to be paid for by removing something. `cv/README.md` explains which
lengths to reach for and what to cut first.

Decisions worth remembering:

- The DOI is wrapped around each paper's **title**, not printed as a separate
  "doi" link. It saves a line every few entries.
- Body links are **underlined, not blue**. Nine blue paper titles were most of
  the colour on the page. Blue is now the left-hand section labels and the
  header links only.
- Achievements carry a **dash**, so two of them read as two.
- **Scholarships** is its own section; the Deutschlandstipendium and the IOE
  scholarship are not awards in the sense the hackathon placing is.
- The PhD row was removed from Employment, where it repeated the PhD under
  Education.

### Two mistakes worth recording

**The CV became two files.** The shell's working directory reset to the
repository root several times, so for a stretch every edit landed in a stray
`cv.tex` at the root while `cv/cv.tex` stayed at the first draft. A rebuild in
`cv/` then produced a two-page PDF with old content, which was misread as a
stale viewer cache — twice — before the duplicate was found. Everything is
consolidated in `cv/` now, and edits use absolute paths.

**"Research interest and education overlap"** was read as the *wording*
overlapping, and the line was rewritten twice on that basis. It meant the
labels were physically printing on top of each other in the left column: a
two-line "Research Interests" label had been `\smash`ed to zero height, which
stopped it stretching the content beside it but let it draw over "Education".
The section is now "Interests", the smash is gone, and the label column is wide
enough that nothing wraps. The rewritten line was put back.

### Where the site and the CV are kept in step

The facts match: supervisors, Planet Labs, the scholarship split, the entrance
rank, skills and languages. The **wording deliberately differs** — the CV is
terse because it has to fit one page, and the site has no such constraint.
Change a fact in one, change it in the other.

> **Amended 27 September 2026.** One thing no longer matches: the **publication
> lists**. The 2019 conference abstract was cut from the CV to buy a line, and
> is still on the site and in `data/publications.json`. The CV's list is a
> subset of the site's now, not a copy of it. Everything else above still holds.
