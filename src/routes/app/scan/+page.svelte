<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import type QrScanner from 'qr-scanner';

	let video: HTMLVideoElement;
	let scanner: QrScanner | null = null;
	let status = $state<'idle' | 'starting' | 'scanning' | 'denied' | 'unsupported' | 'navigating'>(
		'starting'
	);
	let errorMsg = $state('');
	let handled = false;

	/** Extract a mission slug from a scanned QR payload. */
	function slugFromPayload(raw: string): string | null {
		const value = raw.trim();
		// Full deeplink URL → take the slug after /app/m/
		try {
			const url = new URL(value);
			const m = url.pathname.match(/\/app\/m\/([^/?#]+)/);
			if (m) return decodeURIComponent(m[1]);
		} catch {
			// not a URL — fall through
		}
		// Bare path or bare slug
		const m = value.match(/\/app\/m\/([^/?#]+)/);
		if (m) return decodeURIComponent(m[1]);
		if (/^[a-z0-9-]+$/i.test(value)) return value;
		return null;
	}

	async function onDecode(result: QrScanner.ScanResult) {
		if (handled) return;
		const slug = slugFromPayload(result.data);
		if (!slug) return; // ignore unrelated QR codes, keep scanning
		handled = true;
		status = 'navigating';
		await scanner?.stop();
		if (navigator.vibrate) navigator.vibrate(30);
		goto(`/app/m/${slug}`);
	}

	onMount(async () => {
		const { default: QrScanner } = await import('qr-scanner');
		if (!(await QrScanner.hasCamera().catch(() => false))) {
			status = 'unsupported';
			return;
		}
		scanner = new QrScanner(video, onDecode, {
			highlightScanRegion: true,
			highlightCodeOutline: true,
			preferredCamera: 'environment',
			maxScansPerSecond: 5
		});
		try {
			await scanner.start();
			status = 'scanning';
		} catch (e) {
			status = 'denied';
			errorMsg = e instanceof Error ? e.message : String(e);
		}
	});

	onDestroy(() => {
		scanner?.stop();
		scanner?.destroy();
		scanner = null;
	});
</script>

<svelte:head><title>Scansiona · Latina Nerd Festival</title></svelte:head>

<header class="safe-top px-5 pb-2 pt-2">
	<h1 class="text-2xl font-bold tracking-tight">Scansiona</h1>
	<p class="mt-0.5 text-sm text-ink-dim">Inquadra un QR del festival per sbloccare una missione.</p>
</header>

<div class="px-5 pt-3">
	<div
		class="relative aspect-square w-full overflow-hidden rounded-[1.5rem] border border-hairline bg-black"
	>
		<!-- svelte-ignore a11y_media_has_caption -->
		<video bind:this={video} class="h-full w-full object-cover" playsinline muted></video>

		<!-- Scan frame overlay -->
		{#if status === 'scanning'}
			<div class="pointer-events-none absolute inset-0 flex items-center justify-center">
				<div class="h-56 w-56 rounded-3xl border-2 border-white/70 shadow-[0_0_0_9999px_rgba(0,0,0,0.45)]"></div>
			</div>
		{/if}

		{#if status === 'starting'}
			<div class="absolute inset-0 flex items-center justify-center text-sm text-ink-dim">
				Avvio fotocamera…
			</div>
		{:else if status === 'navigating'}
			<div class="absolute inset-0 flex items-center justify-center bg-black/60 text-sm font-medium text-ink">
				QR rilevato ✓
			</div>
		{:else if status === 'denied' || status === 'unsupported'}
			<div class="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
				<span class="text-3xl">📷</span>
				<p class="text-sm font-medium text-ink">
					{status === 'unsupported'
						? 'Nessuna fotocamera disponibile su questo dispositivo.'
						: 'Permesso fotocamera negato.'}
				</p>
				{#if status === 'denied'}
					<p class="text-xs text-ink-faint">
						Abilita l’accesso alla fotocamera dalle impostazioni del browser e ricarica la pagina.
					</p>
				{/if}
			</div>
		{/if}
	</div>

	<p class="mt-4 text-center text-xs text-ink-faint">
		Inquadra il codice: la missione si sblocca in automatico.
	</p>
</div>
