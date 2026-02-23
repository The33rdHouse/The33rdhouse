import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useState } from "react";

export default function AdminSeed() {
  const [isSeeding, setIsSeeding] = useState(false);
  const seedProducts = trpc.admin.seedProducts.useMutation();

  const handleSeedProducts = async () => {
    setIsSeeding(true);
    try {
      const result = await seedProducts.mutateAsync();
      toast.success(result.message);
    } catch (error: any) {
      toast.error(error.message || "Failed to seed products");
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Admin: Database Seeding</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Seed Sacred Library Products</CardTitle>
            <CardDescription>
              This will clear all existing products and seed the database with 71 Sacred Library books
              organized by the 12 Gates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleSeedProducts} 
              disabled={isSeeding}
              size="lg"
            >
              {isSeeding ? "Seeding..." : "Seed 71 Sacred Library Books"}
            </Button>
            
            <div className="mt-6 text-sm text-muted-foreground">
              <p className="font-semibold mb-2">What this does:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Deletes all existing products</li>
                <li>Inserts 71 books organized by 12 Gates</li>
                <li>Sets appropriate pricing ($24.99-$99.99)</li>
                <li>Marks featured books for homepage display</li>
                <li>Assigns gate and realm numbers for filtering</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Book Distribution</CardTitle>
            <CardDescription>71 total books across the 12 Gates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div><strong>Gate 1:</strong> Breath (6 books)</div>
              <div><strong>Gate 2:</strong> Sensation (6 books)</div>
              <div><strong>Gate 3:</strong> Emotion (6 books)</div>
              <div><strong>Gate 4:</strong> Shadow (6 books)</div>
              <div><strong>Gate 5:</strong> Mind (6 books)</div>
              <div><strong>Gate 6:</strong> Vision (6 books)</div>
              <div><strong>Gate 7:</strong> Voice (6 books)</div>
              <div><strong>Gate 8:</strong> Heart (6 books)</div>
              <div><strong>Gate 9:</strong> Will (6 books)</div>
              <div><strong>Gate 10:</strong> Crown (6 books)</div>
              <div><strong>Gate 11:</strong> Integration (6 books)</div>
              <div><strong>Gate 12:</strong> Return (5 books)</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
