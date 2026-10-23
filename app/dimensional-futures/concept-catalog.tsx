"use client";

import { useId, useMemo, useState } from "react";
import {
  conceptCategoryFilters,
  conceptSortOptions,
  launchConcepts,
  type ConceptCategory,
  type ConceptSort,
} from "./brand-data";
import styles from "./dimensional-futures.module.css";

type ActiveCategory = "all" | ConceptCategory;

function normalize(value: string) {
  return value.trim().toLocaleLowerCase();
}

export function ConceptCatalog() {
  const searchId = useId();
  const sortId = useId();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ActiveCategory>("all");
  const [sort, setSort] = useState<ConceptSort>("featured");

  const concepts = useMemo(() => {
    const search = normalize(query);
    const matching = launchConcepts.filter((concept) => {
      const matchesCategory = category === "all" || concept.category === category;
      const searchableText = normalize(
        [
          concept.name,
          concept.productType,
          concept.collection,
          concept.description,
          ...concept.defined,
        ].join(" "),
      );

      return matchesCategory && (!search || searchableText.includes(search));
    });

    return [...matching].sort((left, right) => {
      if (sort === "name-asc") {
        return left.name.localeCompare(right.name) || left.index.localeCompare(right.index);
      }

      if (sort === "concept-number") {
        return left.index.localeCompare(right.index);
      }

      return Number(right.featured) - Number(left.featured) || left.index.localeCompare(right.index);
    });
  }, [category, query, sort]);

  const hasActiveFilters = query.length > 0 || category !== "all" || sort !== "featured";
  const resultLabel = `${concepts.length} ${concepts.length === 1 ? "concept" : "concepts"} shown`;

  function clearFilters() {
    setQuery("");
    setCategory("all");
    setSort("featured");
  }

  return (
    <div className={styles.catalogExperience}>
      <form
        className={styles.catalogToolbar}
        role="search"
        aria-label="Filter concept catalog"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className={styles.catalogSearch}>
          <label htmlFor={searchId}>Search concepts</label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by message, collection, or product type"
          />
        </div>

        <fieldset className={styles.filterGroup}>
          <legend>Filter by category</legend>
          <div className={styles.categoryFilters}>
            {conceptCategoryFilters.map((filter) => {
              const count =
                filter.value === "all"
                  ? launchConcepts.length
                  : launchConcepts.filter((concept) => concept.category === filter.value).length;

              return (
                <button
                  key={filter.value}
                  className={styles.filterButton}
                  type="button"
                  aria-pressed={category === filter.value}
                  onClick={() => setCategory(filter.value)}
                >
                  <span className={styles.filterCheck} aria-hidden="true">
                    ✓
                  </span>
                  {filter.label}
                  <span className={styles.filterCount} aria-hidden="true">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className={styles.catalogSort}>
          <label htmlFor={sortId}>Sort concepts</label>
          <select
            id={sortId}
            value={sort}
            onChange={(event) => setSort(event.target.value as ConceptSort)}
          >
            {conceptSortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button
          className={styles.clearFilters}
          type="button"
          onClick={clearFilters}
          disabled={!hasActiveFilters}
        >
          Clear filters
        </button>
      </form>

      <p className={styles.resultSummary} aria-live="polite" aria-atomic="true">
        {resultLabel}
      </p>

      {concepts.length === 0 ? (
        <div className={styles.emptyState}>
          <h3>No concepts match those filters.</h3>
          <p>Clear the filters to browse all eight ideas in the first capsule.</p>
          <button type="button" onClick={clearFilters}>
            Show all concepts
          </button>
        </div>
      ) : (
        <ul className={styles.productList} aria-label="Dimensional Futures product concepts">
          {concepts.map((concept) => (
            <li key={concept.id}>
              <article className={styles.productCard}>
                <div
                  className={`${styles.productVisual} ${styles[`motif-${concept.motif}`]}`}
                  aria-hidden="true"
                >
                  <span className={styles.productBadge}>{concept.status}</span>
                  <span className={styles.productIndex}>{concept.index}</span>
                  <i className={styles.productMotif} />
                  <strong>{concept.name}</strong>
                </div>

                <div className={styles.productBody}>
                  <div className={styles.productMeta}>
                    <span>{concept.collection}</span>
                    <span>{concept.productType}</span>
                  </div>
                  <span className={styles.visualDisclosure}>
                    Illustrative concept — not a product photo
                  </span>
                  <h3>{concept.name}</h3>
                  <p>{concept.description}</p>
                  <div className={styles.productCommerceStatus}>
                    <span>{concept.stage}</span>
                    <strong>{concept.status}</strong>
                    <small>Price: {concept.price}</small>
                  </div>

                  <details className={styles.conceptDetails}>
                    <summary>
                      View concept details
                      <span className={styles.visuallyHidden}> for {concept.name}</span>
                    </summary>
                    <div className={styles.detailGrid}>
                      <div className={styles.detailColumn}>
                        <h4>What is defined</h4>
                        <ul>
                          {concept.defined.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className={styles.detailColumn}>
                        <h4>What is still open</h4>
                        <ul>
                          {concept.openDecisions.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <p className={styles.detailNotice}>
                      No ordering, payment, or checkout is available for this concept.
                    </p>
                  </details>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
