(() => {
  const search = document.querySelector('#study-search');
  const cards = [...document.querySelectorAll('.category-card')];
  search.addEventListener('input', () => {
    const query = search.value.trim().toLowerCase();
    cards.forEach(card => { card.hidden = !card.dataset.search.toLowerCase().includes(query); });
    document.querySelector('.no-results').hidden = cards.some(card => !card.hidden);
  });
  document.querySelector('.nav-search').addEventListener('click', () => {
    search.scrollIntoView({ block: 'center', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    search.focus({ preventScroll: true });
  });
  const lessons = {
    old: ['Old Testament', 'God’s faithfulness through history', 'Read Genesis 12:1–9 and Exodus 14:13–14. Consider how God led Abraham and delivered His people.', 'Where do you see God’s faithfulness in these passages? What can you entrust to Him today?'],
    new: ['The Life of Jesus', 'Following the Savior', 'Read John 1:1–14, Mark 1:14–20, and John 20:1–18. Explore who Jesus is, His invitation to follow Him, and the hope of His resurrection.', 'How does knowing Jesus change your daily choices? What does His resurrection mean for your hope?'],
    growth: ['Faith & Growth', 'Learning to trust God', 'Read Hebrews 11:1–6 and John 15:1–11. Reflect on faith and on Jesus’ invitation to remain in Him.', 'What helps your faith grow? Choose one habit that makes room for God’s Word this week.'],
    living: ['Practical Living', 'Living out the Word', 'Read James 1:19–27 and Colossians 3:12–17. Look for practical ways to express kindness, patience, and forgiveness.', 'Which instruction can you put into practice at home, at work, or in your community today?'],
    prayer: ['Prayer & Devotion', 'Drawing near to God', 'Read Matthew 6:5–13 and Philippians 4:4–7. Notice Jesus’ guidance for prayer and Paul’s invitation to bring your concerns to God.', 'Set aside a quiet moment to thank God, seek His guidance, and pray for someone else.'],
    basics: ['Bible Basics', 'Understanding Scripture', 'Read 2 Timothy 3:14–17 and Psalm 119:105. The Bible’s Old and New Testaments contain history, poetry, prophecy, letters, and the accounts of Jesus’ life.', 'As you read, ask: Who is speaking? What is the context? What does this reveal about God? How can I respond?'],
    reading: ['Bible Reading Plan', 'A week in God’s Word', 'Day 1: Genesis 1. Day 2: Psalm 23. Day 3: Matthew 5. Day 4: Luke 15. Day 5: John 15. Day 6: Romans 8. Day 7: Revelation 21.', 'Spend a few minutes each day reading, reflecting, and praying. Write down one verse and one practical response.'],
    resources: ['Download Resources', 'Bible study reading plan', 'Download a simple seven-day reading plan with reflection questions. For video and audio teaching, visit our Watch or Listen page.', 'For further study materials or guided lessons, contact the ministry.']
  };
  const dialog = document.querySelector('.lesson-dialog');
  const content = document.querySelector('#lesson-content');
  function openLesson(key) {
    const lesson = lessons[key];
    if (!lesson) return;
    document.querySelector('#lesson-title').textContent = lesson[0];
    content.replaceChildren();
    ['h3', 'p', 'p'].forEach((tag, index) => {
      const element = document.createElement(tag);
      element.textContent = lesson[index + 1];
      content.append(element);
    });
    if (key === 'resources') {
      const download = document.createElement('a');
      download.href = 'resources/bible-reading-plan.txt';
      download.download = 'Steps-to-Life-Bible-Reading-Plan.txt';
      download.className = 'button glass-button';
      download.textContent = 'Download Reading Plan';
      content.append(download);
    }
    dialog.showModal();
  }
  document.querySelectorAll('[data-study]').forEach(button => button.addEventListener('click', () => openLesson(button.dataset.study)));
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
  const slides = [
    ['The Life of Jesus', 'Explore the life, teachings, death, and resurrection of Jesus Christ — and what it means for your life today.', 'new', 'bible-jesus.png'],
    ['Growing in Faith', 'Discover how to trust God, remain in His Word, and grow stronger in your walk with Him.', 'growth', 'bible-growth.png'],
    ['A Life of Prayer', 'Draw closer to God through prayer, gratitude, and time spent in His presence.', 'prayer', 'bible-prayer.png'],
    ['Understanding the Bible', 'Explore the structure and themes of Scripture and learn practical ways to study God’s Word.', 'basics', 'home-study.png']
  ];
  let selected = 0;
  const dots = [...document.querySelectorAll('[data-slide]')];
  function showSlide(index) {
    selected = (index + slides.length) % slides.length;
    const slide = slides[selected];
    const featureContent = document.querySelector('.feature-content');
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && featureContent.animate) {
      featureContent.animate([{ opacity: .25 }, { opacity: 1 }], { duration: 350, easing: 'ease-out' });
    }
    document.querySelector('#feature-title').textContent = slide[0];
    document.querySelector('#feature-description').textContent = slide[1];
    document.querySelector('.featured-study').style.backgroundImage = `linear-gradient(90deg,#002b65dd,transparent 90%),url('images/${slide[3]}')`;
    dots.forEach((dot, i) => { dot.classList.toggle('selected', i === selected); dot.setAttribute('aria-pressed', String(i === selected)); });
  }
  dots.forEach(dot => dot.addEventListener('click', () => showSlide(Number(dot.dataset.slide))));
  document.querySelector('#previous-study').addEventListener('click', () => showSlide(selected - 1));
  document.querySelector('#next-study').addEventListener('click', () => showSlide(selected + 1));
  document.querySelector('#start-feature').addEventListener('click', () => openLesson(slides[selected][2]));
  const banner = document.querySelector('.featured-study');
  let hovered = false;
  let focused = false;
  banner.addEventListener('mouseenter', () => { hovered = true; });
  banner.addEventListener('mouseleave', () => { hovered = false; });
  banner.addEventListener('focusin', () => { focused = true; });
  banner.addEventListener('focusout', event => { focused = banner.contains(event.relatedTarget); });
  // Pause while someone interacts with the banner or reads a study.
  window.setInterval(() => {
    if (!document.hidden && !hovered && !focused && !dialog.open) {
      showSlide(selected + 1);
    }
  }, 2000);
})();
