<script lang="ts">
	import { page } from '$app/state';

	let { children } = $props();

	const tabs = [
		{
			href: '/app/programma',
			label: 'Programma',
			icon: 'M4 6h16M4 12h16M4 18h10'
		},
		{
			href: '/app/scan',
			label: 'Scansiona',
			icon: 'M4 7V5a1 1 0 0 1 1-1h2M4 17v2a1 1 0 0 0 1 1h2M20 7V5a1 1 0 0 0-1-1h-2M20 17v2a1 1 0 0 1-1 1h-2M3 12h18'
		},
		{
			href: '/app/missioni',
			label: 'Missioni',
			icon: 'M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 21.4 7.1 18.2 8 12.7 4 8.8 9.5 8z'
		}
	];

	const active = (href: string) => page.url.pathname.startsWith(href);
</script>

<div class="mx-auto flex min-h-dvh max-w-md flex-col">
	<div class="flex-1 pb-24">
		{@render children()}
	</div>

	<!-- Bottom tab bar -->
	<nav
		class="safe-bottom fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md border-t border-hairline bg-base/80 px-2 pt-2 backdrop-blur-xl"
	>
		<ul class="flex items-stretch justify-around">
			{#each tabs as t}
				{@const isActive = active(t.href)}
				<li class="flex-1">
					<a
						href={t.href}
						aria-current={isActive ? 'page' : undefined}
						class="flex flex-col items-center gap-1 rounded-xl py-1.5 transition active:scale-95
							{isActive ? 'text-accent-soft' : 'text-ink-faint'}"
					>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
							<path
								d={t.icon}
								stroke="currentColor"
								stroke-width="1.9"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						<span class="text-[0.68rem] font-medium tracking-tight">{t.label}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</div>
