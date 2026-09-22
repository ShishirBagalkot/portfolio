import { AnimatePresence, motion } from "framer-motion";
import styles from "./TerminalTabs.module.css";

const panelVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
};

export const TerminalTabs = ({
  tabs,
  activeTab,
  onTabChange,
  panelKey,
  ariaLabel,
  headerExtra,
  minHeight,
  maxWidth,
  children,
}) => {
  const key = panelKey ?? activeTab;

  return (
    <div className={styles.terminal} style={maxWidth ? { maxWidth } : undefined}>
      <div className={styles.titleBar}>
        <span className={styles.dots} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <div className={styles.tabs} role="tablist" aria-label={ariaLabel}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.key}
              className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ""}`}
              onClick={() => onTabChange(tab.key)}
              data-cursor-hover
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {headerExtra}

      <div className={styles.panelViewport} style={minHeight ? { minHeight } : undefined}>
        <AnimatePresence mode="wait">
          <motion.div
            key={key}
            variants={panelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            role="tabpanel"
            className={styles.panel}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TerminalTabs;
