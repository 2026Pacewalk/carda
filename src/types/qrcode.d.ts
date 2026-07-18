declare module "qrcode" {
  export function toDataURL(data: string, options?: Record<string, unknown>): Promise<string>;
  export function toBuffer(data: string, options?: Record<string, unknown>): Promise<Buffer>;
}
