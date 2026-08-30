import { ArrowLink, Shell } from "../components";

export const metadata = {
  title: "366 AI Designer",
  description: "Turn an idea into a working website or web application with a guided AI-powered creation workspace.",
};

const buildSteps = [
  ["01", "Describe the outcome", "Tell 366 AI Designer what you want to create, who it serves and what it must accomplish."],
  ["02", "Shape the experience", "Review pages, user journeys, features and visual direction while the project takes form."],
  ["03", "Connect what matters", "Add data, authentication, payments, domains and other services only when the product needs them."],
  ["04", "Review and launch", "Test the result, make focused changes and publish a version people can actually use."],
];

export default function AiDesignerPage() {
  return <Shell>
    <section className="ai-hero">
      <div className="ai-hero-copy">
        <div className="eyebrow ai-online"><i aria-hidden="true"/> 366 AI Designer is online</div>
        <h1><span>366 AI</span><br/>Designer</h1>
        <p className="ai-lead">From idea to working digital product—through conversation, visual building and a clear path to launch.</p>
        <p>Start a coding project, shape it through conversation and keep control of the source. Build websites, applications and working product ideas without first assembling a full technical team.</p>
        <div className="actions">
          <ArrowLink href="https://designer.366industries.com" external>Launch AI Designer</ArrowLink>
          <ArrowLink href="https://designer.366industries.com" secondary external>Sign in or create account</ArrowLink>
        </div>
      </div>
      <div className="ai-workspace" aria-label="Preview of the 366 AI Designer workspace">
        <div className="ai-window-bar"><i/><i/><i/><span>366 AI DESIGNER / PROJECT WORKSPACE</span></div>
        <div className="ai-workspace-grid">
          <aside>
            <b>PROJECT</b><strong>Community<br/>Marketplace</strong>
            <nav><span className="active">◆ Build</span><span>▣ Pages</span><span>⌘ Data</span><span>◎ Users</span><span>↗ Launch</span></nav>
            <small>7 changes saved</small>
          </aside>
          <div className="ai-canvas">
            <div className="ai-page">
              <header><span>LOCAL</span><i/><i/><i/></header>
              <section><small>SUPPORT WHAT IS CLOSE</small><h2>Find useful services in your community.</h2><div><b>Explore nearby</b><b className="ghost">List a business</b></div></section>
              <footer><i/><i/><i/></footer>
            </div>
            <span className="ai-cursor">366</span>
          </div>
          <aside className="ai-chat">
            <b>BUILD WITH AI</b>
            <div className="ai-message user">Make the service cards easier to browse on a phone.</div>
            <div className="ai-message system">I’ll change the mobile layout to a single-column card list and keep the filters within reach.</div>
            <div className="ai-thinking"><i/><i/><i/> Applying changes</div>
            <div className="ai-prompt">Ask for a change… <span>↑</span></div>
          </aside>
        </div>
      </div>
      <div className="ai-signal"><span>IDEA</span><i/><span>DESIGN</span><i/><span>BUILD</span><i/><span>LAUNCH</span></div>
    </section>

    <section className="section ai-purpose">
      <div><div className="section-label">Why we are building it</div><h2>Good ideas should not stop at the technical barrier.</h2></div>
      <div><p>Many people understand a problem deeply but cannot afford a designer, developer, product manager and infrastructure team before testing their solution. 366 AI Designer is intended to shorten that distance.</p><p>It will guide people toward a smaller, testable first product while keeping the owner in control of the decisions, content and final release.</p></div>
    </section>

    <section id="how-it-works" className="section ai-process">
      <div className="section-heading"><div><div className="section-label">The creation path</div><h2>One workspace.<br/>Four clear stages.</h2></div><p>No wall of technical setup before the idea becomes visible.</p></div>
      <div className="ai-step-grid">{buildSteps.map(([n,title,copy])=><article key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>

    <section className="ai-use-cases">
      <div className="section-label">Built for useful products</div>
      <div className="ai-case-grid">
        <article><span>01</span><h3>Business websites</h3><p>Professional pages, lead capture, catalogs and customer journeys.</p></article>
        <article><span>02</span><h3>Web applications</h3><p>Member portals, marketplaces, internal tools and service platforms.</p></article>
        <article><span>03</span><h3>Community systems</h3><p>Local directories, education tools, aid coordination and public resources.</p></article>
        <article><span>04</span><h3>Working prototypes</h3><p>Test an original product before committing a large development budget.</p></article>
      </div>
    </section>

    <section className="section ai-principles">
      <div className="section-label">The standard</div>
      <h2>AI assists.<br/><em>People decide.</em></h2>
      <div className="ai-principle-grid">
        <article><b>Clear ownership</b><p>Your idea, brand, content and project remain understandable and portable.</p></article>
        <article><b>Visible changes</b><p>Review what the builder changes instead of trusting a hidden process.</p></article>
        <article><b>Practical scope</b><p>Start with the smallest version capable of proving real demand.</p></article>
        <article><b>Safer launches</b><p>Authentication, payments and sensitive data require deliberate review before release.</p></article>
      </div>
    </section>

    <section id="builder-access" className="ai-launch">
      <div><div className="section-label">Builder online / Ready to create</div><h2>Your next project<br/>starts here.</h2></div>
      <div><p>Open 366 AI Designer, sign in or create your account, then describe the coding project you want to build. Your projects and account are managed securely inside the builder.</p><p>Already have an idea? Move directly into your workspace at <strong>designer.366industries.com</strong>.</p><div className="actions"><ArrowLink href="https://designer.366industries.com" external>Launch AI Designer</ArrowLink><ArrowLink href="https://designer.366industries.com" secondary external>Create account</ArrowLink></div></div>
    </section>
  </Shell>;
}
