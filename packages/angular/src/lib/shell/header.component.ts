import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "cp-header",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="cp-header">
      <button
        *ngIf="menuButton"
        type="button"
        class="cp-header__menu-button"
        [attr.aria-label]="navOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'"
        [attr.aria-expanded]="navOpen"
        (click)="menuToggle.emit()"
      >
        <span aria-hidden="true">{{ navOpen ? "✕" : "☰" }}</span>
      </button>
      <a class="cp-header__brand" [attr.href]="brandHref">{{ brand }}</a>
      <div class="cp-header__actions">
        <ng-content></ng-content>
      </div>
    </header>
  `,
})
export class CpHeaderComponent {
  @Input() brand = "";
  @Input() brandHref = "#";
  @Input() menuButton = false;
  @Input() navOpen = false;
  @Output() menuToggle = new EventEmitter<void>();
}
