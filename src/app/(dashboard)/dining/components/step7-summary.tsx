"use client";
import { FormData } from "./types";

interface Step7SummaryProps {
  formData: FormData;
}

const Step7Summary: React.FC<Step7SummaryProps> = ({ formData }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center">Confirm Your Details</h2>
      <div className="p-6 border rounded-lg space-y-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Meal Name:</h3>
            <p>{formData.name}</p>
          </div>
          <div>
            <h3 className="font-semibold">Host ID:</h3>
            <p>{formData.hostId}</p>
          </div>
          <div>
            <h3 className="font-semibold">Location:</h3>
            <p>
              {formData.city}, {formData.country}
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Duration:</h3>
            <p>{formData.mealDuration}</p>
          </div>
          <div>
            <h3 className="font-semibold">Max Guests:</h3>
            <p>{formData.maxGuest}</p>
          </div>
          <div>
            <h3 className="font-semibold">Cost per Person:</h3>
            <p>${formData.cost}</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mt-4">Menu:</h3>
          {(formData.courses || []).map((course, index) => (
            <div key={index} className="ml-4 mt-2">
              <h4 className="font-medium">{course.name}</h4>
              <ul className="list-disc list-inside">
                {(course.dishes || []).map((dish, dishIndex: number) => (
                  <li key={dishIndex}>{dish.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div>
          <h3 className="font-semibold mt-4">Things to Know:</h3>
          <ul className="list-disc list-inside">
            {(formData.thingsToKnow || []).map((item, index) => (
              <li key={index}>
                <strong>{item.title}:</strong> {item.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Step7Summary;
