'use client';

import { useState } from 'react';

interface FavoriteStarProps {
  syndicatorId: string;
  initialIsFavorite: boolean;
}

export default function FavoriteStar({ syndicatorId, initialIsFavorite }: FavoriteStarProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isLoading, setIsLoading] = useState(false);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking star
    e.stopPropagation();
    
    setIsLoading(true);
    const newValue = !isFavorite;
    
    try {
      const response = await fetch('/api/syndicators/toggle-favorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          syndicatorId,
          isFavorite: newValue,
        }),
      });

      if (response.ok) {
        setIsFavorite(newValue);
        // Refresh the page to re-sort the list
        window.location.reload();
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={isLoading}
      className="p-2 hover:bg-gray-100 rounded transition-colors"
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={isFavorite ? '#FFD700' : 'none'}
        stroke={isFavorite ? '#FFD700' : 'currentColor'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={isLoading ? 'opacity-50' : ''}
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    </button>
  );
}
