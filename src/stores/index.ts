import { atom } from "jotai";
import { atomWithImmer } from "jotai-immer";

export type produceType = {
	id: number;
	name: string;
	tags: string[];
};

const produce = atom<produceType>({ id: 1, name: "jotai", tags: [] });
const produceWithImmer = atomWithImmer<produceType>({
	id: 1,
	name: "jotai",
	tags: [],
});
export { produce, produceWithImmer };
