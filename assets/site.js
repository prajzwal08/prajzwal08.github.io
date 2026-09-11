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

  // The full author list is the longest part of a citation and the least
  // useful on a personal page, so it collapses to the lead author. The DOI
  // link carries anyone who wants the complete list.
  function leadAuthor(authors) {
    if (!authors) return '';
    var surname = authors.split(',')[0].trim();
    var initials = authors.match(/[A-Z]\./g) || [];
    var more = /et al\./.test(authors) || initials.length > 1;
    return more ? surname + ' et al.' : surname;
  }

  // "Biogeosciences, 23, 1719-1738" -> "Biogeosciences". Volume and pages are
  // one click away behind the DOI and would not fit on the line.
  function shortVenue(venue) {
    return venue ? venue.split(',')[0].trim() : '';
  }

  function sep(parent) {
    var dot = el('span', 'pub-sep');
    dot.textContent = '·';
    parent.appendChild(dot);
  }

  // One row per paper: year in the gutter, everything else on one line.
  // Text nodes rather than innerHTML, so the JSON can never inject markup.
  function entry(pub) {
    var li = el('li');

    var year = el('span', 'pub-year');
    year.textContent = pub.year || '—';
    li.appendChild(year);

    var body = el('span', 'pub-body');

    var who = el('span', 'pub-who');
    who.textContent = leadAuthor(pub.authors || '');
    // Marked when the lead author is him, so first-author work reads as his
    // at a glance and middle-author work is not implied to be.
    if ((pub.authors || '').indexOf(ME) === 0) who.className = 'pub-who pub-me';
    if (who.textContent) { body.appendChild(who); sep(body); }

    var title = el('span', 'pub-title');
    title.textContent = pub.title || '';
    body.appendChild(title);

    var venue = shortVenue(pub.venue);
    if (venue) {
      sep(body);
      var venueNode = el('span', 'pub-venue');
      venueNode.textContent = venue;
      body.appendChild(venueNode);
    }

    if (pub.doi) {
      sep(body);
      var link = el('a');
      link.href = pub.doi;
      link.rel = 'noopener';
      link.textContent = pub.doi.indexOf('doi.org') !== -1 ? 'DOI' : 'Link';
      body.appendChild(link);
    }

    if (pub.note) {
      sep(body);
      var note = el('span', 'pub-status');
      note.textContent = pub.note;
      body.appendChild(note);
    }

    li.appendChild(body);
    return li;
  }

  function render(publications) {
    mount.textContent = '';

    GROUPS.forEach(function (group) {
      var inGroup = publications.filter(function (p) {
        return p.status === group.status;
      });
      if (!inGroup.length) return;

      // A div, not a section: the page's `section + section` spacing is sized
      // for top-level topics and is far too wide between publication groups.
      var section = el('div');
      var heading = el('h3', 'pub-group');
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

/* The opening line fades in a word at a time on load. Everything here is
   additive: the markup holds the plain paragraph, and if this never runs, or
   the reader asks for reduced motion, the text is just there. */
(function () {
  'use strict';

  var lede = document.querySelector('.lede');
  if (!lede) return;

  if (window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var words = lede.textContent.split(/\s+/).filter(Boolean);
  if (!words.length) return;

  // Long paragraphs stagger faster, so the whole line always lands in about
  // a second and a half rather than crawling on for ten seconds.
  var stagger = Math.min(0.04, 1.5 / words.length);

  lede.className += ' is-typing';
  lede.textContent = '';

  words.forEach(function (word, i) {
    var span = document.createElement('span');
    span.className = 'word';
    span.textContent = word;
    span.style.setProperty('--d', (i * stagger).toFixed(3) + 's');
    lede.appendChild(span);
    if (i < words.length - 1) lede.appendChild(document.createTextNode(' '));
  });
})();

/* Marks the nav link for whichever section is currently on screen. Sections
   without a data-nav attribute (Awards, Teaching) deliberately have no link of
   their own, so scrolling through them leaves Education marked. */
(function () {
  'use strict';

  var nav = document.querySelector('.tabs');
  if (!nav || !('IntersectionObserver' in window)) return;

  var sections = document.querySelectorAll('main section[data-nav]');
  if (!sections.length) return;

  var links = {};
  Array.prototype.forEach.call(nav.querySelectorAll('a'), function (a) {
    links[a.getAttribute('href').slice(1)] = a;
  });

  var visible = {};

  function mark() {
    var current = null;
    Array.prototype.forEach.call(sections, function (section) {
      if (visible[section.id] && !current) current = section.id;
    });
    if (!current) return;

    Object.keys(links).forEach(function (id) {
      if (id === current) links[id].setAttribute('aria-current', 'true');
      else links[id].removeAttribute('aria-current');
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      visible[e.target.id] = e.isIntersecting;
    });
    mark();
  }, {
    // Ignore the strip under the sticky nav, and treat the top part of the
    // viewport as "where the reader is looking". rootMargin takes px or %
    // only — rem is silently rejected and the observer never fires.
    rootMargin: '-72px 0px -55% 0px'
  });

  Array.prototype.forEach.call(sections, function (section) {
    observer.observe(section);
  });
})();
