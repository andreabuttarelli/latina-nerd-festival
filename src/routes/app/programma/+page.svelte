<script lang="ts">
	import { onMount, onDestroy, tick } from 'svelte';
	import { formatDayLong, formatDayShort, todayIso } from '$lib/format';
	import type { FestivalEvent } from '$lib/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Group events by day, preserving chronological order.
	const groups = $derived.by(() => {
		const map = new Map<string, FestivalEvent[]>();
		for (const e of data.events) {
			if (!map.has(e.day)) map.set(e.day, []);
			map.get(e.day)!.push(e);
		}
		return [...map.entries()]
			.sort((a, b) => a[0].localeCompare(b[0]))
			.map(([day, events]) => ({ day, events }));
	});

	const today = todayIso();
	// The day to focus: today if it's a festival day, otherwise the first day.
	const focusDay = $derived(
		groups.find((g) => g.day === today)?.day ?? groups[0]?.day ?? ''
	);

	let activeDay = $state('');
	let sections: Record<string, HTMLElement> = {};
	let observer: IntersectionObserver | null = null;
	const nowHHMM = (() => {
		const d = new Date();
		return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
	})();

	function isPast(e: FestivalEvent) {
		return e.day < today || (e.day === today && (e.endTime ?? e.startTime ?? '') < nowHHMM);
	}
	function isLive(e: FestivalEvent) {
		return (
			e.day === today &&
			(e.startTime ?? '') <= nowHHMM &&
			nowHHMM < (e.endTime ?? '99:99')
		);
	}

	function scrollToDay(day: string, smooth = true) {
		sections[day]?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
	}

	onMount(async () => {
		activeDay = focusDay;
		await tick();
		// Jump to the focused day on first paint (no smooth, feels instant).
		if (focusDay) scrollToDay(focusDay, false);

		// Track which day section is in view to highlight the day pill.
		observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						const day = (entry.target as HTMLElement).dataset.day;
						if (day) activeDay = day;
					}
				}
			},
			{ rootMargin: '-45% 0px -50% 0px' }
		);
		for (const el of Object.values(sections)) observer.observe(el);
	});

	onDestroy(() => observer?.disconnect());
</script>

<svelte:head><title>Programma · Latina Nerd Festival</title></svelte:head>

<!-- Sticky header with day switcher -->
<header class="safe-top sticky top-0 z-30 border-b border-hairline bg-base/80 px-5 pb-3 backdrop-blur-xl">
	<h1 class="pt-1 text-2xl font-bold tracking-tight">Programma</h1>
	<div class="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
		{#each groups as g}
			<button
				onclick={() => scrollToDay(g.day)}
				class="shrink-0 rounded-full px-4 py-2 text-sm font-semibold tracking-tight transition active:scale-95
					{activeDay === g.day
					? 'bg-accent text-white'
					: 'bg-surface text-ink-dim'}"
			>
				{formatDayShort(g.day)}
			</button>
		{/each}
	</div>
</header>

<div class="px-5">
	{#each groups as g}
		<section bind:this={sections[g.day]} data-day={g.day} class="scroll-mt-32 pt-6">
			<h2 class="mb-3 text-sm font-semibold uppercase tracking-widest text-accent-soft">
				{formatDayLong(g.day)}
			</h2>
			<ol class="relative ml-1 border-l border-hairline">
				{#each g.events as e}
					<li class="relative pb-4 pl-5">
						<!-- timeline dot -->
						<span
							class="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full ring-4 ring-base
								{isLive(e) ? 'bg-accent' : isPast(e) ? 'bg-ink-faint' : 'bg-accent-soft'}"
						></span>

						<div
							class="rounded-[var(--radius-card)] border border-hairline bg-surface p-4 transition
								{isPast(e) && !isLive(e) ? 'opacity-55' : ''}"
						>
							<div class="flex items-center gap-2 text-sm font-semibold tabular-nums text-ink-dim">
								<span>{e.startTime}{e.endTime ? `–${e.endTime}` : ''}</span>
								{#if isLive(e)}
									<span
										class="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-accent-soft"
									>
										<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-accent"></span> Live
									</span>
								{/if}
							</div>
							<h3 class="mt-1 text-base font-semibold leading-snug tracking-tight text-ink">
								{e.title}
							</h3>
							{#if e.description}
								<p class="mt-1 text-sm leading-snug text-ink-dim">{e.description}</p>
							{/if}
							{#if e.stage || e.speaker}
								<div class="mt-2 flex flex-wrap gap-1.5">
									{#if e.stage}
										<span class="rounded-md bg-surface-2 px-2 py-0.5 text-xs text-ink-dim">
											{e.stage}
										</span>
									{/if}
									{#if e.speaker}
										<span class="rounded-md bg-surface-2 px-2 py-0.5 text-xs text-ink-dim">
											{e.speaker}
										</span>
									{/if}
								</div>
							{/if}
						</div>
					</li>
				{/each}
			</ol>
		</section>
	{/each}
	<div class="h-8"></div>
</div>
