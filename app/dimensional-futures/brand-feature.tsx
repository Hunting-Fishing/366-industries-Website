import Image from "next/image";
import { ArrowLink } from "../components";
import { dimensionalFutures } from "./brand-data";
import styles from "./dimensional-futures.module.css";

export function DimensionalFuturesFeature() {
  return (
    <section className={`section ${styles.homeFeature}`} aria-labelledby="dimensional-futures-feature-title">
      <div className={styles.homeFeatureLogo}>
        <Image
          src="/assets/dimensional-futures-logo-concept.svg"
          alt=""
          width={1600}
          height={480}
        />
      </div>
      <div className={styles.homeFeatureCopy}>
        <span>New brand in development · 366 Industries</span>
        <h2 id="dimensional-futures-feature-title">{dimensionalFutures.tagline}</h2>
        <p>
          Dimensional Futures is our developing brand for inclusive apparel and
          useful goods—built around different ways of seeing, thinking, sensing,
          moving, and communicating.
        </p>
        <div className={styles.homeFeatureStatus} aria-label="Current brand status">
          <span>8 launch concepts</span>
          <span>4 collection paths</span>
          <span>Community review required</span>
          <span>Not yet for sale</span>
        </div>
        <div className="actions">
          <ArrowLink href="/dimensional-futures">Explore the brand</ArrowLink>
          <ArrowLink href="/dimensional-futures#build-status" secondary>
            View build status
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
