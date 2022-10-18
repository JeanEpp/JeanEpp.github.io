import Color from "./Colors";

export function applyTheme(theme: Color) {
	const root = document.documentElement;
	Object.keys(theme.colors).forEach((cssVar: string) => {
		root.style.setProperty(cssVar, theme.colors[cssVar]);
	});
  }