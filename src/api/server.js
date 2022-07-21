const apiStations = async () => {
    return fetch("http://35.78.119.235:8080/api/stations")
        .then(res => res.json());
}

const apiData = async (station) => {
    return fetch(`http://35.78.119.235:8080/api/restaurant/${station}`)
        .then(res => res.json())
        .then(res => res.sort((a, b) => a.distance - b.distance));
}

export {apiStations,apiData};