import React from 'react'
import Image from 'next/image'

import styles from './index.module.css'

const Header = () => {
  return (
    <header
      className={`container ${styles.swiggy_ops__header} u-vertically-centered-container u-spaced-out-container`}
    >
      <div className={`${styles.swiggy_ops__header__brand} u-flex`}>
        <Image
          src="https://file.rendit.io/n/geBjADstnU4Djjp0EU8K.svg"
          className={styles.swiggy_ops__header__brand_logo}
          alt="Swiggy Ops Logo"
          width="26"
          height="40"
        />
        <p className={styles.swiggy_ops__header__brand_name}>OPS</p>
      </div>
      <button
        className={`${styles.swiggy_ops__header__add_restaurant_button} u-hv-centered-container`}
      >
        <Image
          src={`https://file.rendit.io/n/vOZNATIPLXDJsyH4UY0O.svg`}
          alt="Add restaurant button icon"
          width="16"
          height="16"
        />
        <p className={styles.swiggy_ops__header__add_restaurant_button__text}>
          Add New Restaurant
        </p>
      </button>
    </header>
  )
}

export default Header
