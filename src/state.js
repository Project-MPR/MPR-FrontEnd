import KakaoMap from "./KakaoMap";

const {kakao} = window;

const dataReducer = (state, action) => {
    let newState = [];

    switch (action.type) {
        case 'INIT': {
            newState = [...action.data];
            break;
        }
        default: {
            return state;
        }
    }
    return newState;
}

const stationReducer = (state, action) => {
    let newState = {}
    switch (action.type) {
        case 'INIT': {
            const position = new kakao.maps.LatLng(action.data.lon, action.data.lat);
            newState = {...action.data, position : position}
            break;
        }
        default:
            return state;
    }
    return newState
}

const mapReducer = (state, action) => {
    let newState = {}
    switch (action.type) {
        case 'INIT': {
            return action.data;
        }
        default:
            return state;
    }
    return newState;
}

const markerReducer = (state, action) => {
    let newState = {}
    switch (action.type) {
        case 'INIT': {
            newState = {...action.data}
            break;
        }
        default:
            return state;
    }
    return newState;
}

const polyLineReducer = (state, action) => {
    let newState = {}
    switch (action.type) {
        case 'INIT': {
            newState = {...action.data}
            break;
        }
        default:
            return state;
    }
    return newState;
}

const overlayReducer = (state, action) => {
    let newState = {}
    switch (action.type) {
        case 'INIT': {
            newState = {...action.data}
            break;
        }
        default:
            return state;
    }
    return newState;
}

export {dataReducer, markerReducer, mapReducer, overlayReducer, polyLineReducer, stationReducer};