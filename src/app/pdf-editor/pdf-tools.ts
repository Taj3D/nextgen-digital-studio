/**
 * ============================================================================
 * PDF Forge — Tool definitions
 * ----------------------------------------------------------------------------
 * 40+ PDF tool catalog with bilingual (EN/BN) labels + functional flag.
 * Only `functional: true` tools (Merge, Split, Rotate, Edit Metadata) launch
 * an interactive dialog powered by pdf-lib. All others show a "coming soon"
 * toast.
 * ============================================================================
 */

export type PdfToolCategory =
  | 'popular'
  | 'convert'
  | 'optimize'
  | 'edit'
  | 'security'

export type PdfTool = {
  id: string
  nameEn: string
  nameBn: string
  descEn: string
  descBn: string
  category: PdfToolCategory
  icon: string // emoji glyph used on the card
  functional: boolean // true = launches working tool dialog
  comingSoon?: boolean
  isNew?: boolean // true = show "NEW" badge on the card
  status?: 'AVAILABLE_NOW' | 'LIMITED' | 'ROADMAP'
}

export const PDF_TOOLS: PdfTool[] = [
  /* ---------------------------------------------------------------------- */
  /* Popular (4)                                                            */
  /* ---------------------------------------------------------------------- */
  {
    id: 'compress',
    nameEn: 'Compress PDF',
    nameBn: 'পিডিএফ কম্প্রেস',
    descEn: 'Shrink PDF file size while keeping quality.',
    descBn: 'কোয়ালিটি নষ্ট না করে পিডিএফ সাইজ কমান।',
    category: 'popular',
    icon: '🗜️',
    functional: false,
    comingSoon: true,
  },
  {
    id: 'merge',
    nameEn: 'Merge PDF',
    nameBn: 'পিডিএফ মার্জ',
    descEn: 'Combine multiple PDFs into one file.',
    descBn: 'একাধিক পিডিএফ একটি ফাইলে যুক্ত করুন।',
    category: 'popular',
    icon: '🔗',
    functional: true,
  },
  {
    id: 'split',
    nameEn: 'Split PDF',
    nameBn: 'পিডিএফ স্প্লিট',
    descEn: 'Extract page ranges into separate PDFs.',
    descBn: 'নির্দিষ্ট পেজ আলাদা পিডিএফ করে বের করুন।',
    category: 'popular',
    icon: '✂️',
    functional: true,
  },
  {
    id: 'viewer',
    nameEn: 'PDF Viewer',
    nameBn: 'পিডিএফ ভিউয়ার',
    descEn: 'View PDF pages in your browser.',
    descBn: 'আপনার ব্রাউজারে পিডিএফ পেজ দেখুন।',
    category: 'popular',
    icon: '👁️',
    functional: true,
    status: 'AVAILABLE_NOW',
  },

  /* ---------------------------------------------------------------------- */
  /* Convert (11)                                                           */
  /* ---------------------------------------------------------------------- */
  {
    id: 'pdf-to-jpg',
    nameEn: 'PDF to JPG',
    nameBn: 'পিডিএফ থেকে JPG',
    descEn: 'Convert PDF pages to JPG images in your browser.',
    descBn: 'পিডিএফ পেজকে JPG ছবিতে রূপান্তর করুন।',
    category: 'convert',
    icon: '🖼️',
    functional: true,
    status: 'AVAILABLE_NOW',
  },
  {
    id: 'jpg-to-pdf',
    nameEn: 'JPG to PDF',
    nameBn: 'JPG থেকে পিডিএফ',
    descEn: 'Combine JPG images into a PDF in your browser.',
    descBn: 'ছবিগুলোকে একটি পিডিএফ ফাইলে পরিণত করুন।',
    category: 'convert',
    icon: '📷',
    functional: true,
    status: 'AVAILABLE_NOW',
  },
  {
    id: 'pdf-to-text',
    nameEn: 'PDF to Text',
    nameBn: 'পিডিএফ থেকে টেক্সট',
    descEn: 'Extract selectable text from PDF.',
    descBn: 'পিডিএফ থেকে নির্বাচনযোগ্য টেক্সট বের করুন।',
    category: 'convert',
    icon: '📝',
    functional: true,
    status: 'AVAILABLE_NOW',
  },
  {
    id: 'html-to-pdf',
    nameEn: 'HTML to PDF',
    nameBn: 'HTML থেকে পিডিএফ',
    descEn: 'Convert HTML pages or snippets to PDF.',
    descBn: 'HTML পেজ বা স্নিপেটকে পিডিএফে রূপান্তর করুন।',
    category: 'convert',
    icon: '🌐',
    functional: false,
    comingSoon: true,
  },
  {
    id: 'pdf-to-word',
    nameEn: 'PDF to Word',
    nameBn: 'পিডিএফ থেকে Word',
    descEn: 'Export an editable Word (.docx) file.',
    descBn: 'এডিটযোগ্য Word (.docx) ফাইল তৈরি করুন।',
    category: 'convert',
    icon: '📄',
    functional: false,
    comingSoon: true,
  },
  {
    id: 'pdf-to-excel',
    nameEn: 'PDF to Excel',
    nameBn: 'পিডিএফ থেকে Excel',
    descEn: 'Extract tables into Excel spreadsheets.',
    descBn: 'টেবিলগুলো Excel স্প্রেডশিটে বের করুন।',
    category: 'convert',
    icon: '📊',
    functional: false,
    comingSoon: true,
  },
  {
    id: 'pdf-to-ppt',
    nameEn: 'PDF to PowerPoint',
    nameBn: 'পিডিএফ থেকে PowerPoint',
    descEn: 'Convert PDF slides into a PPTX deck.',
    descBn: 'পিডিএফ স্লাইডকে PPTX ডেকে রূপান্তর করুন।',
    category: 'convert',
    icon: '📈',
    functional: false,
    comingSoon: true,
  },
  {
    id: 'pdf-to-png',
    nameEn: 'PDF to PNG',
    nameBn: 'পিডিএফ থেকে PNG',
    descEn: 'Convert PDF pages to PNG images in your browser.',
    descBn: 'পিডিএফ পেজকে ট্রান্সপারেন্ট PNG বানান।',
    category: 'convert',
    icon: '🌄',
    functional: true,
    status: 'AVAILABLE_NOW',
  },
  {
    id: 'extract-images',
    nameEn: 'Extract Images',
    nameBn: 'ছবি এক্সট্র্যাক্ট',
    descEn: 'Extract embedded raster images from PDF.',
    descBn: 'পিডিএফ থেকে এম্বেডেড রাস্টার ছবি বের করুন।',
    category: 'convert',
    icon: '🧩',
    functional: true,
    status: 'AVAILABLE_NOW',
  },
  {
    id: 'pdf-to-ebook',
    nameEn: 'PDF to eBook',
    nameBn: 'পিডিএফ থেকে eBook',
    descEn: 'Convert PDF into EPUB eBook format.',
    descBn: 'পিডিএফকে EPUB ই-বুক ফরম্যাটে রূপান্তর করুন।',
    category: 'convert',
    icon: '📚',
    functional: false,
    comingSoon: true,
    isNew: true,
  },
  {
    id: 'pdf-ocr',
    nameEn: 'PDF OCR',
    nameBn: 'পিডিএফ OCR',
    descEn: 'Extract text from scanned PDFs with OCR.',
    descBn: 'স্ক্যান করা পিডিএফ থেকে OCR দিয়ে টেক্সট বের করুন।',
    category: 'convert',
    icon: '🔍',
    functional: true,
    status: 'AVAILABLE_NOW',
  },

  /* ---------------------------------------------------------------------- */
  /* Optimize (9)                                                           */
  /* ---------------------------------------------------------------------- */
  {
    id: 'organize',
    nameEn: 'Organize PDF',
    nameBn: 'পিডিএফ অর্গানাইজ',
    descEn: 'Reorder, drag & drop pages into a new layout.',
    descBn: 'পেজ পুনর্বিন্যাস করে নতুন সাজান।',
    category: 'optimize',
    icon: '🗂️',
    functional: true,
    status: 'AVAILABLE_NOW',
  },
  {
    id: 'reverse',
    nameEn: 'Reverse PDF',
    nameBn: 'পিডিএফ রিভার্স',
    descEn: 'Flip page order — last page becomes first.',
    descBn: 'পেজ ক্রম উল্টে দিন — শেষ পেজ আগে।',
    category: 'optimize',
    icon: '↩️',
    functional: true,
    status: 'AVAILABLE_NOW',
  },
  {
    id: 'grayscale',
    nameEn: 'Grayscale PDF',
    nameBn: 'পিডিএফ গ্রেস্কেল',
    descEn: 'Convert color PDF to grayscale to save size.',
    descBn: 'কালার পিডিএফকে গ্রেস্কেল করে সাইজ বাঁচান।',
    category: 'optimize',
    icon: '⚪',
    functional: false,
    comingSoon: true,
  },
  {
    id: 'flatten',
    nameEn: 'Flatten PDF',
    nameBn: 'পিডিএফ ফ্ল্যাটেন',
    descEn: 'Flatten form fields into static PDF content.',
    descBn: 'ফর্ম ফিল্ড ও অ্যানোটেশন পেজে মিশিয়ে দিন।',
    category: 'optimize',
    icon: '🧱',
    functional: true,
    status: 'AVAILABLE_NOW',
  },
  {
    id: 'repair',
    nameEn: 'Repair PDF',
    nameBn: 'পিডিএফ রিপেয়ার',
    descEn: 'Fix corrupt or broken PDF files.',
    descBn: 'নষ্ট বা ভাঙা পিডিএফ ফাইল ঠিক করুন।',
    category: 'optimize',
    icon: '🛠️',
    functional: false,
    comingSoon: true,
  },
  {
    id: 'analyze',
    nameEn: 'Analyze PDF',
    nameBn: 'পিডিএফ অ্যানালাইজ',
    descEn: 'Inspect fonts, metadata, size, and structure.',
    descBn: 'ফন্ট, মেটাডাটা, সাইজ ও স্ট্রাকচার দেখুন।',
    category: 'optimize',
    icon: '🔬',
    functional: true,
    status: 'AVAILABLE_NOW',
  },
  {
    id: 'pdfa',
    nameEn: 'PDF to PDF/A',
    nameBn: 'পিডিএফ থেকে PDF/A',
    descEn: 'Archive-grade PDF/A conversion for long-term storage.',
    descBn: 'দীর্ঘমেয়াদি সংরক্ষণের জন্য PDF/A।',
    category: 'optimize',
    icon: '🗄️',
    functional: false,
    comingSoon: true,
  },
  {
    id: 'inspect',
    nameEn: 'Inspect PDF',
    nameBn: 'পিডিএফ ইন্সপেক্ট',
    descEn: 'Deep technical report on any PDF document.',
    descBn: 'যেকোনো পিডিএফের বিস্তারিত টেকনিক্যাল রিপোর্ট।',
    category: 'optimize',
    icon: '🔎',
    functional: true,
    status: 'AVAILABLE_NOW',
  },
  {
    id: 'version-converter',
    nameEn: 'PDF Version Converter',
    nameBn: 'পিডিএফ ভার্সন কনভার্টার',
    descEn: 'Convert between PDF 1.4, 1.7, 2.0 and more.',
    descBn: 'PDF 1.4, 1.7, 2.0 ইত্যাদির মধ্যে কনভার্ট করুন।',
    category: 'optimize',
    icon: '🔁',
    functional: false,
    comingSoon: true,
  },

  /* ---------------------------------------------------------------------- */
  /* Edit (17)                                                              */
  /* ---------------------------------------------------------------------- */
  {
    id: 'rotate',
    nameEn: 'Rotate PDF',
    nameBn: 'পিডিএফ রোটেট',
    descEn: 'Rotate every page 90°, 180° or 270°.',
    descBn: 'প্রতিটি পেজ ৯০°, ১৮০° বা ২৭০° ঘোরান।',
    category: 'edit',
    icon: '🔄',
    functional: true,
  },
  {
    id: 'watermark',
    nameEn: 'Watermark (Text)',
    nameBn: 'ওয়াটারমার্ক (টেক্সট)',
    descEn: 'Stamp text watermarks on every page.',
    descBn: 'প্রতিটি পেজে টেক্সট ওয়াটারমার্ক দিন।',
    category: 'edit',
    icon: '💧',
    functional: true,
    status: 'AVAILABLE_NOW',
  },
  {
    id: 'page-numbers',
    nameEn: 'Page Numbers',
    nameBn: 'পেজ নম্বর',
    descEn: 'Insert page numbers in custom position & format.',
    descBn: 'কাস্টম পজিশন ও ফরম্যাটে পেজ নম্বর যোগ করুন।',
    category: 'edit',
    icon: '🔢',
    functional: true,
    status: 'AVAILABLE_NOW',
  },
  {
    id: 'sign',
    nameEn: 'Sign PDF',
    nameBn: 'পিডিএফ সাইন',
    descEn: 'Draw or upload your signature onto PDFs.',
    descBn: 'আঁকা বা আপলোড করা স্বাক্ষর পিডিএফে বসান।',
    category: 'edit',
    icon: '✍️',
    functional: false,
    comingSoon: true,
  },
  {
    id: 'crop',
    nameEn: 'Crop PDF',
    nameBn: 'পিডিএফ ক্রপ',
    descEn: 'Adjust the visible page area (crop box).',
    descBn: 'পেজের দৃশ্যমান এলাকা (crop box) পরিবর্তন করুন।',
    category: 'edit',
    icon: '✂️',
    functional: true,
    status: 'LIMITED',
  },
  {
    id: 'metadata',
    nameEn: 'Edit Metadata',
    nameBn: 'মেটাডাটা এডিট',
    descEn: 'Edit title, author, subject & keywords.',
    descBn: 'টাইটেল, লেখক, বিষয় ও কিওয়ার্ড এডিট করুন।',
    category: 'edit',
    icon: '🏷️',
    functional: true,
  },
  {
    id: 'delete-pages',
    nameEn: 'Delete Pages',
    nameBn: 'পেজ ডিলিট',
    descEn: 'Remove unwanted pages from a PDF.',
    descBn: 'অানওয়ান্টেড পেজ পিডিএফ থেকে মুছুন।',
    category: 'edit',
    icon: '🗑️',
    functional: true,
    status: 'AVAILABLE_NOW',
  },
  {
    id: 'extract-pages',
    nameEn: 'Extract Pages',
    nameBn: 'পেজ এক্সট্র্যাক্ট',
    descEn: 'Pull selected pages into a new PDF.',
    descBn: 'নির্বাচিত পেজ আলাদা পিডিএফে বের করুন।',
    category: 'edit',
    icon: '📤',
    functional: true,
    status: 'AVAILABLE_NOW',
  },
  {
    id: 'redact',
    nameEn: 'Redact PDF',
    nameBn: 'পিডিএফ রিড্যাক্ট',
    descEn: 'Permanently black-out sensitive content.',
    descBn: 'সংবেদনশীল কনটেন্ট স্থায়ীভাবে কালো করুন।',
    category: 'edit',
    icon: '⬛',
    functional: false,
    comingSoon: true,
  },
  {
    id: 'compare',
    nameEn: 'Compare PDF',
    nameBn: 'পিডিএফ তুলনা',
    descEn: 'Diff two PDFs and highlight the changes.',
    descBn: 'দুটি পিডিএফ তুলনা করে পার্থক্য দেখান।',
    category: 'edit',
    icon: '🆚',
    functional: false,
    comingSoon: true,
  },
  {
    id: 'fill-forms',
    nameEn: 'Fill PDF Forms',
    nameBn: 'পিডিএফ ফর্ম পূরণ',
    descEn: 'Fill interactive PDF form fields in your browser.',
    descBn: 'ইন্টারঅ্যাকটিভ পিডিএফ ফর্ম পূরণ করুন।',
    category: 'edit',
    icon: '📋',
    functional: true,
    status: 'AVAILABLE_NOW',
  },
  {
    id: 'annotate',
    nameEn: 'Annotate PDF',
    nameBn: 'পিডিএফ অ্যানোটেট',
    descEn: 'Add highlights, notes, and drawings to PDFs.',
    descBn: 'পিডিএফে হাইলাইট, নোট ও আঁকা যোগ করুন।',
    category: 'edit',
    icon: '🖍️',
    functional: true,
    status: 'AVAILABLE_NOW',
  },
  {
    id: 'stamp',
    nameEn: 'Stamp PDF',
    nameBn: 'পিডিএফ স্ট্যাম্প',
    descEn: 'Add approved, draft, confidential, or custom stamps to PDF pages.',
    descBn: 'অনুমোদিত/খসড়া/গোপনীয় স্ট্যাম্প দিন।',
    category: 'edit',
    icon: '🔖',
    functional: true,
    status: 'AVAILABLE_NOW',
  },
  {
    id: 'manage-bookmarks',
    nameEn: 'Manage Bookmarks',
    nameBn: 'বুকমার্ক ম্যানেজ',
    descEn: 'Add, edit & remove PDF outline bookmarks.',
    descBn: 'পিডিএফ আউটলাইন বুকমার্ক যোগ/এডিট করুন।',
    category: 'edit',
    icon: '📑',
    functional: false,
    comingSoon: true,
  },
  {
    id: 'bookmarks-from-text',
    nameEn: 'Bookmarks from Text',
    nameBn: 'টেক্সট থেকে বুকমার্ক',
    descEn: 'Auto-generate bookmarks from headings.',
    descBn: 'হেডিং থেকে অটো বুকমার্ক তৈরি করুন।',
    category: 'edit',
    icon: '🧷',
    functional: false,
    comingSoon: true,
  },
  {
    id: 'qr-stamp',
    nameEn: 'QR Code Stamper',
    nameBn: 'QR কোড স্ট্যাম্পার',
    descEn: 'Embed a scannable QR code onto PDF pages.',
    descBn: 'প্রতিটি পেজে QR কোড বসিয়ে দিন।',
    category: 'edit',
    icon: '📱',
    functional: true,
    status: 'AVAILABLE_NOW',
  },
  {
    id: 'edit-text',
    nameEn: 'Edit PDF Text',
    nameBn: 'পিডিএফ টেক্সট এডিট',
    descEn: 'Edit text directly inside the PDF.',
    descBn: 'পিডিএফের ভেতরের টেক্সট সরাসরি এডিট করুন।',
    category: 'edit',
    icon: '🖋️',
    functional: false,
    comingSoon: true,
    isNew: true,
  },

  /* ---------------------------------------------------------------------- */
  /* Security (2)                                                           */
  /* ---------------------------------------------------------------------- */
  {
    id: 'protect',
    nameEn: 'Protect PDF',
    nameBn: 'পিডিএফ প্রটেক্ট',
    descEn: 'Add a password & encrypt your PDF.',
    descBn: 'পাসওয়ার্ড ও এনক্রিপশন যোগ করুন।',
    category: 'security',
    icon: '🔒',
    functional: false,
    comingSoon: true,
  },
  {
    id: 'unlock',
    nameEn: 'Unlock PDF',
    nameBn: 'পিডিএফ আনলক',
    descEn: 'Remove password & restrictions from PDFs.',
    descBn: 'পিডিএফ থেকে পাসওয়ার্ড ও রেস্ট্রিকশন সরান।',
    category: 'security',
    icon: '🔓',
    functional: false,
    comingSoon: true,
  },
]

export const CATEGORY_LABELS: Record<
  PdfToolCategory,
  { en: string; bn: string }
> = {
  popular: { en: 'Popular', bn: 'জনপ্রিয়' },
  convert: { en: 'Convert', bn: 'কনভার্ট' },
  optimize: { en: 'Optimize', bn: 'অপ্টিমাইজ' },
  edit: { en: 'Edit', bn: 'এডিট' },
  security: { en: 'Security', bn: 'সিকিউরিটি' },
}

export const TOTAL_TOOL_COUNT = PDF_TOOLS.length

/** Dynamic tool status counts — derived from the canonical registry, never hard-coded. */
export const AVAILABLE_NOW_COUNT = PDF_TOOLS.filter(
  (t) => t.functional && t.status !== 'LIMITED',
).length
export const LIMITED_COUNT = PDF_TOOLS.filter(
  (t) => t.functional && t.status === 'LIMITED',
).length
export const ROADMAP_COUNT = PDF_TOOLS.filter((t) => !t.functional).length

