import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLink, Shell } from "../components";
import {
  approvalGates,
  collections,
  designCommitments,
  developmentStatus,
  dimensionalFutures,
  launchConcepts,
} from "./brand-data";
import styles from "./dimensional-futures.module.css";

export const metadata: Metadata = {
  title: "Dimensional Futures | A 366 Industries Brand",
  description:
    "Meet Dimensional Futures, a 366 Industries brand developing inclusive apparel and useful goods through co-design, specific product information, and responsible testing.",
};

export default function DimensionalFuturesPage() {
  return (
    <Shell>
      <section className={styles.hero}>
        <div className={styles.heroPattern} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.parentLockup}>
            <span>366</span>
            <strong>{dimensionalFutures.parentBrand}</strong>
          </div>
          <div className={styles.statusLine}>
            <span aria-hidden="true" />
            {dimensionalFutures.phase} · {dimensionalFutures.availability}
          </div>
          <h1 className={styles.visuallyHidden}>{dimensionalFutures.name}</h1>
          <div className={styles.logoPanel}>
            <Image
              src="/assets/dimensional-futures-logo-concept.svg"
              alt=""
              width={1600}
              height={480}
              priority
            />
          </div>
          <p className={styles.tagline}>{dimensionalFutures.tagline}</p>
          <p className={styles.heroLead}>
            {dimensionalFutures.descriptor} Designed around belonging, clarity,
            choice, and the many valid ways people experience the world.
          </p>
          <div className="actions">
            <ArrowLink href="#launch-capsule">Explore the concept capsule</ArrowLink>
            <ArrowLink href="#build-status" secondary>
              See what happens before launch
            </ArrowLink>
          </div>
        </div>

        <aside className={styles.heroStatement} aria-label="Dimensional Futures brand idea">
          <span className={styles.statementIndex}>A / 366 INDUSTRIES</span>
          <p>{dimensionalFutures.campaignLine}</p>
          <div className={styles.statementFoot}>
            <span>Color + pattern + words + shape</span>
            <span>Co-design before claims</span>
          </div>
        </aside>
      </section>

      <section className={styles.mission}>
        <div>
          <span className={styles.eyebrow}>Why this brand exists</span>
          <h2>Different is part of human.</h2>
        </div>
        <div className={styles.missionCopy}>
          <p>{dimensionalFutures.mission}</p>
          <p>
            Dimensional Futures is being built as a confident, design-led brand
            under 366 Industries. It will not use pity, stereotypes, cure
            language, or unverified medical and accessibility claims.
          </p>
        </div>
      </section>

      <section className={styles.collectionsSection} aria-labelledby="collections-title">
        <div className={styles.sectionIntro}>
          <div>
            <span className={styles.eyebrow}>Collection architecture</span>
            <h2 id="collections-title">Several paths. One shared future.</h2>
          </div>
          <p>
            Every collection has a name, symbol, and visible pattern so meaning
            never depends on color alone.
          </p>
        </div>
        <div className={styles.collectionGrid}>
          {collections.map((collection) => (
            <article className={styles.collectionCard} key={collection.id}>
              <div className={`${styles.collectionMark} ${styles[collection.id]}`} aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <div className={styles.cardMeta}>
                <span>{collection.index}</span>
                <span>{collection.status}</span>
              </div>
              <h3>{collection.name}</h3>
              <p>{collection.description}</p>
              <div className={styles.markerLabel}>
                <strong>Pattern key</strong>
                <span>{collection.marker}</span>
              </div>
              <ul>
                {collection.examples.map((example) => (
                  <li key={example}>{example}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="launch-capsule" className={styles.capsuleSection}>
        <div className={styles.sectionIntro}>
          <div>
            <span className={styles.eyebrow}>First capsule · concept stage</span>
            <h2>Eight ideas to develop responsibly.</h2>
          </div>
          <p>
            These are product concepts, not store listings. Materials, colors,
            sizes, suppliers, prices, inventory, and launch dates have not been
            approved.
          </p>
        </div>
        <div className={styles.conceptGrid}>
          {launchConcepts.map((concept) => (
            <article
              className={`${styles.conceptCard} ${styles[`motif-${concept.motif}`]}`}
              key={`${concept.index}-${concept.format}`}
            >
              <div className={styles.conceptVisual} aria-hidden="true">
                <span>{concept.index}</span>
                <i />
              </div>
              <div className={styles.conceptBody}>
                <div className={styles.conceptMeta}>
                  <span>{concept.collection}</span>
                  <span>{concept.format}</span>
                </div>
                <h3>{concept.name}</h3>
                <p>{concept.description}</p>
                <strong className={styles.conceptStatus}>Concept · not yet for sale</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.featureStories} aria-label="Future accessibility design pathways">
        <article className={styles.viewStory}>
          <div className={styles.storyPattern} aria-hidden="true">
            <span>VIEW / PATTERN / WORD</span>
          </div>
          <div>
            <span className={styles.eyebrow}>Different View · testing pathway</span>
            <h2>Color has more than one language.</h2>
            <p>
              Future color-vision-difference designs will combine color with
              pattern, words, and shape. Dual-perception artwork must be proven
              on the intended printer and reviewed by people with the
              color-vision types named in the product copy.
            </p>
            <div className={styles.caution}>
              Designed to reveal differently for some people with red-green
              color-vision differences; what you see may vary. Never a
              diagnostic test.
            </div>
          </div>
        </article>

        <article className={styles.touchStory}>
          <span className={styles.eyebrow}>Access by Touch · later capsule</span>
          <h2>Useful texture, not decorative promises.</h2>
          <p>
            Tactile products will be co-designed and physically tested with
            blind and low-vision people. Functional Braille requires a qualified
            transcriber, correct dot geometry, durable samples, and review by
            Braille readers. Automatically generated decorative Braille will not
            be used.
          </p>
          <div className={styles.touchKey}>
            <span>Large print</span>
            <span>Tactile orientation</span>
            <span>Accessible description</span>
          </div>
        </article>
      </section>

      <section className={styles.commitmentsSection}>
        <div className={styles.sectionIntro}>
          <div>
            <span className={styles.eyebrow}>How we intend to build</span>
            <h2>Good intentions need production standards.</h2>
          </div>
          <p>
            The brand remains in development until its products and claims are
            supported by people, samples, and evidence.
          </p>
        </div>
        <div className={styles.commitmentGrid}>
          {designCommitments.map((commitment) => (
            <article key={commitment.index}>
              <span>{commitment.index}</span>
              <h3>{commitment.title}</h3>
              <p>{commitment.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="build-status" className={styles.statusSection}>
        <div className={styles.statusHeading}>
          <div>
            <span className={styles.eyebrow}>Transparent build status</span>
            <h2>What is real today.</h2>
          </div>
          <div className={styles.updatedStamp}>
            <span>Last reviewed</span>
            <strong>{dimensionalFutures.lastUpdated}</strong>
          </div>
        </div>

        <div className={styles.statusGrid}>
          {developmentStatus.map((item, index) => (
            <article key={item.label}>
              <span className={styles.statusNumber}>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{item.label}</h3>
                <p>{item.detail}</p>
              </div>
              <strong>{item.state}</strong>
            </article>
          ))}
        </div>

        <div className={styles.gatesPanel}>
          <div>
            <span className={styles.eyebrow}>Approval gates before sale</span>
            <h2>No shortcuts to the shop button.</h2>
          </div>
          <ol>
            {approvalGates.map((gate) => (
              <li key={gate}>{gate}</li>
            ))}
          </ol>
        </div>

        <p className={styles.saleNotice} role="note">
          No Dimensional Futures products are currently offered for sale through this page.
        </p>
      </section>

      <section className={styles.closing}>
        <div className={styles.closingFold} aria-hidden="true" />
        <span className={styles.eyebrow}>Dimensional Futures · 366 Industries</span>
        <h2>Help us make more ways forward.</h2>
        <p>
          We welcome experienced community reviewers, disabled and
          neurodivergent creatives, accessibility specialists, ethical suppliers,
          and production partners who want to help test the work properly.
        </p>
        <div className="actions">
          <ArrowLink href="/about#partner">Partner in the review</ArrowLink>
          <ArrowLink href="/ventures" secondary>
            Explore 366 Industries
          </ArrowLink>
        </div>
      </section>
    </Shell>
  );
}
