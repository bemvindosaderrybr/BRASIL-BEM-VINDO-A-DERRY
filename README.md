## Instalação / Como usar localmente
1. Clone ou baixe o repositório.
2. Coloque os assets no diretório `assets/`:
   - `bg-right-art.png` (palhaço + balão — usado como background, ancorado à direita)
   - `logo.png` (logotipo no canto superior-esquerdo)
   - `poster.jpg` (imagem de poster do player)
   - `episode1.mp4`, `episode2.mp4`, ... (vídeos dos episódios — substitua pelos seus arquivos)
3. Abra `index.html` em um navegador moderno (Chrome, Edge, Firefox, Safari).
   - O layout é mobile-first e deve preencher `100vh` em dispositivos móveis no modo retrato, exibindo a composição conforme a imagem.
   - Ao abrir, o Episódio 1 será selecionado automaticamente (se o navegador permitir, o player tentará reproduzir).

## Publicar no GitHub Pages
1. Adicione e faça commit de todos os arquivos no repositório GitHub.
2. No GitHub, vá em **Settings → Pages** (ou **Settings → Code and automation → Pages** dependendo da UI).
3. Em **Source**, selecione `main` (ou `gh-pages`) branch e `/ (root)`, salve.
4. O site ficará disponível em `https://<seu-usuario>.github.io/<nome-do-repo>/`

## Observações técnicas e de acessibilidade
- HTML semântico usado (`<header>`, `<main>`, `<nav>`, `<section>`).
- Cada card tem `role="button"`, `tabindex="0"` e `aria-label`.
- Área do player possui `aria-live` para anunciar quando um episódio é carregado.
- Keyboard support: TAB para focar, Enter/Space para ativar; ArrowUp/ArrowDown para navegar quando focado na lista.
- Scroll da coluna de episódios estilizado para ficar discreto (visualmente ocultado, mas acessível).
- Código separado em `styles.css` e `scripts.js` para facilitar manutenção.

## Ajustes finos
No `styles.css` há variáveis CSS no `:root`:
- `--left-column-width`: controla largura da coluna (ajuste para calibrar posição)
- `--card-height`: altura aproximada dos cards

Altere essas variáveis se precisar ajustar o posicionamento para obter uma cópia visual ainda mais próxima da referência.

## Observações finais
- Este repositório assume que você fornecerá os arquivos de mídia (imagens e vídeo). Os `data-video-src` nos cards apontam para `assets/episodeX.mp4` — troque ou adicione seus arquivos conforme precisar.
- Não são usados frameworks externos; tudo em HTML/CSS/JS puro.

Se quiser, eu gero também um arquivo ZIP com esses arquivos prontos (conteúdo a ser copiado), ou — se preferir — posso gerar variações do CSS para calibrar pixel-a-pixel da posição do personagem à direita. Deseja que eu ajuste as larguras/offsets para um modelo de smartphone específico (ex.: iPhone 14 portrait 393×852 px) ?
