import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kick Atelier — techno drum lab',
  description: 'A local-first, deterministic kick synthesizer for intentional low end.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
