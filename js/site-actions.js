(() => {
  const email = 'historic@stepstolife.org';
  function status(anchor, message) {
    const parent = anchor.parentElement;
    let output = [...parent.children].find(child => child.classList.contains('action-status'));
    if (!output) { output=document.createElement('p');output.className='action-status';output.setAttribute('role','status');parent.append(output); }
    output.textContent=message;
  }
  function draft(subject,body,anchor) {
    status(anchor,'Your email app will open a draft. Review and send it there; nothing has been submitted by this website.');
    location.href='mailto:'+email+'?subject='+encodeURIComponent(String(subject).replace(/[\r\n]/g,' ').slice(0,200))+'&body='+encodeURIComponent(String(body).slice(0,16000));
  }
  window.SiteActions={status,draft};
  // LandMarks results take readers directly to the matching newsletter passage.
  if (document.body.dataset.sitePage === 'news') {
    const query = new URLSearchParams(location.search).get('search')?.trim().toLowerCase();
    if (query) {
      const match = [...document.querySelectorAll('section h1, section h2, section h3, section p, section .author')]
        .find(element => element.textContent.toLowerCase().includes(query));
      if (match) {
        match.classList.add('search-match');
        requestAnimationFrame(() => match.scrollIntoView({ block: 'center' }));
      }
    }
  }
  document.querySelectorAll('[data-unavailable]').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();status(button,button.dataset.unavailable);}));
  const contact=document.querySelector('form.contact-form');
  if(contact) contact.addEventListener('submit',event=>{
    event.preventDefault();if(!contact.reportValidity())return;
    const fields=contact.querySelectorAll('input,textarea');
    draft(fields[2].value,`Name: ${fields[0].value}\nEmail: ${fields[1].value}\n\n${fields[3].value}`,contact);
  });
  const prayer=document.querySelector('#prayer-request button');
  if(prayer) prayer.addEventListener('click',()=>{const input=document.querySelector('#prayer-request textarea');if(!input.reportValidity())return;draft('Prayer request',input.value,prayer);});
  const subscribe=document.querySelector('.newsletter form');
  if(subscribe)subscribe.addEventListener('submit',event=>{event.preventDefault();if(!subscribe.reportValidity())return;draft('Newsletter subscription request','Please subscribe this email address to your ministry newsletter: '+subscribe.querySelector('input').value,subscribe);});
  document.querySelectorAll('.podcast-card button').forEach(button=>button.addEventListener('click',()=>{status(button,'An audio recording has not been provided for this program yet. You can watch the featured teaching above.');}));
  if(document.querySelector('.donation-amounts')) {
    const input=document.querySelector('.donation-amounts input');
    const buttons=[...document.querySelectorAll('.amount-grid button')];
    const area=document.querySelector('#donation-area');const frequency=document.querySelector('#donation-frequency');
    function amount(value){input.value=value;buttons.forEach(button=>button.setAttribute('aria-pressed',String(Number(button.textContent.replace('$',''))===Number(value))));}
    buttons.forEach(button=>button.addEventListener('click',()=>amount(Number(button.textContent.replace('$','')))));
    input.addEventListener('input',()=>buttons.forEach(button=>button.setAttribute('aria-pressed',String(Number(button.textContent.replace('$',''))===Number(input.value)))));
    document.querySelectorAll('.donation-card button').forEach(button=>button.addEventListener('click',()=>{area.value=button.closest('.donation-card').querySelector('h3').textContent.trim();document.querySelector('#donation-options').scrollIntoView();input.focus({preventScroll:true});}));
    document.querySelectorAll('.partner-card button').forEach(button=>button.addEventListener('click',()=>{amount(Number(button.dataset.amount));frequency.value='Monthly';document.querySelector('#donation-options').scrollIntoView();}));
    document.querySelector('#donation-request').addEventListener('click',()=>{if(!input.value || !input.reportValidity()){input.focus();status(input,'Enter a donation amount greater than zero.');return;}draft('Donation instructions request',`Please provide donation instructions.\nMinistry area: ${area.value}\nAmount: USD ${Number(input.value).toFixed(2)}\nFrequency: ${frequency.value}\nNo payment has been made.`,input);});
  }
})();
