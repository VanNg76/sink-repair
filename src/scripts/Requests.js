import { getRequests, getPlumbers } from "./dataAccess.js"
import { deleteRequest } from "./dataAccess.js"

export const Requests = () => {
    const requests = getRequests()
    const plumbers = getPlumbers()

    let html = "<ul>"
    for (const request of requests) {
        html += `
        <li>${request.description}
            <select class="plumbers" id="plumbers">
                <option value="">Choose</option>
                ${plumbers.map(plumber => {
                    return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
                }).join("")
                }
            </select>

            <button class="request__delete" id="request--${request.id}">Delete</button>
        </li>`
    }
    html += "</ul>"
    
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