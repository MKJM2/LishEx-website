import cookie from 'js-cookie'

//Set in cookie
export const setCookie = (key, rememberMe, value) => {
	//Store the restore Token for longer
	if(key === 'RTKN') {
		if(window !== 'undefined'){
			cookie.set(key, value, {
				expires: 120,
				secure: (process.env.NODE_ENV!=='development'),
				sameSite: 'lax'
			})
		}
	}
	if(window !== 'undefined'){
		cookie.set(key, value, {
			// One day
			expires: (rememberMe ? 7 : null),
			//For development on localhost, ignore HTTPS
			secure: (process.env.NODE_ENV!=="development"),
			sameSite: "lax"
		})
	}
}

export const removeCookie = key => {
	if(window !== 'undefined'){
		cookie.remove(key, {
			expires: 1
		})
	}
}

// Gete info from cookie
export const getCookie = key => {
	if(window !== 'undefined'){
		return cookie.get(key)
	}
}

export const setLocalStorage = (key, value) => {
	if(window!=="undefined"){
		localStorage.setItem(key,JSON.stringify(value))
	}
}

//Remove from localStorage
export const removeLocalStorage = key => {
	if(window!=="undefined"){
		localStorage.removeItem(key)
	}
}

//Auth user after login

export const authenticate = (response, rememberMe, next) => {
	setCookie('ATKN', rememberMe, response.accessToken)
	setCookie('RTKN', rememberMe, response.refreshToken)
	//setLocalStorage('user', response.user)
	next()
}

//Signout
export const signout = next => {
	removeCookie('token')
	removeLocalStorage('user')
	next()
}

//Get user info from localStorage
export const isAuth = () => {
	if(window!=="undefined"){
		const cookieChecked = getCookie('ATKN')
		if(cookieChecked){
			//Return userID from LocalStorage?
			return true
		} else {
			return false
		}
	}
}

// Update user data in localStorage
export const updateUser = (response, next) => {
	if(window !== "undefined"){
		let auth = JSON.parse(localStorage.getItem('user'))
		auth = response.data
		localStorage.setItem('user', JSON.stringify(auth))
	}
	next()
}
