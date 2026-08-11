import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

export type CpAvatarSize = "sm" | "md" | "lg";
export type CpAvatarStatus = "online" | "busy" | "away" | "none";

@Component({
  selector: "cp-avatar",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span [class]="wrapperClasses" role="img" [attr.aria-label]="name">
      <img *ngIf="src" class="cp-avatar__image" [src]="src" alt="" />
      <span *ngIf="!src" aria-hidden="true">{{ initials }}</span>
      <span *ngIf="status !== 'none'" [class]="statusClasses" aria-hidden="true"></span>
    </span>
  `,
})
export class CpAvatarComponent {
  @Input() name = "";
  @Input() src = "";
  @Input() size: CpAvatarSize = "md";
  @Input() status: CpAvatarStatus = "none";

  get wrapperClasses(): string {
    return ["cp-avatar", `cp-avatar--${this.size}`].join(" ");
  }

  get statusClasses(): string {
    return ["cp-avatar__status", `cp-avatar__status--${this.status}`].join(" ");
  }

  get initials(): string {
    const parts = this.name.trim().split(/\s+/);
    const first = parts[0]?.[0] ?? "";
    const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
    return (first + last).toUpperCase();
  }
}
