import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SelectItemGroup } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {

  private themes: string[] = [
    'arya-blue', 'arya-green', 'arya-orange', 'arya-purple',
    'bootstrap4-dark-blue', 'bootstrap4-dark-purple', 'bootstrap4-light-blue', 'bootstrap4-light-purple',
    'fluent-light', 'lara-dark-blue', 'lara-dark-indigo', 'lara-dark-purple', 'lara-dark-teal',
    'lara-light-blue', 'lara-light-indigo', 'lara-light-purple', 'lara-light-teal',
    'luna-amber', 'luna-blue', 'luna-green', 'luna-pink',
    'mdc-dark-deeppurple', 'mdc-dark-indigo', 'mdc-light-deeppurple', 'mdc-light-indigo',
    'md-dark-deeppurple', 'md-dark-indigo', 'md-light-deeppurple', 'md-light-indigo',
    'nova', 'nova-alt', 'nova-accent', 'rhea',
    'saga-blue', 'saga-green', 'saga-orange', 'saga-purple',
    'vela-blue', 'vela-green', 'vela-orange', 'vela-purple'
  ];

  constructor(@Inject(DOCUMENT) private document: Document) {}

  switchTheme(theme: string) {
    let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;

    if (themeLink) {
        themeLink.href = theme + '.css';
    }
  }

  getThemesGroupedByCategory(): SelectItemGroup[] {
    // Converte a lista de temas em um array de SelectItemGroup
    return this.themes.reduce((groupedThemes: SelectItemGroup[], theme: string) => {
      const [group] = theme.split('-'); // Obtém o prefixo (ex: 'arya', 'bootstrap4', etc.)
      
      // Verifica se o grupo já existe no array
      let groupEntry = groupedThemes.find(g => g.label === group.charAt(0).toUpperCase() + group.slice(1));

      // Se o grupo não existir, cria um novo grupo
      if (!groupEntry) {
        groupEntry = {
          label: group.charAt(0).toUpperCase() + group.slice(1), // Capitaliza o nome do grupo
          items: []
        };
        groupedThemes.push(groupEntry);
      }

      // Adiciona o tema ao grupo correspondente
      groupEntry.items.push({ label: theme, value: theme });

      return groupedThemes;
    }, []);
  }
}