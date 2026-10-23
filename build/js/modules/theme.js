const root = document.documentElement;
const meta = document.querySelector('meta[name="theme-color"]');
const label = document.querySelector('#theme-current');
const options = [...document.querySelectorAll('.theme-option')];
const favicon = document.querySelector('#favicon');


const themes = new Map(
    options.map(option => [
        option.dataset.theme,
        option.title
    ])
);

function updateFavicon() {
  if (!favicon) return;

  const styles = getComputedStyle(root);

  const background = styles.getPropertyValue('--primary-accent').trim();
  const accent = styles.getPropertyValue('--text-main').trim();
  const text = styles.getPropertyValue('--bg-color').trim();

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 80 80">

      <rect
        x="0"
        y="0"
        width="80"
        height="80"
        rx="18"
        fill="${background}"
      />

      <text
        x="40"
        y="40"
        text-anchor="middle"
        dominant-baseline="central"
        font-family="Arial, sans-serif"
        font-size="34"
        font-weight="800"
        letter-spacing="-2"
        fill="${text}"
      >JH</text>

      <path
        d="M17 20 L12 26 L17 32
           M63 48 L68 54 L63 60"
        fill="none"
        stroke="${accent}"
        stroke-width="3.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

    </svg>
  `;

  favicon.href = `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export function getCurrentTheme(){
    return root.dataset.theme || 'dark';
}

export function paintTheme(theme){
    if(!themes.has(theme)) return;

    root.dataset.theme = theme;
    label.textContent = themes.get(theme)

    const color = getComputedStyle(root)
        .getPropertyValue('--theme-meta')
        .trim();

    if(meta && color) meta.content = color;

    updateFavicon();

    options.forEach(option => {
        option.setAttribute(
            'aria-pressed',
            String(option.dataset.theme === theme)
        );
    });
}

export function saveTheme(theme){
    try{
        localStorage.setItem('theme', theme)
    }catch{}
}

export function loadTheme(){
    let saved;

    try{
        saved = localStorage.getItem('theme');
    }catch{}

    const theme = themes.has(saved)
       ? saved
       : themes.has(getCurrentTheme())
        ? getCurrentTheme()
        : 'dark';
    paintTheme(theme);  
}

export function isValidTheme(theme){
    return themes.has(theme);
}