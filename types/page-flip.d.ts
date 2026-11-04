declare module "page-flip" {
  export interface PageFlipOptions {
    width: number
    height: number
    size?: "fixed" | "stretch"
    minWidth?: number
    maxWidth?: number
    minHeight?: number
    maxHeight?: number
    drawShadow?: boolean
    maxShadowOpacity?: number
    showCover?: boolean
    mobileScrollSupport?: boolean
    usePortrait?: boolean
    flippingTime?: number
    startPage?: number
    startZIndex?: number
  }

  export interface FlipEvent {
    data: number
  }

  export class PageFlip {
    constructor(element: HTMLElement, options: PageFlipOptions)
    loadFromHTML(pages: NodeListOf<Element> | HTMLElement[]): void
    loadFromImages(images: string[]): void
    turnToPage(pageNum: number): void
    turnToNextPage(): void
    turnToPrevPage(): void
    flipNext(corner?: "top" | "bottom"): void
    flipPrev(corner?: "top" | "bottom"): void
    flip(pageNum: number, corner?: "top" | "bottom"): void
    destroy(): void
    getCurrentPageIndex(): number
    getPageCount(): number
    on(event: "flip", handler: (e: FlipEvent) => void): void
    on(event: string, handler: (e: unknown) => void): void
  }
}
