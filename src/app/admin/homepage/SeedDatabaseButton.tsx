'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { seedDatabase } from './actions';
import { useToast } from '@/hooks/use-toast';

export function SeedDatabaseButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSeedDatabase = async () => {
    setIsLoading(true);
    try {
      const result = await seedDatabase();
      
      if (result.success) {
        toast({
          title: "✅ Database Seeded!",
          description: `${result.message} Added ${result.slidesAdded} slides and ${result.categoriesAdded} categories.`,
        });
        // Refresh the page to show new content
        window.location.reload();
      } else {
        toast({
          title: "❌ Error",
          description: result.error || "Failed to seed database",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "❌ Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      className="h-auto p-4 flex flex-col items-center gap-2"
      onClick={handleSeedDatabase}
      disabled={isLoading}
    >
      <span className="text-2xl">🌱</span>
      <span className="font-semibold">
        {isLoading ? 'Seeding...' : 'Seed Database'}
      </span>
      <span className="text-sm text-muted-foreground text-center">
        Add sample slides and categories
      </span>
    </Button>
  );
}
