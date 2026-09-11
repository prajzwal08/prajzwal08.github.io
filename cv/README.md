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
