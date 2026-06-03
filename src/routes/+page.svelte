<script lang="ts">
	import { imageUrl } from '$lib/sanity';
	import { formatRange } from '$lib/format';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const f = $derived(data.festival);
	const hero = $derived(imageUrl(f.heroImage, 1600));
	const dates = $derived(formatRange(f.startDate, f.endDate));
	const year = new Date().getFullYear();
</script>

<svelte:head>
	<title>{f.name} — {dates}</title>
	<meta name="description" content={f.tagline ?? f.description ?? f.name} />
</svelte:head>

<!-- Top bar -->
<header class="safe-top sticky top-0 z-40 border-b border-line bg-base/90 backdrop-blur-xl">
	<div class="mx-auto flex max-w-xl items-center justify-between px-6 py-3">
		<a href="/" aria-label={f.name}>
			<img src="/logo-dark.png" alt={f.name} class="h-7 w-auto" />
		</a>
		<nav class="flex items-center gap-4 text-sm font-medium">
			{#if f.ticketUrl}
				<a href={f.ticketUrl} target="_blank" rel="noopener" class="text-ink-dim transition active:opacity-60">Biglietti</a>
			{/if}
			<a href="/app" class="bg-ink px-3 py-1.5 text-white transition active:opacity-80">Apri l'app</a>
		</nav>
	</div>
</header>

<!-- Hero (colored background) -->
<section class="bg-accent text-white">
	<div class="mx-auto max-w-xl px-6 pb-14 pt-12">
		{#if dates}
			<p class="animate-fade-up text-sm font-semibold uppercase tracking-[0.15em] text-white/80">
				{dates}{#if f.location} · {f.location}{/if}
			</p>
		{/if}
		<h1 class="animate-fade-up mt-4 text-6xl font-bold uppercase leading-[0.9] tracking-tight text-white sm:text-7xl" style="animation-delay:60ms">
			{f.name}
		</h1>
		{#if f.tagline}
			<p class="animate-fade-up mt-5 max-w-md text-xl leading-snug text-white/85 text-balance" style="animation-delay:120ms">
				{f.tagline}
			</p>
		{/if}

		<div class="animate-fade-up mt-7 flex flex-col gap-2 sm:flex-row" style="animation-delay:180ms">
			<a href="/app" class="flex items-center justify-between gap-2 bg-ink px-6 py-4 text-base font-semibold text-white transition active:opacity-80 sm:flex-1">
				Apri l'app del festival
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
			</a>
			{#if f.ticketUrl}
				<a href={f.ticketUrl} target="_blank" rel="noopener" class="flex items-center justify-center border border-white/50 px-6 py-4 text-base font-semibold text-white transition active:opacity-70 sm:flex-1">
					Registrati ora
				</a>
			{/if}
		</div>

		{#if hero}
			<img src={hero} alt="" class="animate-fade-up mt-9 aspect-[4/3] w-full object-cover" style="animation-delay:220ms" />
		{/if}
	</div>
</section>

<!-- Welcome (dark, high contrast) -->
<section class="bg-ink text-white">
	<div class="mx-auto max-w-xl px-6 py-16">
		{#if f.welcomeTitle}
			<h2 class="text-4xl font-bold uppercase leading-[0.95] tracking-tight text-balance">
				{f.welcomeTitle}
			</h2>
		{/if}
		{#if f.nightLine}
			<p class="mt-4 text-lg font-semibold text-accent-2">{f.nightLine}</p>
		{/if}
		{#if f.intro}
			<p class="mt-5 max-w-md text-base leading-relaxed text-white/70 text-balance">{f.intro}</p>
		{/if}

		{#if f.stats?.length}
			<div class="mt-10 grid grid-cols-3 gap-px bg-white/15">
				{#each f.stats as s}
					<div class="bg-ink px-2 py-5 text-center">
						<div class="text-3xl font-bold tracking-tight text-white">{s.value}</div>
						<div class="mt-1 text-xs uppercase tracking-wide text-white/50">{s.label}</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>

<!-- Aree tematiche -->
{#if f.areas?.length}
	<section class="bg-base">
		<div class="mx-auto max-w-xl px-6 py-16">
			<h2 class="text-sm font-semibold uppercase tracking-widest text-accent">Cosa trovi</h2>
			<p class="mt-1 text-3xl font-bold uppercase tracking-tight">Le aree del festival</p>
			<div class="mt-6 grid grid-cols-2 gap-px border border-hairline bg-hairline">
				{#each f.areas as a}
					<div class="flex items-center gap-3 bg-base px-4 py-5">
						<span class="text-2xl">{a.emoji ?? '✦'}</span>
						<span class="text-base font-semibold leading-tight tracking-tight">{a.title}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- Programma teaser -->
<section class="border-t border-line bg-base">
	<div class="mx-auto max-w-xl px-6 py-16">
		<h2 class="text-sm font-semibold uppercase tracking-widest text-accent">Programma</h2>
		<p class="mt-1 text-3xl font-bold uppercase leading-tight tracking-tight text-balance">
			Due giorni, tanti palchi, zero tempo morto
		</p>
		<p class="mt-3 max-w-md text-base leading-snug text-ink-dim">
			Talk, tornei, panel e live. Apri l’app per il cronoprogramma completo, ora per ora.
		</p>
		<a href="/app/programma" class="mt-6 inline-flex items-center gap-2 text-base font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 transition active:opacity-70">
			Vedi il programma
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
		</a>
	</div>
</section>

<!-- Info & come arrivare -->
<section class="border-t border-line bg-base">
	<div class="mx-auto max-w-xl px-6 py-16">
		<h2 class="text-sm font-semibold uppercase tracking-widest text-accent">Informazioni</h2>
		<p class="mt-1 text-3xl font-bold uppercase tracking-tight">Quando & dove</p>
		<dl class="mt-6 border-t border-hairline">
			{#if dates}
				<div class="flex justify-between gap-4 border-b border-hairline py-3.5">
					<dt class="text-sm uppercase tracking-wide text-ink-faint">Quando</dt>
					<dd class="text-right text-base font-semibold tracking-tight">{dates}</dd>
				</div>
			{/if}
			{#if f.openingHours}
				<div class="flex justify-between gap-4 border-b border-hairline py-3.5">
					<dt class="text-sm uppercase tracking-wide text-ink-faint">Orari</dt>
					<dd class="text-right text-base font-semibold tracking-tight">{f.openingHours}</dd>
				</div>
			{/if}
			{#if f.address}
				<div class="flex justify-between gap-4 border-b border-hairline py-3.5">
					<dt class="text-sm uppercase tracking-wide text-ink-faint">Dove</dt>
					<dd class="text-right text-base font-semibold tracking-tight text-balance">{f.address}</dd>
				</div>
			{/if}
			{#if f.freeEntry}
				<div class="flex justify-between gap-4 border-b border-hairline py-3.5">
					<dt class="text-sm uppercase tracking-wide text-ink-faint">Ingresso</dt>
					<dd class="text-right text-base font-semibold tracking-tight text-accent">Gratuito</dd>
				</div>
			{/if}
		</dl>
		{#if f.mapsUrl}
			<a href={f.mapsUrl} target="_blank" rel="noopener" class="mt-5 inline-flex items-center gap-2 border border-line px-5 py-3 text-sm font-semibold text-ink transition active:opacity-70">
				Apri in Maps
			</a>
		{/if}
	</div>
</section>

<!-- Biglietti -->
{#if f.ticketUrl}
	<section class="bg-ink text-white">
		<div class="mx-auto max-w-xl px-6 py-16">
			<h2 class="text-4xl font-bold uppercase leading-[0.95] tracking-tight">Prenota il tuo posto</h2>
			{#if f.ticketNote}
				<p class="mt-4 max-w-md text-base leading-snug text-white/75">{f.ticketNote}</p>
			{/if}
			<a href={f.ticketUrl} target="_blank" rel="noopener" class="mt-7 inline-flex items-center justify-between gap-3 bg-accent px-6 py-4 text-base font-semibold text-white transition active:opacity-85">
				Registrati su Eventbrite
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
			</a>
		</div>
	</section>
{/if}

<!-- Partner -->
{#if f.partners?.length}
	<section class="bg-base">
		<div class="mx-auto max-w-xl px-6 py-16">
			<h2 class="text-sm font-semibold uppercase tracking-widest text-accent">Con il supporto di</h2>
			<div class="mt-5 flex flex-wrap gap-2">
				{#each f.partners as p}
					<span class="border border-hairline px-4 py-2 text-sm font-medium text-ink-dim">{p.name}</span>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- Footer -->
<footer class="border-t border-line bg-ink text-white">
	<div class="mx-auto max-w-xl px-6 py-14">
		<img src="/logo-light.png" alt={f.name} class="h-12 w-auto" />
		<div class="mt-6 grid gap-2 text-sm text-white/70">
			{#if f.email}
				<a href={`mailto:${f.email}`} class="transition active:opacity-60">{f.email}</a>
			{/if}
			{#if f.address}<p>{f.address}</p>{/if}
		</div>
		<div class="mt-6 flex gap-3 text-sm font-semibold">
			{#if f.instagram}
				<a href={f.instagram} target="_blank" rel="noopener" class="border border-white/25 px-4 py-2 transition active:opacity-60">Instagram</a>
			{/if}
			{#if f.tiktok}
				<a href={f.tiktok} target="_blank" rel="noopener" class="border border-white/25 px-4 py-2 transition active:opacity-60">TikTok</a>
			{/if}
		</div>
		<p class="safe-bottom mt-10 text-xs text-white/40">
			© {year} {f.name}{#if f.organizer} · {f.organizer}{/if}
		</p>
	</div>
</footer>
