import { getCurrentTheme, paintTheme, saveTheme, isValidTheme } from './theme.js';

const root = document.documentElement;
let timer;


export function applyTheme(theme, source) {
  if (!isValidTheme(theme)) return;

  const previous = getCurrentTheme();

  saveTheme(theme);

  if (theme === previous || !document.startViewTransition) {
    root.classList.add('theme-anim');
    clearTimeout(timer);

    paintTheme(theme);

    timer = setTimeout(() => {
      root.classList.remove('theme-anim');
    }, 450);

    return;
  }

  const rect = source.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  const radius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  );

  document.startViewTransition(() => {
    paintTheme(theme);
  }).ready.then(() => {
    root.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${radius}px at ${x}px ${y}px)`
        ]
      },
      {
        duration: 700,
        easing: 'cubic-bezier(.4,0,.2,1)',
        pseudoElement: '::view-transition-new(root)'
      }
    );
  }).catch(() => {});
}