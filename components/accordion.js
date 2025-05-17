//components/accordion.js
"use client";

import { useState, useRef, useEffect } from "react";
import styles from "@/styles/accordion.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function Accordion({ heading, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const refText = useRef(null);

  const toggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (refText.current) {
      setHeight(refText.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div className={isOpen ? styles.open : styles.close}>
      <h3 className={styles.heading}>
        <button
          onClick={toggle}
          aria-expanded={isOpen}
          aira-controls="accordion-content"
        >
          {heading}
          <FontAwesomeIcon icon={faCircleChevronDown} className={styles.icon} />
        </button>
      </h3>
      <div
        id="accordion-content"
        className={styles.text}
        ref={refText}
        style={{
          maxHeight: isOpen ? `${height}px` : "0",
        }}
      >
        <div className={styles.textInner}>{children}</div>
      </div>
    </div>
  );
}
