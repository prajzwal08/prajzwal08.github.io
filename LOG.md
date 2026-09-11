# Log

What changed, and why. Newest first. Named `LOG.md` to sit beside `README.md`
and `TODO.md`; `git log` has the same story in more detail.

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
