function isLoggedIn() {
  const token = localStorage.getItem('USER-TOKEN')
  if(token) {
    return true
  } else {
    return false
  }
}
 
function getToken() {
  return localStorage.getItem('USER-TOKEN')
  
}

function storeToken(token) {
  localStorage.setItem('USER-TOKEN', token)
}

function logout() {
  localStorage.clear();
  window.location.href = '/login'
}

function storeStaff(key, value) {
  localStorage.setItem(key, value)
}

export { isLoggedIn, getToken, storeToken, logout, storeStaff }

