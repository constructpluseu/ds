import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "cp-list",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul *ngIf="!ordered" [class]="wrapperClasses">
      <li *ngFor="let item of items" class="cp-list__item">{{ item }}</li>
    </ul>
    <ol *ngIf="ordered" [class]="wrapperClasses">
      <li *ngFor="let item of items" class="cp-list__item">{{ item }}</li>
    </ol>
  `,
})
export class CpListComponent {
  @Input() items: string[] = [];
  @Input() ordered = false;
  @Input() unstyled = false;

  get wrapperClasses(): string {
    return ["cp-list", this.unstyled ? "cp-list--unstyled" : ""].filter(Boolean).join(" ");
  }
}
