import { ArrowLink, Shell } from "../../components";

export const metadata = {
  title: "Philippines Crafted Sea Salt",
  description: "A nationwide Philippine sea salt sourcing, packaging and export venture supporting local producers and international buyers.",
};

const products = [
  ["Fine Sea Salt", "Everyday cooking, seasoning blends and food-service use."],
  ["Coarse Sea Salt", "Finishing, brining, grilling and premium culinary applications."],
  ["Regional Lots", "Origin-led salt that preserves the story and method of a producing community."],
  ["Private Label", "Retail-ready packaging developed for distributors, hospitality groups and qualified brands."],
  ["Bulk Supply", "Larger formats for food manufacturers, restaurants and import partners."],
  ["Gift & Export Sets", "Premium Philippine-made collections for tourism, gifting and specialty retail."],
];

const standards = [
  ["01", "Producer record", "Farm, cooperative or maker identity; production location; contact and payment details."],
  ["02", "Lot traceability", "Harvest date, production method, batch identification and storage history."],
  ["03", "Quality review", "Visual cleanliness, moisture, grain consistency, foreign-material screening and representative sampling."],
  ["04", "Laboratory pathway", "Product testing and documentation appropriate to the intended market before commercial export."],
  ["05", "Pack & protect", "Food-appropriate handling, sealed packaging, clear labeling and dry, controlled storage."],
  ["06", "Export readiness", "Buyer specifications, labeling, permits, customs documents and destination requirements confirmed per shipment."],
];

export default function PhilippinesSeaSaltPage() {
  return <Shell>
    <section className="salt-hero">
      <div className="salt-hero-art" aria-hidden="true" />
      <div className="salt-hero-copy">
        <span>07 / Food + Export</span>
        <h1>Philippines<br/><em>Crafted</em><br/>Sea Salt</h1>
        <p>From salt-making communities across the archipelago to kitchens and buyers around the world. We are building a nationwide purchasing, quality, packaging and export network for Philippine sea salt.</p>
        <div className="actions"><ArrowLink href="#supply">Sell salt to us</ArrowLink><ArrowLink href="#export" secondary>Buy for export</ArrowLink></div>
      </div>
    </section>

    <section className="salt-statement">
      <div className="section-label">From our shores to the world</div>
      <h2>One Philippine brand.<br/>Many local salt stories.</h2>
      <p>Our goal is to purchase from qualified salt farmers, families, cooperatives and producers throughout the Philippines—then build the traceability, quality controls, packaging and buyer relationships needed to reach higher-value markets.</p>
    </section>

    <section className="salt-route section">
      <div><div className="section-label">The nationwide network</div><h2>Buy locally.<br/>Prepare centrally.<br/>Sell globally.</h2></div>
      <ol>
        <li><span>01</span><div><b>Find producers</b><p>Build direct sourcing relationships in established and emerging salt-producing communities.</p></div></li>
        <li><span>02</span><div><b>Qualify every lot</b><p>Record origin and method, review condition, sample product and match it to a suitable use.</p></div></li>
        <li><span>03</span><div><b>Aggregate responsibly</b><p>Keep accepted lots identified while coordinating storage, transport and production planning.</p></div></li>
        <li><span>04</span><div><b>Process and package</b><p>Prepare retail, food-service, wholesale and private-label formats around buyer requirements.</p></div></li>
        <li><span>05</span><div><b>Export with documents</b><p>Complete destination-specific testing, labeling, permits and shipment records before sale.</p></div></li>
      </ol>
    </section>

    <section className="salt-products section">
      <div className="section-heading"><div><div className="section-label">Planned product range</div><h2>Built for more than one shelf.</h2></div><p>Flexible formats create multiple revenue channels while allowing different salt grades and regional characteristics to reach the right buyer.</p></div>
      <div className="salt-product-grid">{products.map(([name, copy], i) => <article key={name}><span>0{i + 1}</span><h3>{name}</h3><p>{copy}</p></article>)}</div>
    </section>

    <section id="supply" className="salt-supplier section">
      <div className="salt-supplier-art" role="img" aria-label="Philippines Crafted Sea Salt brand, packaging sizes and export carton" />
      <div>
        <div className="section-label">For Philippine producers</div>
        <h2>We want to buy salt from across the country.</h2>
        <p>We welcome introductions from individual salt makers, farms, associations, cooperatives, consolidators and local governments supporting salt-producing communities.</p>
        <h3>Information to prepare</h3>
        <ul>
          <li>Producer or cooperative name and exact location</li><li>Salt type, grain size and production method</li>
          <li>Typical harvest months and available volume</li><li>Current photos of the salt, beds, storage and packaging</li>
          <li>Current price per kilogram or metric ton</li><li>Existing permits, test results or certifications, if available</li>
          <li>Pickup point, road access and delivery options</li>
        </ul>
        <ArrowLink href="/about#partner">Become a salt supplier</ArrowLink>
      </div>
    </section>

    <section className="salt-quality">
      <div className="section"><div className="section-label">Proposed sourcing controls</div><h2>Quality begins before the bag.</h2></div>
      <div className="salt-standards">{standards.map(([n, title, copy]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      <p className="salt-note">Final specifications, testing and certification requirements will be set by product use and destination market. Acceptance into the sourcing network does not by itself mean a lot is approved for food sale or export.</p>
    </section>

    <section id="export" className="salt-export section">
      <div><div className="section-label">For importers and buyers</div><h2>Bring Philippine sea salt to your market.</h2><p>We are developing supply for specialty retailers, food-service distributors, hospitality groups, manufacturers, Filipino stores, corporate gifting programs and private-label partners.</p><div className="salt-buyer-tags">{["Retail packs", "Food service", "Bulk orders", "Private label", "Regional lots", "Gift sets"].map(tag => <span key={tag}>{tag}</span>)}</div></div>
      <aside><span>Buyer inquiry</span><h3>Tell us what your market needs.</h3><p>Include destination country, intended use, package size, estimated order volume, target date and any required standards or certifications.</p><ArrowLink href="/about#partner">Discuss export supply</ArrowLink></aside>
    </section>

    <section className="salt-impact section">
      <div className="section-label">Why this venture matters</div>
      <div className="salt-impact-grid">
        <article><strong>01</strong><h3>Local income</h3><p>Open new buyer relationships for Philippine salt-producing families and communities.</p></article>
        <article><strong>02</strong><h3>National identity</h3><p>Build recognition for Philippine sea salt as a product with origin, craft and value.</p></article>
        <article><strong>03</strong><h3>Multiple markets</h3><p>Serve retail, hospitality, manufacturing, private label and gifting—not a single sales channel.</p></article>
        <article><strong>04</strong><h3>Export discipline</h3><p>Make traceability, testing and correct documentation part of the business from the beginning.</p></article>
      </div>
    </section>

    <section className="closing-cta salt-closing"><div className="section-label">Philippines Crafted Sea Salt</div><h2>Rooted in our shores.<br/>Ready for the world.</h2><p>Salt producers, cooperatives, buyers, logistics partners, laboratories and packaging specialists are invited to help build the network.</p><ArrowLink href="/about#partner">Partner with the venture</ArrowLink></section>
  </Shell>;
}
