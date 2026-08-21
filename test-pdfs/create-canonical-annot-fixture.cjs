const { PDFDocument, PDFName, PDFContentStream, PDFOperator, PDFOperatorNames, PDFNumber, PDFHexString, PDFRef } = require('pdf-lib');
const fs = require('fs');

(async () => {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(require('pdf-lib').StandardFonts.Helvetica);
  const page = doc.addPage([612, 792]);
  const context = doc.context;
  
  // Add some text for context
  page.drawText('Canonical Annotation Test PDF', { x: 50, y: 750, size: 16, font });
  page.drawText('The quick brown fox jumps over the lazy dog.', { x: 50, y: 700, size: 12, font });

  // 1. Highlight
  const highlightDict = context.obj({
    Type: 'Annot', Subtype: 'Highlight',
    Rect: [50, 690, 350, 710], C: [1, 1, 0], F: 4,
    Contents: 'Test highlight', QuadPoints: [50, 710, 350, 710, 50, 690, 350, 690],
  });
  const highlightAP = PDFContentStream.of(highlightDict, [
    PDFOperator.of(PDFOperatorNames.PushGraphicsState),
    PDFOperator.of(PDFOperatorNames.NonStrokingColorRgb, [PDFNumber.of(1), PDFNumber.of(1), PDFNumber.of(0)]),
    PDFOperator.of(PDFOperatorNames.AppendRectangle, [PDFNumber.of(0), PDFNumber.of(0), PDFNumber.of(300), PDFNumber.of(20)]),
    PDFOperator.of(PDFOperatorNames.FillNonZero),
    PDFOperator.of(PDFOperatorNames.PopGraphicsState),
  ], false);
  highlightAP.dict.set(PDFName.of('BBox'), context.obj([0, 0, 300, 20]));
  const hAPRef = context.register(highlightAP);
  const hAPDict = context.obj({}); hAPDict.set(PDFName.of('N'), hAPRef);
  highlightDict.set(PDFName.of('AP'), hAPDict);
  page.node.addAnnot(context.register(highlightDict));

  // 2. Underline
  const underlineDict = context.obj({
    Type: 'Annot', Subtype: 'Underline',
    Rect: [50, 670, 350, 680], C: [0, 0, 1], F: 4,
    Contents: 'Test underline', QuadPoints: [50, 680, 350, 680, 50, 670, 350, 670],
  });
  page.node.addAnnot(context.register(underlineDict));

  // 3. StrikeOut
  const strikeDict = context.obj({
    Type: 'Annot', Subtype: 'StrikeOut',
    Rect: [50, 650, 350, 660], C: [1, 0, 0], F: 4,
    Contents: 'Test strikeout', QuadPoints: [50, 660, 350, 660, 50, 650, 350, 650],
  });
  page.node.addAnnot(context.register(strikeDict));

  // 4. Sticky Note (Text)
  const noteDict = context.obj({
    Type: 'Annot', Subtype: 'Text',
    Rect: [400, 700, 420, 720], C: [1, 1, 0], F: 4,
    Contents: 'Test sticky note', T: 'TestAuthor', Name: 'Note',
  });
  page.node.addAnnot(context.register(noteDict));

  // 5. FreeText
  const ftDict = context.obj({
    Type: 'Annot', Subtype: 'FreeText',
    Rect: [50, 580, 250, 610], C: [0, 0, 0], F: 4,
    Contents: 'Test FreeText', DA: '/Helv 12 Tf 0 0 0 rg',
  });
  page.node.addAnnot(context.register(ftDict));

  // 6. Ink
  const inkDict = context.obj({
    Type: 'Annot', Subtype: 'Ink',
    Rect: [50, 500, 200, 520], C: [0, 0, 1], F: 4,
    Contents: 'Test ink', InkList: [context.obj([50, 500, 100, 510, 150, 505, 200, 520])],
  });
  page.node.addAnnot(context.register(inkDict));

  // 7. Line
  const lineDict = context.obj({
    Type: 'Annot', Subtype: 'Line',
    Rect: [50, 450, 250, 470], C: [0, 0.5, 0], F: 4,
    Contents: 'Test line', L: [50, 450, 250, 470],
  });
  page.node.addAnnot(context.register(lineDict));

  // 8. Arrow (Line with LE)
  const arrowDict = context.obj({
    Type: 'Annot', Subtype: 'Line',
    Rect: [50, 400, 250, 420], C: [1, 0, 0], F: 4,
    Contents: 'Test arrow', L: [50, 400, 250, 420],
    LE: ['None', 'OpenArrow'],
  });
  page.node.addAnnot(context.register(arrowDict));

  // 9. Square
  const squareDict = context.obj({
    Type: 'Annot', Subtype: 'Square',
    Rect: [50, 330, 150, 380], C: [0, 0, 1], F: 4,
    Contents: 'Test rectangle', BS: { W: 2, S: 'S' },
  });
  page.node.addAnnot(context.register(squareDict));

  // 10. Circle
  const circleDict = context.obj({
    Type: 'Annot', Subtype: 'Circle',
    Rect: [200, 330, 300, 380], C: [1, 0, 0], F: 4,
    Contents: 'Test circle', BS: { W: 2, S: 'S' },
  });
  page.node.addAnnot(context.register(circleDict));

  const bytes = await doc.save();
  fs.writeFileSync('test-pdfs/pdf-annot-canonical.pdf', bytes);
  console.log('✓ Canonical fixture created:', bytes.length, 'bytes');
  
  // Verify by reloading
  const reloaded = await PDFDocument.load(bytes);
  const annots = reloaded.getPage(0).node.Annots();
  console.log('✓ Reload: annotation count:', annots.size());
  for (let i = 0; i < annots.size(); i++) {
    const dict = annots.get(i);
    const subtype = dict.get(PDFName.of('Subtype'));
    console.log('  Annot', i, ':', subtype?.toString());
  }
})();
