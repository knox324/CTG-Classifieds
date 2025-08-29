import { PostAdForm } from './PostAdForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function PostAdPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Card className="bg-white/30 dark:bg-black/30 backdrop-blur-lg border border-white/20 dark:border-black/20 rounded-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Create a New Ad</CardTitle>
          <CardDescription>
            Fill in the details below to post your ad. Our AI will help you suggest categories based on your product image.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PostAdForm />
        </CardContent>
      </Card>
    </div>
  );
}
