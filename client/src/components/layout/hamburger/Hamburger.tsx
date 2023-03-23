import { HiMenuAlt3 } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'

import { useOnClickOutside } from '@/hooks/useOnClickOutside'

import Menu from '@/components/layout/menu/Menu'

import styles from './Hamburger.module.scss'

const Hamburger = () => {
	const { ref, isShow, setIsShow } = useOnClickOutside(false)

	return (
		<div className={styles.wrapper} ref={ref}>
			<button onClick={() => setIsShow(!isShow)}>
				{isShow ? <IoMdClose /> : <HiMenuAlt3 />}
			</button>
			<Menu isShow={isShow} />
		</div>
	)
}

export default Hamburger
