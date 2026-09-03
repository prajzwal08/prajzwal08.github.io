# prajzwal08.github.io

Personal academic site. Plain HTML and CSS with one small script, no build step,
no Jekyll. GitHub Pages serves it as-is.

## Getting it online

1. Create a repository named exactly `prajzwal08.github.io` (your username, then
   `.github.io`). The name is what makes Pages serve it at the root domain.
2. Push this folder to `main`.
3. In the repository: Settings, then Pages, then set Source to "Deploy from a
   branch", branch `main`, folder `/ (root)`.
4. Wait a minute or two. The site appears at `https://prajzwal08.github.io`.

To preview locally, from inside the folder:

    python3 -m http.server 8000

then open `http://localhost:8000`. Use a server rather than opening the file
directly, because the publications page fetches a JSON file and browsers block
that on `file://` URLs.

## Files

    index.html              About, with portrait
    projects.html           Selected projects, with photos
    publications.html       Rendered from data/publications.json
    education.html          Education, awards, teaching
    experience.html         Work experience
    contact.html            Contact details
    assets/style.css        All styling
    assets/site.js          Renders the publication list
    assets/photo.jpg        Portrait shown on the About page
    data/publications.json  The publication list itself
    images/                 Project photos go here
    Prajwal_Khanal_CV.pdf   CV, linked from the contact page

## Adding a project

Open `projects.html`. Each project is one `<article class="record">` block.
Copy an existing block, paste it below, and edit the text. The comment at the
top of the section says the same thing.

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
and add a `"note"` field to get the small label. Write your own name exactly as
`Khanal, P.` so the page bolds it.

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

Open `experience.html`. Same pattern as the projects page: each position is one
`<div class="record">` block. Copy one, paste it, edit the text. Newest first.

## Typography

The standard system UI font on whatever device is viewing: San Francisco on
Apple, Segoe UI on Windows, Roboto on Android. Nothing is downloaded, so the
page renders immediately with no font flash. To change it, edit `--type` in
`assets/style.css` — it is the only place a font is named.

Email addresses on the contact page are written as `name [at] domain` rather
than as `mailto:` links, so that address-harvesting bots cannot lift them.

See [TODO.md](TODO.md) for the running list of things to change, decisions to
check, and how to publish an update.

## Still to fill in

- The bullet points under each project in `projects.html`, and the photos.

`Prajwal_Khanal_CV.pdf` is the published CV, exported from the .docx with the
phone number removed. The source `Prajwal_Khanal_resume.docx` is gitignored, so
it stays local and is never published.

When you update the CV: edit the .docx, then export a PDF **with the phone
number deleted from the header line**, and overwrite `Prajwal_Khanal_CV.pdf`.
The email addresses still appear in the PDF as plain text; the contact page
obfuscates them, the PDF does not.
