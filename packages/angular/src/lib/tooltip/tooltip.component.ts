import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  Renderer2,
} from "@angular/core";
import { CommonModule } from "@angular/common";

export type CpTooltipPlacement = "top" | "bottom" | "left" | "right";

let uniqueId = 0;

@Component({
  selector: "cp-tooltip",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "cp-tooltip-wrapper",
    "(mouseenter)": "visible = true",
    "(mouseleave)": "visible = false",
    "(focusin)": "visible = true",
    "(focusout)": "visible = false",
  },
  template: `
    <ng-content></ng-content>
    <span [id]="tooltipId" role="tooltip" [class]="tooltipClasses">{{ content }}</span>
  `,
})
export class CpTooltipComponent implements AfterContentInit {
  @Input() content = "";
  @Input() placement: CpTooltipPlacement = "top";

  visible = false;
  readonly tooltipId = `cp-tooltip-${uniqueId++}`;

  constructor(
    private readonly hostRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2
  ) {}

  get tooltipClasses(): string {
    return ["cp-tooltip", `cp-tooltip--${this.placement}`, this.visible ? "cp-tooltip--visible" : ""]
      .filter(Boolean)
      .join(" ");
  }

  ngAfterContentInit(): void {
    const trigger = this.hostRef.nativeElement.firstElementChild;
    if (trigger) {
      this.renderer.setAttribute(trigger, "aria-describedby", this.tooltipId);
    }
  }
}
