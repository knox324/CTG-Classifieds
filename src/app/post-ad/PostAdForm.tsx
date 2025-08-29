"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { suggestCategories } from '@/ai/flows/ai-powered-category-suggestion';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Image as ImageIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  description: z.string().min(20, "Description must be at least 20 characters."),
  price: z.coerce.number().min(1, "Price must be a positive number."),
  category: z.string().min(1, "Please select a category."),
  image: z.any().refine(file => file?.length == 1, 'Image is required.'),
});

const defaultCategories = ["Electronics", "Fashion", "Furniture", "Home Decor", "Books", "Sports"];

export function PostAdForm() {
  const [suggestedCategories, setSuggestedCategories] = useState<string[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      category: '',
    },
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const dataUri = reader.result as string;
        setImagePreview(dataUri);
        setIsSuggesting(true);
        setSuggestedCategories([]);
        form.setValue('category', '');
        try {
          const result = await suggestCategories({ photoDataUri: dataUri });
          setSuggestedCategories(result.categories);
        } catch (error) {
          console.error("AI Category Suggestion Error:", error);
          setSuggestedCategories(defaultCategories);
          toast({
            title: "AI Suggestion Failed",
            description: "Couldn't get AI suggestions. Showing default categories.",
            variant: "destructive",
          });
        } finally {
          setIsSuggesting(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const selectCategory = (category: string) => {
    form.setValue('category', category);
    form.clearErrors('category');
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // In a real app, this would call a server action to save the data.
    console.log({ ...values, imageName: values.image[0].name });
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    toast({
      title: "Ad Posted!",
      description: "Your ad has been successfully submitted for review.",
    });
    form.reset();
    setImagePreview(null);
    setSuggestedCategories([]);
    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Image</FormLabel>
              <FormControl>
                <Card className="border-2 border-dashed relative">
                  <CardContent className="p-4 text-center">
                    {imagePreview ? (
                      <div className="relative aspect-video w-full max-w-md mx-auto">
                        <Image src={imagePreview} alt="Product preview" fill className="rounded-md object-contain"/>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center space-y-2 py-8">
                        <ImageIcon className="h-12 w-12 text-muted-foreground" />
                        <p className="text-muted-foreground">Drag 'n' drop an image, or click to select</p>
                      </div>
                    )}
                    <Input 
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => {
                        field.onChange(e.target.files);
                        handleImageChange(e);
                      }}
                    />
                  </CardContent>
                </Card>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        { (isSuggesting || suggestedCategories.length > 0) &&
          <FormItem>
            <FormLabel>Suggested Categories</FormLabel>
             <div className="flex flex-wrap gap-2 items-center min-h-[2.5rem]">
                {isSuggesting && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
                {suggestedCategories.map(cat => (
                  <Badge 
                    key={cat}
                    onClick={() => selectCategory(cat)}
                    variant={form.watch('category') === cat ? 'default' : 'secondary'}
                    className="cursor-pointer text-sm"
                  >
                    {cat}
                  </Badge>
                ))}
             </div>
             <FormMessage>{form.formState.errors.category?.message}</FormMessage>
          </FormItem>
        }

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ad Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Brand New Leather Sofa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (in BDT)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 25000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={5} placeholder="Describe your product in detail..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Post Ad
        </Button>
      </form>
    </Form>
  );
}
