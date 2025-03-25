import { SwapForm } from '../components/SwapForm';

export default function Swap() {
  return (
    <div className="container py-8">
      <div className="grid lg:grid-cols-[1fr,320px] gap-6">
        <div className="space-y-6">
          <SwapForm />
        </div>
        <div className="space-y-6">
          {/* Правая колонка */}
        </div>
      </div>
    </div>
  );
} 