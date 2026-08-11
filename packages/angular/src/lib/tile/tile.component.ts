import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "cp-tile",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a *ngIf="href" [href]="href" class="cp-tile">
      <ng-container *ngTemplateOutlet="content"></ng-container>
    </a>
    <button *ngIf="!href" type="button" class="cp-tile">
      <ng-container *ngTemplateOutlet="content"></ng-container>
    </button>
    <ng-template #content>
      <span class="cp-tile__icon" *ngIf="icon" aria-hidden="true">{{ icon }}</span>
      <span class="cp-tile__title">{{ title }}</span>
      <span class="cp-tile__description" *ngIf="description">{{ description }}</span>
    </ng-template>
  `,
})
export class CpTileComponent {
  @Input() title = "";
  @Input() description = "";
  @Input() href = "";
  @Input() icon = "";
}
