import { defineNavigation } from "@svecodocs/kit";
import ChalkboardTeacher from "phosphor-svelte/lib/ChalkboardTeacher";
import RocketLaunch from "phosphor-svelte/lib/RocketLaunch";
import Tag from "phosphor-svelte/lib/Tag";
import { getAllDocs } from "./utils.js";

const allDocs = getAllDocs();

const components = allDocs
	.filter((doc) => doc.section === "Components")
	.map((doc) => ({
		title: doc.title,
		href: `/docs/${doc.slug}`,
	}));

const configuration = allDocs
	.filter((doc) => doc.section === "Configuration")
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
			title: "Releases",
			href: "https://github.com/svecosystem/svecodocs/releases",
			icon: Tag,
		},
	],
	sections: [
		{
			title: "Configuration",
			items: configuration,
		},
		{
			title: "Components",
			items: components,
		},
	],
});
