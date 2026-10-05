(() => {
  const form = document.querySelector('.landmarks-search');
  const input = form.querySelector('input');
  const button = form.querySelector('button');
  const results = form.querySelector('.landmarks-search-results');
  let articles = null;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const query = input.value.trim().toLowerCase();
    if (!query) { SiteActions.status(input, 'Enter an author name or article topic.'); return; }
    button.disabled = true;
    results.hidden = false;
    results.textContent = 'Searching…';
    try {
      if (!articles) {
        const response = await fetch('news.html');
        if (!response.ok) throw new Error('Unavailable');
        const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
        articles = [...doc.querySelectorAll('section')]
          .filter(section => !section.classList.contains('news-header') && section.querySelector('h1,h2,h3'))
          .map(section => ({
            title: section.querySelector('h1,h2,h3').textContent.trim(),
            text: section.textContent.trim(),
            author: [...section.querySelectorAll('.author')].map(author => author.textContent).join(' ')
          }));
      }
      const matches = articles.filter(article => `${article.author} ${article.title} ${article.text}`.toLowerCase().includes(query));
      results.replaceChildren();
      const heading = document.createElement('h3');
      heading.textContent = 'Results in the current newsletter';
      results.append(heading);
      if (!matches.length) {
        const empty = document.createElement('p');
        empty.textContent = 'No matching authors or articles in the current newsletter. Contact the ministry for archive searches.';
        results.append(empty);
      }
      for (const article of matches) {
        const link = document.createElement('a');
        link.href = 'news.html?search=' + encodeURIComponent(input.value.trim());
        link.textContent = article.title;
        const paragraph = document.createElement('p');
        paragraph.append(link);
        results.append(paragraph);
      }
    } catch {
      results.textContent = 'Search is unavailable. Open the current newsletter to browse articles.';
      const link = document.createElement('a');
      link.href = 'news.html';
      link.textContent = 'Read the current newsletter';
      results.append(document.createElement('br'), link);
    } finally {
      button.disabled = false;
    }
  });
})();
