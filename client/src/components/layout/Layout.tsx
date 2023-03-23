import cn from 'clsx'
import { ReactElement } from 'react'

import styles from './Layout.module.scss'

import Header from './header/Header'

interface Props {
	children?: ReactElement
	bgImage?: string
	heading?: string
	backLink?: string
}

const Layout = ({ children, bgImage, heading = '', backLink = '/' }: Props) => {
	const style = {
		backgroundImage: bgImage
	}

	return (
		<section
			className={cn(styles.wrapper, {
				[styles.otherPage]: !!heading
			})}
			style={style}>
			<Header backLink={backLink} />
			{heading && <div className={styles.heading}>{heading}</div>}
			{children && <div>{children}</div>}
		</section>
	)
}

export default Layout
