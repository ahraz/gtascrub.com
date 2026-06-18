#!/usr/bin/env python3
"""SEO enhancements for GTA Scrub website — adds FAQ schema, content, and structured data."""

import os, re

SERVICE_FAQS = {
    "office-cleaning-gta": {
        "title": "Office Cleaning",
        "faqs": [
            ("How much does office cleaning cost in the GTA?",
             "Office cleaning in the GTA ranges from $0.08 to $0.12 per square foot per visit. A 5,000 sq ft office typically costs $400-$600 per visit. GTA Scrub offers free, no-obligation quotes with transparent flat-rate pricing — no hidden fees."),
            ("What's included in a standard office cleaning?",
             "Standard office cleaning includes emptying trash bins, wiping and sanitizing desks, vacuuming carpets, mopping hard floors, cleaning washrooms, sanitizing break rooms, cleaning interior glass, and disinfecting high-touch surfaces. Every clean comes with a CleanCheck photo report."),
            ("How often should my office be professionally cleaned?",
             "Most GTA offices with 10-30 employees benefit from weekly professional cleaning. High-traffic offices and customer-facing spaces may need daily service, while smaller offices can manage with bi-weekly or monthly cleaning."),
            ("Do you offer evening or weekend office cleaning?",
             "Yes. We schedule office cleaning during evenings, overnight, and weekends to minimize disruption to your business operations. Our dedicated teams work around your hours, not the other way around."),
            ("Are your office cleaners insured and background checked?",
             "Absolutely. Every GTA Scrub team member undergoes a criminal background check. We carry comprehensive liability insurance, bonding, and WSIB coverage. Proof of insurance is available on request.")
        ]
    },
    "medical-office-cleaning-gta": {
        "title": "Medical Office Cleaning",
        "faqs": [
            ("What PHO guidelines do you follow for medical office cleaning?",
             "We follow Public Health Ontario (PHO) and OSHA guidelines for infection control, including colour-coded microfiber systems, hospital-grade disinfectants, proper biohazard disposal, and terminal cleaning protocols for treatment areas."),
            ("How often should a medical office be cleaned?",
             "Medical offices require daily professional cleaning with examination rooms sanitized between each patient. Waiting rooms need daily cleaning, and treatment areas require terminal cleaning daily. Our programs are designed to meet or exceed PHO standards."),
            ("Do you clean dental offices specifically?",
             "Yes. We specialize in dental office cleaning, including proper handling of amalgam waste, suction system cleaning, dental unit waterline maintenance, and aerosol control protocols per PHO dental guidelines."),
            ("What infection control training do your cleaners have?",
             "Our medical cleaning teams complete specialized infection control training covering bloodborne pathogens, cross-contamination prevention, proper use of PPE, colour-coded microfiber protocols, and Ontario biohazard waste disposal regulations."),
            ("Do you provide biohazard disposal services?",
             "Yes. We handle proper segregation, containment, and disposal of biomedical waste per Ontario regulations, including sharps disposal, pathological waste, and pharmaceutical waste management.")
        ]
    },
    "post-construction-cleaning-gta": {
        "title": "Post-Construction Cleaning",
        "faqs": [
            ("What are the phases of post-construction cleaning?",
             "Post-construction cleaning has 5 phases: 1) Heavy debris removal, 2) HEPA vacuuming and dust control on all surfaces, 3) Window and glass cleaning, 4) Kitchen and washroom deep cleaning, 5) Floor care and final polish."),
            ("How much does post-construction cleaning cost in the GTA?",
             "Post-construction cleaning is priced per project, typically $0.20 to $0.50 per square foot depending on debris level, dust, and finish requirements. We provide free on-site estimates for GTA commercial projects."),
            ("When should post-construction cleaning be scheduled?",
             "Schedule post-construction cleaning after all trades have finished but before occupancy. The space should be free of large debris. We work with property managers to coordinate timing between contractor completion and move-in."),
            ("Do you remove construction debris?",
             "Yes. Phase 1 includes removing drywall scraps, lumber offcuts, packaging materials, and general construction waste. We haul away debris so your space is ready for detailed cleaning."),
            ("Can you clean construction dust from HVAC vents?",
             "Yes. HEPA vacuuming of HVAC vents, registers, and duct openings is a critical part of our dust control phase. This prevents construction dust from circulating through your building's ventilation system.")
        ]
    },
    "warehouse-cleaning-gta": {
        "title": "Warehouse & Industrial Cleaning",
        "faqs": [
            ("How much does warehouse cleaning cost?",
             "Warehouse cleaning typically costs $0.06 to $0.10 per square foot. A 30,000 sq ft facility in Brampton would cost approximately $1,800-$3,000 per month for weekly service."),
            ("What equipment do you use for warehouse cleaning?",
             "We use industrial-grade ride-on scrubbers, sweepers, HEPA backpack vacuums, and pressure washers for large-scale warehouse and industrial facility cleaning."),
            ("Can you work around our operating hours?",
             "Absolutely. We clean warehouses during off-hours, overnight shifts, and weekends to avoid disrupting your operations, shipping schedules, and staff."),
            ("Do you clean warehouse offices and break rooms too?",
             "Yes. Our warehouse cleaning includes office areas, break rooms, washrooms, and lunch facilities within the facility. We customize the scope based on your layout."),
            ("Is warehouse cleaning different from office cleaning?",
             "Yes. Warehouse cleaning requires heavy-duty equipment for large floor areas, industrial dust control, rack and shelving cleaning, dock area maintenance, and specialized floor care for concrete surfaces.")
        ]
    },
    "window-cleaning-gta": {
        "title": "Window Cleaning",
        "faqs": [
            ("How often should commercial windows be cleaned?",
             "Most GTA businesses benefit from quarterly window cleaning. Storefronts and ground-level windows may need monthly cleaning. High-rise buildings typically schedule bi-annual cleaning to manage costs."),
            ("Do you clean windows in high-rise buildings?",
             "Yes. Our team handles low-rise and high-rise commercial window cleaning using water-fed poles, rope access, and aerial lift equipment. We follow all Ontario safety regulations."),
            ("What does commercial window cleaning include?",
             "Commercial window cleaning includes washing all glass surfaces, cleaning frames and tracks, removing hard water stains, and streak-free finishing. We also clean storefront windows, curtain walls, and skylights."),
            ("Do you offer interior window cleaning too?",
             "Yes. We clean both interior and exterior commercial windows. Interior window cleaning includes sills, tracks, and blinds. We schedule interior cleaning during off-hours to avoid disruption."),
            ("Do you remove paint splatter or stickers from windows?",
             "Yes. We include removal of construction film, paint splatter, sticker residue, and adhesive marks as part of our post-construction or first-time deep window cleaning service.")
        ]
    },
    "floor-care-stripping-gta": {
        "title": "Floor Care & Stripping",
        "faqs": [
            ("How often should commercial floors be stripped and waxed?",
             "Most commercial floors need stripping and waxing every 12-18 months. High-traffic areas like entrances and corridors may need it every 6-12 months. Our team assesses your floor condition and recommends a schedule."),
            ("What types of floors do you service?",
             "We service all commercial flooring: VCT (vinyl composition tile), hardwood, laminate, luxury vinyl plank (LVP), tile and grout, concrete, and polished concrete. Each type requires specific products and techniques."),
            ("How long does floor stripping and waxing take?",
             "A typical 5,000 sq ft office takes 6-10 hours for complete strip and wax. We schedule this work on weekends or overnight to avoid disrupting your business. Floors are walkable within 2-4 hours after finishing."),
            ("Do you offer floor buffing and burnishing?",
             "Yes. We provide routine buffing and burnishing services to maintain floor shine between full strip and wax cycles. This extends the life of your floor finish and keeps floors looking professional."),
            ("Do you move furniture during floor care?",
             "Yes. We move desks, chairs, and light furniture before floor work. We use furniture sliders and floor protectors to prevent damage. Heavy items like filing cabinets can be worked around if needed.")
        ]
    },
    "carpet-cleaning-gta": {
        "title": "Carpet Cleaning",
        "faqs": [
            ("How often should commercial carpets be professionally cleaned?",
             "Industry standards recommend professional carpet cleaning every 6-12 months. High-traffic areas may need quarterly cleaning. Regular cleaning extends carpet life by 3-5 years and improves indoor air quality."),
            ("What method do you use for carpet cleaning?",
             "We use hot water extraction (steam cleaning) with truck-mounted or portable units. This method removes deep dirt, allergens, and bacteria while using eco-friendly cleaning solutions."),
            ("How long does carpet take to dry after cleaning?",
             "Carpets typically dry within 4-6 hours with our truck-mounted extraction system. We use low-moisture techniques and high-velocity air movers to speed drying time, minimizing business disruption."),
            ("Do you treat stains and high-traffic areas?",
             "Yes. We pre-treat all visible stains and high-traffic soiled areas before the full cleaning. Spot treatments address coffee, ink, food, and other common office stains."),
            ("Do you offer carpet deodorizing?",
             "Yes. We include deodorizing treatments as part of our carpet cleaning service. We also offer pet odor treatment, smoke odor removal, and sanitizing treatments for medical facilities.")
        ]
    },
    "janitorial-services-gta": {
        "title": "Janitorial Services",
        "faqs": [
            ("What's the difference between janitorial and cleaning services?",
             "Janitorial services are high-frequency, surface-level maintenance (daily/weekly) — emptying bins, vacuuming, sanitizing washrooms. Office cleaning adds deeper tasks like carpet shampooing, floor stripping, and window washing."),
            ("What does nightly janitorial service include?",
             "Nightly janitorial includes emptying all trash bins, vacuuming carpets, mopping hard floors, cleaning and sanitizing washrooms, dusting visible surfaces, restocking supplies, and spot-cleaning kitchen/break room."),
            ("Can janitorial services be customized for my business?",
             "Yes. We customize janitorial programs based on your facility size, industry, traffic levels, and specific requirements. Our free assessment helps design the right scope and frequency."),
            ("Do you provide janitorial supplies and equipment?",
             "Yes. We bring all professional-grade cleaning supplies, equipment, and PPE. We can also supply eco-friendly or green-certified products at no extra cost."),
            ("Are your janitorial teams supervised?",
             "Yes. Every janitorial team has a dedicated supervisor who conducts regular quality inspections. Combined with our CleanCheck photo-verified reports, we maintain consistent quality across all visits.")
        ]
    }
}

CITY_FAQS_TEMPLATE = {
    "faqs": [
        ("What commercial cleaning services do you offer in {city}?",
         "We offer comprehensive commercial cleaning in {city}: office cleaning, medical office cleaning, post-construction cleaning, warehouse cleaning, window cleaning, floor care, carpet cleaning, and janitorial services. All services include CleanCheck photo-verified reports."),
        ("How much does commercial cleaning cost in {city}?",
         "Commercial cleaning in {city} ranges from $0.08 to $0.25 per square foot depending on service type and frequency. We provide free, no-obligation quotes with transparent flat-rate pricing — no hidden fees."),
        ("Are your cleaners serving {city} insured and background checked?",
         "Yes. Every GTA Scrub cleaner serving {city} undergoes a criminal background check. We carry comprehensive liability insurance, bonding, and WSIB coverage for complete peace of mind."),
        ("How quickly can you start commercial cleaning in {city}?",
         "Most clients in {city} are up and running within 3-5 business days. We conduct a walkthrough, create a custom cleaning plan, and schedule your first clean. Evening and weekend cleaning is available."),
        ("Do you serve all of {city} for commercial cleaning?",
         "Yes, we serve all areas of {city} for commercial cleaning. Whether you're downtown, in the industrial areas, or suburban commercial zones, our teams can provide service.")
    ]
}

CITY_NAME_MAP = {
    "brampton": "Brampton",
    "mississauga": "Mississauga",
    "toronto": "Toronto",
    "vaughan": "Vaughan",
    "markham": "Markham",
    "scarborough": "Scarborough",
    "etobicoke": "Etobicoke",
    "north-york": "North York",
    "richmond-hill": "Richmond Hill",
    "oakville": "Oakville",
    "burlington": "Burlington",
    "ajax": "Ajax",
    "whitby": "Whitby",
    "pickering": "Pickering"
}


def build_faq_schema(faqs):
    """Build JSON-LD FAQPage schema from list of (question, answer) tuples."""
    entities = []
    for q, a in faqs:
        safe_a = a.replace('"', '\\"').replace("'", "\\'")
        safe_q = q.replace('"', '\\"').replace("'", "\\'")
        entities.append(f'{{"@type":"Question","name":"{safe_q}","acceptedAnswer":{{"@type":"Answer","text":"{safe_a}"}}}}')
    schema = '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[' + ','.join(entities) + ']}'
    return schema


def build_faq_html(faqs, title="Frequently Asked Questions"):
    """Build visible FAQ HTML section."""
    items_html = ""
    for q, a in faqs:
        safe_q = q.replace('"', '&quot;')
        items_html += f'''
<div class="faq-item">
<button class="faq-q" aria-expanded="false">{safe_q}</button>
<div class="faq-a"><p>{a}</p></div>
</div>'''
    html = f'''
<section class="section" style="background:var(--off)" id="faq"><div class="container">
<div class="section-header"><h2>{title} <span style="color:var(--green)">FAQ</span></h2></div>
{items_html}
</div></section>'''
    return html


def inject_before(content, marker, injection):
    """Inject content before the first occurrence of marker."""
    idx = content.find(marker)
    if idx == -1:
        return content
    return content[:idx] + injection + content[idx:]


def inject_after(content, marker, injection):
    """Inject content after the first occurrence of marker."""
    idx = content.find(marker)
    if idx == -1:
        return content
    return content[:idx + len(marker)] + injection + content[idx + len(marker):]


def add_schema_to_head(content, schema):
    """Add JSON-LD schema to the head section."""
    tag = f'<script type="application/ld+json">{schema}</script>\n'
    # Insert before </head>
    return content.replace('</head>', tag + '</head>')


def enhance_service_pages():
    base = '/workspace/gtascrub.com'
    for slug, data in SERVICE_FAQS.items():
        path = f'{base}/{slug}/index.html'
        if not os.path.exists(path):
            print(f"  SKIP (not found): {path}")
            continue
        
        with open(path, 'r') as f:
            content = f.read()
        
        orig = content
        
        # 1. Add FAQPage schema to head
        schema = build_faq_schema(data["faqs"])
        content = add_schema_to_head(content, schema)
        
        # 2. Add visible FAQ section before stats-bar
        faq_html = build_faq_html(data["faqs"], f'{data["title"]}')
        content = content.replace('<section class="stats-bar"', faq_html + '\n<section class="stats-bar"')
        
        if content != orig:
            with open(path, 'w') as f:
                f.write(content)
            print(f"  ✅ {slug}/index.html — FAQ schema + visible FAQ added")
        else:
            print(f"  ⚠️ {slug}/index.html — no changes made")


def enhance_city_pages():
    base = '/workspace/gtascrub.com'
    for slug, city in CITY_NAME_MAP.items():
        path = f'{base}/commercial-cleaning-{slug}/index.html'
        if not os.path.exists(path):
            print(f"  SKIP (not found): {path}")
            continue
        
        with open(path, 'r') as f:
            content = f.read()
        
        orig = content
        
        # Build city-specific FAQs
        faqs = []
        for q, a in CITY_FAQS_TEMPLATE["faqs"]:
            faqs.append((q.format(city=city), a.format(city=city)))
        
        # 1. Add FAQPage schema to head
        schema = build_faq_schema(faqs)
        content = add_schema_to_head(content, schema)
        
        # 2. Add visible FAQ before stats-bar
        faq_html = build_faq_html(faqs, f'Commercial Cleaning in {city}')
        content = content.replace('<section class="stats-bar"', faq_html + '\n<section class="stats-bar"')
        
        if content != orig:
            with open(path, 'w') as f:
                f.write(content)
            print(f"  ✅ commercial-cleaning-{slug}/ — FAQ schema + visible FAQ added")
        else:
            print(f"  ⚠️ commercial-cleaning-{slug}/ — no changes made")


def enhance_blog_index():
    """Add BlogPosting/CollectionPage schema to blog index."""
    path = '/workspace/gtascrub.com/blog/index.html'
    with open(path, 'r') as f:
        content = f.read()
    
    # Add Blog schema
    schema = '''{"@context":"https://schema.org","@type":"CollectionPage","name":"GTA Scrub Blog - Commercial Cleaning Tips & Guides","description":"Expert commercial cleaning guides, tips, and insights for GTA businesses. Office cleaning, medical sanitation, green cleaning and more.","url":"https://gtascrub.com/blog/","publisher":{"@type":"Organization","name":"GTA Scrub","logo":{"@type":"ImageObject","url":"https://gtascrub.com/og-image.svg"}}}'''
    content = add_schema_to_head(content, schema)
    
    with open(path, 'w') as f:
        f.write(content)
    print("  ✅ blog/index.html — CollectionPage schema added")


def enhance_blog_posts():
    """Add related service links and enhance schema on blog posts."""
    base = '/workspace/gtascrub.com/blog'
    for fname in os.listdir(base):
        if fname == 'index.html' or not fname.endswith('.html'):
            continue
        path = os.path.join(base, fname)
        
        with open(path, 'r') as f:
            content = f.read()
        
        orig = content
        
        # Add related services section before the footer
        related_section = '''
<section class="section" style="background:var(--off)"><div class="container">
<div class="section-header"><h2>Professional Commercial Cleaning <span style="color:var(--green)">in the GTA</span></h2><p>Need expert cleaning services? GTA Scrub provides photo-verified commercial cleaning across Brampton, Mississauga, Toronto, and all GTA cities.</p></div>
<div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center">
<a href="/office-cleaning-gta/" class="btn-primary" style="font-size:.85rem;padding:10px 20px">Office Cleaning</a>
<a href="/medical-office-cleaning-gta/" class="btn-primary" style="font-size:.85rem;padding:10px 20px">Medical Office Cleaning</a>
<a href="/post-construction-cleaning-gta/" class="btn-primary" style="font-size:.85rem;padding:10px 20px">Post-Construction Cleaning</a>
<a href="/warehouse-cleaning-gta/" class="btn-primary" style="font-size:.85rem;padding:10px 20px">Warehouse Cleaning</a>
<a href="/contact.html" class="btn-primary" style="font-size:.85rem;padding:10px 20px">Get a Free Quote →</a>
</div></div></section>'''
        
        # Insert before the footer
        content = content.replace('<footer class="footer"', related_section + '\n<footer class="footer"')
        
        if content != orig:
            with open(path, 'w') as f:
                f.write(content)
            print(f"  ✅ {fname} — related services section added")


def enhance_case_studies():
    """Add schema to case study pages."""
    base = '/workspace/gtascrub.com/case-studies'
    
    # Case study index
    idx_path = os.path.join(base, 'index.html')
    with open(idx_path, 'r') as f:
        content = f.read()
    schema = '''{"@context":"https://schema.org","@type":"CollectionPage","name":"GTA Scrub Case Studies","description":"Real commercial cleaning success stories from GTA businesses. See how GTA Scrub delivered measurable results.","url":"https://gtascrub.com/case-studies/"}'''
    content = add_schema_to_head(content, schema)
    with open(idx_path, 'w') as f:
        f.write(content)
    print("  ✅ case-studies/index.html — CollectionPage schema added")


def update_sitemap():
    """Regenerate sitemap with proper dates."""
    from datetime import datetime
    today = datetime.now().strftime('%Y-%m-%d')
    
    pages = [
        (1.0, 'weekly', '/'),
        (0.9, 'monthly', '/services.html'),
        (0.9, 'monthly', '/office-cleaning-gta/'),
        (0.9, 'monthly', '/medical-office-cleaning-gta/'),
        (0.9, 'monthly', '/post-construction-cleaning-gta/'),
        (0.9, 'monthly', '/warehouse-cleaning-gta/'),
        (0.9, 'monthly', '/window-cleaning-gta/'),
        (0.9, 'monthly', '/floor-care-stripping-gta/'),
        (0.9, 'monthly', '/carpet-cleaning-gta/'),
        (0.9, 'monthly', '/janitorial-services-gta/'),
    ]
    
    for city in CITY_NAME_MAP.values():
        slug = city.lower().replace(' ', '-')
        pages.append((0.8, 'monthly', f'/commercial-cleaning-{slug}/'))
    
    pages += [
        (0.7, 'monthly', '/about.html'),
        (0.7, 'monthly', '/faq.html'),
        (0.7, 'monthly', '/contact.html'),
        (0.7, 'monthly', '/service-areas.html'),
        (0.7, 'weekly', '/blog/'),
        (0.7, 'monthly', '/case-studies/'),
    ]
    
    blog_posts = [
        'commercial-cleaning-cost-per-square-foot.html',
        'green-cleaning-what-it-means-guide.html',
        'gtascrub-cleancheck-how-we-prove-every-clean.html',
        'how-often-should-office-be-cleaned.html',
        'medical-office-cleaning-standards-ontario.html',
        'office-cleaning-vs-janitorial-services.html',
        'post-construction-cleaning-checklist-gta.html',
        'what-to-look-for-in-bonded-insured-cleaning-company.html',
    ]
    for bp in blog_posts:
        pages.append((0.6, 'monthly', f'/blog/{bp}'))
    
    case_studies = [
        '50k-office-tower-downtown-toronto.html',
        'dental-practice-compliance-north-york.html',
        'post-construction-retail-chain-mississauga.html',
        'warehouse-facility-brampton-industrial.html',
    ]
    for cs in case_studies:
        pages.append((0.6, 'monthly', f'/case-studies/{cs}'))
    
    pages += [
        (0.5, 'monthly', '/vs-jan-pro/'),
        (0.5, 'monthly', '/vs-jani-king/'),
    ]
    
    lines = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for priority, changefreq, path in pages:
        lines.append(f'  <url><loc>https://gtascrub.com{path}</loc><priority>{priority}</priority><changefreq>{changefreq}</changefreq></url>')
    lines.append('</urlset>')
    
    sitemap_path = '/workspace/gtascrub.com/sitemap.xml'
    with open(sitemap_path, 'w') as f:
        f.write('\n'.join(lines) + '\n')
    print(f"  ✅ sitemap.xml — updated with {len(pages)} URLs")


def main():
    print("=" * 60)
    print("SEO ENHANCEMENTS FOR GTA SCRUB")
    print("=" * 60)
    
    print("\n📋 Adding FAQPage schema + visible FAQ to service pages...")
    enhance_service_pages()
    
    print("\n📋 Adding FAQPage schema + visible FAQ to city pages...")
    enhance_city_pages()
    
    print("\n📋 Enhancing blog index...")
    enhance_blog_index()
    
    print("\n📋 Adding related services to blog posts...")
    enhance_blog_posts()
    
    print("\n📋 Enhancing case study pages...")
    enhance_case_studies()
    
    print("\n📋 Updating sitemap...")
    update_sitemap()
    
    print("\n" + "=" * 60)
    print("✅ All SEO enhancements complete!")
    print("=" * 60)


if __name__ == '__main__':
    main()
