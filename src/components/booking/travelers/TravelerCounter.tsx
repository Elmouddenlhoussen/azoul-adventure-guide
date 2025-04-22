
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Plus, Minus } from 'lucide-react';

interface TravelerCounterProps {
  label: string;
  description: string;
  count: number;
  minCount: number;
  onCountChange: (increment: boolean) => void;
}

export function TravelerCounter({ 
  label, 
  description, 
  count, 
  minCount, 
  onCountChange 
}: TravelerCounterProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-md">
      <div>
        <Label className="font-medium">{label}</Label>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="flex items-center gap-3">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => onCountChange(false)}
          disabled={count <= minCount}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center font-medium">{count}</span>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => onCountChange(true)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
