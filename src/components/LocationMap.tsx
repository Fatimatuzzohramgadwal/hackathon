interface LocationMapProps {
  company?: string;
  location: string;
  latitude?: number;
  longitude?: number;
}

const LocationMap = ({ company, location, latitude = 12.9716, longitude = 77.5946 }: LocationMapProps) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  // Use Google Maps embed API
  const mapEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(location)}`;

  if (!apiKey) {
    return (
      <div className="rounded-lg border border-border bg-card/50 p-4 text-center">
        <p className="text-sm text-muted-foreground">Map unavailable - API key not configured</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="rounded-lg overflow-hidden border border-border">
        <iframe
          width="100%"
          height="250"
          style={{ border: 0 }}
          loading="lazy"
          src={mapEmbedUrl}
          title={`Location of ${company || location}`}
        />
      </div>
      <p className="text-xs text-muted-foreground">{location}</p>
    </div>
  );
};

export default LocationMap;
