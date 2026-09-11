# prajwalkhanal.earth

Personal academic site. Plain HTML and CSS with one small script, no build step,
no Jekyll. GitHub Pages serves it as-is.

Live at <https://prajwalkhanal.earth>. The repository is
`prajzwal08/prajzwal08.github.io`; the domain is what visitors see, so the
repository name no longer matters.

## Getting it online

1. Push this folder to `main`.
2. In the repository: Settings, then Pages, then set Source to "Deploy from a
   branch", branch `main`, folder `/ (root)`.
3. Wait a minute or two.

## The custom domain

`CNAME` holds the domain, and GitHub reads it on every push — that file *is* the
custom-domain setting, so do not delete it. If it goes missing the site falls
back to `https://prajzwal08.github.io` and the domain stops working.

DNS at the registrar points `prajwalkhanal.earth` at GitHub: four `A` records to
`185.199.108-111.153`, four `AAAA` records to `2606:50c0:800{0,1,2,3}::153`, and
a `CNAME` on `www` to `prajzwal08.github.io`.

Renew the domain. If it lapses, the site goes down and the name can be taken by
someone else — auto-renew should be on at the registrar.

The GitHub username stays `prajzwal08`, so links to the profile and to other
repositories are unchanged. `prajwalkhanal` on GitHub belongs to an unrelated
account and cannot be claimed, which is why the site uses a domain instead.

To preview locally, from inside the folder:

    python3 -m http.server 8000

then open `http://localhost:8000`. Use a server rather than opening the file
directly, because the publications section fetches a JSON file and browsers
block that on `file://` URLs.

## Files

    index.html              The whole site: every section, one page
    assets/style.css        All styling
    assets/site.js          Publication list, and the nav highlighting
    assets/photo.jpg        Portrait shown on the About page
    data/publications.json  The publication list itself
    images/                 Project photos go here
    Prajwal_Khanal_CV.pdf   CV, linked from the contact page

## One page, not six

Everything lives in `index.html`: About, Experience, Education, Awards,
Teaching, Publications, Projects, Contact, in that order. The nav does not load
pages — each link is an anchor to a `<section id="...">` further down, and the
bar sticks to the top of the window as you scroll.

To add a section: give it an `id`, and add `data-nav` if it should get its own
nav link. `data-nav` is what `assets/site.js` watches to decide which link to
mark as you scroll, which is why Awards and Teaching do not carry it — they
belong under Education and share its link.

On a phone the nav becomes a single row you swipe sideways, rather than
wrapping onto two lines and changing the height of the sticky bar.

## Adding a project

Find the Projects section in `index.html`. Each project is one
`<div class="record">` block. Copy an existing block, paste it below, and edit
the text. The comment at the end of the section says the same thing.

To add a photo: drop the image file into `images/`, then uncomment the
`<figure class="project-shot">` block and point `src` at your file.

    <figure class="project-shot">
      <img src="images/flux-tower.jpg" alt="Describe what the photo shows">
      <figcaption>One line of context.</figcaption>
    </figure>

Keep the `alt` text meaningful: it is what a screen reader announces, and what
shows if the image fails to load. Any part of a block you do not need (the
figure, the highlights list, the links line) can simply be deleted.

Large photos slow the page down. Anything over about 1600 px wide is more than
the layout can use, so resize before committing.

## Updating publications

Edit `data/publications.json` and push. Each entry looks like this:

    {
      "status": "published",
      "year": "2024",
      "authors": "Khanal, P., et al.",
      "title": "...",
      "venue": "Biogeosciences, 21(6), 1533-1547",
      "doi": "https://doi.org/..."
    }

`status` is `published`, `review`, or `conference`, and decides which heading
the entry appears under. For work under review, leave `year` and `venue` empty
and add a `"note"` field to get the small label.

Each paper is one line, so only the lead author is shown: the first surname in
`authors`, plus "et al." when there are more. It is set in bold when that lead
author is you, which is how first-author work is distinguished from papers you
appear in the middle of. Write your own name exactly as `Khanal, P.` for that
to work. The `venue` string is cut at its first comma, so keep the journal or
conference name first and the volume and pages after it.

The current list was reconciled against your Google Scholar profile
(`UtzNqTwAAAAJ`) in September 2026, taking Scholar's metadata where it differed
from the CV. It includes the co-authored papers Scholar lists but the CV did
not; delete any you would rather not show.

## Why the list is not pulled from Scholar automatically

Scholar has no public API, and it sends no CORS headers, so a browser on your
site cannot fetch from it: the request fails before it starts. Anything claiming
to be a live Scholar feed is either a paid third-party proxy or a scraper that
will break.

Hand-editing the JSON a few times a year takes two minutes and never breaks. A
`scholarly`-based scraper is possible but not worth it, and it must never go in
a GitHub Action: Scholar blocks datacenter IP ranges, so a scheduled run from a
CI runner gets a CAPTCHA and fails, usually silently.

**ORCID** is the better long-term answer. It has a free, documented API that
does send CORS headers, so the page could fetch it live with no key and no
scraping:

    https://pub.orcid.org/v3.0/YOUR-ORCID-ID/works

The catch is that ORCID only contains what you put there, so you would be
maintaining that list instead of this one. Worth doing anyway, since journals
increasingly ask for an ORCID at submission.

## Adding a position

Find the Experience section in `index.html`. Same pattern as the projects
section: each position is one `<div class="record">` block. Copy one, paste it,
edit the text. Newest first.

## Typography

Rockwell, a slab serif that arrives with MS Office, so it reaches Apple and
Windows machines alike rather than Apple alone. It is not a web font and is not
downloaded, so the page renders immediately with no font flash. Anything
without Office falls through to American Typewriter (Apple), then Bookman, then
Georgia — so a plain Android phone sees a normal serif, not a slab.

If you want the slab on every device, the fix is a web font: add a Google Fonts
link and put Bitter or Zilla Slab at the front of the stack. That costs a
download and a possible flash of fallback text on the first visit, which is the
trade you are making.

To change any of this, edit `--type` in `assets/style.css` — it is the only
place a font is named.

Note that the CV PDF is still set in Times New Roman. The site and the CV used
to share a face deliberately; now only the blue ties them together. Either
reset the CV in a typewriter face too, or accept that they differ.

Email addresses on the contact page are written as `name [at] domain` rather
than as `mailto:` links, so that address-harvesting bots cannot lift them.

See [TODO.md](TODO.md) for the running list of things to change, decisions to
check, and how to publish an update.

## Still to fill in

- The bullet points under each project in the Projects section, and the photos.

`Prajwal_Khanal_CV.pdf` is the published CV, exported from the .docx with the
phone number removed. The source `Prajwal_Khanal_resume.docx` is gitignored, so
it stays local and is never published.

When you update the CV: edit the .docx, then export a PDF **with the phone
number deleted from the header line**, and overwrite `Prajwal_Khanal_CV.pdf`.
The email addresses still appear in the PDF as plain text; the contact page
obfuscates them, the PDF does not.
