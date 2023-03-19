import axios from "axios";

const BASE_URL = "https://findfalcone.geektrust.com/";

export const fetchPlanets = async () => {
	const URL = `${BASE_URL}/planets`;

	try {
		const response = await axios.get(URL);
		return response;
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const fetchVehicles = async () => {
	const URL = `${BASE_URL}/vehicles`;

	try {
		const response = await axios.get(URL);
		return response;
	} catch (error) {
		console.error(error);
		return [];
	}
};
