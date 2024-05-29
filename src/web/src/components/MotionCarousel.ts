import {LitElement, html, PropertyValues, noChange} from "lit";
import {customElement, property, query} from "lit/decorators.js";
import {animate} from "@lit-labs/motion";
import {styleMap} from "lit/directives/style-map.js";
import {styles} from "../styles.js";

@customElement("motion-carousel")
export class MotionCarousel extends LitElement {  
  public static styles = styles;

  @query("slot[name=\"selected\"]", true)
  private selectedSlot!: HTMLSlotElement;

  @query("slot[name=\"previous\"]", true)
  private previousSlot!: HTMLSlotElement;

  @property({type: Number})
  public selected = 0;

  private left = 0;
  private selectedInternal = 0;

  public get maxSelected(): number {
    return this.childElementCount - 1;
  }

  public hasValidSelected(): boolean {
    return this.selected >= 0 && this.selected <= this.maxSelected;
  }

  public render(): ReturnType<typeof html> {
    const p: number = this.selectedInternal;
    const s: number = (this.selectedInternal =
      this.hasValidSelected() ? this.selected : this.selectedInternal);
    const shouldMove: boolean = this.hasUpdated && s !== p;
    const atStart: boolean = p === 0;
    const toStart: boolean = s === 0;
    const atEnd: boolean = p === this.maxSelected;
    const toEnd: boolean = s === this.maxSelected;
    const shouldAdvance: boolean = shouldMove &&
      (atEnd ? toStart : atStart ? !toEnd : s > p);
    const delta: number = (shouldMove ? Number(shouldAdvance) || -1 : 0) * 100;
    this.left -= delta;
    const animateLeft: string = `${this.left}%`;
    const selectedLeft: string = `${-this.left}%`;
    const previousLeft: string = `${-this.left - delta}%`;
    const w: number = 100 / this.childElementCount;
    const indicatorLeft: string = `${w * s}%`;
    const indicatorWidth: string = `${w}%`;
    return html`
      <div class="fit"
        ${animate()}
        @click=${this.clickHandler}
        style=${styleMap({left: animateLeft})}>
        <div class="fit" style=${
          shouldMove ? styleMap({left: previousLeft}) : noChange
        }>
          <slot name="previous"></slot>
        </div>
        <div class="fit selected" style=${
          shouldMove ? styleMap({left: selectedLeft}) : noChange
        }>
          <slot name="selected"></slot>
        </div>
      </div>
      <div class="bar"><div class="indicator"
          ${animate()}
          style=${styleMap({left: indicatorLeft, width: indicatorWidth})}></div></div>
    `;
  }

  private previous = -1;

  protected updated(changedProperties: PropertyValues): void {
    if ((changedProperties.has("selected") || this.previous === -1) && this.hasValidSelected()) {
      this.updateSlots();
      this.previous = this.selected;
    }
  }

  private updateSlots(): void {
    // unset old slot state
    this.selectedSlot.assignedElements()[0]?.removeAttribute("slot");
    this.previousSlot.assignedElements()[0]?.removeAttribute("slot");
    // set slots
    this.children[this.previous]?.setAttribute("slot", "previous");
    this.children[this.selected]?.setAttribute("slot", "selected");
  }

  private clickHandler(e: MouseEvent): void {
    const i: number = this.selected + (Number(!e.shiftKey) || -1);
    this.selected = i > this.maxSelected ? 0 : i < 0 ? this.maxSelected : i;
    const change: CustomEvent<number> = new CustomEvent("change",
      {detail: this.selected, bubbles: true, composed: true});
    this.dispatchEvent(change);
  }
}
