/* scripts.js
   Responsável por:
   - seleção de cards (mouse/clique ou teclado)
   - carregar vídeo no player e tentar autoplay (com fallback)
   - anunciar via aria-live
*/

document.addEventListener('DOMContentLoaded', () => {
  const cards = Array.from(document.querySelectorAll('.card'));
  const player = document.getElementById('player');
  const playerSource = document.getElementById('playerSource');
  const announce = document.getElementById('announce');
  const downloadLink = document.getElementById('downloadLink');

  if (!cards.length) return;

  // Função que marca o card ativo visualmente e carrega o vídeo
  function selectCard(cardEl, doPlay = true) {
    // Remove active em todos
    cards.forEach(c => c.classList.remove('active'));
    cardEl.classList.add('active');

    const src = cardEl.dataset.videoSrc || '';
    const ep = cardEl.dataset.episode || '';

    // Atualiza aria-live
    announce.textContent = `Episódio ${ep} carregado.`;

    // Atualiza link de download fallback
    if (downloadLink) {
      downloadLink.setAttribute('href', src || '#');
      downloadLink.textContent = src ? `Baixar Episódio ${ep}` : 'Download indisponível';
    }

    // Atualiza a tag <source> e recarrega o player
    if (playerSource && src) {
      playerSource.setAttribute('src', src);
      try {
        player.load();
        // tente reproduzir automaticamente (pode ser bloqueado pelo navegador)
        if (doPlay) {
          const playPromise = player.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Autoplay bloqueado — não insistimos. Poster permanece.
              console.info('Autoplay bloqueado pelo navegador.');
            });
          }
        }
      } catch (err) {
        // Se algo deu errado, exibe fallback (navegador antigo)
        console.error('Erro ao carregar o vídeo:', err);
      }
    } else {
      // se não há src, apenas mostra poster (por exemplo)
      // limpa source
      if (playerSource) {
        playerSource.setAttribute('src', '');
        player.load();
      }
    }
  }

  // Click handler
  cards.forEach(card => {
    card.addEventListener('click', () => selectCard(card, true));
    // Keyboard accessibility: Enter e Space ativam o card
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectCard(card, true);
      }
    });
  });

  // Ao carregar a página, seleciona automaticamente Episódio 1 (sem forçar autoplay se bloqueado)
  const firstCard = cards[0];
  if (firstCard) {
    // seleciona, mas não força play se navegador bloquear; carregamos o metadata
    selectCard(firstCard, true);
  }

  // Fallback para navegadores muito antigos que não suportam <video>
  const supportsVideo = !!document.createElement('video').canPlayType;
  if (!supportsVideo) {
    const fallbackText = document.createElement('div');
    fallbackText.className = 'video-fallback';
    fallbackText.innerHTML = `
      <p>Seu navegador não suporta reprodução de vídeo. <a href="${cards[0]?.dataset.videoSrc || '#'}">Baixe aqui</a>.</p>
    `;
    const playerWrap = document.querySelector('.player-wrap');
    if (playerWrap) playerWrap.appendChild(fallbackText);
  }

  // Optional: navigate cards with arrow keys when focus is on the list container
  const episodesList = document.getElementById('episodesList');
  episodesList.addEventListener('keydown', (e) => {
    const activeEl = document.activeElement;
    const idx = cards.indexOf(activeEl);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = cards[Math.min(cards.length - 1, Math.max(0, idx + 1))];
      next && next.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = cards[Math.min(cards.length - 1, Math.max(0, idx - 1))];
      prev && prev.focus();
    }
  });

});
