import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import DefaultLayout from './Layouts/DefaultLayout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setupPageLayout(module: any) {
    module.default.layout =
        module.default.layout ||
        ((page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>);
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const page = resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        );
        page.then((module) => setupPageLayout(module));
        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
