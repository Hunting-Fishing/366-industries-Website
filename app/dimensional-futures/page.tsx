import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLink, Shell } from "../components";
import {
  approvalGates,
  collections,
  designCommitments,
  developmentStatus,
  dimensionalFutures,
} from "./brand-data";
import { ConceptCatalog } from "./concept-catalog";
import styles from "./dimensional-futures.module.css";

export const metadata: Metadata = {
  title: "Dimensional Futures Concept Shop | A 366 Industries Brand",
  description:
    "Browse the developing Dimensional Futures concept collection from 366 Industries: inclusive apparel and useful goods with transparent review and testing standards.",
};

export default function DimensionalFuturesPage() {
  return (
    <Shell>
      <div className={styles.announcementBar} role="note">
        <span>{dimensionalFutures.name} · {dimensionalFutures.parentBrand}</span>
        <strong>Preview collection · Concepts only · Not yet for sale</strong>
      </div>

      <nav className={styles.brandNav} aria-label="Dimensional Futures shop navigation">
        <div className={styles.brandNavInner}>
          <a className={styles.brandNavLogo} href="#shop-top" aria-label="Dimensional Futures top">
            <Image
              src="/assets/dimensional-futures-logo-concept.svg"
              alt=""
              width={1600}
              height={480}
            />
          </a>
          <div className={styles.brandNavLinks}>
            <a href="#catalog">New concepts</a>
            <a href="#collections">Collections</a>
            <a href="#standards">Our standards</a>
            <a href="#build-status">Build status</a>
          </div>
        </div>
      </nav>

      <section id="shop-top" className={styles.storefrontHero}>
        <div className={styles.storefrontCopy}>
          <span className={styles.storefrontKicker}>Concept shop · launch in development</span>
          <div className={styles.heroLogo}>
            <Image
              src="/assets/dimensional-futures-logo-concept.svg"
              alt=""
              width={1600}
              height={480}
              priority
            />
          </div>
          <h1>Inclusive goods. More ways forward.</h1>
          <p className={styles.heroLead}>
            Explore the first apparel, mug, tote, and everyday-goods concepts
            from Dimensional Futures. Every idea stays out of checkout until its
            supplier, sample, price, claims, and community review are complete.
          </p>
          <div className="actions">
            <ArrowLink href="#catalog">Browse all concepts</ArrowLink>
            <ArrowLink href="#build-status" secondary>
              See launch readiness
            </ArrowLink>
          </div>
          <div className={styles.heroProof}>
            <span>8 first-capsule concepts</span>
            <span>4 collection paths</span>
            <span>0 products approved for sale</span>
          </div>
        </div>

        <aside className={styles.retailStage} aria-label="Illustrative product concepts">
          <article className={`${styles.heroProductCard} ${styles.heroProductPrimary}`}>
            <span className={styles.visualNotice}>Illustrative concept · not a product photo</span>
            <div className={`${styles.heroProductVisual} ${styles.heroTee}`} aria-hidden="true">
              <div className={styles.conceptArtwork}>
                Different is<br />part of human
              </div>
            </div>
            <div className={styles.heroProductMeta}>
              <div>
                <span>Shared Futures</span>
                <h2>Graphic tee concept</h2>
              </div>
              <b>In concept review</b>
            </div>
          </article>

          <article className={`${styles.heroProductCard} ${styles.heroProductSecondary}`}>
            <span className={styles.visualNotice}>Illustrative concept · not a product photo</span>
            <div className={`${styles.heroProductVisual} ${styles.heroMug}`} aria-hidden="true">
              <div className={styles.conceptArtwork}>
                My pace is<br />still progress
              </div>
            </div>
            <div className={styles.heroProductMeta}>
              <div>
                <span>Shared Futures</span>
                <h2>Mug concept</h2>
              </div>
              <b>Price not set</b>
            </div>
          </article>
        </aside>
      </section>

      <section id="catalog" className={styles.catalogSection} aria-labelledby="catalog-title">
        <div className={styles.catalogHeader}>
          <div>
            <span className={styles.eyebrow}>First capsule · concept catalog</span>
            <h2 id="catalog-title">Browse the collection.</h2>
          </div>
          <div className={styles.catalogTrust}>
            <strong>Shop-style browsing, honest launch status.</strong>
            <p>
              No price, material, color, size, inventory, or delivery promise is
              shown until it has been verified.
            </p>
          </div>
        </div>
        <ConceptCatalog />
      </section>

      <section id="collections" className={styles.collectionsSection} aria-labelledby="collections-title">
        <div className={styles.sectionIntro}>
          <div>
            <span className={styles.eyebrow}>Shop by collection direction</span>
            <h2 id="collections-title">Several paths. One shared future.</h2>
          </div>
          <p>
            Every collection has a written name, symbol, and visible pattern so
            meaning never depends on color alone.
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

      <section className={styles.mission}>
        <div>
          <span className={styles.eyebrow}>The idea behind the shop</span>
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

      <section id="standards" className={styles.commitmentsSection}>
        <div className={styles.sectionIntro}>
          <div>
            <span className={styles.eyebrow}>How products reach the shop</span>
            <h2>Good intentions need production standards.</h2>
          </div>
          <p>
            The catalog remains a preview until its products and claims are
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
            <span className={styles.eyebrow}>Transparent shop readiness</span>
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
            <h2>No shortcuts to checkout.</h2>
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
        <h2>Help us build the first responsible release.</h2>
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
