import { NextResponse } from 'next/server';
import { Document, Packer, Paragraph, TextRun } from 'docx';

export async function POST(req: Request) {
  try {
    const { content, type } = await req.json();

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    // Create a new document
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: content,
                size: 24, // 12pt
                font: 'Aptos'
              })
            ],
            spacing: {
              line: 360, // 1.5 line spacing
              before: 200, // Space before paragraph
              after: 200 // Space after paragraph
            }
          })
        ]
      }]
    });

    // Generate the document buffer
    const buffer = await Packer.toBuffer(doc);

    // Set the appropriate filename
    const filename = type === 'resume' ? 'Optimized-Resume.docx' : 'Cover-Letter.docx';

    // Return the document with proper headers
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error: any) {
    console.error('Error generating document:', error);
    return NextResponse.json(
      { error: `Failed to generate document: ${error.message}` },
      { status: 500 }
    );
  }
} 