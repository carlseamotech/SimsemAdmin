"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProposedTour } from "@/models/proposed-tour";
import { updateCustomTour } from "@/services/experiences/custom-tour";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { z } from "zod";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const whereToMeetSchema = z.object({
  meetingPoint: z.string().min(1, "Meeting point is required"),
  meetingPointLat: z.number(),
  meetingPointLong: z.number(),
});

type WhereToMeetFormData = z.infer<typeof whereToMeetSchema>;

interface WhereToMeetModalProps {
  tour: ProposedTour;
  isOpen: boolean;
  onClose: () => void;
  mutate: () => void;
}

const containerStyle = {
  width: "100%",
  height: "400px",
};

export const WhereToMeetModal: React.FC<WhereToMeetModalProps> = ({
  tour,
  isOpen,
  onClose,
  mutate,
}) => {
  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const form = useForm<WhereToMeetFormData>({
    resolver: zodResolver(whereToMeetSchema),
    defaultValues: {
      meetingPoint: "",
      meetingPointLat: 0,
      meetingPointLong: 0,
    },
  });

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    reset,
    setValue,
  } = form;

  useEffect(() => {
    if (tour) {
      reset({
        meetingPoint: tour.meetingPoint,
        meetingPointLat: tour.meetingPointLat,
        meetingPointLong: tour.meetingPointLong,
      });
      if (tour.meetingPointLat && tour.meetingPointLong) {
        setMarkerPosition({
          lat: tour.meetingPointLat,
          lng: tour.meetingPointLong,
        });
      }
    }
  }, [tour, reset]);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarkerPosition({ lat, lng });
      setValue("meetingPointLat", lat);
      setValue("meetingPointLong", lng);
    }
  };

  const onSubmit: SubmitHandler<WhereToMeetFormData> = async (data) => {
    try {
      await updateCustomTour(tour.objectId, data);
      mutate();
      onClose();
      toast.success("Meeting point updated successfully");
    } catch {
      toast.error("Failed to update meeting point");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Where to Meet</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            {...register("meetingPoint")}
            placeholder="Meeting Point Address"
          />
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={
                markerPosition || {
                  lat: tour.meetingPointLat || 0,
                  lng: tour.meetingPointLong || 0,
                }
              }
              zoom={15}
              onClick={handleMapClick}
            >
              {markerPosition && <Marker position={markerPosition} />}
            </GoogleMap>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
