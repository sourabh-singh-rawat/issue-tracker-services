declare module 'sharp' {
  export interface Image {
    width: number;
    height: number;
    type: string;
    data: Uint8Array;
  }

  export function resize(image: Image, width: number, height: number): Image;
}
