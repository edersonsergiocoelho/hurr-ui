import { Component, HostListener, OnInit } from '@angular/core';
import { HomeUIService } from '../../service/home-ui/home-ui.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showMenuUser: boolean = false;
  showSubMenu: boolean = false;

  divHomeVisible = true;

  constructor(private router: Router,
              private homeUIService: HomeUIService) {}

  ngOnInit() {
    this.homeUIService.divHomeVisible$.subscribe((value) => {
      this.divHomeVisible = value;
    });
  }

  toggleSubMenu(): void {
    this.showSubMenu = !this.showSubMenu;
  }

  toggleMenuUser(): void {
    this.showMenuUser = !this.showMenuUser;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const isClickedInsideMenu = (event.target as HTMLElement).closest('.border-indigo-400') !== null;
    if (!isClickedInsideMenu) {
      this.showMenuUser = false;
    }
  }

  searchQuery: string = '';

  onSubmit() {
    // Lógica para lidar com a submissão do formulário de pesquisa
    console.log('Search Query:', this.searchQuery);
    // Aqui você pode chamar uma função para executar a pesquisa com this.searchQuery
  }

  onClickHome() {
    this.homeUIService.updateDivVisibility(true);
    this.router.navigate(['/']);
  }
}