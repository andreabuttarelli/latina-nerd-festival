<script lang="ts">
	import { onMount } from 'svelte';
	import { sanity } from '$lib/sanity';
	import { progressQuery } from '$lib/queries';
	import { getAnonId } from '$lib/user';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let unlocked = $state<Set<string>>(new Set());
	let loaded = $state(false);

	const total = $derived(data.missions.length);
	const done = $derived([...unlocked].filter((s) => data.missions.some((m) => m.slug === s)).length);
	const earnedPoints = $derived(
		data.missions.filter((m) => unlocked.has(m.slug)).reduce((sum, m) => sum + (m.points ?? 0), 0)
	);
	const pct = $derived(total ? Math.round((done / total) * 100) : 0);

	onMount(async () => {
		try {
			const anonId = getAnonId();
			const res = await sanity.fetch<{ unlocked: string[] }>(progressQuery, { anonId });
			unlocked = new Set((res?.unlocked ?? []).filter(Boolean));
		} catch {
			unlocked = new Set();
		}
		loaded = true;
	});
</script>

<svelte:head><title>Missioni · Latina Nerd Festival</title></svelte:head>

<header class="safe-top sticky top-0 z-30 border-b border-hairline bg-base/80 px-5 pb-4 backdrop-blur-xl">
	<h1 class="pt-1 text-2xl font-bold tracking-tight">Missioni</h1>
	<p class="mt-0.5 text-sm text-ink-dim">Scansiona i QR nel festival per sbloccarle.</p>

	<!-- Progress -->
	<div class="mt-4 rounded-2xl border border-hairline bg-surface p-4">
		<div class="flex items-baseline justify-between">
			<span class="text-sm text-ink-dim">{done} di {total} sbloccate</span>
			<span class="text-sm font-semibold tabular-nums text-accent-soft">{earnedPoints} pt</span>
		</div>
		<div class="mt-2 h-2 overflow-hidden rounded-full bg-surface-2">
			<div
				class="h-full rounded-full bg-accent transition-[width] duration-500"
				style="width:{pct}%"
			></div>
		</div>
	</div>
</header>

<div class="grid gap-3 px-5 pt-5">
	{#each data.missions as m}
		{@const isUnlocked = unlocked.has(m.slug)}
		<div
			class="flex items-center gap-4 rounded-[var(--radius-card)] border p-4 transition
				{isUnlocked ? 'border-accent/40 bg-accent/5' : 'border-hairline bg-surface'}"
		>
			<div
				class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl
					{isUnlocked ? 'bg-accent/15' : 'bg-surface-2 grayscale'}"
			>
				{m.emoji ?? '🎯'}
			</div>
			<div class="min-w-0 flex-1">
				<div class="flex items-center gap-2">
					<h3 class="truncate text-base font-semibold tracking-tight">
						{isUnlocked && m.achievementTitle ? m.achievementTitle : m.title}
					</h3>
					{#if m.points}
						<span class="shrink-0 text-xs font-semibold text-ink-faint">+{m.points}</span>
					{/if}
				</div>
				<p class="mt-0.5 text-sm leading-snug text-ink-dim">
					{isUnlocked
						? (m.achievementDescription ?? 'Achievement sbloccato.')
						: (m.description ?? 'Missione bloccata.')}
				</p>
			</div>
			<div class="shrink-0">
				{#if isUnlocked}
					<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-label="Sbloccata">
						<circle cx="12" cy="12" r="11" fill="var(--color-accent)" opacity="0.18" />
						<path d="M7 12.5l3 3 7-7" stroke="var(--color-accent-soft)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				{:else}
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-label="Bloccata">
						<rect x="5" y="10" width="14" height="10" rx="2.5" stroke="currentColor" stroke-width="1.8" class="text-ink-faint" />
						<path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" stroke-width="1.8" class="text-ink-faint" />
					</svg>
				{/if}
			</div>
		</div>
	{/each}

	{#if !loaded}
		<p class="py-2 text-center text-xs text-ink-faint">Carico i tuoi progressi…</p>
	{/if}
</div>
