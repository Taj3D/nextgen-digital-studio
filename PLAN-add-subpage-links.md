# Plan: Homepage-এ Missing Subpage Links যোগ করা

## 📊 বর্তমান অবস্থার সঠিক বিশ্লেষণ

### ✅ যা আছে (ক্ষতি হয়নি)
| উপাদান | অবস্থা |
|--------|--------|
| ৬টি সাবপেজ সচল | সব পেজ 100% কাজ করছে, SEO meta ঠিক আছে |
| Navbar "More" dropdown | ৫টি পেজের link আছে (client-side rendered) |
| Footer "Company" column | `/founder`, `/blog`, `/case-studies` linked |
| Footer "Services" column | ৬টি service page linked |

### ❌ যা গর্ত (আসল সমস্যা)
| সমস্যা | প্রভাব |
|--------|-------|
| Navbar dropdown client-side rendered | Google crawler static HTML-এ link দেখে না (SEO weak) |
| Footer-এ Products/Training নেই | ৫টি revenue page footer-ে invisible |
| Homepage-এ কোনো section এই ৫টি page showcase করে না | ভিজিটর homepage-এ এই products সম্পর্কে জানতেই পারে না |
| কোনো static HTML link নেই | Internal linking দুর্বল → SEO crawl depth বেশি |

### সংক্ষেপে সমস্যা:
> পেজগুলো "alive" কিন্তু "invisible"। Direct URL বা "More" dropdown click ছাড়া কেউ পৌঁছাতে পারে না। Google-এর জন্য static HTML-ে এই link গুলো নেই।

---

## 🎯 লক্ষ্য
১. **SEO**: Static HTML-এ ৫টি page-এর direct link যোগ করা
২. **UX/Discoverability**: Homepage-এ এই products visually showcase করা
৩. **CRO**: প্রতিটি product-এর জন্য clear conversion path তৈরি করা
৪. **Footer completeness**: Footer-এ একটি "Products & Training" column যোগ করা

---

## 🏗️ Implementation Plan — 3-Layer Architecture

### Layer 1: নতুন Homepage Section — "Products & Training Showcase"
**ফাইল**: `src/components/site/sections/products-training.tsx` (নতুন)

**কী থাকবে**:
- Section title: "Explore Our Products & Training" (EN) / "আমাদের প্রোডাক্ট ও ট্রেনিং" (BN)
- Eyebrow chip: "Beyond Services" / "সেবার বাইরে"
- ৫টি card grid (responsive: 1 col mobile → 2 col tablet → 3 col desktop, 2-row layout):

| # | Product | Icon | Card Content | Link |
|---|---------|------|-------------|------|
| 1 | AI Software Builder Bootcamp | `GraduationCap` | "Build Software with AI in 1 Week" + price badge | `/ai-training` |
| 2 | CNC 3D Design Training | `Wrench` | "1 Week Course (250TK) + Free Chair Leg" | `/cnc-training` |
| 3 | CNC Design Bundle | `Database` | "150TK for 150GB Design Files" | `/cnc-design` |
| 4 | CNC 3D Wooden Portrait | `Frame` | "Preserve Family Memories Forever" | `/3d-portrait` |
| 5 | PDF Books Bundle | `BookOpen` | "5 Books, Buy 1 Get 1 Free" | `/pdf-books` |

**Design specs**:
- `'use client'` component, bilingual via `t()` from `useLang()`
- Reuse `Reveal`, `SectionShell`, `staggerContainer`, `staggerItem` from existing `reveal.tsx`
- Reuse `Card` from `@/components/ui/card`
- Emerald/teal gradient accents (consistent with brand)
- Hover glow effect (consistent with `why-choose-us.tsx` pattern)
- Price badges in emerald
- Each card: icon, title, 1-line desc, price/offer badge, "Learn more →" link
- Static `<Link>` elements (server-rendered for SEO)

**Placement in page.tsx**:
```
After ResourcesHub, before EmailFunnel:
  <ResourcesHub />
+ <ProductsTraining />    ← NEW
  <EmailFunnel />
```
**কেন এই position**: Resources (blog, ebook) → Products & Training (paid offerings) → Email Funnel একটি natural flow তৈরি করে। "Free resources দেখলেন, এবার আমাদের paid products-এ যেতে পারেন।"

---

### Layer 2: Footer Enhancement — নতুন "Products & Training" Column
**ফাইল**: `src/components/site/footer.tsx` (edit)

**পরিবর্তন**:
বর্তমান footer grid: `lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]` (Brand, Company, Services, Newsletter)

নতুন grid: `lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr]` (Brand, Company, Services, **Products & Training**, Newsletter)

**নতুন column**:
```tsx
{/* Col 4 — Products & Training (NEW) */}
<div className="space-y-3.5">
  <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
    {t('footer.productsTitle')}
  </h3>
  <ul className="space-y-2">
    {PRODUCT_LINKS.map((item) => (
      <li key={item.key}>
        <Link href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
          {t(item.key)}
        </Link>
      </li>
    ))}
  </ul>
</div>
```

`PRODUCT_LINKS` array:
```tsx
const PRODUCT_LINKS = [
  { key: 'footer.aiTraining', href: '/ai-training' },
  { key: 'footer.cncTraining', href: '/cnc-training' },
  { key: 'footer.cncDesign', href: '/cnc-design' },
  { key: 'footer.3dPortrait', href: '/3d-portrait' },
  { key: 'footer.pdfBooks', href: '/pdf-books' },
]
```

---

### Layer 3: Navbar "More" Dropdown Rename (optional polish)
**ফাইল**: `src/components/site/navbar.tsx` (edit)

বর্তমান label: "More" / "আরও"
প্রস্তাবিত label: "Products & More" / "প্রোডাক্ট ও আরও"

এটি dropdown-এর উদ্দেশ্য আরো clear করবে। (optional — করলে ভালো, না করলেও চলবে)

---

## 📝 অতিরিক্ত কাজ — Translation Keys

`src/components/site/language-provider.tsx`-এ নিচের keys যোগ করতে হবে:

### English block:
```typescript
'footer.productsTitle': 'Products & Training',
'footer.aiTraining': 'AI Software Bootcamp',
'footer.cncTraining': 'CNC 3D Design Training',
'footer.cncDesign': 'CNC Design Bundle',
'footer.3dPortrait': '3D Wooden Portrait',
'footer.pdfBooks': 'PDF Books Bundle',

'productsTraining.eyebrow': 'Beyond Services',
'productsTraining.title': 'Explore Our Products & Training',
'productsTraining.subtitle': 'Beyond AI agency services, we build digital products and hands-on training programs — designed to make you self-sufficient.',
'productsTraining.aiTraining.title': 'AI Software Builder Bootcamp',
'productsTraining.aiTraining.desc': 'Build software with AI in just 1 week.',
'productsTraining.aiTraining.badge': 'Bootcamp',
'productsTraining.cncTraining.title': 'CNC 3D Design Training',
'productsTraining.cncTraining.desc': '1-week course + free chair leg sample.',
'productsTraining.cncTraining.badge': '250৳',
'productsTraining.cncDesign.title': 'CNC Design Bundle',
'productsTraining.cncDesign.desc': '150GB of premium CNC design files.',
'productsTraining.cncDesign.badge': '150৳',
'productsTraining.3dPortrait.title': 'CNC 3D Wooden Portrait',
'productsTraining.3dPortrait.desc': 'Preserve family memories in wood forever.',
'productsTraining.3dPortrait.badge': 'Made to order',
'productsTraining.pdfBooks.title': 'PDF Books Bundle',
'productsTraining.pdfBooks.desc': '5 books, buy 1 get 1 free.',
'productsTraining.pdfBooks.badge': 'Buy 1 Get 1',
'productsTraining.learnMore': 'Learn more',
```

### Bengali block (mirror):
```typescript
'footer.productsTitle': 'প্রোডাক্ট ও ট্রেনিং',
'footer.aiTraining': 'এআই সফটওয়্যার বুটক্যাম্প',
'footer.cncTraining': 'সিএনসি ৩ডি ডিজাইন ট্রেনিং',
'footer.cncDesign': 'সিএনসি ডিজাইন বান্ডল',
'footer.3dPortrait': 'থ্রিডি উডেন পোর্ট্রেট',
'footer.pdfBooks': 'পিডিএফ বই বান্ডল',

'productsTraining.eyebrow': 'সেবার বাইরে',
'productsTraining.title': 'আমাদের প্রোডাক্ট ও ট্রেনিং ঘুরে দেখুন',
'productsTraining.subtitle': 'এআই এজেন্সি সেবার পাশাপাশি আমরা ডিজিটাল প্রোডাক্ট ও হাতে-কলমে ট্রেনিং প্রোগ্রাম তৈরি করি — যাতে আপনি নিজে স্বয়ংসম্পূর্ণ হতে পারেন।',
'productsTraining.aiTraining.title': 'এআই সফটওয়্যার বিল্ডার বুটক্যাম্প',
'productsTraining.aiTraining.desc': 'মাত্র ১ সপ্তাহে এআই দিয়ে সফটওয়্যার বানান।',
'productsTraining.aiTraining.badge': 'বুটক্যাম্প',
'productsTraining.cncTraining.title': 'সিএনসি ৩ডি ডিজাইন ট্রেনিং',
'productsTraining.cncTraining.desc': '১ সপ্তাহের কোর্স + ফ্রি চেয়ার লেগ।',
'productsTraining.cncTraining.badge': '২৫০৳',
'productsTraining.cncDesign.title': 'সিএনসি ডিজাইন বান্ডল',
'productsTraining.cncDesign.desc': '১৫০ জিবি প্রিমিয়াম সিএনসি ডিজাইন।',
'productsTraining.cncDesign.badge': '১৫০৳',
'productsTraining.3dPortrait.title': 'সিএনসি থ্রিডি উডেন পোর্ট্রেট',
'productsTraining.3dPortrait.desc': 'পরিবারের স্মৃতি কাঠে চিরকাল সংরক্ষণ।',
'productsTraining.3dPortrait.badge': 'অর্ডারে তৈরি',
'productsTraining.pdfBooks.title': 'পিডিএফ বই বান্ডল',
'productsTraining.pdfBooks.desc': '৫টি বই, কিনলে ১টি ফ্রি।',
'productsTraining.pdfBooks.badge': 'কিনলে ১ ফ্রি',
'productsTraining.learnMore': 'বিস্তারিত দেখুন',
```

---

## 📋 Implementation Steps (Task Order)

| Step | Task | ফাইল | Type |
|------|------|-------|------|
| 1 | Translation keys যোগ করা (EN + BN) | `language-provider.tsx` | edit |
| 2 | নতুন section component তৈরি | `sections/products-training.tsx` | new file |
| 3 | Section-কে page.tsx-এ যোগ করা | `page.tsx` | edit (1 import + 1 JSX) |
| 4 | Footer-এ Products column যোগ | `footer.tsx` | edit (grid + 1 column) |
| 5 | Navbar "More" label rename (optional) | `navbar.tsx` + `language-provider.tsx` | edit |
| 6 | Lint check | `bun run lint` | verify |
| 7 | Dev server-এ browser verification | Agent Browser | verify |

**Estimated effort**: ১টি focused implementation pass — প্রায় 20-30 মিনিট।

---

## ✅ প্রত্যাশিত ফলাফল

1. **SEO**: Static HTML-ে ৫টি page-এর direct `<a href>` link থাকবে (homepage section + footer = ১০টি static link)
2. **UX**: Homepage-এ ভিজিটর এই ৫টি product দেখতে পাবে visually appealing card আকারে
3. **Discoverability**: Footer থেকে যেকোনো page থেকে এই ৫টি page-এ যাওয়া যাবে
4. **Conversion**: প্রতিটি card-এ clear CTA → respective landing page
5. **Bilingual**: সব নতুন content EN + BN দুটোতেই থাকবে
6. **Brand consistency**: existing emerald/teal theme, Reveal animations, SectionShell pattern follow করা হবে

---

## ⚠️ ঝুঁকি ও সতর্কতা

- **Footer grid layout**: ৫ column যোগ করলে `lg:` breakpoint-এ তাদের প্রশস্ততা আরও ছোট হবে — responsive টেস্ট করতে হবে
- **Bengali digit conversion**: price badge-এ ৳ মান BN mode-এ বাংলা সংখ্যায় দেখাতে হবে (`bn()` helper ব্যবহার)
- **No datafetching**: সব content static, কোনো API call লাগবে না
- **Existing sitemap**: এই ৫টি page সম্ভবত already sitemap-এ আছে — verify করা দরকার না (pages exist এবং crawl হচ্ছে)
