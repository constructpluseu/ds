import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

export interface CpBreadcrumbItem {
  label: string;
  href?: string;
}

@Component({
  selector: "cp-breadcrumb",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav [attr.aria-label]="ariaLabel">
      <ol class="cp-breadcrumb__list">
        <li *ngFor="let item of items; let i = index" class="cp-breadcrumb__item">
          <span
            *ngIf="i === items.length - 1 || !item.href"
            class="cp-breadcrumb__current"
            [attr.aria-current]="i === items.length - 1 ? 'page' : null"
          >
            {{ item.label }}
          </span>
          <a *ngIf="i !== items.length - 1 && item.href" class="cp-breadcrumb__link" [href]="item.href">
            {{ item.label }}
          </a>
          <span *ngIf="i !== items.length - 1" class="cp-breadcrumb__separator" aria-hidden="true">/</span>
        </li>
      </ol>
    </nav>
  `,
})
export class CpBreadcrumbComponent {
  @Input() items: CpBreadcrumbItem[] = [];
  @Input() ariaLabel = "Navegação estrutural";
}
