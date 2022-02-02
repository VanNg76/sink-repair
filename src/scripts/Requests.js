import { getRequests, getPlumbers } from "./dataAccess.js"
import { saveCompletion, deleteRequest } from "./dataAccess.js"

export const Requests = () => {
    const requests = getRequests()
    const plumbers = getPlumbers()

    let html = `<ul class="ul-serviceRequests">`
    for (const request of requests) {
        html += `
        <li class="li-serviceRequests">
            <div class="request-description">${request.description}</div>
            <select class="plumbers" id="plumbers">
                <option>Choose</option>
                ${plumbers.map(plumber => {
                    return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
                }).join("")
                }
            </select>

            <button class="request__delete" id="request--${request.id}">Delete</button>
        </li>`
    }

    html += `</ul>`
    
    return html
}

// click event for Delete button
const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

// change event for completion
mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            // Create a new completion object
            const completion = { }
            completion.requestId = requestId
            completion.plumberId = plumberId
            completion.dateCreated =  new Date().toLocaleString()

            // POST completion objection to database
            saveCompletion(completion)

        }
    }
)