
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Eye, Heart } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-background to-primary/10">
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-primary">
          Our Vision for Chattogram
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
          Connecting communities, one ad at a time. Discover our mission, our vision, and the values that drive CTG Classifieds forward.
        </p>
      </div>
      
      <div className="container mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                <Target className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="mt-4 text-2xl font-headline">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To create a trusted, user-friendly, and hyper-local online marketplace that empowers the people of Chattogram to buy and sell goods and services with ease and confidence, fostering a stronger local economy.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                <Eye className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="mt-4 text-2xl font-headline">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To become the most beloved and widely used classifieds platform in the Chattogram Division, known for our commitment to quality, security, and community enrichment.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                <Heart className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="mt-4 text-2xl font-headline">Our Values</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We believe in trust, community, innovation, and local empowerment. Every feature we build and every decision we make is guided by these core principles to better serve you.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
