import { useEffect, useRef, useState } from 'react'

export const useOnClickOutside = (show: boolean) => {
	const [isShow, setIsShow] = useState(show)
	const ref = useRef<HTMLDivElement>(null)
	const listener = (event: any) => {
		if (!ref.current) {
			return
		}
		if (ref.current.contains(event?.target)) {
			return
		}
		setIsShow(false)
	}

	useEffect(() => {
		document.addEventListener('click', listener, true)
		return () => {
			document.removeEventListener('click', listener, true)
		}
	})

	return { ref, isShow, setIsShow }
}
