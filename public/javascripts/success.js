const copyBtn = document.querySelector('#copyBtn');

copyBtn.addEventListener('click', () => {
  const urlElement = document.querySelector('#shortenedURL');
  const value = urlElement.textContent;
  navigator.clipboard.writeText(value)
    .then(() => {
      const modal = document.querySelector('.modal');
      modal.classList.add('active');
      console.log('copy success');
      setTimeout(() => {
        modal.classList.remove('active');
      }, 950);
    });
});
