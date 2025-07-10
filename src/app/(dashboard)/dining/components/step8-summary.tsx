"use client";

import type React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { DiningFormData } from "../page";

interface Step8SummaryProps {
  formData: DiningFormData;
}

const Step8Summary: React.FC<Step8SummaryProps> = ({ formData }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-blue-900 mb-2">
          Dining Summary
        </h2>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-blue-900">
                {formData.mealName || "The Ultimate Breakfast at Istanbul"}
              </h3>
            </div>
            <Badge className="bg-[#FB8B24] text-white px-3 py-1">
              ${formData.costPerPerson || "30"}.00/ Person
            </Badge>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Description</h4>
              <p className="text-gray-600 text-sm">
                {formData.description || "No description provided"}
              </p>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-blue-600">🌍</span>
                <span>
                  <strong>Country:</strong>
                  {formData.country || "Istanbul Turkey"}
                </span>
              </div>
            </div>

            {formData.coverPhoto && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Cover Photo</h4>
                <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="Cover Photo"
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            <div>
              <h4 className="font-medium text-gray-900 mb-4">Menu</h4>

              {/* Starter Section */}
              {formData.selectedStarter && (
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-medium">S</span>
                    </div>
                    <h5 className="font-medium text-gray-900">Starter</h5>
                  </div>
                  <div className="ml-11 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-3 flex items-center space-x-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                          <Image
                            src={
                              formData.selectedStarter.image ||
                              "/placeholder.svg"
                            }
                            alt={formData.selectedStarter.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h6 className="font-medium text-gray-900">
                            {formData.selectedStarter.name}
                          </h6>
                          <p className="text-xs text-gray-600">
                            {formData.selectedStarter.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Main Dish Section */}
              {formData.selectedMainDish && (
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-medium">M</span>
                    </div>
                    <h5 className="font-medium text-gray-900">Main Dish</h5>
                  </div>
                  <div className="ml-11 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-3 flex items-center space-x-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                          <Image
                            src={
                              formData.selectedMainDish.image ||
                              "/placeholder.svg"
                            }
                            alt={formData.selectedMainDish.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h6 className="font-medium text-gray-900">
                            {formData.selectedMainDish.name}
                          </h6>
                          <p className="text-xs text-gray-600">
                            {formData.selectedMainDish.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Dessert Section */}
              {formData.selectedDessert && (
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-medium">D</span>
                    </div>
                    <h5 className="font-medium text-gray-900">Dessert</h5>
                  </div>
                  <div className="ml-11 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-3 flex items-center space-x-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                          <Image
                            src={
                              formData.selectedDessert.image ||
                              "/placeholder.svg"
                            }
                            alt={formData.selectedDessert.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h6 className="font-medium text-gray-900">
                            {formData.selectedDessert.name}
                          </h6>
                          <p className="text-xs text-gray-600">
                            {formData.selectedDessert.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Step8Summary;
