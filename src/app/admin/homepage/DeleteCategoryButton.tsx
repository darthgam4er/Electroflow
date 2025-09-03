
'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Trash2 } from 'lucide-react';
import { deleteHomepageCategory } from './actions';
import { useRouter } from "next/navigation";


export function DeleteCategoryButton({ id }: { id: string }) {
    const { toast } = useToast();
    const router = useRouter();

    const handleDeleteCategory = async (id: string) => {
        const result = await deleteHomepageCategory(id);
        if (result.success) {
            toast({
                title: "Category Deleted",
                description: "The category has been deleted successfully.",
            });
            // This will trigger a re-fetch of data on the page
            router.refresh();
        } else {
            toast({
                title: "Error",
                description: result.error,
                variant: "destructive",
            });
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the category
                        from the homepage.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDeleteCategory(id)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
