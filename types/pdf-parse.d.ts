declare module 'pdf-parse/lib/pdf-parse' {
  interface PDFData {
    text: string;
    numpages: number;
    info: Record<string, any>;
    metadata: Record<string, any>;
    version: string;
  }

  function pdfParse(dataBuffer: Buffer | Uint8Array): Promise<PDFData>;
  export = pdfParse;
} 