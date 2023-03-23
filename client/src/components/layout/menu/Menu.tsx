import cn from 'clsx'

import styles from './Menu.module.scss'

import { menu } from './menu.data'

interface IProps {
	isShow: boolean
}

const Menu = ({ isShow }: IProps) => {
	const logoutHandler = () => {
		alert(10)
	}

	return (
		<div>
			<nav
				className={cn(styles.menu, {
					[styles.show]: isShow
				})}>
				{menu.map((item, index) => (
					<li key={index}>
						<a href={item.link}>{item.title}</a>
					</li>
				))}
				<li>
					<button onClick={logoutHandler}>Logout</button>
				</li>
			</nav>
		</div>
	)
}

export default Menu
