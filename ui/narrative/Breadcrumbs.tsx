'use client'

import React, { ReactNode } from 'react'
import styles from './Breadcrumbs.module.css';

import { usePathname } from 'next/navigation'
import Link from 'next/link'

type BreadcrumbsProps = {
    capitalizeLinks?: boolean
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ capitalizeLinks }) => {

    const paths = usePathname()
    const pathNames = paths.split('/').filter( path => path )

    return (
        <div>
            <ul className={styles.breadcrumbsContainer}>
                <li className={styles.breadcrumbsListItem}><Link href={'/'}>Home</Link></li>
                {pathNames.length > 0 && ' / '}
            {
                pathNames.map( (link, index) => {
                    let href = `/${pathNames.slice(0, index + 1).join('/')}`
                    let itemClasses = paths === href ? `${styles.breadcrumbsListItem} ${styles.breadcrumbsActiveItem}` : styles.breadcrumbsListItem
                    let itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length) : link
                    return (
                        <React.Fragment key={index}>
                            <li className={itemClasses} >
                                <Link href={href}>{itemLink}</Link>
                            </li>
                            {pathNames.length !== index + 1 && ' / '}
                        </React.Fragment>
                    )
                })
            }
            </ul>
        </div>
    )
}

export default Breadcrumbs