import { useLoaderData } from "react-router";
import { fetchParks, fetchThingsToDo } from '../api/npsApi.ts';

export async function loader() {
    const[parkData, thingsToDoData] = await Promise.all([
        fetchParks('nj'),
        fetchThingsToDo('acad')
    ])

    return {parkData, thingsToDoData};

}

export default function ApiTest() {
    const {parkData, thingsToDoData} = useLoaderData();

    return (
        <div style={{padding: '1rem'}}>
            <h1>API Test Page</h1>

            <section>
                <h2>Search for Parks by State → "NJ"</h2>
                <pre>{JSON.stringify(parkData, null, 2)}</pre>
            </section>

            <section>
                <h2>Search for Things to Do by Park ID → "acad"</h2>
                <pre>{JSON.stringify(thingsToDoData, null, 2)}</pre>
            </section>
        </div>
    )
}