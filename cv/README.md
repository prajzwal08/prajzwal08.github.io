# CV

`cv.tex` is a plain-LaTeX curriculum vitae in the classic academic layout:
small-caps section labels in a left column, content in a right column, dates
right-aligned in italic. No CV class or template package — everything it needs
is defined at the top of the file.

## Building

    pdflatex cv.tex

Once is enough; there is no bibliography and nothing to cross-reference. The
output is `cv.pdf`.

## The pieces

`\entry{title}{detail}{dates}` is one position or degree: the title in bold,
the detail in roman after it, the dates right-aligned. Title and dates sit in
facing minipages rather than being separated by `\hfill`, so a long title wraps
inside its own column instead of pushing the date onto the next line.

`\plainentry{text}{dates}` is the same without the bold, for awards and
teaching, where there is no institution to set apart.

`\detail{...}` is an indented line under an entry. `\pub{...}` is one
publication, and `\subhead{...}` is a heading inside a section.

Dates are written with abbreviated months (`Nov 2020---Dec 2022`). Full month
names in a range are wider than the date column and wrap.

## Two kinds of link

`hyperref` is loaded with `hidelinks`, so it colours nothing by itself. Two
macros decide how a link looks:

`\ulink{url}{text}` is for the body — paper titles, supervisors, software. It
underlines rather than colours, so a reader can see there is something to click
without the page turning blue. The underline is `ulem`'s `\uline` rather than
`\underline`, because a paper title is long and has to be able to break across
lines; `\underline` cannot. `ulem` is loaded `[normalem]` so it leaves `\emph`
alone — the CV uses italic heavily and does not want it underlined.

`\link{url}{text}` is the CV blue, and is used **only in the header**: the
website and the two email addresses. That is the only blue on the page.

The DOI is wrapped around each paper's title rather than printed as a separate
"doi" link. It saves a line every few entries, and the title is what a reader
wants to click.

## The header

Four lines: the name, the website, the two emails, then the institution and
city, so a reader can see where he currently is. GitHub and Google Scholar are
not in it — the website carries both. Add them back into the `center` block if
a reader should not have to go via the site.

## The left column

Section labels are set in the CV blue, in small caps, inside a `\parbox` of
`\cvlabelwidth` (0.95in). That width is chosen so the longest label,
"Scholarships", stays on one line.

Keep every label to one line. A label that wraps to two either stretches the
first line of the content beside it, or — if it is smashed to zero height to
stop that — prints on top of the next section's label. "Research Interests"
did exactly that to "Education", which is why the section is now called
"Interests".

## It fits on one page, and only just

The lengths holding it there are `\topsep` in `cvsection`, plus `\gap`, `\pub`
and `\subhead`, plus `\linespread{0.94}` and the 0.45in margins. After any
edit, check:

    pdfinfo cv.pdf | grep Pages

The slack is spent. Margins and linespread have no more give, so the next
thing that needs room has to be paid for by cutting content rather than by
tightening further. The obvious candidate is the 2019 conference abstract,
the weakest entry on the page.

## Things to keep in step

The **Skills** section was assembled from the work described elsewhere in the
CV rather than from a list Prajwal wrote. Check it before sending the CV
anywhere.

The face is Times (`mathptmx`), matching the website. Delete that one line for
Computer Modern, the default LaTeX look. The blue is `RGB 0,112,192`, the same
blue as the website and the .docx CV.

This CV is a **separate document** from `Prajwal_Khanal_CV.pdf` in the
repository root, which is still exported from `Prajwal_Khanal_resume.docx`.
Nothing keeps the two in sync. Pick one to maintain.
