import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

export type CpSkeletonVariant = "text" | "circle" | "rect";

@Component({
  selector: "cp-skeleton",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span
      [class]="wrapperClasses"
      [style.width]="width"
      [style.height]="height"
      role="presentation"
      aria-hidden="true"
    ></span>
  `,
})
export class CpSkeletonComponent {
  @Input() variant: CpSkeletonVariant = "text";
  @Input() width?: string;
  @Input() height?: string;

  get wrapperClasses(): string {
    return ["cp-skeleton", `cp-skeleton--${this.variant}`].join(" ");
  }
}
