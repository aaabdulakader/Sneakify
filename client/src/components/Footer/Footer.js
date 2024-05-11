import React from "react";

import styles from "./Footer.module.css";

import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer>
      <div className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerColumn}>
            <h3 className={styles.footerTitle}>About</h3>
            <p className={styles.footerText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className={styles.footerColumn}>
            <h3 className={styles.footerTitle}>Contact</h3>
            <p className={styles.footerText}>
              Email:
              <a href="mailto:sneakify.support@sneakify.com">
                sneakify.support@sneakify.com
              </a>
            </p>
            <p className={styles.footerText}>Phone: 123-456-7890</p>
          </div>
          <div className={styles.footerColumn}>
            <h3 className={styles.footerTitle}>Social</h3>
            <div className={styles.socialLinks}>
              <a href="https://www.facebook.com" className={styles.socialLink}>
                <FaFacebookF className={styles.facebook} />
              </a>
              <a href="https://www.twitter.com" className={styles.socialLink}>
                <FaTwitter className={styles.twitter} />
              </a>
              <a href="https://www.instagram.com" className={styles.socialLink}>
                <FaInstagram className={styles.instagram} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
