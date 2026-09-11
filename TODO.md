# Things to change later

Written 3 September 2026. Tick these off as you go.

## Content you said you would write yourself

- [ ] **Projects section has one entry.** The markup pattern is in an HTML
      comment at the end of the section in `index.html` — copy it out and edit.
      Newest project first.
- [ ] **Project photos.** Put image files in `images/`, then uncomment the
      `<figure class="project-shot">` block in a project entry and point `src`
      at your file. Resize anything wider than about 1600 px first; the layout
      cannot use more than that and large files slow the page down. On one long
      page this matters more than it did: every visitor now downloads every
      image, not just the ones on the page they opened.

## Decisions I made that you should check

- [ ] **Co-authored papers on the Publications page.** Google Scholar lists
      three papers where you are a middle author (Moutahir et al. 2026,
      Zeng et al. 2025 in *Computers & Geosciences*, and Bhattarai et al. 2019).
      I included them. Delete any you would rather not show from
      `data/publications.json`.
- [ ] **Babai paper authorship.** Your CV lists it as `Khanal, P., et al.
      (2020)`. Scholar lists it as `Bhattarai, P., Khanal, P., et al. (2019)`
      with pages 32–44. I used Scholar's version on the website. Confirm which
      is right, and fix the CV if Scholar is correct.
- [ ] **Biogeosciences page range.** Your CV says 1533–1548; Scholar says
      1533–1547. The website currently says 21(6), 1533-1547. Check the paper.
- [ ] **Firm name.** I left it exactly as you wrote it: "Executive Consulting
      Engineering and Planner (ECEP)". If it is really "Engineers and Planners",
      change it in `index.html` and in the CV.
- [ ] **ECEP location differs between site and CV.** The website says
      "Lazimpat, Kathmandu, Nepal"; the CV says "Kathmandu, Nepal" because the
      full version overflowed the line and collided with the date. Pick one and
      make them match.
- [ ] **ECEP dates differ too.** Website: "Dec 2018 – Dec 2022". CV:
      "2018 – 2022", shortened for the same line-length reason.
- [ ] **Work experience order.** Max Planck is first because you asked for it,
      but it is not strictly newest-first: the TUM position ran to Mar 2022 and
      ECEP to Dec 2022. Fine if you are ordering by importance — just be aware.

## Loose ends

- [ ] **Commit author email.** Commits are authored as
      `ktm.prajwalkhanal@gmail.com`. If your GitHub account uses a different
      address, the commits will not show as yours on your profile. To change it:

          git config user.email "your-github-email"

      Past commits would need rewriting; ask me if you want that done.
- [ ] **Decide what happens to the .docx CV.** `cv/cv.tex` is the CV now, and
      it already carries `prajwalkhanal.earth`. `Prajwal_Khanal_resume.docx` is
      gitignored and still on your machine, with the old `prajzwal08.github.io`
      in its header. Keep it as an archive or delete it, but editing it will not
      change anything that is published.
- [ ] **Update the URL elsewhere.** LinkedIn, ORCID, email signature, and
      anywhere a paper or application already lists the site.
      `prajzwal08.github.io` keeps working and redirects, but only while the
      domain is registered and the repository stays in place.
- [ ] **Footer date.** Every page ends with "Last updated September 2026".
      Update it when you make a real change, or delete the line.
- [ ] **Emails in the CV PDF.** The contact section writes addresses as
      `name [at] domain` so bots cannot harvest them. `cv/cv.pdf` has them as
      plain, selectable text, and as `mailto:` links. There is no phone number
      in it at all, which is one thing the .docx needed watching for.
- [ ] **Register an ORCID.** Journals increasingly ask for one at submission.
      It also has a free API that sends CORS headers, so unlike Google Scholar
      the page could fetch it live with no key and no scraping. Tell me your ID
      and I will wire it up.

## Deliberately left out

Say the word if you want any of these after all.

- Google Scholar scraping. Scholar has no API and blocks browser requests. A
  `scholarly` script is possible but breaks often, and must never run in a
  GitHub Action — Scholar CAPTCHAs datacenter IPs and the job fails silently.
- Your MSc thesis and the EGUsphere preprint duplicates, both of which appear
  on your Scholar profile.
- Teaching roles on the About page. They are on the Education page under
  "Teaching"; duplicating them weakens both.

## How to make a change

1. Edit the file.
2. Check it locally:

        cd ~/resume
        python3 -m http.server 8000

   then open <http://localhost:8000>. Use a server, not the file directly —
   the publications page fetches JSON and browsers block that on `file://`.
3. Publish:

        git add -A
        git commit -m "what you changed"
        git push

4. Wait about a minute, then check <https://prajwalkhanal.earth>.

If the live site looks unchanged, it is almost always browser cache. Open it in
a private window, or run `curl -s https://prajwalkhanal.earth/assets/style.css`
to see what the server is really sending.

## Updating the CV

Edit `cv/cv.tex`, then:

    cd cv
    pdflatex cv.tex
    pdfinfo cv.pdf | grep Pages

It is meant to be one page and it fits with nothing to spare, so check the page
count after every edit. `cv/README.md` explains which lengths to reach for when
it spills.

There is no phone number in it, so nothing has to be stripped before publishing.
