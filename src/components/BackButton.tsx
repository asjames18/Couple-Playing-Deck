import { Link } from 'react-router-dom';

interface BackButtonProps {
  to?: string;
  label?: string;
}

export default function BackButton({
  to = '/',
  label = 'Back to Home',
}: BackButtonProps) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <Link
        to={to}
        className="btn-gaming-secondary tap-target"
        style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
      >
        ← {label}
      </Link>
    </div>
  );
}
