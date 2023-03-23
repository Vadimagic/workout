import { FiArrowLeft } from 'react-icons/fi'

import { useAuth } from '@/hooks/useAuth'

import Hamburger from '@/components/layout/hamburger/Hamburger'

import styles from './Header.module.scss'

interface IProps {
	backLink: string
}

const Header = ({ backLink }: IProps) => {
	// TODO: React router useHistory
	const { isAuth } = useAuth()

	return (
		<header className={styles.header}>
			<button onClick={() => {}}>
				<FiArrowLeft color='white' />
			</button>
			<Hamburger />
		</header>
	)
}

export default Header
