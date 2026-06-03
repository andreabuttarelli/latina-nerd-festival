<script lang="ts">
	import { getAnonId } from '$lib/user';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const m = $derived(data.mission);

	let state = $state<'unlocking' | 'unlocked' | 'already' | 'notfound' | 'error'>('unlocking');

	// Re-runs whenever the slug changes (component is reused across mission deeplinks).
	$effect(() => {
		const slug = data.slug;
		if (!data.mission) {
			state = 'notfound';
			return;
		}
		state = 'unlocking';
		let cancelled = false;
		(async () => {
			try {
				const res = await fetch('/api/unlock', {
					method: 'POST',
					headers: { 'content-type': 'application/json' },
					body: JSON.stringify({ anonId: getAnonId(), slug })
				});
				if (cancelled) return;
				if (res.status === 404) return void (state = 'notfound');
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				const body = await res.json();
				if (cancelled) return;
				state = body.alreadyUnlocked ? 'already' : 'unlocked';
				if (state === 'unlocked' && navigator.vibrate) navigator.vibrate([20, 40, 60]);
			} catch {
				if (!cancelled) state = 'error';
			}
		})();
		return () => {
			cancelled = true;
		};
	});
</script>

<svelte:head><title>Missione · Latina Nerd Festival</title></svelte:head>

<div class="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 text-center">
	<!-- celebratory glow -->
	{#if state === 'unlocked' || state === 'already'}
		<div
			class="pointer-events-none absolute inset-0 -z-10"
			style="background: radial-gradient(50% 40% at 50% 35%, rgba(109,94,252,0.4), transparent 70%);"
		></div>
	{/if}

	{#if state === 'unlocking'}
		<div class="h-14 w-14 animate-spin rounded-full border-2 border-hairline border-t-accent"></div>
		<p class="mt-5 text-sm text-ink-dim">Sblocco in corso…</p>
	{:else if state === 'notfound'}
		<span class="text-5xl">🤔</span>
		<h1 class="mt-4 text-2xl font-bold tracking-tight">Missione non trovata</h1>
		<p class="mt-2 max-w-xs text-sm text-ink-dim">
			Questo QR non corrisponde a nessuna missione del festival.
		</p>
	{:else if state === 'error'}
		<span class="text-5xl">⚠️</span>
		<h1 class="mt-4 text-2xl font-bold tracking-tight">Qualcosa è andato storto</h1>
		<p class="mt-2 max-w-xs text-sm text-ink-dim">
			Non siamo riusciti a registrare la missione. Riprova tra poco.
		</p>
	{:else}
		<!-- unlocked / already -->
		<div class="animate-pop flex h-28 w-28 items-center justify-center rounded-[2rem] bg-accent/15 text-6xl">
			{m?.emoji ?? '🎯'}
		</div>
		<p class="animate-fade-up mt-6 text-sm font-semibold uppercase tracking-widest text-accent-soft" style="animation-delay:120ms">
			{state === 'already' ? 'Già sbloccata' : 'Achievement sbloccato'}
		</p>
		<h1 class="animate-fade-up mt-2 text-3xl font-bold tracking-tight text-balance" style="animation-delay:180ms">
			{m?.achievementTitle ?? m?.title}
		</h1>
		{#if m?.achievementDescription}
			<p class="animate-fade-up mt-3 max-w-xs text-base leading-snug text-ink-dim text-balance" style="animation-delay:240ms">
				{m.achievementDescription}
			</p>
		{/if}
		{#if m?.points}
			<p class="animate-fade-up mt-4 text-sm font-semibold text-accent-soft" style="animation-delay:280ms">
				+{m.points} punti
			</p>
		{/if}
	{/if}

	<div class="mt-10 flex w-full max-w-xs flex-col gap-2">
		<a
			href="/app/missioni"
			class="rounded-2xl bg-accent px-6 py-3.5 text-base font-semibold text-white transition active:scale-[0.98]"
		>
			Le mie missioni
		</a>
		<a
			href="/app/scan"
			class="rounded-2xl border border-hairline px-6 py-3.5 text-base font-medium text-ink-dim transition active:scale-[0.98]"
		>
			Scansiona ancora
		</a>
	</div>
</div>
