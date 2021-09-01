import create from "zustand";

const useGlobalState = create((set) => ({
	filterGlobal: {
		bands: "",
		albums: "",
		years: "",
		countries: "",
	},

	setFiltroGlobal: (data) =>
		set((state) =>
			Object.assign({}, state, {
				filterGlobal: data,
			})
		),
}));

export { useGlobalState };
