export const saveUser = (account) => {
    localStorage.setItem("account", JSON.stringify(account))
}

export const getUser = () => {
    return JSON.parse(localStorage.getItem("account")) || null
}

export const deleteUser = () => {
    localStorage.removeItem("account")
}