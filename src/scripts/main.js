import { SinkRepair } from "./SinkRepair.js"
import { fetchRequests, fetchPlumbers } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests().then(
        () => {
            mainContainer.innerHTML = SinkRepair()
        }
    )
    fetchPlumbers()
}

render()


mainContainer.addEventListener("stateChanged", () => {
        render()
    }
)

