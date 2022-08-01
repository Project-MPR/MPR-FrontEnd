const url = "http://18.183.248.36:8080"

const apiStations = async () => {
    return fetch(`${url}/api/stations`)
        .then(res => res.json());
}

const apiData = async (station) => {
    return fetch(`${url}/api/restaurant/${station}`)
        .then(res => res.json())
        .then(res => res.sort((a, b) => a.distance - b.distance));
}

export {apiStations,apiData};