import { fetchParks, fetchThingsToDo } from "../api/npsApi"

export async function loader() {
    const [parkData, thingsToDoData] = await Promise.all([
        fetchParks('nj'),
        fetchThingsToDo('acad')
    ])

    return { parkData, thingsToDoData }
}