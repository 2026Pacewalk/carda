import QRCode from "qrcode";

export async function generateQRCode(data: string): Promise<string> {
  return QRCode.toDataURL(data, {
    width: 400,
    margin: 2,
    color: {
      dark: "#0a2b4a",
      light: "#ffffff",
    },
  });
}

export async function generateQRCodeBuffer(data: string): Promise<Buffer> {
  return QRCode.toBuffer(data, {
    width: 400,
    margin: 2,
    color: {
      dark: "#0a2b4a",
      light: "#ffffff",
    },
  });
}
