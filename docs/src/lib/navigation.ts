import { defineNavigation } from "@svecodocs/kit";
import ChalkboardTeacher from "phosphor-svelte/lib/ChalkboardTeacher";
import RocketLaunch from "phosphor-svelte/lib/RocketLaunch";
import NoteBlank from "phosphor-svelte/lib/NoteBlank";
import Tag from "phosphor-svelte/lib/Tag";
import { getAllDocs } from "./utils.js";

const allDocs = getAllDocs();

const components = allDocs
	.filter((doc) => doc.section === "Components")
	.map((doc) => ({
		title: doc.title,
		href: `/docs/${doc.slug}`,
	}));
const states = allDocs
	.filter((doc) => doc.section === "States")
	.map((doc) => ({
		title: doc.title,
		href: `/docs/${doc.slug}`,
	}));
const utilities = allDocs
	.filter((doc) => doc.section === "Utilities")
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
			href: "https://github.com/svecosystem/mode-watcher/releases",
			icon: Tag,
		},
	],
	sections: [
		{
			title: "Components",
			items: components,
		},
		{
			title: "States",
			items: states,
		},
		{
			title: "Utilities",
			items: utilities,
		},
	],
});
