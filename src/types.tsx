export interface Coord {
  x: number;
  y: number;
}

export interface TypedRect {
  startPos: { x: number; y: number };
  endPos: { w: number; h: number };
  isDragging: boolean;
  id?: number
}

export interface TypedArrow {
  startPos: { x: number; y: number };
  endPos: { w: number; h: number };
  isDragging: boolean;
  id?: number
}

export type ToolList = "PEN" | "BLACKOUT" | "ARROW" | "NULL";
