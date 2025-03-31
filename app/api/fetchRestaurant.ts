export interface Restaurant {
    id: string,
    name: string,
    address?: string,
    rating?: number,
    image?: string,
}
export const fetchNearbyRestuarants = async (latitude : number, longitude : number):Promise<Restaurant[]>  => {
    const FOURSQUARE_API_KEY = process.env.NEXT_PUBLIC_FOURSQUARE_PLACES_API_KEY;
    const url = `https://api.foursquare.com/v3/places/search?query=restaurant&ll=${latitude},${longitude}&radius=5000&sort=RATING`;

    try {
        const response = await fetch(url, {
            headers: {Authorization: `${FOURSQUARE_API_KEY}` , accept : "application/json" }
        })

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
          }

        const data = await response.json()
        console.log("Fetched restaurants:", data);

        console.log('image:' , data.results[0].categories[0]?.icon?.prefix + "original" + data.results[0].categories?.[0]?.icon?.suffix)

        return data.results.map((place: any) => ({
            id: place.fsq_id,
            name: place.name,
            address: place.location.formatted_address || "No Address",
            rating: place.rating || "N/A",
            image: place.categories?.[0]?.icon?.prefix + "original" + place.categories?.[0]?.icon?.suffix || "/bg.jpg",
          }));

    } catch (error : any) {
        console.log("Error fetching restuarants",error)
        return []
    }
}