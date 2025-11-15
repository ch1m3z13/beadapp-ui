import type { Metadata } from 'next';
import ProjectDetailInteractive from './components/ProjectDetailInteractive';

export const metadata: Metadata = {
  title: 'Project Detail - BeadApp',
  description: 'View comprehensive project insights, generated posts, and scheduling options with tabbed navigation for social media automation.',
};

export default function ProjectDetailPage() {
  return (
    <main>
      <ProjectDetailInteractive />
    </main>
  );
}