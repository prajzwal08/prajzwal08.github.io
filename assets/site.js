/* Renders data/publications.json into #publications, grouped by status.
   Edit the JSON to update the list; nothing here needs to change. */
(function () {
  'use strict';

  var mount = document.getElementById('publications');
  if (!mount) return;

  // Order matters: this is the order the sections appear on the page.
  var GROUPS = [
    { status: 'published', heading: 'Peer-reviewed' },
    { status: 'review', heading: 'Under review' },
    { status: 'conference', heading: 'Conference contributions' }
  ];

  var ME = 'Khanal, P.';

  function el(tag, className) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    return node;
  }

  // Bold every occurrence of the author's own name, leaving the rest as text.
  // Built with text nodes rather than innerHTML so the JSON can never inject markup.
  function authorLine(authors) {
    var frag = document.createDocumentFragment();
    var rest = authors;
    var at = rest.indexOf(ME);

    while (at !== -1) {
      if (at > 0) frag.appendChild(document.createTextNode(rest.slice(0, at)));
      var strong = el('strong');
      strong.textContent = ME;
      frag.appendChild(strong);
      rest = rest.slice(at + ME.length);
      at = rest.indexOf(ME);
    }
    if (rest) frag.appendChild(document.createTextNode(rest));
    return frag;
  }

  function entry(pub) {
    var li = el('li');

    li.appendChild(authorLine(pub.authors || ''));
    if (pub.year) li.appendChild(document.createTextNode(' (' + pub.year + ').'));
    li.appendChild(document.createTextNode(' '));

    var title = el('span', 'pub-title');
    title.textContent = pub.title || '';
    li.appendChild(title);
    li.appendChild(document.createTextNode('. '));

    if (pub.venue) {
      var venue = el('span', 'pub-venue');
      venue.textContent = pub.venue + '. ';
      li.appendChild(venue);
    }

    if (pub.doi) {
      var link = el('a');
      link.href = pub.doi;
      link.rel = 'noopener';
      link.textContent = pub.doi.indexOf('doi.org') !== -1 ? 'DOI' : 'Link';
      li.appendChild(link);
    }

    if (pub.note) {
      var note = el('span', 'pub-note');
      note.textContent = pub.note;
      li.appendChild(note);
    }

    return li;
  }

  function render(publications) {
    mount.textContent = '';

    GROUPS.forEach(function (group) {
      var inGroup = publications.filter(function (p) {
        return p.status === group.status;
      });
      if (!inGroup.length) return;

      var section = el('section');
      var heading = el('h2');
      heading.textContent = group.heading;
      section.appendChild(heading);

      var list = el('ol', 'pub-list');
      inGroup.forEach(function (pub) {
        list.appendChild(entry(pub));
      });
      section.appendChild(list);
      mount.appendChild(section);
    });
  }

  fetch('data/publications.json')
    .then(function (response) {
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return response.json();
    })
    .then(render)
    .catch(function (err) {
      // Most often this is the page being opened over file:// rather than a server.
      mount.textContent = '';
      var p = el('p');
      p.textContent =
        'The publication list could not be loaded. The full list is on Google Scholar.';
      mount.appendChild(p);
      console.error('publications.json failed to load:', err);
    });
})();
