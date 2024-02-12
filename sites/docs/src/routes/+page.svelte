<script lang="ts">
	import {
		GitHubIcon,
		HardDrives,
		PaintRoller,
		BracketsCurly,
		Laptop,
		Browser,
		Palette,
	} from "$lib/icons/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import FeatureCard from "$lib/components/feature-card.svelte";
	import { siteConfig } from "$lib/config";
</script>

<span class="hero-gradient"></span>
<span class="features-gradient"></span>
<div class="container relative mx-auto max-w-5xl py-20 sm:py-28 md:py-32">
	<h1
		class="text-balance text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
	>
		SSR-friendly Light and Dark Mode for SvelteKit
	</h1>
	<p class="mx-auto mt-6 max-w-3xl text-balance text-center text-base sm:text-lg">
		Simple utilities to manage light and dark mode in your SvelteKit app. Maintained by the <a
			href="https://github.com/svecosystem"
			target="_blank"
			class="text-brand hover:text-brand/95 font-medium underline underline-offset-4 transition-all hover:underline-offset-[6px]"
			>Svecosystem</a
		> team.
	</p>
	<div class="mt-8 flex items-center justify-center gap-4">
		<Button href="/docs" variant="brand" size="lg">Get Started</Button>
		<Button href={siteConfig.links.github} target="_blank" variant="outline" size="lg">
			<GitHubIcon class="mr-2 h-4 w-4" />
			View on GitHub
		</Button>
	</div>
</div>
<section class="relative mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-32 lg:px-8">
	<h2 class="mb-10 text-balance text-center text-3xl font-bold tracking-tight lg:text-4xl">
		Features
	</h2>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
		<FeatureCard title="SSR Ready" icon={HardDrives}>
			Get out of the box support for server-side rendering, and no flash of unstyled content.
		</FeatureCard>
		<FeatureCard title="Theme Management" icon={PaintRoller}>
			Capable of managing the theme-color meta tag alongside light and dark mode.
		</FeatureCard>
		<FeatureCard title="Helper Functions" icon={BracketsCurly}>
			A set of helper functions to programatically manage your users' preferences.
		</FeatureCard>
		<FeatureCard title="System Prefers Mode" icon={Laptop}>
			Automatically switch themes based on system preferences.
		</FeatureCard>
		<FeatureCard title="User Prefers Mode" icon={Browser}>
			Automatically keep the theme aligned with the user's preferences.
		</FeatureCard>
		<FeatureCard title="Color Scheme" icon={Palette}>
			Keep your scrollbars and other system UI elements in sync with the theme.
		</FeatureCard>
	</div>
</section>
