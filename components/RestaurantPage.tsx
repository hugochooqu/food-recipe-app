'use client'

import dynamic from "next/dynamic";
import { useGeolocation } from '@/hooks/useGeolocation';
import React, { useEffect, useState } from 'react'

import loadingAnimation from "@/public/lottie/loading.json";
import errorAnimation from "@/public/lottie/error.json";
import Card from '@/components/Card';
import { getRandomRestaurantCover } from '@/lib/utils';
import { fetchNearbyRestuarants} from "@/app/api/fetchRestaurant";
import { Restaurant } from "@/constants";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });


const RestaurantPage = () => {
    const { location, loading: geoLoading, error: geoError } = useGeolocation();
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if(location) {
            fetchNearbyRestuarants(location.latitude, location.longitude)
            .then((results) => setRestaurants(results))
            .catch(() => setError("Failed to fetch restuarants"))
            .finally(() => setLoading(false))
        }
    }, [location])

  return (<div className="max-w-7xl mx-auto p-6 min-h-screen">
  <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">Nearby Restaurants</h1>

  {(geoLoading || loading) && (
    <div className="flex flex-col items-center justify-center min-h-[20vh]">
      <Lottie animationData={loadingAnimation} className="w-20 h-20" />
      <p className="text-gray-500 text-lg mt-2">Fetching location & restaurants...</p>
    </div>
  )}

  {(geoError || error) && (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <Lottie animationData={errorAnimation} className="w-60 h-60" />
      <p className="text-red-500 text-lg mt-2">{geoError || error}</p>
    </div>
  )}

  {!loading && !geoLoading && !error && !geoError && (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {restaurants.map((restaurant) => (
        <Card
        id={restaurant.id}
        title={restaurant.name}
        image={getRandomRestaurantCover()}
        subtitle={restaurant.address}
        details={[
          { label: "Rating", value: `⭐ ${restaurant.rating}` }
        ]}
        showAction={false}
      />
      ))}
    </div>
  )}
</div>
);
}

export default RestaurantPage