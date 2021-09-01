import axios from "axios";

export const REQUEST_JSON = process.env.REACT_APP_API;

export function getBands(query) {
	// Authorization head should be fulfilled in interceptor.
	return axios.get(REQUEST_JSON + "/bands?_sort=name&_order=asc&" + query);
}

export function getGenres() {
	// Authorization head should be fulfilled in interceptor.
	return axios.get(`${REQUEST_JSON}` + "/genre?_sort=name&_order=asc");
}

export function getAlbums(id) {
	// Authorization head should be fulfilled in interceptor.
	return axios.get(REQUEST_JSON + "/albums?_sort=name&_order=asc&bandId=" + id);
}
