// JSON-LD builders for structured data (schema.org)

export function breadcrumbJsonLd(base, items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${base}${item.path}`,
    })),
  };
}

export function faqJsonLd(faqs = []) {
  const valid = faqs.filter((f) => f && f.question && f.answer);
  if (valid.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: valid.map((f) => ({
      '@type': 'Question',
      name: f.question || f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.answer || f.a },
    })),
  };
}

export function localBusinessJsonLd(base, settings = {}) {
  const a = settings.address || {};
  const phones = (settings.phones || []).map((p) => p.raw || p.display).filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${base}/#organization`,
    name: settings.legalName || settings.name || 'Ideate X',
    url: base,
    image: `${base}/logo-ideatex.png`,
    logo: `${base}/logo-ideatex.png`,
    description: 'Creative production, digital marketing and technology development for businesses, based in Chennai.',
    email: settings.email,
    ...(phones.length ? { telephone: phones[0] } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: [a.line1, a.line2].filter(Boolean).join(', '),
      addressLocality: a.city || 'Chennai',
      addressRegion: a.state || 'Tamil Nadu',
      postalCode: a.postalCode,
      addressCountry: 'IN',
    },
    areaServed: [{ '@type': 'City', name: 'Chennai' }, { '@type': 'Country', name: 'India' }],
    contactPoint: phones.map((telephone) => ({
      '@type': 'ContactPoint',
      telephone,
      contactType: 'sales',
      areaServed: 'IN',
      availableLanguage: ['English', 'Tamil'],
    })),
    sameAs: Object.values(settings.socialLinks || {}).filter(Boolean),
  };
}
