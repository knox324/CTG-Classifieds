
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { searchAds, type SearchAdsOutput } from '@/ai/flows/search-ads-flow';
import { Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface SearchResultsProps {
    query: string;
    onResultClick: () => void;
}

export function SearchResults({ query, onResultClick }: SearchResultsProps) {
    const [results, setResults] = useState<SearchAdsOutput['results']>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const performSearch = async () => {
            if (query.trim().length < 2) {
                setResults([]);
                return;
            }
            setIsLoading(true);
            try {
                const response = await searchAds({ query });
                setResults(response.results);
            } catch (error) {
                console.error("Search failed:", error);
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        };

        const debounceTimer = setTimeout(() => {
            performSearch();
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [query]);

    if (!query) return null;

    return (
        <Card className="absolute top-full mt-2 w-full bg-background rounded-xl shadow-lg border z-50 max-h-96 overflow-y-auto">
            {isLoading && (
                <div className="p-4 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
            )}
            {!isLoading && results.length === 0 && query.length > 1 && (
                <div className="p-4 text-center text-muted-foreground">
                    No results found for "{query}"
                </div>
            )}
            {!isLoading && results.length > 0 && (
                <ul>
                    {results.map((ad, index) => (
                        <li key={ad.id}>
                            <Link href={`/ad/${ad.id}`} onClick={onResultClick} className="block hover:bg-secondary/50">
                                <div className="flex items-center gap-4 p-3">
                                    <div className="relative h-14 w-14 rounded-md overflow-hidden flex-shrink-0">
                                        <Image
                                            src={ad.imageUrl}
                                            alt={ad.title}
                                            fill
                                            className="object-cover"
                                            data-ai-hint="product image"
                                        />
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <p className="font-semibold truncate">{ad.title}</p>
                                        <p className="text-sm text-muted-foreground">{ad.category}</p>
                                        <p className="text-md font-bold text-primary">৳{ad.price.toLocaleString('en-IN')}</p>
                                    </div>
                                </div>
                            </Link>
                            {index < results.length - 1 && <Separator />}
                        </li>
                    ))}
                </ul>
            )}
        </Card>
    );
}

