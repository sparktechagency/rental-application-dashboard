import { useState, useEffect } from "react";
import { User, Mail, Calendar, DollarSign, Car } from "lucide-react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";

const CarTrackingDetails = () => {
  const [carLocation, setCarLocation] = useState({
    lat: 37.7749,
    lng: -122.4194,
  });

  const [userDetails] = useState({
    id: "323445",
    name: "Tamim",
    email: "tamim@gmail.com",
    bookingDate: "10-15 May",
    price: "$50$",
    carName: "BMW 5 Series 2025",
  });

  const [carName] = useState("BMW 5 Series 2025");

  // Simulate car movement
  useEffect(() => {
    const interval = setInterval(() => {
      setCarLocation((prev) => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_BASE_URL_GOOGLE_MAP_API_KEY, // Replace with your API key
  });

  // Map container style
  const mapContainerStyle = {
    height: "100%",
    width: "100%",
  };

  // Points of interest positions
  const pointsOfInterest = [
    { lat: 37.7799, lng: -122.4094, color: "bg-orange-500" }, // Top-left
    { lat: 37.7799, lng: -122.3994, color: "bg-blue-500" }, // Top-right
    { lat: 37.7699, lng: -122.4094, color: "bg-green-500" }, // Bottom-left
    { lat: 37.7699, lng: -122.3994, color: "bg-purple-500" }, // Bottom-right
  ];

  // Route path
  const routePath = [
    { lat: 37.7649, lng: -122.4294 },
    { lat: 37.7749, lng: -122.4194 },
    { lat: 37.7849, lng: -122.4094 },
  ];

  // Render a loading state until the API is loaded
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              Car Tracking
            </h1>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Car Name
              </label>
              <input
                type="text"
                value={carName}
                readOnly
                className="w-full max-w-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                  <p className="text-gray-600">Loading map...</p>
                </div>
              </div>
            </div>
            {/* User Details Panel remains unchanged */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
                      alt="User Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex justify-center mb-6">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    Rented
                  </span>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    User Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-gray-600">
                        <User size={16} />
                        <span className="text-sm">User</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {userDetails.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-sm">ID</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {userDetails.id}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail size={16} />
                        <span className="text-sm">Email</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 break-all">
                        {userDetails.email}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-gray-600">
                        xda
                        <Calendar size={16} />
                        <span className="text-sm">Booking Date</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {userDetails.bookingDate}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign size={16} />
                        <span className="text-sm">Price</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {userDetails.price}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Car size={16} />
                        <span className="text-sm">Car Name</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {userDetails.carName}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Car Tracking
          </h1>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Car Name
            </label>
            <button className="w-full max-w-xs px-3 text-left py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900">
              {carName}
            </button>
          </div>
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-16">
            {/* Map Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
                  {/* Google Map */}
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={carLocation}
                    zoom={14}
                  >
                    {/* Car Location Marker */}
                    <Marker
                      position={carLocation}
                      icon={{
                        url:
                          "data:image/svg+xml;charset=UTF-8," +
                          encodeURIComponent(`
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                          <circle cx="16" cy="16" r="16" fill="#EF4444" opacity="0.3" class="animate-ping"/>
                          <circle cx="16" cy="16" r="12" fill="#EF4444"/>
                          <path d="M16 8a8 8 0 0 0-8 8c0 4.4 3.6 8 8 8s8-3.6 8-8a8 8 0 0 0-8-8zm-2 14v-2h4v2h-4zm0-4h-2v-4h6v4h-2v2h-2v-2z" fill="#FFFFFF"/>
                        </svg>
                      `),
                        scaledSize: new window.google.maps.Size(32, 32),
                      }}
                    />

                    {/* Route Line */}
                    <Polyline
                      path={routePath}
                      options={{
                        strokeColor: "#3B82F6",
                        strokeOpacity: 0.6,
                        strokeWeight: 3,
                        geodesic: true,
                        icons: [
                          {
                            icon: {
                              path: "M 0,-1 0,1",
                              strokeOpacity: 1,
                              scale: 4,
                            },
                            offset: "0",
                            repeat: "20px",
                          },
                        ],
                      }}
                    />
                  </GoogleMap>

                  {/* Street Names */}
                  <div className="absolute top-4 left-4 text-xs text-gray-600 bg-white px-2 py-1 rounded shadow">
                    Hayes Valley
                  </div>
                  <div className="absolute top-16 right-8 text-xs text-gray-600 bg-white px-2 py-1 rounded shadow">
                    Civic Center
                  </div>
                  <div className="absolute bottom-20 left-8 text-xs text-gray-600 bg-white px-2 py-1 rounded shadow">
                    Mission District
                  </div>

                  {/* Points of Interest */}
                  {pointsOfInterest.map((poi, index) => (
                    <div
                      key={index}
                      className={`absolute w-3 h-3 ${poi.color} rounded-full`}
                      style={{
                        left: `${50 + (poi.lng + 122.4194) * 1000}%`,
                        top: `${50 - (poi.lat - 37.7749) * 1000}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    ></div>
                  ))}

                  {/* Map Controls */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <button className="w-8 h-8 bg-white rounded shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50">
                      +
                    </button>
                    <button className="w-8 h-8 bg-white rounded shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50">
                      -
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* User Details Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
                      alt="User Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex justify-center mb-6">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    Rented
                  </span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    User Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-gray-600">
                        <User size={16} />
                        <span className="text-sm">User</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {userDetails.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-sm">ID</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {userDetails.id}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail size={16} />
                        <span className="text-sm">Email</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 break-all">
                        {userDetails.email}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar size={16} />
                        <span className="text-sm">Booking Date</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {userDetails.bookingDate}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign size={16} />
                        <span className="text-sm">Price</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {userDetails.price}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Car size={16} />
                        <span className="text-sm">Car Name</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {userDetails.carName}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarTrackingDetails;
