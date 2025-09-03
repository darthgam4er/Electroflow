'use client';

import { useEffect, useState } from 'react';
import { getProductRecommendations } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Lightbulb } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

export function ProductRecommendations({ productDescription }: { productDescription: string }) {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendations() {
      setLoading(true);
      const result = await getProductRecommendations(productDescription);
      setRecommendations(result);
      setLoading(false);
    }
    fetchRecommendations();
  }, [productDescription]);

  return (
    <Card className="bg-secondary/50 border-dashed">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="text-yellow-400" />
          <span>AI Recommendations</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : recommendations.length > 0 ? (
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            {recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No recommendations found.</p>
        )}
      </CardContent>
    </Card>
  );
}
