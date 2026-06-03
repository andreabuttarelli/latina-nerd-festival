<script lang="ts">
	import { imageUrl } from '$lib/sanity';
	import { formatRange } from '$lib/format';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const f = $derived(data.festival);
	const hero = $derived(imageUrl(f.heroImage, 1400));
	const dates = $derived(formatRange(f.startDate, f.endDate));
</script>

<svelte:head>
	<title>{f.name}</title>
	<meta name="description" content={f.tagline ?? f.description ?? f.name} />
</svelte:head>

<main class="relative min-h-dvh overflow-hidden">
	<!-- Ambient gradient -->
	<div
		class="pointer-events-none absolute inset-0 -z-10"
		style="background:
			radial-gradient(60% 50% at 50% -10%, rgba(109,94,252,0.35), transparent 70%),
			radial-gradient(40% 40% at 90% 20%, rgba(139,125,255,0.18), transparent 70%);"
	></div>

	<section class="safe-top mx-auto flex min-h-dvh max-w-md flex-col px-6 pb-12">
		<!-- Top brand -->
		<div class="flex items-center gap-2 pt-2 text-sm font-medium tracking-tight text-ink-dim">
			<span class="inline-block h-2 w-2 rounded-full bg-accent"></span>
			Latina Nerd Festival
		</div>

		<!-- Hero -->
		<div class="flex flex-1 flex-col justify-center py-14">
			{#if dates}
				<p
					class="animate-fade-up mb-4 text-sm font-semibold uppercase tracking-widest text-accent-soft"
				>
					{dates}
				</p>
			{/if}
			<h1
				class="animate-fade-up text-[3.25rem] font-bold leading-[0.95] tracking-tight text-balance"
				style="animation-delay:60ms"
			>
				{f.name}
			</h1>
			{#if f.tagline}
				<p
					class="animate-fade-up mt-5 max-w-sm text-lg leading-snug text-ink-dim text-balance"
					style="animation-delay:120ms"
				>
					{f.tagline}
				</p>
			{/if}

			{#if hero}
				<img
					src={hero}
					alt=""
					class="animate-fade-up mt-8 aspect-[4/3] w-full rounded-[var(--radius-card)] object-cover shadow-[var(--shadow-soft)]"
					style="animation-delay:160ms"
				/>
			{/if}
		</div>

		<!-- CTA -->
		<a
			href="/app"
			class="animate-fade-up flex items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-4 text-center text-base font-semibold text-white shadow-[var(--shadow-soft)] transition active:scale-[0.98]"
			style="animation-delay:220ms"
		>
			Apri l'app del festival
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
				<path
					d="M5 12h14M13 6l6 6-6 6"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</a>

		{#if f.location}
			<p class="mt-4 text-center text-sm text-ink-faint">{f.location}</p>
		{/if}
	</section>

	<!-- Highlights -->
	{#if f.highlights?.length}
		<section class="mx-auto max-w-md px-6 pb-20">
			<div class="grid gap-3">
				{#each f.highlights as h}
					<div class="rounded-[var(--radius-card)] border border-hairline bg-surface p-5">
						<h3 class="text-base font-semibold tracking-tight">{h.title}</h3>
						{#if h.text}<p class="mt-1 text-sm leading-snug text-ink-dim">{h.text}</p>{/if}
					</div>
				{/each}
			</div>
		</section>
	{/if}
</main>
