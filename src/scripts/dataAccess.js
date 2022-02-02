const applicationState = {
    requests: [],
    plumbers: [],
    completions: []
}

const mainContainer = document.querySelector("#container")

const API = "http://localhost:8088"

// store external state in application state
export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (plumbers) => {
                // Store the external state in application state
                applicationState.plumbers = plumbers
            }
        )
}

export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (completions) => {
                // Store the external state in application state
                applicationState.completions = completions
            }
        )
}

export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}))
}

export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({...plumber}))
}

export const getCompletions = () => {
    return applicationState.completions.map(completion => ({...completion}))
}

// add a new request
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }

    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}


// add a new completion
export const saveCompletion = (completion) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completion)
    }

    return fetch(`${API}/completion`, fetchOptions)
        .then(response => response.json())
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}


// delete a current request
export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

