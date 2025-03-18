import { NextResponse } from 'next/server';
import { Document, Packer, Paragraph, TextRun } from 'docx';

export async function POST(req: Request) {
  try {
    const { content, type } = await req.json();

    if (!content) {
      return NextResponse.json(
        { error: 'No content provided' },
        { status: 400 }
      );
    }

    // Create a new document with Aptos font
    const doc = new Document({
      styles: {
        default: {
          document: {
            run: {
              font: "Aptos",
              size: 24, // 12pt
            },
            paragraph: {
              spacing: {
                after: 200,
                line: 360,
              },
            },
          },
        },
      },
      sections: [{
        properties: {},
        children: content.split('\n').map((line: string) => 
          new Paragraph({
            children: [
              new TextRun({
                text: line,
                font: "Aptos",
                size: 24, // 12pt
              }),
            ],
          })
        ),
      }],
    });

    // Generate buffer
    const buffer = await Packer.toBuffer(doc);

    // Create response with appropriate headers
    const response = new NextResponse(buffer);
    response.headers.set('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    response.headers.set('Content-Disposition', `attachment; filename="${type === 'resume' ? 'optimized-resume' : 'Cover-Letter'}.docx"`);

    return response;
  } catch (error) {
    console.error('Error generating document:', error);
    return NextResponse.json(
      { error: 'Failed to generate document' },
      { status: 500 }
    );
  }
} 