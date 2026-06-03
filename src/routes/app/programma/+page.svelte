<script lang="ts">
	import { onMount, onDestroy, tick } from 'svelte';
	import { formatDayLong, formatDayShort, todayIso } from '$lib/format';
	import type { FestivalEvent } from '$lib/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Group by day → then by start time, so simultaneous events share one slot.
	const groups = $derived.by(() => {
		const byDay = new Map<string, FestivalEvent[]>();
		for (const e of data.events) {
			if (!byDay.has(e.day)) byDay.set(e.day, []);
			byDay.get(e.day)!.push(e);
		}
		return [...byDay.entries()]
			.sort((a, b) => a[0].localeCompare(b[0]))
			.map(([day, events]) => {
				const bySlot = new Map<string, FestivalEvent[]>();
				for (const e of events) {
					const key = e.startTime ?? '';
					if (!bySlot.has(key)) bySlot.set(key, []);
					bySlot.get(key)!.push(e);
				}
				const slots = [...bySlot.entries()]
					.sort((a, b) => a[0].localeCompare(b[0]))
					.map(([time, evs]) => ({ time, events: evs }));
				return { day, slots };
			});
	});

	const today = todayIso();
	const focusDay = $derived(groups.find((g) => g.day === today)?.day ?? groups[0]?.day ?? '');

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
		return e.day === today && (e.startTime ?? '') <= nowHHMM && nowHHMM < (e.endTime ?? '99:99');
	}
	const slotLive = (evs: FestivalEvent[]) => evs.some(isLive);
	const slotPast = (evs: FestivalEvent[]) => evs.every(isPast);

	function scrollToDay(day: string, smooth = true) {
		sections[day]?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
	}

	onMount(async () => {
		activeDay = focusDay;
		await tick();
		if (focusDay) scrollToDay(focusDay, false);

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

<svelte:head><title>Programma · Latina Nerd Fest</title></svelte:head>

<!-- Sticky header with day switcher -->
<header class="safe-top sticky top-0 z-30 border-b border-line bg-base/90 px-5 pb-3 backdrop-blur-xl">
	<h1 class="pt-1 text-3xl font-bold uppercase tracking-tight">Programma</h1>
	<div class="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
		{#each groups as g}
			<button
				onclick={() => scrollToDay(g.day)}
				class="shrink-0 rounded-[3px] px-4 py-2 text-sm font-semibold tracking-tight transition active:scale-95
					{activeDay === g.day ? 'bg-accent text-white' : 'bg-surface text-ink-dim'}"
			>
				{formatDayShort(g.day)}
			</button>
		{/each}
	</div>
</header>

<div class="px-5">
	{#each groups as g}
		<section bind:this={sections[g.day]} data-day={g.day} class="scroll-mt-32 pt-6">
			<h2 class="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
				{formatDayLong(g.day)}
			</h2>
			<ol class="relative ml-1 border-l border-hairline">
				{#each g.slots as slot}
					{@const live = slotLive(slot.events)}
					{@const past = slotPast(slot.events)}
					<li class="relative pb-6 pl-5">
						<!-- timeline dot (slot-level status) -->
						<span
							class="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-base
								{live ? 'bg-accent' : past ? 'bg-ink-faint' : 'bg-ink'}"
						></span>

						<!-- slot time + concurrency badge -->
						<div class="flex flex-wrap items-center gap-2">
							<span class="text-sm font-bold tabular-nums tracking-tight {past && !live ? 'text-ink-faint' : 'text-ink'}">
								{slot.time}
							</span>
							{#if live}
								<span class="inline-flex items-center gap-1 rounded-[3px] bg-accent/10 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-accent">
									<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-accent"></span> Live
								</span>
							{/if}
							{#if slot.events.length > 1}
								<span class="rounded-[3px] bg-surface px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-ink-dim">
									{slot.events.length} in contemporanea
								</span>
							{/if}
						</div>

						<!-- events in this slot (stacked) -->
						<div class="mt-2 grid gap-2">
							{#each slot.events as e}
								<div
									class="rounded-[var(--radius-card)] border border-hairline bg-base p-4 transition
										{isPast(e) && !isLive(e) ? 'opacity-55' : ''}"
								>
									<h3 class="text-base font-semibold leading-snug tracking-tight text-ink">
										{e.title}
									</h3>
									{#if e.endTime}
										<p class="mt-0.5 text-xs font-medium tabular-nums text-ink-faint">
											fino alle {e.endTime}
										</p>
									{/if}
									{#if e.description}
										<p class="mt-1.5 text-sm leading-snug text-ink-dim">{e.description}</p>
									{/if}
									{#if e.stage || e.speaker}
										<div class="mt-2 flex flex-wrap gap-1.5">
											{#if e.stage}
												<span class="rounded-[3px] bg-surface px-2 py-0.5 text-xs text-ink-dim">{e.stage}</span>
											{/if}
											{#if e.speaker}
												<span class="rounded-[3px] bg-surface px-2 py-0.5 text-xs text-ink-dim">{e.speaker}</span>
											{/if}
										</div>
									{/if}
								</div>
							{/each}
						</div>
					</li>
				{/each}
			</ol>
		</section>
	{/each}
	<div class="h-8"></div>
</div>
