import { defineNavigation } from "@svecodocs/kit";
import ChalkboardTeacher from "phosphor-svelte/lib/ChalkboardTeacher";
import RocketLaunch from "phosphor-svelte/lib/RocketLaunch";
import NoteBlank from "phosphor-svelte/lib/NoteBlank";
import Tag from "phosphor-svelte/lib/Tag";
import { getAllDocs } from "./utils.js";

const allDocs = getAllDocs();

const apiReference = allDocs
	.filter((doc) => doc.section === "API Reference")
	.map((doc) => ({
		title: doc.title,
		href: `/docs/${doc.slug}`,
	}));

export const navigation = defineNavigation({
	anchors: [
		{
			title: "Introduction",
			href: "/docs",
			icon: ChalkboardTeacher,
		},
		{
			title: "Getting Started",
			href: "/docs/getting-started",
			icon: RocketLaunch,
		},
		{
			title: "Mode vs Theme",
			href: "/docs/mode-vs-theme",
			icon: NoteBlank,
		},
		{
			title: "Releases",
			href: "https://github.com/svecosystem/svecodocs/releases",
			icon: Tag,
		},
	],
	sections: [
		{
			title: "API Reference",
			items: apiReference,
		},
	],
});
