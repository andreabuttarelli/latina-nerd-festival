<script lang="ts">
	import { goto } from '$app/navigation';
	import { setOnboarded } from '$lib/user';

	const slides = [
		{
			emoji: '🗓️',
			title: 'Il programma',
			text: 'Due giorni di eventi, ora per ora. L’app ti porta in automatico al giorno e all’evento in corso.'
		},
		{
			emoji: '📷',
			title: 'Scansiona i QR',
			text: 'Trova i codici sparsi nel festival e inquadrali con la fotocamera dell’app.'
		},
		{
			emoji: '🏆',
			title: 'Sblocca missioni',
			text: 'Ogni QR sblocca un achievement e ti fa guadagnare punti. Collezionali tutti.'
		}
	];

	let i = $state(0);
	const last = $derived(i === slides.length - 1);

	function finish() {
		setOnboarded();
		goto('/app/programma', { replaceState: true });
	}
	function next() {
		if (last) finish();
		else i += 1;
	}

	// basic touch swipe
	let startX = 0;
	function onStart(e: TouchEvent) {
		startX = e.touches[0].clientX;
	}
	function onEnd(e: TouchEvent) {
		const dx = e.changedTouches[0].clientX - startX;
		if (dx < -40 && !last) i += 1;
		else if (dx > 40 && i > 0) i -= 1;
	}
</script>

<svelte:head><title>Benvenuto · Latina Nerd Fest</title></svelte:head>

<main
	class="mx-auto flex min-h-dvh max-w-md flex-col px-6"
	ontouchstart={onStart}
	ontouchend={onEnd}
>
	<!-- top bar: brand + skip -->
	<div class="safe-top flex items-center justify-between">
		<img src="/logo-dark.png" alt="Latina Nerd Fest" class="h-6 w-auto" />
		<button onclick={finish} class="text-sm font-medium text-ink-faint transition active:opacity-60">
			Salta
		</button>
	</div>

	<!-- slide -->
	<div class="flex flex-1 flex-col justify-center">
		{#key i}
			<div class="animate-fade-up">
				<div class="flex h-24 w-24 items-center justify-center rounded-[6px] bg-surface text-6xl">
					{slides[i].emoji}
				</div>
				<p class="mt-8 text-sm font-semibold uppercase tracking-[0.15em] text-accent">
					Passo {i + 1} di {slides.length}
				</p>
				<h1 class="mt-2 text-5xl font-bold uppercase leading-[0.95] tracking-tight">
					{slides[i].title}
				</h1>
				<p class="mt-4 max-w-sm text-lg leading-snug text-ink-dim text-balance">
					{slides[i].text}
				</p>
			</div>
		{/key}
	</div>

	<!-- footer: dots + cta -->
	<div class="safe-bottom pb-4">
		<div class="mb-5 flex gap-2">
			{#each slides as _, idx}
				<button
					onclick={() => (i = idx)}
					aria-label={`Vai allo step ${idx + 1}`}
					class="h-1.5 flex-1 transition-colors {idx <= i ? 'bg-accent' : 'bg-surface-2'}"
				></button>
			{/each}
		</div>
		<button
			onclick={next}
			class="flex w-full items-center justify-between gap-2 bg-ink px-6 py-4 text-base font-semibold text-white transition active:opacity-80"
		>
			{last ? 'Inizia' : 'Avanti'}
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
				<path
					d="M5 12h14M13 6l6 6-6 6"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
	</div>
</main>
