import { render, screen } from '@testing-library/svelte';
import DefaultProps from './DefaultProps.svelte';

it("doesn't pass prop", () => {
	render(DefaultProps);
	expect(screen.queryByText('The answer is a mystery')).toBeInTheDocument();
});

it('set and update prop', async () => {
	// Pass your prop to the render function
	const { component } = render(DefaultProps, { answer: 'I dunno' });
	expect(screen.queryByText('The answer is I dunno')).toBeInTheDocument();

	// Update prop using Svelte's client-side API
	await component.$set({ answer: 'another mystery' });
	expect(screen.queryByText('The answer is another mystery')).toBeInTheDocument();
});
