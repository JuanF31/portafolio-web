
import { applyTheme } from './theme-animation.js';

const toggle = document.querySelector('#theme-toggle');
const menu = document.querySelector('#theme-menu');

function setMenu(open) {
  menu.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));

  if (open) {
    menu.scrollTop = 0;
    fadeMenu();
  }
}

function fadeMenu() {
  const rest =
    menu.scrollHeight - menu.clientHeight - menu.scrollTop;

  menu.style.setProperty(
    '--ft',
    `${Math.min(menu.scrollTop, 28)}px`
  );

  menu.style.setProperty(
    '--fb',
    `${Math.max(0, Math.min(rest, 40))}px`
  );
}

export function initThemeMenu() {
  toggle.addEventListener('click', () => {
    setMenu(!menu.classList.contains('open'));
  });

  menu.addEventListener('click', event => {
    const option = event.target.closest('.theme-option');

    if (!option || !menu.contains(option)) return;

    applyTheme(option.dataset.theme, option);
  });

  menu.addEventListener('scroll', fadeMenu, {
    passive: true
  });

  window.addEventListener('resize', fadeMenu);

  document.addEventListener('click', event => {
    if (
      !menu.contains(event.target) &&
      !toggle.contains(event.target)
    ) {
      setMenu(false);
    }
  });

}
